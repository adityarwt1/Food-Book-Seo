import connectDB from "@/lib/db"
import { Recipe } from "@/models"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    try {
        await connectDB()

        const searchParams = req.nextUrl.searchParams

        const username = searchParams.get("username")

        const recipieId = searchParams.get("recipieId")

        const recipie = await Recipe.findOneAndUpdate({
            _id: recipieId
        },
            {
                $inc: {
                    likes: -1
                },
                $push:{
                    likedBy: username
                }

            }
        )
        if( !recipie){
            console.log("unable to find the recipie")
            return NextResponse.json({success: false , message: "Unable to find the recipie" }, {status: 404})
        }

        return NextResponse.json({recipie: recipie.likedBy}, {status: 200})
    } catch (error) {
        console.log("Failed to increse like", error)
        return NextResponse.json({ success: false, message: "error to save like or internal server issue" }, { status: 500 })
    }

}

export async function DELETE(req:NextRequest) {

    try {
        await connectDB()

        const searchParams = req.nextUrl.searchParams

        const username = searchParams.get("username")

        const recipieId = searchParams.get("recipieId")

        const recipie = await Recipe.findOneAndUpdate({
            _id: recipieId
        },
            {
                $inc: {
                    likes: -1
                },
                $pull:{
                    likedBy: username
                }

            }
        )
        if( !recipie){
            console.log("unable to find the recipie")
            return NextResponse.json({success: false , message: "Unable to find the recipie" }, {status: 404})
        }

        return NextResponse.json({recipie: recipie.likedBy}, {status: 200})

    } catch (error) {
        console.log("error while disliking the recipie", error)
        return NextResponse.json({message: "Internal server issue"}, {status: 500})
        
    }


    
    
}