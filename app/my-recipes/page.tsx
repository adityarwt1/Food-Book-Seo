"use client";
import { getUserInfo } from "@/action/my-action";
import MyRecipie from "@/components/MyRecipie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}
const Page = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const fetchUserInfo = async () => {
    try {
      const user = await getUserInfo();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail((user as User).email);
    } catch (error) {
      console.log("error in my recipes", error);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div>
      <MyRecipie email={email} />
    </div>
  );
};

export default Page;
