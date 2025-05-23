import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock } from "lucide-react"

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      title: "Understanding BGP Routing Protocols",
      description: "A deep dive into Border Gateway Protocol and how it powers the internet",
      date: "May 15, 2023",
      readTime: "8 min read",
      category: "Networking",
      slug: "understanding-bgp-routing-protocols",
    },
    {
      id: 2,
      title: "Building Scalable Network Architectures",
      description: "Best practices for designing networks that can grow with your organization",
      date: "April 22, 2023",
      readTime: "12 min read",
      category: "Architecture",
      slug: "building-scalable-network-architectures",
    },
    {
      id: 3,
      title: "Network Automation with Python",
      description: "How to automate common network tasks using Python scripts",
      date: "March 10, 2023",
      readTime: "10 min read",
      category: "Automation",
      slug: "network-automation-with-python",
    },
    {
      id: 4,
      title: "Securing Your Network Infrastructure",
      description: "Essential security practices for protecting your network from threats",
      date: "February 28, 2023",
      readTime: "15 min read",
      category: "Security",
      slug: "securing-your-network-infrastructure",
    },
    {
      id: 5,
      title: "Troubleshooting Network Performance Issues",
      description: "A systematic approach to identifying and resolving network bottlenecks",
      date: "January 17, 2023",
      readTime: "9 min read",
      category: "Performance",
      slug: "troubleshooting-network-performance-issues",
    },
    {
      id: 6,
      title: "Cloud Networking Fundamentals",
      description: "Understanding networking concepts in cloud environments",
      date: "December 5, 2022",
      readTime: "11 min read",
      category: "Cloud",
      slug: "cloud-networking-fundamentals",
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Blog</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">
          Technical articles and insights for network engineers and software developers
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <div className="rounded-xl border bg-cream p-8">
          <div className="grid gap-8 md:grid-cols-2">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden border-0 bg-white shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-gray-100">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="mt-2">
                    <Link href={`/blog/${article.slug}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{article.date}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="flex items-center text-sm font-medium text-theme-600 hover:text-theme-700 hover:underline"
                  >
                    Read Article <ArrowRight className="ml-1 h-3 w-3" />
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
