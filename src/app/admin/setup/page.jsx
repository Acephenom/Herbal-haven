import { useState } from "react";
import useUser from "@/utils/useUser";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleMakeAdmin = async () => {
    if (!user) {
      setError("You must be signed in to become an admin");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/make-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to promote to admin");
      }
    } catch (err) {
      console.error("Error promoting to admin:", err);
      setError("Failed to promote to admin");
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a5f3f 0%, #2d8f5f 100%)",
        }}
      >
        <div style={{ color: "white", fontSize: "18px" }}>Loading...</div>
      </div>
    );
  }

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
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1a5f3f",
            margin: "0 0 20px 0",
          }}
        >
          🌿 Admin Setup
        </h1>

        {!user ? (
          <div>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              You need to be signed in to set up admin access.
            </p>
            <a
              href="/account/signin"
              style={{
                background: "#2d8f5f",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Sign In
            </a>
          </div>
        ) : success ? (
          <div>
            <div
              style={{
                background: "#d4edda",
                color: "#155724",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
                border: "1px solid #c3e6cb",
              }}
            >
              ✅ Successfully promoted to admin!
            </div>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              You now have admin privileges and can manage products.
            </p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <a
                href="/admin"
                style={{
                  background: "#2d8f5f",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Go to Admin Panel
              </a>
              <a
                href="/"
                style={{
                  background: "#6c757d",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Back to Store
              </a>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Welcome, <strong>{user.name || user.email}</strong>!
            </p>
            <p style={{ color: "#666", marginBottom: "30px" }}>
              Click the button below to promote your account to admin status.
              This will give you access to the admin panel where you can manage
              products.
            </p>

            <div
              style={{
                background: "#fff3cd",
                color: "#856404",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
                border: "1px solid #ffeaa7",
                fontSize: "14px",
              }}
            >
              <strong>Important:</strong> This setup page should be deleted
              after creating your first admin user. Only use this in a secure
              environment.
            </div>

            {error && (
              <div
                style={{
                  background: "#f8d7da",
                  color: "#721c24",
                  padding: "15px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  border: "1px solid #f5c6cb",
                }}
              >
                {error}
              </div>
            )}

            <button
              onClick={handleMakeAdmin}
              disabled={loading}
              style={{
                background: loading ? "#ccc" : "#ff6b35",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                marginBottom: "20px",
              }}
            >
              {loading ? "Setting up..." : "Make Me Admin"}
            </button>

            <div style={{ marginTop: "20px" }}>
              <a
                href="/"
                style={{
                  color: "#2d8f5f",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                ← Back to Store
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;
