import type { NextRequest } from "next/server"

// This is a simplified auth implementation for demonstration
// In a real app, you would use a proper auth library like NextAuth.js or Clerk

// Mock user data - in a real app, this would be in a database
export const users = [
  {
    id: "1",
    email: "admin@example.com",
    // In a real app, this would be hashed
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    role: "user",
  },
]

export type User = (typeof users)[0]

// Check if user is authenticated
export function isAuthenticated(request: NextRequest) {
  const authCookie = request.cookies.get("auth-token")?.value

  if (!authCookie) {
    return false
  }

  try {
    // In a real app, you would verify a JWT token here
    const userId = authCookie
    return users.some((user) => user.id === userId)
  } catch (error) {
    return false
  }
}

// Check if user has admin role
export function isAdmin(request: NextRequest) {
  const authCookie = request.cookies.get("auth-token")?.value

  if (!authCookie) {
    return false
  }

  try {
    // In a real app, you would verify a JWT token and check roles
    const userId = authCookie
    const user = users.find((user) => user.id === userId)
    return user?.role === "admin"
  } catch (error) {
    return false
  }
}

// Login function
export function login(email: string, password: string) {
  const user = users.find((user) => user.email === email && user.password === password)

  if (!user) {
    return null
  }

  // In a real app, you would generate a JWT token here
  return user
}
