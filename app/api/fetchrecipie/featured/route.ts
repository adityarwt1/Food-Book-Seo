import connectDB from "@/lib/db";
import Featured from "@/models/FeatruredRecipie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();


        const recipes = await Featured.find({});

        if (!recipes || recipes.length === 0) {
            return NextResponse.json(
                { success: false, error: "No recipes found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ recipes }, { status: 200 });

    } catch (error) {
        console.error("Error fetching recipes:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}