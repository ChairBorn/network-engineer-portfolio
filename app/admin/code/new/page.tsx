"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"

interface CodeSnippet {
  id: string
  title: string
  description: string
  language: string
  code: string
}

export default function NewCodeTutorialPage() {
  const router = useRouter()
  const [tutorial, setTutorial] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    status: "draft",
    tags: "",
  })

  const [snippets, setSnippets] = useState<CodeSnippet[]>([])
  const [currentSnippet, setCurrentSnippet] = useState<CodeSnippet>({
    id: "",
    title: "",
    description: "",
    language: "python",
    code: "",
  })

  const addSnippet = () => {
    if (currentSnippet.title && currentSnippet.code) {
      const newSnippet = {
        ...currentSnippet,
        id: Date.now().toString(),
      }
      setSnippets([...snippets, newSnippet])
      setCurrentSnippet({
        id: "",
        title: "",
        description: "",
        language: "python",
        code: "",
      })
    }
  }

  const removeSnippet = (id: string) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== id))
  }

  const handleSave = () => {
    console.log("Saving tutorial:", { ...tutorial, snippets })
    router.push("/admin/code")
  }

  const handlePublish = () => {
    setTutorial({ ...tutorial, status: "published" })
    console.log("Publishing tutorial:", { ...tutorial, status: "published", snippets })
    router.push("/admin/code")
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/admin/code"
            className="flex items-center text-sm font-medium text-gray-500 hover:text-black mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Code Tutorials
          </Link>
          <h1 className="text-4xl font-bold tracking-tighter">Create New Code Tutorial</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Tutorial Content */}
            <div className="card-3d-container rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Tutorial Content</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={tutorial.title}
                    onChange={(e) => setTutorial({ ...tutorial, title: e.target.value })}
                    placeholder="Enter tutorial title..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={tutorial.description}
                    onChange={(e) => setTutorial({ ...tutorial, description: e.target.value })}
                    placeholder="Brief description of the tutorial..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={tutorial.content}
                    onChange={(e) => setTutorial({ ...tutorial, content: e.target.value })}
                    placeholder="Write your tutorial content here... (Supports Markdown)"
                    className="mt-1 min-h-[300px]"
                  />
                </div>
              </div>
            </div>

            {/* Code Snippets */}
            <div className="card-3d-container rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Code Snippets</h2>

              {/* Add New Snippet */}
              <div className="card-3d rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-4">Add New Snippet</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="snippet-title">Snippet Title</Label>
                      <Input
                        id="snippet-title"
                        value={currentSnippet.title}
                        onChange={(e) => setCurrentSnippet({ ...currentSnippet, title: e.target.value })}
                        placeholder="e.g., Basic Connection Setup"
                      />
                    </div>
                    <div>
                      <Label htmlFor="snippet-language">Language</Label>
                      <Select
                        value={currentSnippet.language}
                        onValueChange={(value) => setCurrentSnippet({ ...currentSnippet, language: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="bash">Bash</SelectItem>
                          <SelectItem value="yaml">YAML</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="sql">SQL</SelectItem>
                          <SelectItem value="dockerfile">Dockerfile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="snippet-description">Description</Label>
                    <Input
                      id="snippet-description"
                      value={currentSnippet.description}
                      onChange={(e) => setCurrentSnippet({ ...currentSnippet, description: e.target.value })}
                      placeholder="Brief description of what this code does..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="snippet-code">Code</Label>
                    <Textarea
                      id="snippet-code"
                      value={currentSnippet.code}
                      onChange={(e) => setCurrentSnippet({ ...currentSnippet, code: e.target.value })}
                      placeholder="Paste your code here..."
                      className="min-h-[200px] font-mono"
                    />
                  </div>

                  <Button onClick={addSnippet} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Snippet
                  </Button>
                </div>
              </div>

              {/* Existing Snippets */}
              <div className="space-y-4">
                {snippets.map((snippet, index) => (
                  <div key={snippet.id} className="card-3d rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{snippet.title}</h4>
                        <p className="text-sm text-gray-600">{snippet.description}</p>
                        <Badge variant="outline" className="bg-white/50 mt-1">
                          {snippet.language}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSnippet(snippet.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CodeBlock code={snippet.code} language={snippet.language} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="card-3d-container">
              <CardHeader>
                <CardTitle>Tutorial Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={tutorial.category}
                    onValueChange={(value) => setTutorial({ ...tutorial, category: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automation">Automation</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="containers">Containers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={tutorial.tags}
                    onChange={(e) => setTutorial({ ...tutorial, tags: e.target.value })}
                    placeholder="python, networking, automation"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Status</Label>
                  <div className="mt-2">
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
                  </div>
                </div>

                <div>
                  <Label>Code Snippets</Label>
                  <div className="mt-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {snippets.length} snippets
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-3d-container">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button onClick={handlePublish} className="w-full bg-green-600 hover:bg-green-700">
                  <Eye className="mr-2 h-4 w-4" />
                  Publish Tutorial
                </Button>
                <Button variant="outline" className="w-full">
                  Preview
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
