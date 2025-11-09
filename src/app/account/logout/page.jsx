import useAuth from "@/utils/useAuth";

function MainComponent() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
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
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
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
          Sign Out
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "16px",
            marginBottom: "30px",
          }}
        >
          Are you sure you want to sign out of Herbal Haven?
        </p>

        <button
          onClick={handleSignOut}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2d8f5f",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#1a5f3f")}
          onMouseOut={(e) => (e.target.style.background = "#2d8f5f")}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default MainComponent;
