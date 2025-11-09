import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const strainType = url.searchParams.get("strain_type");
    const search = url.searchParams.get("search");

    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];
    let paramCount = 0;

    if (strainType && strainType !== "all") {
      paramCount++;
      query += ` AND strain_type = $${paramCount}`;
      params.push(strainType);
    }

    if (search) {
      paramCount++;
      query += ` AND (LOWER(name) LIKE LOWER($${paramCount}) OR LOWER(description) LIKE LOWER($${paramCount}))`;
      params.push(`%${search}%`);
    }

    query += " ORDER BY created_at DESC";

    const products = await sql(query, params);
    return Response.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const {
      name,
      description,
      strain_type,
      price_kes,
      price_usd,
      image_url,
      stock_quantity,
    } = await request.json();

    if (!name || !strain_type || !price_kes || !price_usd) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO products (name, description, strain_type, price_kes, price_usd, image_url, stock_quantity)
      VALUES (${name}, ${description}, ${strain_type}, ${price_kes}, ${price_usd}, ${image_url}, ${stock_quantity || 0})
      RETURNING *
    `;

    return Response.json({ product: result[0] });
  } catch (error) {
    console.error("Error creating product:", error);
    return Response.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
