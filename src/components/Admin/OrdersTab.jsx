import { OrderCard } from "./OrderCard";

export function OrdersTab({ orders, updateOrderStatus }) {
  if (orders.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#666",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>No orders yet</h3>
        <p style={{ margin: 0 }}>
          Orders will appear here when customers make purchases
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          updateOrderStatus={updateOrderStatus}
        />
      ))}
    </div>
  );
}
