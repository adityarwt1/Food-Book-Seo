"use client"
import Link from "next/link"
import { Edit, Trash2, Plus } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Username {
  username: string
}
const MyRecipie : React.FC<Username> = ({username})=> {

  const [recipes , setRecipes] = useState([])

  

  // Connect to the database
  const fetchRecipie = async ()=>{
    const response = await fetch(`/api/fetchrecipie?author=${username}`,{
      method: "GET"
    })
    const data = await response.json()
    console.log(data)
    if(response.ok){
      setRecipes(data.recipes)
    }
  }


  const handleDelete = async (id: string)=>{
    const response = await fetch(`/api/recipes/delete?id=${id}`,{
      method: "DELETE"
    })
    if( response.ok ) {
      fetchRecipie()
    }
  }

  useEffect(()=>{
    fetchRecipie()
  },[])

  if (!username) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Error loading user data</h1>
          <p>There was a problem loading your profile. Please try again later.</p>
        </div>
      </div>
    )
  }

 

  const skeletonCard = (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-24 h-5 bg-gray-200 rounded-full"></div>
          <div className="w-12 h-4 bg-gray-200 rounded-full"></div>
        </div>
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between">
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Recipes</h1>
          <Link
            href="/add-recipe"
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            <Plus size={18} />
            <span>Add New Recipe</span>
          </Link>
        </div>

        {!recipes ? (
          <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>{skeletonCard}</div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">You haven't added any recipes yet</h2>
            <p className="text-gray-500 mb-6">Start building your collection by adding your favorite recipes.</p>
            <Link
              href="/add-recipe"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
            >
              <Plus size={18} />
              <span>Add Your First Recipe</span>
            </Link>
          </div>
          </div>
        ): ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 overflow-hidden">
                  <Image src={recipe.image || "/rajma-chawal-1.jpg"} width={500} height={500} alt="Image of recipe" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-600 text-xs font-medium rounded-full">
                    {recipe.category?.name || "Uncategorized"}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {recipe.prepTime + recipe.cookTime} mins
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{recipe.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{recipe.description}</p>

                <div className="flex justify-between">
                  <Link
                    href={`/recipes/${recipe._id}`}
                    className="text-amber-500 font-medium hover:text-amber-600 transition-colors"
                  >
                    View Recipe
                  </Link>
                  <div className="flex gap-2">
                    <Link
                      href={`/edit-recipe/${recipe._id}`}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={()=> handleDelete(recipe._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
) }

      </div>
    </div>
  );
}
export default MyRecipie;