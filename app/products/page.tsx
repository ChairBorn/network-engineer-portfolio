import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Network Analyzer Pro",
      description: "Advanced network traffic analysis and monitoring tool",
      category: "Monitoring",
      image: "/placeholder.svg?height=300&width=400",
      price: "$199",
    },
    {
      id: 2,
      name: "PacketSniffer",
      description: "Lightweight packet capture and analysis utility",
      category: "Security",
      image: "/placeholder.svg?height=300&width=400",
      price: "$99",
    },
    {
      id: 3,
      name: "RouterConfig Manager",
      description: "Centralized configuration management for network devices",
      category: "Management",
      image: "/placeholder.svg?height=300&width=400",
      price: "$149",
    },
    {
      id: 4,
      name: "NetFlow Visualizer",
      description: "Real-time network traffic visualization and reporting",
      category: "Monitoring",
      image: "/placeholder.svg?height=300&width=400",
      price: "$129",
    },
    {
      id: 5,
      name: "SecureNet Gateway",
      description: "Enterprise-grade network security solution",
      category: "Security",
      image: "/placeholder.svg?height=300&width=400",
      price: "$299",
    },
    {
      id: 6,
      name: "DevOps Pipeline Tools",
      description: "CI/CD tools for network automation",
      category: "DevOps",
      image: "/placeholder.svg?height=300&width=400",
      price: "$179",
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Products</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">
          Professional tools for network engineers and software developers
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <div className="rounded-xl border bg-cream p-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden border-0 bg-white shadow-sm">
                <div className="aspect-video relative">
                  <OptimizedImage
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-gray-100">
                      {product.category}
                    </Badge>
                    <div className="font-bold">{product.price}</div>
                  </div>
                  <CardTitle className="mt-2">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full bg-theme-600 text-white hover:bg-theme-700">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
