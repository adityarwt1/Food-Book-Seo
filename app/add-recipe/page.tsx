import { getUserInfo } from "@/action/my-action";
import AddRecipePage from "@/components/AddRecipePage";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUserInfo();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <AddRecipePage email={user?.email} />
    </>
  );
};

export default page;
