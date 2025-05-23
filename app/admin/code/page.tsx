"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Code } from "lucide-react"

export default function AdminCodePage() {
  const [tutorials] = useState([
    {
      id: 1,
      title: "Network Automation with Python",
      status: "published",
      date: "May 20, 2023",
      category: "Automation",
      snippetCount: 5,
    },
    {
      id: 2,
      title: "React Network Dashboard",
      status: "draft",
      date: "May 18, 2023",
      category: "Frontend",
      snippetCount: 3,
    },
    {
      id: 3,
      title: "Terraform Infrastructure",
      status: "published",
      date: "May 15, 2023",
      category: "DevOps",
      snippetCount: 6,
    },
  ])

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tighter">Code Tutorials</h1>
          <p className="mt-2 text-gray-500">Manage your code tutorials and examples</p>
        </div>

        <div className="card-3d-container rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Code Tutorials</h2>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/admin/code/new">
                <Plus className="mr-2 h-4 w-4" />
                New Tutorial
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="card-3d">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{tutorial.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={tutorial.status === "published" ? "default" : "secondary"}
                          className={
                            tutorial.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {tutorial.status}
                        </Badge>
                        <Badge variant="outline" className="bg-white/50">
                          {tutorial.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{tutorial.date}</span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Code className="mr-1 h-3 w-3" />
                          {tutorial.snippetCount} snippets
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/code/${tutorial.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
