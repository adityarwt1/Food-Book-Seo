"use server";
import { getUserInfo } from "@/action/my-action";
import MyRecipie from "@/components/MyRecipie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import jwt from "jsonwebtoken";
const Page = async () => {
  const coookieStore = await cookies();
  const token = coookieStore.get("token")?.value || null;

  if (!token) {
    redirect("/login");
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);
  const { email } = decoded as { email: string };
  if (!email) {
    redirect("/login");
  }
  const url =
    process.env.NODE_ENV === "production"
      ? "https://food-book-vert.vercel.app"
      : "http://localhost:3000";

  try {
    const response = await fetch(`${url}/api/fetchrecipie?author=${email}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const { recipes } = await response.json();

    return (
      <div>
        <MyRecipie recipes={recipes} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return <div>Error loading recipes</div>;
  }
};

export default Page;
