import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const userResult = await sql`
      SELECT role FROM auth_users WHERE id = ${session.user.id}
    `;

    if (userResult.length === 0 || userResult[0].role !== "admin") {
      return Response.json({ error: "Admin access required" }, { status: 403 });
    }

    // Get all orders with order items and user details
    const orders = await sql`
      SELECT 
        o.*,
        u.name as customer_name,
        u.email as customer_email,
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price_kes', oi.price_kes,
            'price_usd', oi.price_usd,
            'product_name', p.name,
            'product_image', p.image_url
          )
        ) as items
      FROM orders o
      LEFT JOIN auth_users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      GROUP BY o.id, u.name, u.email
      ORDER BY o.created_at DESC
    `;

    return Response.json({ orders });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const userResult = await sql`
      SELECT role FROM auth_users WHERE id = ${session.user.id}
    `;

    if (userResult.length === 0 || userResult[0].role !== "admin") {
      return Response.json({ error: "Admin access required" }, { status: 403 });
    }

    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return Response.json(
        { error: "Order ID and status are required" },
        { status: 400 },
      );
    }

    const validStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    const result = await sql`
      UPDATE orders 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${orderId}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json({
      message: "Order status updated successfully",
      order: result[0],
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return Response.json(
      { error: "Failed to update order status" },
      { status: 500 },
    );
  }
}
