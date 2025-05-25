import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide full Name"],
      maxlength: [50, "Name cannot be more than 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    profileImage: {
      type: String,
      default: "/images/default-profile.png",
    },
    bio: {
      type: String,
      maxlength: [250, "Bio cannot be more than 250 characters"],
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    password: {
      type: String,
      required: [true, "please provide the password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Create a virtual field for user's recipes
UserSchema.virtual("recipes", {
  ref: "Recipe",
  localField: "_id",
  foreignField: "author",
  justOne: false,
});

// Don't create the model if it already exists
export default mongoose.models.User || mongoose.model("User", UserSchema);
