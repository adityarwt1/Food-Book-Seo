import { getUserInfo } from "@/action/my-action";
import AddRecipePage from "@/components/AddRecipePage";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const { email, name } = await getUserInfo();

  return (
    <>
      <AddRecipePage email={email} name={name} />
    </>
  );
};

export default page;
