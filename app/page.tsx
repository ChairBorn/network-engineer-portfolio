import Link from "next/link"
import { ArrowRight, Code, FileText, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-700 mb-4">
                  Network Engineer & Software Developer
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Technical expertise,
                  <br />
                  simplified.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                  Sharing network engineering solutions, code examples, and technical insights to help you build better
                  systems.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 mt-6">
                  <Button asChild className="bg-theme-600 text-white hover:bg-theme-700">
                    <Link href="/products">
                      View Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-theme-600 text-theme-600 hover:bg-theme-50">
                    <Link href="/code">
                      Browse Code Examples <Code className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Featured</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Solutions for modern networks
                </h2>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                  Explore products, code examples, and technical articles designed for network engineers and software
                  developers.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-xl border bg-cream p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <Package className="h-10 w-10 text-theme-600" />
                    <div>
                      <h3 className="text-xl font-bold">Products</h3>
                      <p className="text-gray-500 dark:text-gray-400">Network tools and software solutions</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border bg-cream p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <Code className="h-10 w-10 text-theme-600" />
                    <div>
                      <h3 className="text-xl font-bold">Code Examples</h3>
                      <p className="text-gray-500 dark:text-gray-400">Practical implementations and snippets</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border bg-cream p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <FileText className="h-10 w-10 text-theme-600" />
                    <div>
                      <h3 className="text-xl font-bold">Articles</h3>
                      <p className="text-gray-500 dark:text-gray-400">Technical insights and tutorials</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
