import { getUserInfo } from "@/action/my-action";
import MyRecipie from "@/components/MyRecipie";
import React from "react";

const page = async () => {
  const { email } = await getUserInfo();
  return (
    <div>
      <MyRecipie email={email} />
    </div>
  );
};

export default page;
