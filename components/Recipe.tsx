"use client";
import { Share } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { FiClock, FiUsers, FiBarChart2, FiHeart } from "react-icons/fi";

interface Recipe {
  recipe: {
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
const handleShare = () => {
  const message = encodeURIComponent("Check out this awesome site!");
  const url = encodeURIComponent(window.location.href);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${message}%20${url}`;
  window.open(whatsappUrl, "_blank");
};
const RecipeCard: React.FC<Recipe> = ({ recipe }) => {
  return (
    <div className=" mx-10 rounded-xl overflow-hidden shadow-lg bg-white w-full">
      {/* Header with Image */}
      <div className="bg-amber-500 p-4 flex justify-between items-center">
        <h2 className="text-white text-2xl font-bold">{recipe.title}</h2>
        <div className="flex justify-center items-center ">
          <span className="bg-white text-amber-500 px-3 py-1 rounded-full text-sm font-semibold">
            {recipe.category}
          </span>
          <button onClick={handleShare} className="flex text-white mx-2">
            <Share /> Share
          </button>
        </div>
      </div>

      {/* Recipe Image */}
      <div className="h-fit bg-amber-50 flex items-center justify-center">
        <Image src={recipe.image} alt={recipe.title} width={200} height={200} />
      </div>

      {/* Meta Info */}
      <div className="px-6 py-4 flex justify-between border-b">
        <div className="flex items-center text-gray-700">
          <FiClock className="mr-2 text-amber-500" />
          <span>{recipe.totalTime} mins</span>
        </div>
        <div className="flex items-center text-gray-700">
          <FiUsers className="mr-2 text-amber-500" />
          <span>{recipe.servings} servings</span>
        </div>
        <div className="flex items-center text-gray-700">
          <FiBarChart2 className="mr-2 text-amber-500" />
          <span>{recipe.difficulty}</span>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">{recipe.description}</p>
      </div>

      {/* Ingredients */}
      <div className="px-6 py-2">
        <h3 className="font-semibold text-lg text-amber-500 mb-2">
          Ingredients
        </h3>
        <ul className="list-disc list-inside text-gray-700">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="mb-1">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="px-6 py-2">
        <h3 className="font-semibold text-lg text-amber-500 mb-2">
          Instructions
        </h3>
        <ol className="list-decimal list-inside text-gray-700">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="mb-2">
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 flex justify-between items-center border-t">
        <div className="flex items-center">
          <button className="flex items-center text-amber-500 hover:text-amber-600">
            <FiHeart className="mr-1" />
            <span>{recipe.likes} Likes</span>
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {new Date(recipe.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
export default RecipeCard;
