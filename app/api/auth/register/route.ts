import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { User } from "@/models"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    })

    // Remove password from response
    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      email: user.email,
    }

    return NextResponse.json({ message: "User registered successfully", user: userWithoutPassword }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: "Registration failed", details: error.message }, { status: 500 })
  }
}
