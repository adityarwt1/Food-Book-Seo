import { getUserInfo } from "@/action/my-action";
import AddRecipePage from "@/components/AddRecipePage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import React from "react";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;   
  if (!token) {
    redirect("/login");
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);
  const { email } = decoded as { email: string };
  if (!email) {
    redirect("/login");
  }

  return (
    <>
      <AddRecipePage email={email} />
    </>
  );
};

export default page;
