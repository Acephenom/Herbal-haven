export function ProductForm({
  formData,
  setFormData,
  handleSubmit,
  cancelEdit,
  editingProduct,
}) {
  return (
    <div
      style={{
        background: "#f8f9fa",
        padding: "30px",
        borderRadius: "15px",
        border: "1px solid #e1e5e9",
        marginBottom: "30px",
      }}
    >
      <h3 style={{ margin: "0 0 20px 0" }}>
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h3>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e1e5e9",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Strain Type *
            </label>
            <select
              value={formData.strain_type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  strain_type: e.target.value,
                })
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e1e5e9",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            >
              <option value="Indica">Indica</option>
              <option value="Sativa">Sativa</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Price (KES) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price_kes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price_kes: e.target.value,
                })
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e1e5e9",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Price (USD) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price_usd}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price_usd: e.target.value,
                })
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e1e5e9",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Stock Quantity
            </label>
            <input
              type="number"
              value={formData.stock_quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stock_quantity: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e1e5e9",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Image URL
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image_url: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e1e5e9",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
            }}
          >
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            rows="4"
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #e1e5e9",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              background: "#2d8f5f",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            style={{
              background: "#6c757d",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
