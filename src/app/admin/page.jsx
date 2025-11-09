import { useState } from "react";
import useUser from "@/utils/useUser";
import { useAdminData } from "@/hooks/useAdminData";
import { useProductForm } from "@/hooks/useProductForm";
import { getAnalytics } from "@/utils/adminHelpers";
import { LoadingState } from "@/components/Admin/LoadingState";
import { AccessDenied } from "@/components/Admin/AccessDenied";
import { AdminHeader } from "@/components/Admin/AdminHeader";
import { AnalyticsCards } from "@/components/Admin/AnalyticsCards";
import { TabNavigation } from "@/components/Admin/TabNavigation";
import { ProductsTab } from "@/components/Admin/ProductsTab";
import { OrdersTab } from "@/components/Admin/OrdersTab";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const {
    userProfile,
    products,
    orders,
    loading,
    refetchProducts,
    refetchOrders,
  } = useAdminData(user);
  const [activeTab, setActiveTab] = useState("products");

  const {
    showAddForm,
    setShowAddForm,
    editingProduct,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    cancelEdit,
  } = useProductForm(refetchProducts);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        refetchOrders();
      } else {
        alert("Error updating order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status");
    }
  };

  if (userLoading || loading) {
    return <LoadingState />;
  }

  if (!user) {
    return (
      <AccessDenied
        message="Please sign in to access the admin panel."
        linkText="Sign In"
        linkHref="/account/signin"
      />
    );
  }

  if (userProfile?.role !== "admin") {
    return (
      <AccessDenied
        message="You don't have admin privileges."
        linkText="Back to Home"
        linkHref="/"
      />
    );
  }

  const analytics = getAnalytics(orders, products);

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <AdminHeader user={user} />

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}
      >
        <AnalyticsCards analytics={analytics} />

        <div
          style={{
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            productsCount={products.length}
            ordersCount={orders.length}
          />

          <div style={{ padding: "30px" }}>
            {activeTab === "products" && (
              <ProductsTab
                products={products}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                cancelEdit={cancelEdit}
                editingProduct={editingProduct}
              />
            )}

            {activeTab === "orders" && (
              <OrdersTab
                orders={orders}
                updateOrderStatus={updateOrderStatus}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
