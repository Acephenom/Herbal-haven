export function AnalyticsCards({ analytics }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#2d8f5f",
          }}
        >
          {analytics.totalOrders}
        </div>
        <div style={{ color: "#666", fontSize: "16px" }}>Total Orders</div>
      </div>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#27ae60",
          }}
        >
          KES {analytics.totalRevenue.toLocaleString()}
        </div>
        <div style={{ color: "#666", fontSize: "16px" }}>Total Revenue</div>
      </div>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#f39c12",
          }}
        >
          {analytics.pendingOrders}
        </div>
        <div style={{ color: "#666", fontSize: "16px" }}>Pending Orders</div>
      </div>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#e74c3c",
          }}
        >
          {analytics.lowStockProducts}
        </div>
        <div style={{ color: "#666", fontSize: "16px" }}>Low Stock Items</div>
      </div>
    </div>
  );
}
