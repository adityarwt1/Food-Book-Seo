"use server";
import RecipeCard from "@/components/Recipe";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;
  const url = process.env.BASE_URL;
  const response = await fetch(`${url}/api/fetchrecipie?id=${id}`);
  const { recipes } = await response.json();
  const recipe = recipes?.[0];

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: recipe?.title || "Recipe",
    openGraph: {
      images: [recipe?.image || "/default.webp", ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const url = process.env.BASE_URL;
    if (!url) throw new Error("BASE_URL is not set");
    const response = await fetch(`${url}/api/fetchrecipie?id=${id}`);
    if (!response.ok) throw new Error("Failed to fetch recipe");
    const { recipes } = await response.json();
    const recipe = recipes?.[0];
    if (!recipe) throw new Error("Recipe not found");

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <RecipeCard recipe={recipe} key={recipe._id} />
      </div>
    );
  } catch (error) {
    // In production, this will show up in Vercel logs
    console.error("Error in /recipes/[id] page:", error);
    return (
      <div>
        <h1>Failed to load recipe</h1>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
}
