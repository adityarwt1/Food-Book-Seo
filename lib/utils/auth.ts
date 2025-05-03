import { auth, currentUser } from "@clerk/nextjs/server"
import dbConnect from "@/lib/db"
import { User } from "@/models"

// Get or create a user in our database based on Clerk authentication
export async function getOrCreateUser() {
  try {
    const { userId } = auth()

    if (!userId) {
      return null
    }

    await dbConnect()

    // Check if user exists in our database
    let user = await User.findOne({ clerkId: userId })

    // If user doesn't exist, create one
    if (!user) {
      const clerkUser = await currentUser()

      if (!clerkUser) {
        return null
      }

      // Get primary email
      const email = clerkUser.emailAddresses.find((email) => email.id === clerkUser.primaryEmailAddressId)?.emailAddress

      if (!email) {
        throw new Error("User email not found")
      }

      // Create new user in our database
      user = await User.create({
        clerkId: userId,
        firstName: clerkUser.firstName || "User",
        lastName: clerkUser.lastName || "",
        email: email,
        profileImage: clerkUser.imageUrl,
      })
    }

    return user
  } catch (error) {
    console.error("Error in getOrCreateUser:", error)
    return null
  }
}

// Get the current user's ID from our database
export async function getCurrentUserId() {
  try {
    const user = await getOrCreateUser()
    return user?._id
  } catch (error) {
    console.error("Error in getCurrentUserId:", error)
    return null
  }
}
