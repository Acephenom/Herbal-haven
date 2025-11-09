export function TabNavigation({
  activeTab,
  setActiveTab,
  productsCount,
  ordersCount,
}) {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid #eee",
        background: "#f8f9fa",
      }}
    >
      <button
        onClick={() => setActiveTab("products")}
        style={{
          padding: "20px 30px",
          border: "none",
          background: activeTab === "products" ? "white" : "transparent",
          color: activeTab === "products" ? "#2d8f5f" : "#666",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          borderBottom:
            activeTab === "products"
              ? "3px solid #2d8f5f"
              : "3px solid transparent",
        }}
      >
        Products ({productsCount})
      </button>
      <button
        onClick={() => setActiveTab("orders")}
        style={{
          padding: "20px 30px",
          border: "none",
          background: activeTab === "orders" ? "white" : "transparent",
          color: activeTab === "orders" ? "#2d8f5f" : "#666",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          borderBottom:
            activeTab === "orders"
              ? "3px solid #2d8f5f"
              : "3px solid transparent",
        }}
      >
        Orders ({ordersCount})
      </button>
    </div>
  );
}
