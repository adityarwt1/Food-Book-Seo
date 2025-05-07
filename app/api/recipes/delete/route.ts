import connectDB from "@/lib/db";
import { Recipe } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest) {


    try {

        await connectDB()

        const searchParams = req.nextUrl.searchParams;

        const id = searchParams.get("id");

        const recipie = await Recipe.findOneAndDelete({_id: id})

        if(!recipie){
            return NextResponse.json({success: false, messsage: "error while deleting the recipie"}, {status: 400})
        }

        return NextResponse.json({success: true, message: "Succefully deleted"}, {status: 200})

        
    } catch (error) {
            console.log(error)
            return NextResponse.json({success: false, message: "Internal Server Issue"}, {status: 500})
    }
    
}