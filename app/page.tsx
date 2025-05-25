"use client";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingSkeleton from "@/components/LoadingSkeleton";
interface Recipe {
  _id: string;
  image: string;
  category: string;
  time: string;
  title: string;
  description: string
}
export default function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const recipefetch = async () => {
    try {
      const response = await fetch("/api/fetchrecipie", {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) setFeaturedRecipes(data.recipes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    recipefetch();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover & Share{" "}
            <span className="text-amber-500">Amazing Recipes</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your personal cookbook in the cloud. Save your favorite recipes,
            discover new ones, and share with friends and family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recipes"
              className="w-full sm:w-auto px-8 py-3 bg-amber-500 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors"
            >
              Browse Recipes <ArrowRight size={18} />
            </Link>
            <Link
              href="/add-recipe"
              className="w-full sm:w-auto px-8 py-3 bg-white text-amber-500 border border-amber-500 rounded-full font-medium hover:bg-amber-50 transition-colors"
            >
              Add Your Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/recipes?category=${category.slug}`}
                className="bg-gray-50 rounded-xl p-5 text-center hover:shadow-md transition-shadow group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <UtensilsCrossed className="text-amber-500" size={24} />
                </div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 px-4 sm:px-6 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Featured Recipes
            </h2>
            <Link
              href="/recipes"
              className="text-amber-500 font-medium flex items-center gap-1 hover:text-amber-600 transition-colors"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRecipes.slice(3, 6).map((recipe: Recipe) => (
                <Link
                  key={recipe._id}
                  href={`/recipes/${recipe._id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-48 sm:h-52 md:h-56 bg-gray-200 relative">
                    <Image
                      src={recipe.image || `/rajma-chawal-1.jpg`}
                      alt="Recipe image"
                      width={500}
                      height={500}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-3 py-1 bg-amber-100 text-amber-600 text-xs font-medium rounded-full">
                        {recipe.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {recipe.time} mins
                      </span>
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const categories = [
  { id: 1, name: "Breakfast", count: 24, slug: "breakfast" },
  { id: 2, name: "Main Dishes", count: 36, slug: "main-dishes" },
  { id: 3, name: "Desserts", count: 18, slug: "desserts" },
  { id: 4, name: "Vegetarian", count: 12, slug: "vegetarian" },
];
