import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Recipe } from "@/models";

// // POST a new recipe
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Check if user is authenticated
    const { formData, email, imageUrl } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create the recipe
    const recipe = await Recipe.create({
      ...formData,
      email,
      image: imageUrl,
      author: email,
    });
    await recipe.save();
    if (!recipe) {
      return NextResponse.json(
        { success: false, error: "Error while saving the recipie" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, error: "Recepi saved successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create recipe", details: error.message },
      { status: 500 }
    );
  }
}
