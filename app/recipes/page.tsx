import Link from "next/link"
import { ConstructionIcon, Filter, Search } from "lucide-react"
import connectDB from "@/lib/db"
import { Recipe } from "@/models"
import Image from "next/image"
import { Suspense } from "react"
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton"
import SearchandFilter from "@/components/SearchAndFilter"
import RecipeGrid from '@/components/RecipeGrid'

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



function RecipeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  )
}