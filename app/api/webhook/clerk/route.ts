import type { WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Webhook } from "svix"
import dbConnect from "@/lib/db"
import { User } from "@/models"

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

  let evt: WebhookEvent

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error verifying webhook", {
      status: 400,
    })
  }

  // Get the ID and type
  const { id } = evt.data
  const eventType = evt.type

  // Connect to database
  await dbConnect()

  // Handle user creation
  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    // Get primary email
    const emailObject = email_addresses?.[0]
    const email = emailObject?.email_address

    if (!email) {
      return NextResponse.json({ error: "No email found" }, { status: 400 })
    }

    try {
      // Create user in our database
      await User.create({
        clerkId: id,
        firstName: first_name || "User",
        lastName: last_name || "",
        email: email,
        profileImage: image_url,
      })

      return NextResponse.json({ message: "User created successfully" })
    } catch (error: any) {
      console.error("Error creating user:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  // Handle user update
  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    // Get primary email
    const emailObject = email_addresses?.[0]
    const email = emailObject?.email_address

    if (!email) {
      return NextResponse.json({ error: "No email found" }, { status: 400 })
    }

    try {
      // Update user in our database
      await User.findOneAndUpdate(
        { clerkId: id },
        {
          firstName: first_name || "User",
          lastName: last_name || "",
          email: email,
          profileImage: image_url,
        },
        { new: true, runValidators: true },
      )

      return NextResponse.json({ message: "User updated successfully" })
    } catch (error: any) {
      console.error("Error updating user:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  // Handle user deletion
  if (eventType === "user.deleted") {
    try {
      // Delete user from our database
      await User.findOneAndDelete({ clerkId: id })

      return NextResponse.json({ message: "User deleted successfully" })
    } catch (error: any) {
      console.error("Error deleting user:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ message: "Webhook received" })
}
