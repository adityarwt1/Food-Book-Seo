import connectDB from "@/lib/db";
import { Recipe } from "@/models";
import React from "react";

const page = async () => {
  try {
    await connectDB();

    const update = await Recipe.updateMany(
      {
        author: "aditya_rwt",
      },
      {
        $set: {
          author: "adityarawatnew2487@gmail.com",
        },
      }
    );

    console.log("Updated documents:", update);
  } catch (error) {
    console.log("Error while updating the author:", error);
  }

  return <div></div>;
};

export default page;
