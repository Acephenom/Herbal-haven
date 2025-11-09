export function LoadingState() {
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
