import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    comment: {
      type: String,
      required: [true, "Please provide a review comment"],
      maxlength: [500, "Comment cannot be more than 500 characters"],
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: [true, "Please provide a recipe"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true },
)

// Prevent user from submitting more than one review per recipe
ReviewSchema.index({ recipe: 1, user: 1 }, { unique: true })

// Static method to calculate average rating
ReviewSchema.statics.calculateAverageRating = async function (recipeId) {
  const result = await this.aggregate([
    { $match: { recipe: recipeId } },
    {
      $group: {
        _id: "$recipe",
        averageRating: { $avg: "$rating" },
        numReviews: { $sum: 1 },
      },
    },
  ])

  try {
    // Update the recipe with the calculated values
    if (result.length > 0) {
      await mongoose.model("Recipe").findByIdAndUpdate(recipeId, {
        averageRating: Math.round(result[0].averageRating * 10) / 10,
        numReviews: result[0].numReviews,
      })
    } else {
      // If no reviews, set default values
      await mongoose.model("Recipe").findByIdAndUpdate(recipeId, {
        averageRating: 0,
        numReviews: 0,
      })
    }
  } catch (error) {
    console.error("Error updating recipe rating:", error)
  }
}

// Call calculateAverageRating after save
ReviewSchema.post("save", function () {
  // @ts-ignore
  this.constructor.calculateAverageRating(this.recipe)
})

// Call calculateAverageRating after remove
ReviewSchema.post("remove", function () {
  // @ts-ignore
  this.constructor.calculateAverageRating(this.recipe)
})

// Don't create the model if it already exists
export default mongoose.models.Review || mongoose.model("Review", ReviewSchema)
