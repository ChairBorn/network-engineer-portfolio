import { NextResponse } from "next/server"
import { getContactMessageStats } from "@/lib/db"

export async function GET() {
  try {
    const stats = await getContactMessageStats()

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error("Failed to fetch contact stats:", error)
    return NextResponse.json({ error: "Failed to fetch contact stats" }, { status: 500 })
  }
}
