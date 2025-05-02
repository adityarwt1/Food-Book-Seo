import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { Category } from "@/models"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET all categories
export async function GET() {
  try {
    await dbConnect()

    const categories = await Category.find().sort({ name: 1 })

    return NextResponse.json(categories)
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch categories", details: error.message }, { status: 500 })
  }
}

// POST a new category (admin only)
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    // Get the current user session
    const session = await getServerSession(authOptions)

    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 401 })
    }

    const data = await request.json()

    // Create the category
    const category = await Category.create(data)

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create category", details: error.message }, { status: 500 })
  }
}
