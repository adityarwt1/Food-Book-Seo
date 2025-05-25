import connectDB from "@/lib/db";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface existingUser {
  name: any;
  email: any;
  profileImage: any;
  password: string;
  _id: string;
}
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    console.log({ email, password });

    const existingUser: existingUser | null = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser?.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 401 }
      );
    }

    const tokenPayload = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      profileImage: existingUser.profileImage,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
      issuer: "Aditya Rawat",
    });

    const response = NextResponse.json(
      { message: "Login Successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token);

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server issue" },
      { status: 500 }
    );
  }
}
