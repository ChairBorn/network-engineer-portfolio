"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, Download, Trash2, Copy, ImageIcon, FileText, Code } from "lucide-react"
import Link from "next/link"

export default function CDNPage() {
  const [assets] = useState([
    {
      id: 1,
      name: "network-diagram.png",
      type: "image",
      size: "2.4 MB",
      url: "https://cdn.example.com/images/network-diagram.png",
      uploadDate: "2023-05-15",
    },
    {
      id: 2,
      name: "router-config.txt",
      type: "document",
      size: "15 KB",
      url: "https://cdn.example.com/docs/router-config.txt",
      uploadDate: "2023-05-14",
    },
    {
      id: 3,
      name: "network-automation.py",
      type: "code",
      size: "8 KB",
      url: "https://cdn.example.com/code/network-automation.py",
      uploadDate: "2023-05-13",
    },
  ])

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    // You could add a toast notification here
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "document":
        return <FileText className="h-5 w-5 text-green-500" />
      case "code":
        return <Code className="h-5 w-5 text-purple-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      image: "bg-blue-100 text-blue-700",
      document: "bg-green-100 text-green-700",
      code: "bg-purple-100 text-purple-700",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link href="/admin" className="flex items-center text-sm font-medium text-gray-500 hover:text-black mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Link>
          <h1 className="text-4xl font-bold tracking-tighter">CDN Asset Management</h1>
          <p className="mt-2 text-gray-500">Upload and manage your content delivery network assets</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-cream p-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All Assets</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="space-y-4">
                    {assets.map((asset) => (
                      <Card key={asset.id} className="bg-white">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getTypeIcon(asset.type)}
                              <div>
                                <h3 className="font-semibold">{asset.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className={getTypeBadge(asset.type)}>
                                    {asset.type}
                                  </Badge>
                                  <span className="text-sm text-gray-500">{asset.size}</span>
                                  <span className="text-sm text-gray-500">•</span>
                                  <span className="text-sm text-gray-500">{asset.uploadDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCopyUrl(asset.url)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                                <Download className="h-4 w-4" />
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
                </TabsContent>

                <TabsContent value="images" className="mt-6">
                  <div className="space-y-4">
                    {assets
                      .filter((asset) => asset.type === "image")
                      .map((asset) => (
                        <Card key={asset.id} className="bg-white">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getTypeIcon(asset.type)}
                                <div>
                                  <h3 className="font-semibold">{asset.name}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className={getTypeBadge(asset.type)}>
                                      {asset.type}
                                    </Badge>
                                    <span className="text-sm text-gray-500">{asset.size}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCopyUrl(asset.url)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                                  <Download className="h-4 w-4" />
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
                </TabsContent>

                <TabsContent value="documents" className="mt-6">
                  <div className="space-y-4">
                    {assets
                      .filter((asset) => asset.type === "document")
                      .map((asset) => (
                        <Card key={asset.id} className="bg-white">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getTypeIcon(asset.type)}
                                <div>
                                  <h3 className="font-semibold">{asset.name}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className={getTypeBadge(asset.type)}>
                                      {asset.type}
                                    </Badge>
                                    <span className="text-sm text-gray-500">{asset.size}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCopyUrl(asset.url)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                                  <Download className="h-4 w-4" />
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
                </TabsContent>

                <TabsContent value="code" className="mt-6">
                  <div className="space-y-4">
                    {assets
                      .filter((asset) => asset.type === "code")
                      .map((asset) => (
                        <Card key={asset.id} className="bg-white">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getTypeIcon(asset.type)}
                                <div>
                                  <h3 className="font-semibold">{asset.name}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className={getTypeBadge(asset.type)}>
                                      {asset.type}
                                    </Badge>
                                    <span className="text-sm text-gray-500">{asset.size}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCopyUrl(asset.url)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                                  <Download className="h-4 w-4" />
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
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-cream">
              <CardHeader>
                <CardTitle>Upload New Asset</CardTitle>
                <CardDescription>Upload files to your CDN</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="file">Select File</Label>
                  <Input id="file" type="file" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="filename">File Name (optional)</Label>
                  <Input id="filename" placeholder="custom-filename" className="mt-1" />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload to CDN
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cream">
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Used</span>
                    <span className="text-sm font-medium">17.5 MB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>17.5 MB used</span>
                    <span>50 MB total</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
