import type React from "react"
import { AuthStatus } from "@/components/auth-status"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="bg-gray-100 border-b py-2 px-4">
        <div className="container flex justify-between items-center">
          <h2 className="text-sm font-medium">Admin Area</h2>
          <AuthStatus />
        </div>
      </div>
      {children}
    </div>
  )
}
