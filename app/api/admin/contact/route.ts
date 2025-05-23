import { type NextRequest, NextResponse } from "next/server"
import { getContactMessages } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const messages = await getContactMessages()

    return NextResponse.json({
      success: true,
      messages,
    })
  } catch (error) {
    console.error("Failed to fetch contact messages:", error)
    return NextResponse.json({ error: "Failed to fetch contact messages" }, { status: 500 })
  }
}
