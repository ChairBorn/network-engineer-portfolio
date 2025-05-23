"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Eye, Reply, Trash2, Calendar, User, MessageSquare } from "lucide-react"

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  category: string
  message: string
  status: string
  created_at: string
}

interface ContactStats {
  total: number
  unread: number
  read: number
  replied: number
}

export default function AdminContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [stats, setStats] = useState<ContactStats>({ total: 0, unread: 0, read: 0, replied: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
    fetchStats()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/contact")
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/contact/stats")
      const data = await response.json()
      setStats(data.stats || { total: 0, unread: 0, read: 0, replied: 0 })
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/admin/contact/${id}/read`, { method: "POST" })
      fetchMessages()
      fetchStats()
    } catch (error) {
      console.error("Failed to mark as read:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      unread: "bg-red-100 text-red-700",
      read: "bg-blue-100 text-blue-700",
      replied: "bg-green-100 text-green-700",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid gap-6 md:grid-cols-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tighter">Contact Messages</h1>
          <p className="mt-2 text-gray-500">Manage and respond to contact form submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="card-3d-container">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total Messages</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Mail className="h-8 w-8 text-theme-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d-container">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-red-600">{stats.unread}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d-container">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Read</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.read}</p>
                </div>
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d-container">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Replied</p>
                  <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
                </div>
                <Reply className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages List */}
        <div className="card-3d-container rounded-xl p-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Messages</TabsTrigger>
              <TabsTrigger value="unread">Unread ({stats.unread})</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
              <TabsTrigger value="replied">Replied</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id} className="card-3d">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={getStatusBadge(message.status)}>
                              {message.status}
                            </Badge>
                            <Badge variant="outline" className="bg-white/50">
                              {message.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{message.subject}</CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-1">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {message.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {message.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(message.created_at)}
                            </span>
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          {message.status === "unread" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(message.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.subject}`)}
                          >
                            <Reply className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                    </CardContent>
                  </Card>
                ))}

                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600">No messages yet</h3>
                    <p className="text-gray-500">Contact form submissions will appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="unread" className="mt-6">
              <div className="space-y-4">
                {messages
                  .filter((msg) => msg.status === "unread")
                  .map((message) => (
                    <Card key={message.id} className="card-3d">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="bg-red-100 text-red-700">
                                unread
                              </Badge>
                              <Badge variant="outline" className="bg-white/50">
                                {message.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{message.subject}</CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-1">
                              <span>{message.name}</span>
                              <span>{message.email}</span>
                              <span>{formatDate(message.created_at)}</span>
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(message.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.subject}`)}
                            >
                              <Reply className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="read" className="mt-6">
              <div className="space-y-4">
                {messages
                  .filter((msg) => msg.status === "read")
                  .map((message) => (
                    <Card key={message.id} className="card-3d">
                      <CardHeader>
                        <CardTitle className="text-lg">{message.subject}</CardTitle>
                        <CardDescription>
                          {message.name} • {message.email} • {formatDate(message.created_at)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="replied" className="mt-6">
              <div className="space-y-4">
                {messages
                  .filter((msg) => msg.status === "replied")
                  .map((message) => (
                    <Card key={message.id} className="card-3d">
                      <CardHeader>
                        <CardTitle className="text-lg">{message.subject}</CardTitle>
                        <CardDescription>
                          {message.name} • {message.email} • {formatDate(message.created_at)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
