import Link from "next/link"
import { Clock, Users, ChevronLeft, Bookmark, Share2, ThumbsUp } from "lucide-react"
import connectDB from "@/lib/db";
import { Recipe } from "@/models";
import Image from "next/image";

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params;

  await connectDB()
  const recipe = await Recipe.findOne({ _id: id })
  
  if (recipe.length >0) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 h-screen">
        <div className="max-w-4xl mx-auto animate-pulse">
          {/* Back Button Placeholder */}
          <div className="inline-flex items-center text-gray-300 mb-6 space-x-2">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* Recipe Header Skeleton */}
          <div className="mb-8">
            <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-6"></div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="px-3 py-1 bg-gray-300 rounded-full w-24 h-6"></div>
            </div>

            <div className="flex gap-3">
              <div className="h-10 bg-gray-300 rounded w-32"></div>
              <div className="h-10 bg-gray-300 rounded w-24"></div>
              <div className="h-10 bg-gray-300 rounded w-24"></div>
            </div>
          </div>

          {/* Recipe Image Skeleton */}
          <div className="h-80 bg-gray-300 rounded-xl mb-8 "></div>

          {/* Ingredients and Instructions Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <ul className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-300 mt-1"></div>
                    <div className="w-40 h-4 bg-gray-300 rounded"></div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <ol className="space-y-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="w-full space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
else{
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/recipes" className="inline-flex items-center text-amber-500 hover:text-amber-600 mb-6">
          <ChevronLeft size={20} />
          <span>Back to recipes</span>
        </Link>

        {/* Recipe Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
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
        <div className="h-80 bg-gray-200 rounded-xl mb-8 flex items-center justify-center text-gray-400 overflow-hidden ">
          <Image width={500} height={500} src={recipe.image} alt="recie image"/>
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
  )
}
}