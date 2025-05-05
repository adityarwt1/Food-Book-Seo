import mongoose from "mongoose"

const RecipeSchema = new mongoose.Schema(
  {
    username:{
      type: String,
    },
    title: {
      type: String,
      required: [true, "Please provide a recipe title"],
      maxlength: [100, "Title cannot be more than 100 characters"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a recipe description"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    ingredients: [
      {
        type: String,
        required: [true, "Please provide at least one ingredient"],
      },
    ],
    instructions: [
      {
        type: String,
        required: [true, "Please provide at least one instruction step"],
      },
    ],
    prepTime: {
      type: Number,
      required: [true, "Please provide preparation time"],
      min: [0, "Preparation time cannot be negative"],
    },
    cookTime: {
      type: Number,
      required: [true, "Please provide cooking time"],
      min: [0, "Cooking time cannot be negative"],
    },
    servings: {
      type: Number,
      required: [true, "Please provide number of servings"],
      min: [1, "Servings must be at least 1"],
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    image: {
      type: String,
      default: "/images/default-recipe.jpg",
    },
    category: {
      type: String,
      ref: "Category",
      required: [true, "Please provide a category"],
    },
    author: {
      type: String,
      ref: "User",
      required: [true, "Please provide an author"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Create a virtual field for total time
RecipeSchema.virtual("totalTime").get(function () {
  return this.prepTime + this.cookTime
})

// Create a virtual field for reviews
RecipeSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "recipe",
  justOne: false,
})

// Create slug from title before saving
RecipeSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
  }
  next()
})

// Add indexes for better query performance
RecipeSchema.index({ title: "text", description: "text", tags: "text" })
RecipeSchema.index({ category: 1 })
RecipeSchema.index({ author: 1 })
RecipeSchema.index({ featured: 1 })
RecipeSchema.index({ createdAt: -1 })

// Don't create the model if it already exists
export default mongoose.models.Featured || mongoose.model("Featured", RecipeSchema)
