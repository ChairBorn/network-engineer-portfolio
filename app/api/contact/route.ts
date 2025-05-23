import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, category, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert contact message into database
    await sql`
      INSERT INTO contact_messages (name, email, subject, category, message)
      VALUES (${name}, ${email}, ${subject}, ${category || "general"}, ${message})
    `

    // In a real application, you would also send an email notification here
    // using a service like SendGrid, Resend, or Nodemailer

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
