import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [currency, setCurrency] = useState("KES");
  const [formData, setFormData] = useState({
    delivery_location: "",
    phone_number: "",
    payment_method: "mpesa",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // In a real app, cart would be stored in localStorage or state management
    // For demo purposes, we'll use localStorage
    const savedCart = localStorage.getItem("herbal_haven_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price =
        currency === "KES"
          ? parseFloat(item.price_kes)
          : parseFloat(item.price_usd);
      return total + price * item.quantity;
    }, 0);
  };

  const formatPrice = (priceKes, priceUsd) => {
    if (currency === "KES") {
      return `KES ${parseFloat(priceKes).toLocaleString()}`;
    }
    return `$${parseFloat(priceUsd).toFixed(2)}`;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.delivery_location.trim()) {
      newErrors.delivery_location = "Delivery location is required";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (
      !/^(\+254|0)[17]\d{8}$/.test(formData.phone_number.replace(/\s/g, ""))
    ) {
      newErrors.phone_number = "Please enter a valid Kenyan phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price_kes: item.price_kes,
          price_usd: item.price_usd,
        })),
        delivery_location: formData.delivery_location,
        phone_number: formData.phone_number,
        total_kes: getCartTotal(),
        total_usd: cart.reduce(
          (total, item) => total + item.price_usd * item.quantity,
          0,
        ),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Clear cart
        localStorage.removeItem("herbal_haven_cart");
        setCart([]);
        setOrderPlaced(true);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
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
            Please sign in to complete your order.
          </p>
          <a
            href="/account/signin?callbackUrl=/checkout"
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

  if (orderPlaced) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
        <header
          style={{
            background: "linear-gradient(135deg, #1a5f3f 0%, #2d8f5f 100%)",
            color: "white",
            padding: "20px 0",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 20px",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "28px" }}>🌿 Herbal Haven</h1>
          </div>
        </header>

        <div
          style={{
            maxWidth: "600px",
            margin: "60px auto",
            padding: "40px",
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginBottom: "20px",
            }}
          >
            ✅
          </div>
          <h2 style={{ color: "#27ae60", margin: "0 0 20px 0" }}>
            Order Placed Successfully!
          </h2>
          <p style={{ color: "#666", marginBottom: "30px" }}>
            Thank you for your order. We'll contact you shortly to confirm
            delivery details and payment.
          </p>
          <div
            style={{
              background: "#f8f9fa",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "30px",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0" }}>Next Steps:</h4>
            <ul style={{ textAlign: "left", margin: 0, paddingLeft: "20px" }}>
              <li>You'll receive a call to confirm your order</li>
              <li>M-Pesa payment instructions will be provided</li>
              <li>Delivery will be arranged once payment is confirmed</li>
            </ul>
          </div>
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
            Continue Shopping
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
            ← Back to Store
          </a>
        </div>
      </header>

      <div
        style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}
      >
        <h2 style={{ margin: "0 0 30px 0", color: "#333" }}>Checkout</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "30px",
          }}
        >
          {/* Order Form */}
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ margin: "0 0 20px 0" }}>Delivery Information</h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Delivery Location *
                </label>
                <textarea
                  value={formData.delivery_location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      delivery_location: e.target.value,
                    })
                  }
                  placeholder="Enter your full delivery address (e.g., Apartment 4B, Kilimani Road, Nairobi)"
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: errors.delivery_location
                      ? "2px solid #e74c3c"
                      : "2px solid #e1e5e9",
                    borderRadius: "8px",
                    fontSize: "16px",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
                {errors.delivery_location && (
                  <div
                    style={{
                      color: "#e74c3c",
                      fontSize: "14px",
                      marginTop: "5px",
                    }}
                  >
                    {errors.delivery_location}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                  placeholder="e.g., +254712345678 or 0712345678"
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: errors.phone_number
                      ? "2px solid #e74c3c"
                      : "2px solid #e1e5e9",
                    borderRadius: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                />
                {errors.phone_number && (
                  <div
                    style={{
                      color: "#e74c3c",
                      fontSize: "14px",
                      marginTop: "5px",
                    }}
                  >
                    {errors.phone_number}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Payment Method
                </label>
                <div
                  style={{
                    padding: "15px",
                    border: "2px solid #e1e5e9",
                    borderRadius: "8px",
                    background: "#f8f9fa",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="radio"
                      id="mpesa"
                      name="payment_method"
                      value="mpesa"
                      checked={formData.payment_method === "mpesa"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          payment_method: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="mpesa" style={{ fontWeight: "500" }}>
                      M-Pesa Payment
                    </label>
                  </div>
                  <p
                    style={{
                      margin: "10px 0 0 25px",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    You'll receive M-Pesa payment instructions after placing
                    your order
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                style={{
                  width: "100%",
                  padding: "15px",
                  background: loading || cart.length === 0 ? "#ccc" : "#2d8f5f",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor:
                    loading || cart.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              height: "fit-content",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ margin: 0 }}>Order Summary</h3>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              >
                <option value="KES">KES</option>
                <option value="USD">USD</option>
              </select>
            </div>

            {cart.length === 0 ? (
              <p
                style={{ color: "#666", textAlign: "center", margin: "40px 0" }}
              >
                Your cart is empty
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "500" }}>{item.name}</div>
                      <div style={{ fontSize: "14px", color: "#666" }}>
                        Qty: {item.quantity} ×{" "}
                        {formatPrice(item.price_kes, item.price_usd)}
                      </div>
                    </div>
                    <div style={{ fontWeight: "600" }}>
                      {formatPrice(
                        item.price_kes * item.quantity,
                        item.price_usd * item.quantity,
                      )}
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "20px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <span>Total:</span>
                  <span style={{ color: "#2d8f5f" }}>
                    {currency} {getCartTotal().toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
