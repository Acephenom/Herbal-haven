import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [currency, setCurrency] = useState("KES");

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (priceKes, priceUsd) => {
    if (currency === "KES") {
      return `KES ${parseFloat(priceKes).toLocaleString()}`;
    }
    return `$${parseFloat(priceUsd).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f39c12";
      case "confirmed":
        return "#3498db";
      case "shipped":
        return "#9b59b6";
      case "delivered":
        return "#27ae60";
      case "cancelled":
        return "#e74c3c";
      default:
        return "#95a5a6";
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

  if (!user) {
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
          <h2 style={{ margin: "0 0 20px 0" }}>Sign In Required</h2>
          <p style={{ margin: "0 0 20px 0" }}>
            Please sign in to view your account.
          </p>
          <a
            href="/account/signin?callbackUrl=/account"
            style={{
              background: "#2d8f5f",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Header */}
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
          <h1 style={{ margin: 0, fontSize: "28px" }}>🌿 Herbal Haven</h1>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
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

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}
      >
        {/* Welcome Section */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ margin: "0 0 10px 0", color: "#333" }}>
            Welcome back, {user.name || user.email}!
          </h2>
          <p style={{ margin: 0, color: "#666" }}>
            Manage your orders and account information below.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #eee",
              background: "#f8f9fa",
            }}
          >
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
              Order History
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              style={{
                padding: "20px 30px",
                border: "none",
                background: activeTab === "profile" ? "white" : "transparent",
                color: activeTab === "profile" ? "#2d8f5f" : "#666",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                borderBottom:
                  activeTab === "profile"
                    ? "3px solid #2d8f5f"
                    : "3px solid transparent",
              }}
            >
              Profile
            </button>
          </div>

          <div style={{ padding: "30px" }}>
            {activeTab === "orders" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h3 style={{ margin: 0 }}>Your Orders ({orders.length})</h3>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      background: "white",
                    }}
                  >
                    <option value="KES">KES</option>
                    <option value="USD">USD</option>
                  </select>
                </div>

                {loading ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#666",
                    }}
                  >
                    Loading orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "60px 20px",
                      color: "#666",
                    }}
                  >
                    <h3 style={{ margin: "0 0 10px 0" }}>No orders yet</h3>
                    <p style={{ margin: "0 0 20px 0" }}>
                      Start shopping to see your orders here!
                    </p>
                    <a
                      href="/"
                      style={{
                        background: "#2d8f5f",
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      Start Shopping
                    </a>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {orders.map((order) => (
                      <div
                        key={order.id}
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
                            <div style={{ fontSize: "14px", color: "#666" }}>
                              {formatDate(order.created_at)}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                              gap: "5px",
                            }}
                          >
                            <span
                              style={{
                                background: getStatusColor(order.status),
                                color: "white",
                                padding: "4px 12px",
                                borderRadius: "20px",
                                fontSize: "12px",
                                fontWeight: "600",
                                textTransform: "capitalize",
                              }}
                            >
                              {order.status}
                            </span>
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
                                        parseFloat(item.price_kes) *
                                          item.quantity,
                                        parseFloat(item.price_usd) *
                                          item.quantity,
                                      )}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <h3 style={{ margin: "0 0 20px 0" }}>Profile Information</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "30px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={user.name || ""}
                      disabled
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        border: "2px solid #e1e5e9",
                        borderRadius: "8px",
                        fontSize: "16px",
                        background: "#f8f9fa",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div>
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
                      value={user.email || ""}
                      disabled
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        border: "2px solid #e1e5e9",
                        borderRadius: "8px",
                        fontSize: "16px",
                        background: "#f8f9fa",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    background: "#fff3cd",
                    border: "1px solid #ffeaa7",
                    borderRadius: "8px",
                    padding: "15px",
                    color: "#856404",
                  }}
                >
                  <h4 style={{ margin: "0 0 10px 0" }}>Account Settings</h4>
                  <p style={{ margin: 0, fontSize: "14px" }}>
                    To update your profile information, please contact support.
                    We're working on adding profile editing features.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
