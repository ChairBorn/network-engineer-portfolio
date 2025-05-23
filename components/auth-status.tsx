"use client"

import { useAuth } from "@/contexts/auth-context"
import { Skeleton } from "@/components/ui/skeleton"

export function AuthStatus() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <Skeleton className="h-5 w-24" />
  }

  return (
    <div className="text-sm">
      {user ? (
        <span className="text-green-600 font-medium">Logged in as {user.name}</span>
      ) : (
        <span className="text-gray-500">Not logged in</span>
      )}
    </div>
  )
}
