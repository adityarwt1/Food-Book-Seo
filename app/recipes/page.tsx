import Link from "next/link"
import { ConstructionIcon, Filter, Search } from "lucide-react"
import connectDB from "@/lib/db"
import { Recipe } from "@/models"
import Image from "next/image"
import { Suspense } from "react"
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton"
import SearchandFilter from "@/components/SearchAndFilter"

export default async function RecipesPage() {
  
  await connectDB()
  const recipes = await Recipe.find({})
  console.log(recipes)
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Recipes</h1>

        {/* Search and Filter */}
       <SearchandFilter/>
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