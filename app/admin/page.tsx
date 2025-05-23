"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, FileText, Package, Code, Upload } from "lucide-react"

export default function AdminPage() {
  const [articles] = useState([
    {
      id: 1,
      title: "Understanding BGP Routing Protocols",
      status: "published",
      date: "May 15, 2023",
      category: "Networking",
    },
    {
      id: 2,
      title: "Building Scalable Network Architectures",
      status: "draft",
      date: "April 22, 2023",
      category: "Architecture",
    },
    {
      id: 3,
      title: "Network Automation with Python",
      status: "published",
      date: "March 10, 2023",
      category: "Automation",
    },
  ])

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tighter">Admin Dashboard</h1>
          <p className="mt-2 text-gray-500">Manage your content and assets</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Articles</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <FileText className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Products</p>
                  <p className="text-2xl font-bold">6</p>
                </div>
                <Package className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Code Examples</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <Code className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">CDN Assets</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <Upload className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border bg-cream p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Blog Articles</h2>
              <Button asChild className="bg-theme-600 hover:bg-theme-700">
                <Link href="/admin/articles/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Article
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {articles.map((article) => (
                <Card key={article.id} className="bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{article.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={article.status === "published" ? "default" : "secondary"}
                            className={
                              article.status === "published"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {article.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{article.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/articles/${article.id}/edit`}>
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

          <div className="rounded-xl border bg-cream p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">CDN Assets</h2>
              <Button asChild className="bg-theme-600 hover:bg-theme-700">
                <Link href="/admin/cdn">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Assets
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Images</h3>
                      <p className="text-sm text-gray-500">24 files • 12.5 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Documents</h3>
                      <p className="text-sm text-gray-500">8 files • 3.2 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Code Files</h3>
                      <p className="text-sm text-gray-500">13 files • 1.8 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
