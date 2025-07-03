import RecipeCard from "@/components/Recipe";
import connectDB from "@/lib/db";
import { Recipe } from "@/models";
import React from "react";
import { Metadata } from "next";

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    await connectDB();
    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      return {
        title: "Recipe Not Found",
        description: "The requested recipe could not be found.",
      };
    }

    const recipeTitle = recipe.title;
    const recipeDescription = recipe.description;
    const recipeImage = recipe.image;
    const recipeCategory = recipe.category;
    const cookTime = recipe.totalTime;
    const servings = recipe.servings;
    const difficulty = recipe.difficulty;

    return {
      title: `${recipeTitle} - Delicious Recipe`,
      description: `${recipeDescription} This ${difficulty.toLowerCase()} ${recipeCategory.toLowerCase()} recipe serves ${servings} and takes ${cookTime} minutes to prepare.`,
      keywords: [
        recipeTitle,
        recipeCategory,
        "recipe",
        "cooking",
        "food",
        difficulty,
        `${cookTime} minutes`,
        ...(recipe.tags || []),
      ],
      authors: [{ name: recipe.author || "Recipe Chef" }],
      openGraph: {
        title: `${recipeTitle} - Delicious Recipe`,
        description: `${recipeDescription} Perfect ${recipeCategory.toLowerCase()} recipe that's ${difficulty.toLowerCase()} to make!`,
        images: [
          {
            url: recipeImage,
            width: 1200,
            height: 630,
            alt: `${recipeTitle} - Recipe Image`,
          },
        ],
        type: "article",
        siteName: "Recipe Collection",
      },
      twitter: {
        card: "summary_large_image",
        title: `${recipeTitle} - Delicious Recipe`,
        description: `${recipeDescription} Perfect ${recipeCategory.toLowerCase()} recipe!`,
        images: [recipeImage],
      },
      robots: {
        index: recipe.published !== false,
        follow: true,
        googleBot: {
          index: recipe.published !== false,
          follow: true,
        },
      },
      alternates: {
        canonical: `/recipe/${id}`,
      },
      other: {
        // Recipe structured data for rich snippets
        "recipe:name": recipeTitle,
        "recipe:description": recipeDescription,
        "recipe:image": recipeImage,
        "recipe:prepTime": `PT${recipe.prepTime || 0}M`,
        "recipe:cookTime": `PT${recipe.cookTime || 0}M`,
        "recipe:totalTime": `PT${cookTime}M`,
        "recipe:recipeYield": servings,
        "recipe:recipeCategory": recipeCategory,
        "recipe:recipeCuisine": recipe.cuisine || "",
        "recipe:keywords": recipe.tags?.join(", ") || "",
        "recipe:author": recipe.author || "Recipe Chef",
        "recipe:datePublished": recipe.createdAt?.toISOString() || "",
        "recipe:aggregateRating": recipe.likes ? `${recipe.likes}/5` : "",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Recipe",
      description: "A delicious recipe from our collection.",
    };
  }
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();
  const recipe = await Recipe.findOne({ _id: id });

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  // Convert MongoDB document to plain object
  const plainRecipe = {
    _id: recipe._id.toString(),
    title: recipe.title,
    slug: recipe.slug,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
    image: recipe.image,
    category: recipe.category,
    author: recipe.author,
    likes: recipe.likes,
    likedBy: recipe.likedBy,
    featured: recipe.featured,
    published: recipe.published,
    tags: recipe.tags,
    createdAt: recipe.createdAt.toISOString(),
    updatedAt: recipe.updatedAt.toISOString(),
    totalTime: recipe.totalTime,
  };

  return (
    <div className="w-full h-fit flex items-center justify-center ">
      <RecipeCard recipe={plainRecipe} key={plainRecipe._id} />
    </div>
  );
}
