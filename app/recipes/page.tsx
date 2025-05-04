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
    const [recipieghj, setRecipie] = useState([])

    const category = searchParams.get("category")
    const recipie = searchParams.get("recipie")

    const fetchallRecipi = async () => {
      const response = await fetch("/api/fetchrecipie", {
        method: "GET"
      })

      const data = await response.json()
      if (response.ok) {
        setRecipie(data.recipies)
      }
    }

    const fetchByCategory = async () => {
      const response = await fetch("/api/fetchrecipie", {
        method: "POST",
        headers: 
        {"Content-Type": "application/json"},
        body: JSON.stringify({category})
      })

      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setRecipie(data.recipies)
      }
    }

    useEffect(() => {
      if (!category || !recipie) {
        fetchallRecipi()
      } else if (category) {
        fetchByCategory()
      }
    }, [category, recipie])

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">All Recipes</h1>

          {/* Search and Filter */}
          <SearchandFilter />
          
          {/* Recipe Grid with Suspense */}
          <Suspense fallback={<RecipeGridSkeleton />}>
            <RecipeGrid recipes={recipieghj} />
          </Suspense>
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
