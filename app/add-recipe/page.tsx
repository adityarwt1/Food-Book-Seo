"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Minus, Upload } from "lucide-react"
import { addRecipe, getCategories } from "@/app/actions/recipe-actions"
import { useSession } from "next-auth/react"

type Category = {
  _id: string
  name: string
  slug: string
}

export default function AddRecipePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [categories, setCategories] = useState<Category[]>([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: "Medium",
    ingredients: [""],
    instructions: [""],
    tags: [""],
  })

  // Fetch categories on component mount
  useEffect(() => {
    async function loadCategories() {
      const result = await getCategories()
      if (result.success) {
        setCategories(result.categories)
      }
    }

    loadCategories()

    // Redirect if not logged in
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/add-recipe")
    }
  }, [status, router])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle ingredient changes
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }))
  }

  // Add a new ingredient field
  const addIngredient = () => {
    setFormData((prev) => ({ ...prev, ingredients: [...prev.ingredients, ""] }))
  }

  // Remove an ingredient field
  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = [...formData.ingredients]
      newIngredients.splice(index, 1)
      setFormData((prev) => ({ ...prev, ingredients: newIngredients }))
    }
  }

  // Handle instruction changes
  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...formData.instructions]
    newInstructions[index] = value
    setFormData((prev) => ({ ...prev, instructions: newInstructions }))
  }

  // Add a new instruction field
  const addInstruction = () => {
    setFormData((prev) => ({ ...prev, instructions: [...prev.instructions, ""] }))
  }

  // Remove an instruction field
  const removeInstruction = (index: number) => {
    if (formData.instructions.length > 1) {
      const newInstructions = [...formData.instructions]
      newInstructions.splice(index, 1)
      setFormData((prev) => ({ ...prev, instructions: newInstructions }))
    }
  }

  // Handle tag changes
  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags]
    newTags[index] = value
    setFormData((prev) => ({ ...prev, tags: newTags }))
  }

  // Add a new tag field
  const addTag = () => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, ""] }))
  }

  // Remove a tag field
  const removeTag = (index: number) => {
    if (formData.tags.length > 1) {
      const newTags = [...formData.tags]
      newTags.splice(index, 1)
      setFormData((prev) => ({ ...prev, tags: newTags }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Filter out empty ingredients, instructions, and tags
      const cleanedData = {
        ...formData,
        ingredients: formData.ingredients.filter((item) => item.trim() !== ""),
        instructions: formData.instructions.filter((item) => item.trim() !== ""),
        tags: formData.tags.filter((item) => item.trim() !== ""),
      }

      const result = await addRecipe(cleanedData)

      if (result.success) {
        setSuccess(result.message || "Recipe added successfully!")
        // Redirect to the recipe page
        if (result.recipeId) {
          setTimeout(() => {
            router.push(`/recipes/${result.recipeId}`)
          }, 1500)
        } else {
          setTimeout(() => {
            router.push("/my-recipes")
          }, 1500)
        }
      } else {
        setError(result.error || "Failed to add recipe")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Recipe</h1>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">{error}</div>}

        {success && <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipe Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter recipe title"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Briefly describe your recipe"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-1">
                    Servings
                  </label>
                  <input
                    type="number"
                    id="servings"
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Number of servings"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time (minutes)
                  </label>
                  <input
                    type="number"
                    id="prepTime"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Preparation time"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Cook Time (minutes)
                  </label>
                  <input
                    type="number"
                    id="cookTime"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Cooking time"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recipe Image */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recipe Image</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Drag and drop an image here, or click to select a file</p>
                <p className="text-xs text-gray-400 mb-4">PNG, JPG or JPEG (max. 5MB)</p>
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  Select Image
                </button>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={`Ingredient ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    disabled={formData.ingredients.length === 1}
                    className={`p-2 rounded-md ${
                      formData.ingredients.length === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-red-50 text-red-500 hover:bg-red-100"
                    }`}
                  >
                    <Minus size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-1 text-amber-500 hover:text-amber-600 font-medium"
              >
                <Plus size={18} />
                <span>Add Ingredient</span>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
            <div className="space-y-4">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={instruction}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder={`Step ${index + 1}`}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    disabled={formData.instructions.length === 1}
                    className={`p-2 rounded-md ${
                      formData.instructions.length === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-red-50 text-red-500 hover:bg-red-100"
                    }`}
                  >
                    <Minus size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addInstruction}
                className="flex items-center gap-1 text-amber-500 hover:text-amber-600 font-medium"
              >
                <Plus size={18} />
                <span>Add Step</span>
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
            <div className="space-y-3">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={`Tag ${index + 1} (e.g., vegan, spicy, dessert)`}
                  />
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    disabled={formData.tags.length === 1}
                    className={`p-2 rounded-md ${
                      formData.tags.length === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-red-50 text-red-500 hover:bg-red-100"
                    }`}
                  >
                    <Minus size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTag}
                className="flex items-center gap-1 text-amber-500 hover:text-amber-600 font-medium"
              >
                <Plus size={18} />
                <span>Add Tag</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-3 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600 transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Saving..." : "Save Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
