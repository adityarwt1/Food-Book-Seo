import connectDB from "@/lib/db";
import { Recipe } from "@/models";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    
try {
    await connectDB()

    const recipies = await Recipe.find({})
    if ( !recipies){
        return NextResponse.json({success: false, error: "No one recipie found"}, {status: 404})
    }
    return NextResponse.json({recipies}, {status: 200})

} catch (error) {
        console.log("Error while connecting ")
        return NextResponse.json({success: false , message : "Internal Server Issue"}, {status: 500})
}
}

export async function POST(req: NextRequest) {

    try{
        await connectDB()
        const {category} = await req.json();
        console.log(category)

        if (!category){
            return NextResponse.json({success: false , message : "Bad request"}, {status: 400 })
        }

        const recipies = await Recipe.find({category : category})
        if (!recipies){
            return NextResponse.json({success: false , message: "No one recipie found according to the category"}, {status: 404})
        }

        return NextResponse.json({recipies} ,{status: 200} )

    }
    catch (error) {
        console.log(error)
        return NextResponse.json({success: false , message: "Internal Server issue"}, {status: 500})
    }
}




