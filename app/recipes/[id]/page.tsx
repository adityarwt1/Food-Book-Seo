"use server";
import RecipeCard from "@/components/Recipe";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const url = process.env.BASE_URL;
  const response = await fetch(`${url}/api/fetchrecipie?id=${id}`);
  const { recipes } = await response.json();
  
}
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const url = process.env.BASE_URL;
  const response = await fetch(`${url}/api/fetchrecipie?id=${id}`);
  const { recipes } = await response.json();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <RecipeCard recipe={recipes.at(0)} key={recipes.at(0)._id} />
    </div>
  );
};

export default page;
