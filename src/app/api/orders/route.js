import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const orders = await sql`
      SELECT o.*, 
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
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = ${userId}
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;

    return Response.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, delivery_location, phone_number, total_kes, total_usd } =
      await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return Response.json(
        { error: "Order must contain at least one item" },
        { status: 400 },
      );
    }

    if (!delivery_location || !phone_number) {
      return Response.json(
        { error: "Delivery location and phone number are required" },
        { status: 400 },
      );
    }

    const userId = session.user.id;

    // Create order and order items in a transaction
    const result = await sql.transaction([
      sql`
        INSERT INTO orders (user_id, total_kes, total_usd, delivery_location, phone_number)
        VALUES (${userId}, ${total_kes}, ${total_usd}, ${delivery_location}, ${phone_number})
        RETURNING *
      `,
      ...items.map(
        (item) => sql`
        INSERT INTO order_items (order_id, product_id, quantity, price_kes, price_usd)
        VALUES (currval('orders_id_seq'), ${item.product_id}, ${item.quantity}, ${item.price_kes}, ${item.price_usd})
      `,
      ),
    ]);

    const order = result[0][0];
    return Response.json({ order });
  } catch (error) {
    console.error("Error creating order:", error);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}
