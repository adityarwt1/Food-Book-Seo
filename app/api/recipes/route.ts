import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { Recipe } from "@/models"
import { auth } from "@clerk/nextjs/server"
import { getOrCreateUser } from "@/lib/utils/auth"

// GET all recipes or filter by query params
// export async function GET(request: NextRequest) {
//   try {
//     await dbConnect()

//     const { searchParams } = new URL(request.url)
//     const userId = searchParams.get("userId")
//     const category = searchParams.get("category")
//     const query = searchParams.get("query")

//     // Build filter object
//     const filter: any = {}

//     if (userId) filter.author = userId
//     if (category) filter.category = category
//     if (query) {
//       filter.$or = [{ title: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }]
//     }

//     // Get recipes with populated author and category
//     const recipes = await Recipe.find(filter)
//       .populate("author", "firstName lastName")
//       .populate("category", "name slug")
//       .sort({ createdAt: -1 })

//     return NextResponse.json(recipes)
//   } catch (error: any) {
//     return NextResponse.json({ error: "Failed to fetch recipes", details: error.message }, { status: 500 })
//   }
// }

// // POST a new recipe
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    // Check if user is authenticated
    const {formData , userId , username , imageUrl} = await request.json()
    if (!username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    // Create the recipe
    const recipe = await Recipe.create({...formData, username, image: imageUrl, author: username});
    recipe.save()
    if (!recipe){
      return NextResponse.json({success: false , error: "Error while saving the recipie"}, {status: 401})
    }

    return NextResponse.json({success: true, error: "Recepi saved successfully"}, { status: 201 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: "Failed to create recipe", details: error.message }, { status: 500 })
  }
}
