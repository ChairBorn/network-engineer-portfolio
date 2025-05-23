import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // This would typically come from a CMS or database
  const article = {
    title: "Understanding BGP Routing Protocols",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Networking",
    content: `
      <p>Border Gateway Protocol (BGP) is the routing protocol that powers the internet. It's responsible for making decisions about the best path for data to travel across the internet. Unlike interior gateway protocols like OSPF or EIGRP that are used within an autonomous system (AS), BGP is designed to exchange routing information between different autonomous systems.</p>
      
      <h2>How BGP Works</h2>
      
      <p>BGP uses a path-vector protocol to make routing decisions based on paths, network policies, or rule-sets configured by a network administrator. The protocol maintains a table of IP networks or "prefixes" which designate network reachability among autonomous systems.</p>
      
      <p>BGP makes routing decisions based on:</p>
      
      <ul>
        <li>Path attributes</li>
        <li>Network policies</li>
        <li>Rule-sets</li>
      </ul>
      
      <h2>BGP Path Selection</h2>
      
      <p>When multiple paths to a destination exist, BGP uses a decision process to select the best route:</p>
      
      <ol>
        <li>Prefer the path with the highest WEIGHT (Cisco proprietary)</li>
        <li>Prefer the path with the highest LOCAL_PREF</li>
        <li>Prefer the path that was locally originated</li>
        <li>Prefer the path with the shortest AS_PATH</li>
        <li>Prefer the path with the lowest origin type</li>
        <li>Prefer the path with the lowest MED</li>
        <li>Prefer eBGP over iBGP paths</li>
        <li>Prefer the path with the lowest IGP metric to the BGP next hop</li>
        <li>Prefer the oldest route for eBGP paths</li>
        <li>Prefer the path with the lowest neighbor BGP router ID</li>
        <li>Prefer the path with the lowest neighbor IP address</li>
      </ol>
      
      <h2>BGP Configuration Example</h2>
      
      <p>Here's a basic BGP configuration example for a Cisco router:</p>
      
      <pre><code>router bgp 65000
 bgp router-id 192.168.1.1
 neighbor 192.168.2.1 remote-as 65001
 neighbor 192.168.2.1 description Connection to ISP
 
 address-family ipv4
  network 10.0.0.0 mask 255.255.0.0
  neighbor 192.168.2.1 activate
 exit-address-family</code></pre>
      
      <h2>BGP Best Practices</h2>
      
      <p>When implementing BGP in your network, consider these best practices:</p>
      
      <ul>
        <li>Use BGP only when necessary (connecting to multiple ISPs, large networks)</li>
        <li>Implement proper filtering with prefix lists and AS path filters</li>
        <li>Use BGP communities for traffic engineering</li>
        <li>Implement route dampening to prevent route flapping</li>
        <li>Secure BGP sessions with MD5 authentication</li>
        <li>Monitor BGP sessions and routes</li>
      </ul>
      
      <p>Understanding BGP is essential for network engineers working with large networks or internet service providers. While complex, mastering BGP allows for sophisticated routing policies and traffic engineering capabilities.</p>
    `,
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Link>

        <div className="rounded-xl border bg-cream p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{article.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {article.date}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {article.readTime}
              </div>
            </div>
          </div>

          <div
            className="prose prose-gray max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  )
}
