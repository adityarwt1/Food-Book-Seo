import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      maxlength: [50, "Category name cannot be more than 50 characters"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    image: {
      type: String,
      default: "/images/default-category.jpg",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Create a virtual field for recipes in this category
CategorySchema.virtual("recipes", {
  ref: "Recipe",
  localField: "_id",
  foreignField: "category",
  justOne: false,
  count: true,
})

// Create slug from name before saving
CategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
  }
  next()
})

// Don't create the model if it already exists
export default mongoose.models.Category || mongoose.model("Category", CategorySchema)
