"use client";

export const fetchRecipeByAuthor = async (email: string) => {
  const response = await fetch(`/api/fetchrecipie?author=${email}`);
  return response;
};
