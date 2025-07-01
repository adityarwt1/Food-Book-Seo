"use server";
import { getUserInfo } from "@/action/my-action";
import MyRecipie from "@/components/MyRecipie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import { Recipe } from "@/models";

const Page = async () => {
  try {
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

    await connectDB();
    const recipes = await Recipe.find({ email });

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
