export function AccessDenied({ message, linkText, linkHref }) {
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
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: "0 0 20px 0" }}>Access Denied</h2>
        <p style={{ margin: "0 0 20px 0" }}>{message}</p>
        <a
          href={linkHref}
          style={{
            background: "#2d8f5f",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          {linkText}
        </a>
      </div>
    </div>
  );
}
