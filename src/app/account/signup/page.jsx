import { useState } from "react";
import useAuth from "@/utils/useAuth";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || !name) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        name,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin:
          "Couldn't start sign-up. Please try again or use a different method.",
        OAuthCallback: "Sign-up failed after redirecting. Please try again.",
        OAuthCreateAccount:
          "Couldn't create an account with this sign-up option. Try another one.",
        EmailCreateAccount:
          "This email can't be used. It may already be registered.",
        Callback: "Something went wrong during sign-up. Please try again.",
        OAuthAccountNotLinked:
          "This account is linked to a different sign-in method. Try using that instead.",
        CredentialsSignin:
          "Invalid email or password. If you already have an account, try signing in instead.",
        AccessDenied: "You don't have permission to sign up.",
        Configuration:
          "Sign-up isn't working right now. Please try again later.",
        Verification: "Your sign-up link has expired. Request a new one.",
      };

      setError(
        errorMessages[err.message] || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a5f3f 0%, #2d8f5f 100%)",
        padding: "20px",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#1a5f3f",
              margin: "0 0 10px 0",
            }}
          >
            Join Herbal Haven
          </h1>
          <p
            style={{
              color: "#666",
              fontSize: "16px",
              margin: 0,
            }}
          >
            Create your account to get started
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            style={{
              width: "100%",
              padding: "12px 15px",
              border: "2px solid #e1e5e9",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2d8f5f")}
            onBlur={(e) => (e.target.style.borderColor = "#e1e5e9")}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "12px 15px",
              border: "2px solid #e1e5e9",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2d8f5f")}
            onBlur={(e) => (e.target.style.borderColor = "#e1e5e9")}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            style={{
              width: "100%",
              padding: "12px 15px",
              border: "2px solid #e1e5e9",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2d8f5f")}
            onBlur={(e) => (e.target.style.borderColor = "#e1e5e9")}
          />
        </div>

        {error && (
          <div
            style={{
              background: "#fee",
              color: "#c33",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading ? "#ccc" : "#2d8f5f",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
            marginBottom: "20px",
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.background = "#1a5f3f";
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.background = "#2d8f5f";
          }}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
            margin: 0,
          }}
        >
          Already have an account?{" "}
          <a
            href={`/account/signin${
              typeof window !== "undefined" ? window.location.search : ""
            }`}
            style={{
              color: "#2d8f5f",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

export default MainComponent;
