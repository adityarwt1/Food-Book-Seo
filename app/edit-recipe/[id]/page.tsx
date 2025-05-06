"use client";

import Link from "next/link";
import {
  Clock,
  Users,
  ChevronLeft,
  Bookmark,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import connectDB from "@/lib/db";
import  Recipe  from "@/models/Recipe";


export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    await connectDB()
    const recipie = await Recipe.findOne({_id: id })
    await setRecipe(recipie)
  }
  useEffect(() => {
    fetchRecipe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-400 text-lg">Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return <div className="text-center text-red-500">Recipe not found!</div>;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/recipes"
          className="inline-flex items-center text-amber-500 hover:text-amber-600 mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back to recipes</span>
        </Link>

        {/* Recipe Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {recipe.title}
          </h1>
          <p className="text-gray-600 mb-6">{recipe.description}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={18} />
              <span>{recipe.time} mins</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={18} />
              <span>{recipe.servings} servings</span>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-600 text-sm font-medium rounded-full">
              {recipe.category}
            </span>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
              <Bookmark size={18} />
              <span>Save Recipe</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Share2 size={18} />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <ThumbsUp size={18} />
              <span>Like</span>
            </button>
          </div>
        </div>

        {/* Recipe Image */}
        <div className="h-80 bg-gray-200 rounded-xl mb-8 flex items-center justify-center text-gray-400 overflow-hidden">
          <Image
            width={500}
            height={500}
            src={recipe.image}
            alt="recipe image"
            className="object-cover rounded-xl"
          />
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex-shrink-0 mt-1"></div>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
            <ol className="space-y-6">
              {recipe.instructions.map((instruction: string, index: number) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
