export const getAnalytics = (orders, products) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + parseFloat(order.total_kes || 0),
    0,
  );
  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;
  const lowStockProducts = products.filter(
    (product) => product.stock_quantity < 10,
  );

  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    lowStockProducts: lowStockProducts.length,
  };
};

export const formatPrice = (priceKes, priceUsd, currency = "KES") => {
  if (currency === "KES") {
    return `KES ${parseFloat(priceKes || 0).toLocaleString()}`;
  }
  return `$${parseFloat(priceUsd || 0).toFixed(2)}`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status) => {
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
