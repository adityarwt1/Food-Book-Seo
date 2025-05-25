"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserInfo() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return null;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      return decoded;
    } catch (jwtError) {
      // If token is invalid, delete it and return null
      (await cookies()).delete("token");
      return null;
    }
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    return null;
  }
}

export async function logoutUser() {
  try {
    (await cookies()).delete("token");

    return true;
  } catch (error) {
    console.log("error while logout");
    return false;
  }
}
