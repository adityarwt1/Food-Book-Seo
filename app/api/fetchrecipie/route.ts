import connectDB from "@/lib/db";
import { Recipe } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get("query");
        const category = searchParams.get("category");
        const id = searchParams.get("id");
        const username = searchParams.get("author");

        // Build filter dynamically
        const filter: any = {};

        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { slug: { $regex: query, $options: "i" } },
            ];
        }

        if (category) {
            filter.category = category;
        }

        if (id) {
            filter._id = id;
        }

        if (username) {
            filter.author = username;
        }

        // Fetch recipes (filtered or all)
        const recipes = await Recipe.find(filter);

        return NextResponse.json({ success: true, recipes }, { status: 200 });

    } catch (error) {
        console.error("Error fetching recipes:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
