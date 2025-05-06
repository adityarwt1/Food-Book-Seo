// app/api/recipes/[id]/route.ts
import connectDB from "@/lib/db";
import { Recipe } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = await params;
    const formData = await req.json();

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: id },
      { ...formData },
      { new: true } // Return the updated document
    );

    if (!updatedRecipe) {
      return NextResponse.json(
        { success: false, message: "Recipe not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Successfully updated", data: updatedRecipe },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while trying to edit the recipe:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}