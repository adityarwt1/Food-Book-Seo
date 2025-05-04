import Link from "next/link"
import { Filter, Search } from "lucide-react"
import connectDB from "@/lib/db"
import { Recipe } from "@/models"
import Image from "next/image"
import { Suspense } from "react"
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton"

export default async function RecipesPage() {
  await connectDB()
  const recipes = await Recipe.find({})

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Recipes</h1>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search recipes..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                <option value="">All Categories</option>
                <option value="breakfast">Breakfast</option>
                <option value="main-course">Main Course</option>
                <option value="desserts">Desserts</option>
                <option value="vegetarian">Vegetarian</option>
              </select>
              <button className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors">
                <Filter size={18} />
                <span className="hidden md:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recipe Grid with Suspense */}
        <Suspense fallback={<RecipeGridSkeleton />}>
          <RecipeGrid recipes={recipes} />
        </Suspense>
      </div>
    </div>
  );
}

function RecipeGrid({ recipes }: { recipes: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe) => (
        <Link
          key={recipe.id}
          href={`/recipes/${recipe.id}`}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="h-48 bg-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 overflow-hidden">
              <Image
                src={recipe.image}
                width={500}
                height={500}
                alt="Recipe image"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-600 text-xs font-medium rounded-full">
                {recipe.category}
              </span>
              <span className="text-gray-500 text-sm">
                {recipe.time} mins
              </span>
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">
              {recipe.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {recipe.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

function RecipeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  )
}