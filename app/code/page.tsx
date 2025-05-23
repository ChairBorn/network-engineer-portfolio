"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function CodePage() {
  const { user } = useAuth()

  const codeArticles = [
    {
      id: 1,
      title: "Network Automation with Python",
      description: "Complete guide to automating network tasks using Python with practical examples",
      date: "May 20, 2023",
      readTime: "15 min read",
      category: "Automation",
      slug: "network-automation-python",
      snippetCount: 5,
    },
    {
      id: 2,
      title: "React Network Monitoring Dashboard",
      description: "Building a real-time network monitoring dashboard with React and WebSockets",
      date: "May 18, 2023",
      readTime: "12 min read",
      category: "Frontend",
      slug: "react-network-dashboard",
      snippetCount: 8,
    },
    {
      id: 3,
      title: "Infrastructure as Code with Terraform",
      description: "Deploy and manage network infrastructure using Terraform automation",
      date: "May 15, 2023",
      readTime: "18 min read",
      category: "DevOps",
      slug: "terraform-infrastructure",
      snippetCount: 6,
    },
    {
      id: 4,
      title: "Network Security Scripts",
      description: "Essential security scripts for network monitoring and threat detection",
      date: "May 12, 2023",
      readTime: "10 min read",
      category: "Security",
      slug: "network-security-scripts",
      snippetCount: 4,
    },
    {
      id: 5,
      title: "API Development for Network Tools",
      description: "Building RESTful APIs for network management tools using Node.js",
      date: "May 10, 2023",
      readTime: "14 min read",
      category: "Backend",
      slug: "network-api-development",
      snippetCount: 7,
    },
    {
      id: 6,
      title: "Docker Networking Deep Dive",
      description: "Understanding Docker networking with practical configuration examples",
      date: "May 8, 2023",
      readTime: "16 min read",
      category: "Containers",
      slug: "docker-networking",
      snippetCount: 9,
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Code Examples</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">
          In-depth tutorials with practical code examples for network engineers and developers
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <div className="card-3d-container rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Code Tutorials</h2>
            {user?.role === "admin" && (
              <Button asChild className="bg-theme-600 hover:bg-theme-700">
                <Link href="/admin/code/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Tutorial
                </Link>
              </Button>
            )}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {codeArticles.map((article) => (
              <Card key={article.id} className="card-3d overflow-hidden border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-white/50">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="mt-2">
                    <Link href={`/code/${article.slug}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{article.date}</p>
                    <Badge variant="secondary" className="bg-theme-100 text-theme-700">
                      {article.snippetCount} snippets
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/code/${article.slug}`}
                    className="flex items-center text-sm font-medium text-theme-600 hover:text-theme-700 hover:underline"
                  >
                    Read Tutorial <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
