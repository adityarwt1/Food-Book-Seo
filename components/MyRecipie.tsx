"use client";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import MyRecipieSkeleton from "./MyRecipieSkeleton";

interface Username {
  email: string;
}
const MyRecipie: React.FC<Username> = ({ email }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  // Connect to the database
  const fetchRecipie = async () => {
    try {
      const response = await fetch(`/api/fetchrecipie?author=${email}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("recipies according to the user", data);
        setRecipes(data.recipes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/recipes/delete?id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchRecipie();
    }
  };

  useEffect(() => {
    fetchRecipie();
  }, []);

  if (!email) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Error loading user data
          </h1>
          <p>
            There was a problem loading your profile. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const skeletonCard = (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse w-full max-w-md mx-auto sm:max-w-full">
      <div className="h-48 bg-gray-200 w-full"></div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <div className="w-24 h-5 bg-gray-200 rounded-full"></div>
          <div className="w-12 h-4 bg-gray-200 rounded-full"></div>
        </div>
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between flex-wrap gap-2">
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Recipes
          </h1>
          <Link
            href="/add-recipe"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors text-sm sm:text-base"
          >
            <Plus size={18} />
            <span>Add New Recipe</span>
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <MyRecipieSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="h-40 sm:h-48 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 overflow-hidden">
                      <Image
                        src={recipe.image || "/rajma-chawal-1.jpg"}
                        width={500}
                        height={500}
                        alt="Image of recipe"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-amber-100 text-amber-600 text-xs font-medium rounded-full">
                          {recipe.category?.name || "Uncategorized"}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {recipe.prepTime + recipe.cookTime} mins
                        </span>
                      </div>
                      <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900 break-words">
                        {recipe.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {recipe.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-auto">
                      <Link
                        href={`/recipes/${recipe._id}`}
                        className="text-amber-500 font-medium hover:text-amber-600 text-sm"
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
                          onClick={() => handleDelete(recipe._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-full">
                You not has been added the recipies
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default MyRecipie;
