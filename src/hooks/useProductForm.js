import { useState } from "react";

const initialFormState = {
  name: "",
  description: "",
  strain_type: "Indica",
  price_kes: "",
  price_usd: "",
  image_url: "",
  stock_quantity: "",
};

export function useProductForm(onSuccess) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price_kes: parseFloat(formData.price_kes),
          price_usd: parseFloat(formData.price_usd),
          stock_quantity: parseInt(formData.stock_quantity),
        }),
      });

      if (response.ok) {
        onSuccess();
        cancelEdit();
      } else {
        alert("Error saving product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      strain_type: product.strain_type,
      price_kes: product.price_kes.toString(),
      price_usd: product.price_usd.toString(),
      image_url: product.image_url || "",
      stock_quantity: product.stock_quantity.toString(),
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onSuccess();
      } else {
        alert("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  const cancelEdit = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setFormData(initialFormState);
  };

  return {
    showAddForm,
    setShowAddForm,
    editingProduct,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    cancelEdit,
  };
}
