"use client"
import { Filter, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchandFilter = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get("query") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")
  
  const categories = [
    { _id: "1", name: "Appetizers & Starters", slug: "appetizers-starters" },
    { _id: "2", name: "Soups & Stews", slug: "soups-stews" },
    { _id: "3", name: "Salads", slug: "salads" },
    { _id: "4", name: "Main Dishes", slug: "main-dishes" },
    { _id: "5", name: "Side Dishes", slug: "side-dishes" },
    { _id: "6", name: "Desserts", slug: "desserts" },
    { _id: "7", name: "Snacks", slug: "snacks" },
    { _id: "8", name: "Beverages", slug: "beverages" },
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams()
      
      if (query) params.set("query", query)
      else params.delete("query")
      
      if (category) params.set("category", category)
      else params.delete("category")
    if (category == "all"){
      params.delete("category")
    }
      
      router.push(`?${params.toString()}`)
    }, 500)

    return () => clearTimeout(timeout)
  }, [query, category, router])

  return (
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <button 
            onClick={() => {
              setQuery("");
              setCategory("");
            }}
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
          >
            <Filter size={18} />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchandFilter