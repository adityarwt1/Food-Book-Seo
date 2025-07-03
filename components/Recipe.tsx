"use client";
import { Share } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { FiClock, FiUsers, FiBarChart2, FiHeart } from "react-icons/fi";

interface Recipe {
  recipe: {
    _id: string;
    author: string;
    title: string;
    category: string;
    image: string;
    totalTime: string;
    servings: string;
    difficulty: string;
    description: string;
    ingredients: [string];
    instructions: [string];
    likes: string;
    createdAt: string;
  };
}

const RecipeCard: React.FC<Recipe> = ({ recipe }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(parseInt(recipe.likes) || 0);

  const hadnleLiike = async () => {
    try {
      if (!liked) {
        setLikes((prev) => prev + 1);
        setLiked(true);
        await fetch(
          `/api/recipes/like?username=${recipe?.author}&recipieId=${recipe?._id}`,
          { method: "POST" }
        );
      } else {
        setLikes((prev) => Math.max(0, prev - 1));
        setLiked(false);
        await fetch(
          `/api/recipes/like?username=${recipe?.author}&recipieId=${recipe?._id}`,
          { method: "DELETE" }
        );
      }
    } catch (error) {
      // Revert state on error
      if (liked) {
        setLikes((prev) => prev + 1);
        setLiked(false);
      } else {
        setLikes((prev) => Math.max(0, prev - 1));
        setLiked(true);
      }
      console.log("error while liking", error);
    }
  };
  const handleShare = () => {
    if (typeof window !== "undefined") {
      const message = encodeURIComponent("Check out this awesome recipe!");
      const url = encodeURIComponent(window.location.href);
      const whatsappUrl = `https://api.whatsapp.com/send?text=${message}%20${url}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 rounded-xl overflow-hidden shadow-lg bg-white w-full md:mx-4 sm:mx-2">
      {/* Header with Image */}
      <div className="bg-amber-500 p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <h2 className="text-white text-xl sm:text-2xl font-bold text-center sm:text-left">
          {recipe.title}
        </h2>
        <div className="flex items-center gap-2">
          <span className="bg-white text-amber-500 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
            {recipe.category}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center text-white hover:text-amber-100 transition-colors"
            aria-label="Share recipe"
          >
            <Share className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="ml-1 hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Recipe Image */}
      <div className="w-full h-48 sm:h-64 md:h-80 bg-amber-50 flex items-center justify-center overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={800}
          height={600}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Meta Info */}
      <div className="px-4 sm:px-6 py-3 flex flex-wrap justify-between gap-2 border-b">
        <div className="flex items-center text-gray-700 text-sm sm:text-base">
          <FiClock className="mr-2 text-amber-500 min-w-[16px]" />
          <span>{recipe.totalTime} mins</span>
        </div>
        <div className="flex items-center text-gray-700 text-sm sm:text-base">
          <FiUsers className="mr-2 text-amber-500 min-w-[16px]" />
          <span>{recipe.servings} servings</span>
        </div>
        <div className="flex items-center text-gray-700 text-sm sm:text-base">
          <FiBarChart2 className="mr-2 text-amber-500 min-w-[16px]" />
          <span>{recipe.difficulty}</span>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 sm:px-6 py-4">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {recipe.description}
        </p>
      </div>

      {/* Ingredients */}
      <div className="px-4 sm:px-6 py-3">
        <h3 className="font-semibold text-lg text-amber-500 mb-2">
          Ingredients
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="pl-2 -indent-2">
              <span className="pl-2">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="px-4 sm:px-6 py-3">
        <h3 className="font-semibold text-lg text-amber-500 mb-2">
          Instructions
        </h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm sm:text-base">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="pl-2 -indent-4">
              <span className="pl-4">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-2 border-t">
        <div className="flex items-center">
          <button
            className="flex items-center text-amber-500 hover:text-amber-600 transition-colors"
            aria-label="Like recipe"
            onClick={hadnleLiike}
          >
            <FiHeart className="mr-1" />
            <span>{likes} Likes</span>
          </button>
        </div>
        <div className="text-xs sm:text-sm text-gray-500">
          Posted on {new Date(recipe.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
