export function ProductsTable({ products, handleEdit, handleDelete }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f8f9fa" }}>
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                borderBottom: "1px solid #eee",
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                borderBottom: "1px solid #eee",
              }}
            >
              Type
            </th>
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                borderBottom: "1px solid #eee",
              }}
            >
              Price (KES)
            </th>
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                borderBottom: "1px solid #eee",
              }}
            >
              Price (USD)
            </th>
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                borderBottom: "1px solid #eee",
              }}
            >
              Stock
            </th>
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                borderBottom: "1px solid #eee",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div>
                  <div style={{ fontWeight: "600" }}>{product.name}</div>
                  {product.description && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        marginTop: "2px",
                      }}
                    >
                      {product.description.substring(0, 50)}...
                    </div>
                  )}
                </div>
              </td>
              <td
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                }}
              >
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
              </td>
              <td
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                }}
              >
                KES {parseFloat(product.price_kes).toLocaleString()}
              </td>
              <td
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                }}
              >
                ${parseFloat(product.price_usd).toFixed(2)}
              </td>
              <td
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span
                  style={{
                    color: product.stock_quantity > 0 ? "#27ae60" : "#e74c3c",
                    fontWeight: "600",
                  }}
                >
                  {product.stock_quantity}
                </span>
              </td>
              <td
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      background: "#3498db",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
