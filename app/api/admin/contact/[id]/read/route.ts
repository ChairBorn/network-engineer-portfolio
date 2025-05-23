import { type NextRequest, NextResponse } from "next/server"
import { markContactMessageAsRead } from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await markContactMessageAsRead(params.id)

    return NextResponse.json({
      success: true,
      message: "Message marked as read",
    })
  } catch (error) {
    console.error("Failed to mark message as read:", error)
    return NextResponse.json({ error: "Failed to mark message as read" }, { status: 500 })
  }
}
