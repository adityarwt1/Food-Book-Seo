import { getUserInfo } from "@/action/my-action";
import MyRecipie from "@/components/MyRecipie";
import React, { useEffect, useState } from "react";

const Page = async () => {
  const user = await getUserInfo();
  const { email } = user as { email: string };
  return (
    <div>
      <MyRecipie email={email} />
    </div>
  );
};

export default Page;
