"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [article, setArticle] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    status: "draft",
    tags: "",
  })

  useEffect(() => {
    // Load article data based on ID
    // This would typically come from your database/CMS
    const mockArticle = {
      title: "Understanding BGP Routing Protocols",
      description: "A deep dive into Border Gateway Protocol and how it powers the internet",
      content: `# Understanding BGP Routing Protocols

Border Gateway Protocol (BGP) is the routing protocol that powers the internet. It's responsible for making decisions about the best path for data to travel across the internet.

## How BGP Works

BGP uses a path-vector protocol to make routing decisions based on paths, network policies, or rule-sets configured by a network administrator.

## Key Features

- Path selection algorithms
- Policy-based routing
- Scalability for internet-scale networks
- Support for CIDR and route aggregation`,
      category: "networking",
      status: "published",
      tags: "bgp, routing, networking, protocols",
    }
    setArticle(mockArticle)
  }, [params.id])

  const handleSave = () => {
    console.log("Saving article:", article)
    router.push("/admin")
  }

  const handlePublish = () => {
    setArticle({ ...article, status: "published" })
    console.log("Publishing article:", { ...article, status: "published" })
    router.push("/admin")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this article?")) {
      console.log("Deleting article:", params.id)
      router.push("/admin")
    }
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/admin" className="flex items-center text-sm font-medium text-gray-500 hover:text-black mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Link>
          <h1 className="text-4xl font-bold tracking-tighter">Edit Article</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-cream p-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={article.title}
                    onChange={(e) => setArticle({ ...article, title: e.target.value })}
                    placeholder="Enter article title..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={article.description}
                    onChange={(e) => setArticle({ ...article, description: e.target.value })}
                    placeholder="Brief description of the article..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={article.content}
                    onChange={(e) => setArticle({ ...article, content: e.target.value })}
                    placeholder="Write your article content here... (Supports Markdown)"
                    className="mt-1 min-h-[400px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-cream">
              <CardHeader>
                <CardTitle>Article Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={article.category}
                    onValueChange={(value) => setArticle({ ...article, category: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="automation">Automation</SelectItem>
                      <SelectItem value="architecture">Architecture</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="cloud">Cloud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={article.tags}
                    onChange={(e) => setArticle({ ...article, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Status</Label>
                  <div className="mt-2">
                    <Badge
                      variant={article.status === "published" ? "default" : "secondary"}
                      className={
                        article.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {article.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cream">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button onClick={handlePublish} className="w-full bg-green-600 hover:bg-green-700">
                  <Eye className="mr-2 h-4 w-4" />
                  {article.status === "published" ? "Update Published" : "Publish Article"}
                </Button>
                <Button variant="outline" className="w-full">
                  Preview
                </Button>
                <Button onClick={handleDelete} variant="outline" className="w-full text-red-600 hover:text-red-700">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Article
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
