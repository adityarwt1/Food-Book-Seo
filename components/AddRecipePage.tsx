"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { Plus, Minus, Upload } from "lucide-react";
import { addRecipe, getCategories } from "@/app/actions/recipe-actions";
import { useUser } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

interface name {
  email: string;
  name: string;
}
const AddRecipePage: React.FC<name> = ({ email, name }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const [categories, setCategories] = useState<Category[]>([
    { _id: "1", name: "Appetizers & Starters", slug: "appetizers-starters" },
    { _id: "2", name: "Soups & Stews", slug: "soups-stews" },
    { _id: "3", name: "Salads", slug: "salads" },
    { _id: "4", name: "Main Dishes", slug: "main-dishes" },
    { _id: "5", name: "Side Dishes", slug: "side-dishes" },
    { _id: "6", name: "Desserts", slug: "desserts" },
    { _id: "7", name: "Snacks", slug: "snacks" },
    { _id: "8", name: "Beverages", slug: "beverages" },
  ]);

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
  });

  // Fetch categories on component mount
  useEffect(() => {
    async function loadCategories() {
      const result = await getCategories();
      if (result.success) {
        setCategories([
          {
            _id: "1",
            name: "Appetizers & Starters",
            slug: "appetizers-starters",
          },
          { _id: "2", name: "Soups & Stews", slug: "soups-stews" },
          { _id: "3", name: "Salads", slug: "salads" },
          { _id: "4", name: "Main Dishes", slug: "main-dishes" },
          { _id: "5", name: "Side Dishes", slug: "side-dishes" },
          { _id: "6", name: "Desserts", slug: "desserts" },
          { _id: "7", name: "Snacks", slug: "snacks" },
          { _id: "8", name: "Beverages", slug: "beverages" },
        ]);
      } else {
        // Fall1back categories if API fails
        setCategories([
          {
            _id: "1",
            name: "Appetizers & Starters",
            slug: "appetizers-starters",
          },
          { _id: "2", name: "Soups & Stews", slug: "soups-stews" },
          { _id: "3", name: "Salads", slug: "salads" },
          { _id: "4", name: "Main Dishes", slug: "main-dishes" },
          { _id: "5", name: "Side Dishes", slug: "side-dishes" },
          { _id: "6", name: "Desserts", slug: "desserts" },
          { _id: "7", name: "Snacks", slug: "snacks" },
          { _id: "8", name: "Beverages", slug: "beverages" },
        ]);
      }
    }

    loadCategories();
  }, []);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle ingredient changes
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  // Add a new ingredient field
  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  // Remove an ingredient field
  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = [...formData.ingredients];
      newIngredients.splice(index, 1);
      setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
    }
  };

  // Handle instruction changes
  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData((prev) => ({ ...prev, instructions: newInstructions }));
  };

  // Add a new instruction field
  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  // Remove an instruction field
  const removeInstruction = (index: number) => {
    if (formData.instructions.length > 1) {
      const newInstructions = [...formData.instructions];
      newInstructions.splice(index, 1);
      setFormData((prev) => ({ ...prev, instructions: newInstructions }));
    }
  };

  // Handle tag changes
  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  // Add a new tag field
  const addTag = () => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
  };

  // Remove a tag field
  const removeTag = (index: number) => {
    if (formData.tags.length > 1) {
      const newTags = [...formData.tags];
      newTags.splice(index, 1);
      setFormData((prev) => ({ ...prev, tags: newTags }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    console.log(formData);
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData, email, name, imageUrl }),
    });
    console.log({ formData, email, name, imageUrl });
    const data = await response.json();
    if (response.ok) {
      setSuccess(data.success);
      redirect("/my-recipes");
    }

    if (!response.ok) {
      setError(data.error);
    }

    try {
      // Filter out empty ingredients, instructions, and tags
      const cleanedData = {
        ...formData,
        ingredients: formData.ingredients.filter((item) => item.trim() !== ""),
        instructions: formData.instructions.filter(
          (item) => item.trim() !== ""
        ),
        tags: formData.tags.filter((item) => item.trim() !== ""),
      };

      const result = await addRecipe(cleanedData);

      if (result.success) {
        setSuccess(result.message || "Recipe added successfully!");
        // Redirect to the recipe page
        if (result.recipeId) {
          setTimeout(() => {
            router.push(`/recipes/${result.recipeId}`);
          }, 1500);
        } else {
          setTimeout(() => {
            router.push("/my-recipes");
          }, 1500);
        }
      } else {
        setError(result.error || "Failed to add recipe");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); /// default file reader into browser
      reader.onload = () => resolve(reader.result as string); /// resolving the file before amaking the url of the image
      reader.onerror = reject; //// this is reject when some error of currupt issue into the image file
      reader.readAsDataURL(file); ////  lastt fiel read as a url
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      console.log(file);
      const base64Image = await fileToBase64(file); /// converting here image into the url
      setImageUrl(base64Image);
      console.log(base64Image);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Add New Recipe
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-md mb-4 sm:mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 p-3 sm:p-4 rounded-md mb-4 sm:mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Basic Information
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Recipe Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter recipe title"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Briefly describe your recipe"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="servings"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Servings
                  </label>
                  <input
                    type="number"
                    id="servings"
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Number of servings"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="prepTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Prep Time (minutes)
                  </label>
                  <input
                    type="number"
                    id="prepTime"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Preparation time"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="cookTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cook Time (minutes)
                  </label>
                  <input
                    type="number"
                    id="cookTime"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Cooking time"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recipe Image */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Recipe Image
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
              <div className="flex flex-col items-center">
                {imageUrl ? (
                  <div className="mb-3 sm:mb-4">
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover w-full h-auto max-w-xs"
                    />
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-2" />
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">
                      Drag and drop an image here, or click to select a file
                    </p>
                    <p className="text-xs text-gray-400 mb-3 sm:mb-4">
                      PNG, JPG or JPEG (max. 5MB)
                    </p>
                  </>
                )}
                <label
                  htmlFor="image-upload"
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-white border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer transition-colors"
                >
                  {imageUrl ? "Change Image" : "Select Image"}
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Ingredients
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                    <Minus size={16} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-1 text-xs sm:text-sm text-amber-500 hover:text-amber-600 font-medium"
              >
                <Plus size={16} className="sm:w-4 sm:h-4" />
                <span>Add Ingredient</span>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Instructions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs sm:text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <textarea
                      value={instruction}
                      onChange={(e) =>
                        handleInstructionChange(index, e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder={`Step ${index + 1}`}
                      required
                    ></textarea>
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
                      <Minus size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addInstruction}
                className="flex items-center gap-1 text-xs sm:text-sm text-amber-500 hover:text-amber-600 font-medium"
              >
                <Plus size={16} className="sm:w-4 sm:h-4" />
                <span>Add Step</span>
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Tags
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={`Tag ${
                      index + 1
                    } (e.g., vegan, spicy, dessert)`}
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
                    <Minus size={16} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTag}
                className="flex items-center gap-1 text-xs sm:text-sm text-amber-500 hover:text-amber-600 font-medium"
              >
                <Plus size={16} className="sm:w-4 sm:h-4" />
                <span>Add Tag</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 sm:px-6 py-2 sm:py-3 bg-amber-500 text-white rounded-md text-sm sm:text-base font-medium hover:bg-amber-600 transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Saving..." : "Save Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
