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
  const { id } = params;
  const url = process.env.BASE_URL;
  const response = await fetch(`${url}/api/fetchrecipie?id=${id}`);
  const { recipes } = await response.json();
  const recipe = recipes?.[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {recipe && <RecipeCard recipe={recipe} key={recipe._id} />}
    </div>
  );
}
