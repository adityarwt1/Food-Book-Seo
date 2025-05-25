import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { Recipe } from "@/models"

// GET current user's recipes
export async function GET() {
  try {
    await dbConnect()

    // Check if user is authenticated
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user from our database
    const user = await getOrCreateUser()
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Find recipes by the current user
    const recipes = await Recipe.find({ author: user._id }).populate("category", "name slug").sort({ createdAt: -1 })

    return NextResponse.json(recipes)
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch user recipes", details: error.message }, { status: 500 })
  }
}
