"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function getUserInfo() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return null;
    }

    return decoded;
  } catch (error) {}
}
