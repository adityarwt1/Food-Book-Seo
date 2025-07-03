// lib/dbConnect.js
import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "FoodBookApp2",
    });
  } catch (error) {
    console.log("Error while connection to mongo db ", error);
  }
};

export default connectDB;
