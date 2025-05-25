import { getUserInfo } from "@/action/my-action";
import MyRecipie from "@/components/MyRecipie";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const email = await getUserInfo();
  return (
    <div>
      <MyRecipie username={email} />
    </div>
  );
};

export default page;
