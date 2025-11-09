export function AdminHeader({ user }) {
  return (
    <header
      style={{
        background: "linear-gradient(135deg, #1a5f3f 0%, #2d8f5f 100%)",
        color: "white",
        padding: "20px 0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "28px" }}>
          🌿 Herbal Haven - Admin Panel
        </h1>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <span>Welcome, {user.name || user.email}</span>
          <a
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "8px 16px",
              border: "1px solid white",
              borderRadius: "6px",
            }}
          >
            Back to Store
          </a>
          <a
            href="/account/logout"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "8px 16px",
              border: "1px solid white",
              borderRadius: "6px",
            }}
          >
            Sign Out
          </a>
        </div>
      </div>
    </header>
  );
}
