"use client"
import Link from "next/link"
import { ConstructionIcon, Filter, Search } from "lucide-react"
import connectDB from "@/lib/db"
import { Recipe } from "@/models"
import Image from "next/image"
import { Suspense, useState } from "react"
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton"
import SearchandFilter from "@/components/SearchAndFilter"
import RecipeGrid from '@/components/RecipeGrid'
import {  useSearchParams } from "next/navigation"

export default async function RecipesPage() {
  const searchParams = useSearchParams()
  const [recipieghj, setRecipie] = useState([])

  const category = searchParams.get("category")
  const recipie = searchParams.get("recipie")

  const fetchallRecipi = async ()=>{
    const response = await fetch("/api/fetchrecipie",{
      method: "FETCHALL"
    })

    const data  = await response.json()
    if (response.ok ) {
      setRecipie(data.recipes)
    }

  }

  if( !category || !recipie){

    fetchallRecipi()
  }

  if (category){
    const response = await fetch("/api/fetchrecipie",{
      method: "FETCHCATEGORY"
    })

    const data  = await response.json()
    if (response.ok ) {
      setRecipie(data.recipes)
    }

  }
  }
  
  

  

const recipes = [{
  "_id": {
    "$oid": "68164c1c4a56d92ccf87c8d3"
  },
  "username": "aditya_rwt1",
  "title": "RAJMA CHAWAL",
  "description": "this is the best rajma chawal you have to seen into the market.",
  "ingredients": [
    "rice",
    "masala"
  ],
  "instructions": [
    "Never cook in the high stove in the gasstove"
  ],
  "prepTime": 50,
  "cookTime": 30,
  "servings": 1,
  "difficulty": "Medium",
  "image": "",
  "category": "Side Dishes",
  "author": "aditya_rwt1",
  "featured": false,
  "published": true,
  "tags": [
    "Rajwa Chawal"
  ],
  "createdAt": {
    "$date": "2025-05-03T17:02:20.294Z"
  },
  "updatedAt": {
    "$date": "2025-05-03T17:02:20.294Z"
  },
  "slug": "rajma-chawal",
  "__v": 0
}]
  
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




function RecipeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  )
}