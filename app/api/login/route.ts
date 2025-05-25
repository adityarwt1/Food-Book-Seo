import connectDB from "@/lib/db";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
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

    const existingUser: existingUser | null = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User does Not exist" },
        { status: 404 }
      );
    }

    const passwordTrueorNot = bcrypt.compare(password, existingUser?.password);

    if (!passwordTrueorNot) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 401 }
      );
    }
    const tokenPayload = {
      id: existingUser?._id,
      name: existingUser?.name,
      email: existingUser?.email,
      profileImage: existingUser?.profileImage,
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
      { message: "Login Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error will login");
    return NextResponse.json(
      { message: "Internal server issue" },
      { status: 500 }
    );
  }
}
