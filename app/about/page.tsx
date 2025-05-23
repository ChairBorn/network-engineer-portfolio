import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">About</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">
          Network engineer and software developer with a passion for building efficient systems
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <div className="rounded-xl border bg-cream p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="mt-2 text-gray-500">Senior Network Engineer & Software Developer</p>

              <div className="mt-6 space-y-4">
                <p>
                  With over 10 years of experience in network engineering and software development, I specialize in
                  building robust network architectures and developing tools that make network management easier and
                  more efficient.
                </p>
                <p>
                  My expertise includes network automation, cloud infrastructure, and developing applications that
                  bridge the gap between traditional networking and modern software development practices.
                </p>
              </div>

              <div className="mt-6 flex space-x-4">
                <Link href="#" className="text-gray-500 hover:text-black">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-black">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-black">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-black">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <Image src="/placeholder.svg?height=256&width=256" alt="Profile" fill className="object-cover" />
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">Skills</h3>
                <ul className="mt-4 space-y-2">
                  <li>Network Design & Implementation</li>
                  <li>Network Automation</li>
                  <li>Cloud Infrastructure</li>
                  <li>Python & JavaScript Development</li>
                  <li>DevOps & CI/CD</li>
                  <li>Security Implementation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">Experience</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <div className="font-medium">Senior Network Engineer</div>
                    <div className="text-sm text-gray-500">TechCorp Inc. • 2018-Present</div>
                  </li>
                  <li>
                    <div className="font-medium">Network Developer</div>
                    <div className="text-sm text-gray-500">NetSolutions • 2015-2018</div>
                  </li>
                  <li>
                    <div className="font-medium">Network Administrator</div>
                    <div className="text-sm text-gray-500">DataSystems • 2012-2015</div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">Certifications</h3>
                <ul className="mt-4 space-y-2">
                  <li>Cisco Certified Network Professional (CCNP)</li>
                  <li>AWS Certified Solutions Architect</li>
                  <li>Microsoft Certified: Azure Network Engineer</li>
                  <li>Certified Information Systems Security Professional (CISSP)</li>
                  <li>Python Professional Certification</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
