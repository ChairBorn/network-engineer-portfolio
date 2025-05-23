import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-black">
      <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 px-4 md:px-6">
        <div className="flex-1 space-y-4">
          <div className="text-xl font-bold">DevNet</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Network engineering and software development resources.
          </p>
        </div>
        <div className="flex-1 space-y-4">
          <div className="text-sm font-medium">Links</div>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/products" className="hover:underline">
              Products
            </Link>
            <Link href="/code" className="hover:underline">
              Code Examples
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </nav>
        </div>
        <div className="flex-1 space-y-4">
          <div className="text-sm font-medium">Connect</div>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} DevNet. All rights reserved.
      </div>
    </footer>
  )
}
