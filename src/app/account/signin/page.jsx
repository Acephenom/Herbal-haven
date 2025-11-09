import { useState } from "react";
import useAuth from "@/utils/useAuth";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin:
          "Couldn't start sign-in. Please try again or use a different method.",
        OAuthCallback: "Sign-in failed after redirecting. Please try again.",
        OAuthCreateAccount:
          "Couldn't create an account with this sign-in method. Try another option.",
        EmailCreateAccount:
          "This email can't be used to create an account. It may already exist.",
        Callback: "Something went wrong during sign-in. Please try again.",
        OAuthAccountNotLinked:
          "This account is linked to a different sign-in method. Try using that instead.",
        CredentialsSignin:
          "Incorrect email or password. Try again or reset your password.",
        AccessDenied: "You don't have permission to sign in.",
        Configuration:
          "Sign-in isn't working right now. Please try again later.",
        Verification: "Your sign-in link has expired. Request a new one.",
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
            Welcome Back
          </h1>
          <p
            style={{
              color: "#666",
              fontSize: "16px",
              margin: 0,
            }}
          >
            Sign in to Herbal Haven
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
            placeholder="Enter your password"
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
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
            margin: 0,
          }}
        >
          Don't have an account?{" "}
          <a
            href={`/account/signup${
              typeof window !== "undefined" ? window.location.search : ""
            }`}
            style={{
              color: "#2d8f5f",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default MainComponent;
