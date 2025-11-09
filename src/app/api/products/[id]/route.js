import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await sql`SELECT * FROM products WHERE id = ${id}`;

    if (result.length === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ product: result[0] });
  } catch (error) {
    console.error("Error fetching product:", error);
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      name,
      description,
      strain_type,
      price_kes,
      price_usd,
      image_url,
      stock_quantity,
    } = body;

    const setClauses = [];
    const values = [];
    let paramCount = 0;

    if (name !== undefined) {
      paramCount++;
      setClauses.push(`name = $${paramCount}`);
      values.push(name);
    }

    if (description !== undefined) {
      paramCount++;
      setClauses.push(`description = $${paramCount}`);
      values.push(description);
    }

    if (strain_type !== undefined) {
      paramCount++;
      setClauses.push(`strain_type = $${paramCount}`);
      values.push(strain_type);
    }

    if (price_kes !== undefined) {
      paramCount++;
      setClauses.push(`price_kes = $${paramCount}`);
      values.push(price_kes);
    }

    if (price_usd !== undefined) {
      paramCount++;
      setClauses.push(`price_usd = $${paramCount}`);
      values.push(price_usd);
    }

    if (image_url !== undefined) {
      paramCount++;
      setClauses.push(`image_url = $${paramCount}`);
      values.push(image_url);
    }

    if (stock_quantity !== undefined) {
      paramCount++;
      setClauses.push(`stock_quantity = $${paramCount}`);
      values.push(stock_quantity);
    }

    if (setClauses.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    paramCount++;
    setClauses.push(`updated_at = CURRENT_TIMESTAMP`);

    const query = `UPDATE products SET ${setClauses.join(", ")} WHERE id = $${paramCount} RETURNING *`;
    values.push(id);

    const result = await sql(query, values);

    if (result.length === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ product: result[0] });
  } catch (error) {
    console.error("Error updating product:", error);
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await sql`DELETE FROM products WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return Response.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
