import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [strainFilter, setStrainFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [currency, setCurrency] = useState("KES");

  useEffect(() => {
    fetchProducts();
    if (user) {
      fetchUserProfile();
    }
    // Load cart from localStorage
    const savedCart = localStorage.getItem("herbal_haven_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [user, strainFilter, searchTerm]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("herbal_haven_cart", JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (strainFilter !== "all") params.append("strain_type", strainFilter);
      if (searchTerm) params.append("search", searchTerm);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.user);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

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

  if (userLoading || loading) {
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
            flexWrap: "wrap",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: 0,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            🌿 Herbal Haven
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                background: "white",
                color: "#333",
              }}
            >
              <option value="KES">KES</option>
              <option value="USD">USD</option>
            </select>

            {user ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <span>Welcome, {user.name || user.email}</span>
                {userProfile?.role === "admin" && (
                  <a
                    href="/admin"
                    style={{
                      background: "#ff6b35",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    Admin Panel
                  </a>
                )}
                <a
                  href="/account"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    padding: "8px 16px",
                    border: "1px solid white",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  My Account
                </a>
                <button
                  onClick={() => setShowCart(!showCart)}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cart ({cart.length})
                </button>
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
            ) : (
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href="/account/signin"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    padding: "8px 16px",
                    border: "1px solid white",
                    borderRadius: "6px",
                  }}
                >
                  Sign In
                </a>
                <a
                  href="/account/signup"
                  style={{
                    background: "white",
                    color: "#2d8f5f",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontWeight: "600",
                  }}
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}
      >
        {/* Filters */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ margin: "0 0 20px 0", color: "#333" }}>
            Find Your Perfect Strain
          </h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: "200px",
                padding: "12px 15px",
                border: "2px solid #e1e5e9",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            />

            <select
              value={strainFilter}
              onChange={(e) => setStrainFilter(e.target.value)}
              style={{
                padding: "12px 15px",
                border: "2px solid #e1e5e9",
                borderRadius: "8px",
                fontSize: "16px",
                minWidth: "150px",
              }}
            >
              <option value="all">All Strains</option>
              <option value="Indica">Indica</option>
              <option value="Sativa">Sativa</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "25px",
            marginBottom: "40px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: "white",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <h3 style={{ margin: 0, color: "#333", fontSize: "20px" }}>
                    {product.name}
                  </h3>
                  <span
                    style={{
                      background:
                        product.strain_type === "Indica"
                          ? "#8e44ad"
                          : product.strain_type === "Sativa"
                            ? "#e74c3c"
                            : "#f39c12",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {product.strain_type}
                  </span>
                </div>

                <p
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    margin: "10px 0",
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "15px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#2d8f5f",
                    }}
                  >
                    {formatPrice(product.price_kes, product.price_usd)}
                  </span>

                  {user && (
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        background: "#2d8f5f",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>

                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "12px",
                    color: product.stock_quantity > 0 ? "#27ae60" : "#e74c3c",
                  }}
                >
                  {product.stock_quantity > 0
                    ? `${product.stock_quantity} in stock`
                    : "Out of stock"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "white",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#666", margin: 0 }}>No products found</h3>
            <p style={{ color: "#999", margin: "10px 0 0 0" }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "400px",
            height: "100vh",
            background: "white",
            boxShadow: "-5px 0 15px rgba(0,0,0,0.1)",
            zIndex: 1000,
            padding: "20px",
            overflowY: "auto",
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
            <h3 style={{ margin: 0 }}>Shopping Cart</h3>
            <button
              onClick={() => setShowCart(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <p
              style={{ color: "#666", textAlign: "center", marginTop: "40px" }}
            >
              Your cart is empty
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "15px",
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
                  <p
                    style={{
                      margin: "0 0 10px 0",
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    {formatPrice(item.price_kes, item.price_usd)} each
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity - 1)
                      }
                      style={{
                        background: "#ddd",
                        border: "none",
                        width: "30px",
                        height: "30px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity + 1)
                      }
                      style={{
                        background: "#ddd",
                        border: "none",
                        width: "30px",
                        height: "30px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: "#e74c3c",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginLeft: "auto",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div
                style={{
                  borderTop: "2px solid #eee",
                  paddingTop: "15px",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  <span>Total:</span>
                  <span>
                    {currency} {getCartTotal().toLocaleString()}
                  </span>
                </div>

                <a
                  href="/checkout"
                  style={{
                    display: "block",
                    background: "#2d8f5f",
                    color: "white",
                    textAlign: "center",
                    padding: "15px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Proceed to Checkout
                </a>
              </div>
            </>
          )}
        </div>
      )}

      {/* Overlay */}
      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
}

export default MainComponent;
