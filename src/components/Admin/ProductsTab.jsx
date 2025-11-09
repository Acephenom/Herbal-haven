import { ProductForm } from "./ProductForm";
import { ProductsTable } from "./ProductsTable";

export function ProductsTab({
  products,
  showAddForm,
  setShowAddForm,
  formData,
  setFormData,
  handleSubmit,
  handleEdit,
  handleDelete,
  cancelEdit,
  editingProduct,
}) {
  return (
    <div>
      {/* Add Product Button */}
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            background: "#2d8f5f",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Add New Product
        </button>
      </div>

      {/* Add/Edit Product Form */}
      {showAddForm && (
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          cancelEdit={cancelEdit}
          editingProduct={editingProduct}
        />
      )}

      {/* Products Table */}
      {products.length > 0 ? (
        <ProductsTable
          products={products}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#666",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>No products found</h3>
          <p style={{ margin: 0 }}>Add your first product to get started</p>
        </div>
      )}
    </div>
  );
}
