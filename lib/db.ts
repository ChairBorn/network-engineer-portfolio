import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database helper functions
export async function getContactMessages(limit = 50) {
  return await sql`
    SELECT * FROM contact_messages 
    ORDER BY created_at DESC 
    LIMIT ${limit}
  `
}

export async function markContactMessageAsRead(id: string) {
  return await sql`
    UPDATE contact_messages 
    SET status = 'read', updated_at = CURRENT_TIMESTAMP 
    WHERE id = ${id}
  `
}

export async function getContactMessageStats() {
  const stats = await sql`
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'unread') as unread,
      COUNT(*) FILTER (WHERE status = 'read') as read,
      COUNT(*) FILTER (WHERE status = 'replied') as replied
    FROM contact_messages
  `
  return stats[0]
}

export async function getContactMessagesByCategory() {
  return await sql`
    SELECT 
      category,
      COUNT(*) as count
    FROM contact_messages
    GROUP BY category
    ORDER BY count DESC
  `
}
