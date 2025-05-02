"use server"

import { revalidatePath } from "next/cache"
import dbConnect from "@/lib/db"
import { Recipe, Category } from "@/models"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Type for recipe form data
type RecipeFormData = {
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  prepTime: number
  cookTime: number
  servings: number
  difficulty: string
  category: string
  image?: string
  tags?: string[]
}

// Add a new recipe
export async function addRecipe(formData: RecipeFormData) {
  try {
    await dbConnect()

    // Get the current user session
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return { success: false, error: "You must be logged in to add a recipe" }
    }

    // Create the recipe
    const recipe = await Recipe.create({
      ...formData,
      author: session.user.id,
    })

    // Revalidate the recipes page
    revalidatePath("/recipes")
    revalidatePath("/my-recipes")

    return {
      success: true,
      message: "Recipe added successfully",
      recipeId: recipe._id,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to add recipe",
    }
  }
}

// Update an existing recipe
export async function updateRecipe(recipeId: string, formData: RecipeFormData) {
  try {
    await dbConnect()

    // Get the current user session
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return { success: false, error: "You must be logged in to update a recipe" }
    }

    // Find the recipe
    const recipe = await Recipe.findById(recipeId)

    if (!recipe) {
      return { success: false, error: "Recipe not found" }
    }

    // Check if the user is the author of the recipe
    if (recipe.author.toString() !== session.user.id) {
      return { success: false, error: "You are not authorized to update this recipe" }
    }

    // Update the recipe
    await Recipe.findByIdAndUpdate(recipeId, formData, { runValidators: true })

    // Revalidate the recipe pages
    revalidatePath(`/recipes/${recipeId}`)
    revalidatePath("/recipes")
    revalidatePath("/my-recipes")

    return { success: true, message: "Recipe updated successfully" }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to update recipe",
    }
  }
}

// Delete a recipe
export async function deleteRecipe(recipeId: string) {
  try {
    await dbConnect()

    // Get the current user session
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return { success: false, error: "You must be logged in to delete a recipe" }
    }

    // Find the recipe
    const recipe = await Recipe.findById(recipeId)

    if (!recipe) {
      return { success: false, error: "Recipe not found" }
    }

    // Check if the user is the author of the recipe or an admin
    if (recipe.author.toString() !== session.user.id && session.user.role !== "admin") {
      return { success: false, error: "You are not authorized to delete this recipe" }
    }

    // Delete the recipe
    await Recipe.findByIdAndDelete(recipeId)

    // Revalidate the recipes page
    revalidatePath("/recipes")
    revalidatePath("/my-recipes")

    return { success: true, message: "Recipe deleted successfully" }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to delete recipe",
    }
  }
}

// Get all categories
export async function getCategories() {
  try {
    await dbConnect()

    const categories = await Category.find().sort({ name: 1 })

    return { success: true, categories }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to fetch categories",
    }
  }
}
