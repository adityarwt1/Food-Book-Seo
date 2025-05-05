import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Featured from '@/models/FeatruredRecipie'

export async function POST(request: NextRequest) {
    try {
      await connectDB()
  
      // Check if user is authenticated
      const {formData , userId , username , imageUrl} = await request.json()
      console.log(formData , userId , username )
      if (!username) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      
      // Create the recipe
      const recipe = await Featured.create({...formData, username, image: imageUrl, author: username});
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
  