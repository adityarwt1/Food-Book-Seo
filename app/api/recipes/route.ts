import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { Recipe } from "@/models"
import { auth } from "@clerk/nextjs/server"
import { getOrCreateUser } from "@/lib/utils/auth"

// GET all recipes or filter by query params
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const category = searchParams.get("category")
    const query = searchParams.get("query")

    // Build filter object
    const filter: any = {}

    if (userId) filter.author = userId
    if (category) filter.category = category
    if (query) {
      filter.$or = [{ title: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }]
    }

    // Get recipes with populated author and category
    const recipes = await Recipe.find(filter)
      .populate("author", "firstName lastName")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })

    return NextResponse.json(recipes)
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch recipes", details: error.message }, { status: 500 })
  }
}

// POST a new recipe
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    // Check if user is authenticated
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get or create user in our database
    const user = await getOrCreateUser()
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const data = await request.json()

    // Add the current user as the author
    data.author = user._id

    // Create the recipe
    const recipe = await Recipe.create(data)

    return NextResponse.json(recipe, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create recipe", details: error.message }, { status: 500 })
  }
}
