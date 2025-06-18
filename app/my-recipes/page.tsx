import { getUserInfo } from "@/action/my-action";
import MyRecipie from "@/components/MyRecipie";
import React, { useEffect, useState } from "react";

const Page = async () => {
  const user = await getUserInfo();
  const { email } = user as { email: string };
  const url = process.env.BASE_URL;
  const response = await fetch(`${url}/api/fetchrecipie?author=${email}`, {
    method: "GET",
  });
  const { recipes } = await response.json();
  console.log("this is our recipies", recipes);
  return (
    <div>
      <MyRecipie email={email}  />
    </div>
  );
};

export default Page;
