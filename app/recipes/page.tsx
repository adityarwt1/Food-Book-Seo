"use client"
import Link from "next/link"
import { ConstructionIcon, Filter, Search } from "lucide-react"
import Image from "next/image"
import { Suspense, useEffect, useState } from "react"
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton"
import SearchandFilter from "@/components/SearchAndFilter"
import RecipeGrid from '@/components/RecipeGrid'
import { useSearchParams } from "next/navigation"

export default function RecipesPage() {
  const searchParams = useSearchParams()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const category = searchParams.get("category")
  const query = searchParams.get("query")

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      let url = "/api/fetchrecipie?";
      
      if (category) url += `category=${category}&`;
      if (query) url += `query=${query}`;
      
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      
      if (response.ok) {
        setRecipes(data.recipes);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, [category, query])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Recipes</h1>

        <SearchandFilter />
        
        {loading ? (
          <RecipeGridSkeleton />
        ) : recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No recipes found. Try a different search.</p>
          </div>
        ) : (
          <RecipeGrid recipes={recipes} />
        )}
      </div>
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