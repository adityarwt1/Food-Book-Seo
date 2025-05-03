import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { Recipe } from "@/models"
import { auth } from "@clerk/nextjs/server"
import { getOrCreateUser } from "@/lib/utils/auth"

// GET a single recipe by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const recipe = await Recipe.findById(params.id)
      .populate("author", "firstName lastName")
      .populate("category", "name slug")

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    return NextResponse.json(recipe)
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch recipe", details: error.message }, { status: 500 })
  }
}

// PUT (update) a recipe
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Find the recipe
    const recipe = await Recipe.findById(params.id)

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    // Check if the user is the author of the recipe
    if (recipe.author.toString() !== user._id.toString()) {
      return NextResponse.json({ error: "Not authorized to update this recipe" }, { status: 403 })
    }

    const data = await request.json()

    // Update the recipe
    const updatedRecipe = await Recipe.findByIdAndUpdate(params.id, data, { new: true, runValidators: true })

    return NextResponse.json(updatedRecipe)
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update recipe", details: error.message }, { status: 500 })
  }
}

// DELETE a recipe
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Find the recipe
    const recipe = await Recipe.findById(params.id)

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    // Check if the user is the author of the recipe or an admin
    if (recipe.author.toString() !== user._id.toString() && user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized to delete this recipe" }, { status: 403 })
    }

    // Delete the recipe
    await Recipe.findByIdAndDelete(params.id)

    return NextResponse.json({ message: "Recipe deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete recipe", details: error.message }, { status: 500 })
  }
}
