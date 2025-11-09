import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Update the current user to admin role
    const result = await sql`
      UPDATE auth_users 
      SET role = 'admin' 
      WHERE id = ${userId} 
      RETURNING id, name, email, role
    `;

    if (result.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({
      message: "Successfully promoted to admin",
      user: result[0],
    });
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    return Response.json(
      { error: "Failed to promote user to admin" },
      { status: 500 },
    );
  }
}
