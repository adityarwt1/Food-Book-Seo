import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { Recipe } from "@/models"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET current user's recipes
export async function GET() {
  try {
    await dbConnect()

    // Get the current user session
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find recipes by the current user
    const recipes = await Recipe.find({ author: session.user.id })
      .populate("category", "name slug")
      .sort({ createdAt: -1 })

    return NextResponse.json(recipes)
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch user recipes", details: error.message }, { status: 500 })
  }
}
