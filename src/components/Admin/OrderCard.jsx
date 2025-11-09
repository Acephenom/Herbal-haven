import { formatDate, formatPrice, getStatusColor } from "@/utils/adminHelpers";

export function OrderCard({ order, updateOrderStatus }) {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "10px",
        padding: "20px",
        background: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "15px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "5px",
            }}
          >
            Order #{order.id}
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "5px",
            }}
          >
            {formatDate(order.created_at)}
          </div>
          <div style={{ fontSize: "14px", color: "#666" }}>
            Customer: {order.customer_name || order.customer_email}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "10px",
          }}
        >
          <select
            value={order.status}
            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              background: getStatusColor(order.status),
              color: "white",
              fontWeight: "600",
              fontSize: "12px",
            }}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#2d8f5f",
            }}
          >
            {formatPrice(order.total_kes, order.total_usd)}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: "15px",
          marginTop: "15px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <strong>Delivery:</strong> {order.delivery_location}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <strong>Phone:</strong> {order.phone_number}
        </div>

        {order.items && order.items.length > 0 && (
          <div>
            <strong>Items:</strong>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {order.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "white",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  <span>
                    {item.product_name} × {item.quantity}
                  </span>
                  <span>
                    {formatPrice(
                      parseFloat(item.price_kes) * item.quantity,
                      parseFloat(item.price_usd) * item.quantity,
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
