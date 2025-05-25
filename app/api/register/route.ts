import { type NextRequest, NextResponse } from "next/server";
import { User } from "@/models";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Remove password from response
    const tokenPayload = {
      id: user?._id,
      name: user?.name,
      email: user?.email,
      profileImage: user?.profileImage,
    };

    try {
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
        issuer: "Aditya Rawat",
      });

      (await cookies()).set("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60,
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
        path: "/",
      });
    } catch (error) {
      console.log("unable to save to cookies", error);
    }

    return NextResponse.json(
      { message: "User registered successfully", user: user },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("error while registering the user", error);
    return NextResponse.json(
      { error: "Registration failed", details: error.message },
      { status: 500 }
    );
  }
}
