"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

// Inicializa el cliente de Supabase
const supabase = createClient(
  "https://efyeueofosjeljsrtqte.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmeWV1ZW9mb3NqZWxqc3J0cXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMjAyMTUsImV4cCI6MjA1NDg5NjIxNX0.qcXx0RHrGDjdxs4HNhzoxSijK5m1H1yD309ccTyn3Jg",
)

export default function LiveTerminal() {
  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl mb-4">{">"} Live Terminal</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <LiveTerminalContent />
        </Suspense>
      </div>
    </div>
  )
}

interface Message {
  messages: string
  owner: string
  timestamp: string
}

function LiveTerminalContent() {
  const [messages, setMessages] = useState<Message[]>([])
  const searchParams = useSearchParams()
  const wallet = searchParams.get("wallet")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // scrollToBottom removed from dependency array
  }, [])

  useEffect(() => {
    if (!wallet) {
      console.warn("Wallet is null, skipping fetch")
      return
    }

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("live_chat")
        .select("messages, owner, timestamp")
        .eq("wallet", wallet)
        .order("timestamp", { ascending: true })
        .limit(50)

      if (error) {
        console.error("Error fetching messages:", error)
        return
      }

      if (data) {
        setMessages(data as Message[])
      }
    }

    fetchMessages()

    const interval = setInterval(fetchMessages, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [wallet])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getOwnerColor = (owner: string) => {
    const colors = [
      "text-purple-300",
      "text-purple-400",
      "text-purple-500",
      "text-indigo-300",
      "text-indigo-400",
      "text-indigo-500",
    ]
    const hash = owner.split("").reduce((acc, char) => char.charCodeAt(0) + acc, 0)
    return colors[hash % colors.length]
  }

  return (
    <div className="border border-green-500 p-4 h-[70vh] overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          <span className={`font-bold ${getOwnerColor(msg.owner)}`}>{msg.owner}</span>
          <span className="text-cyan-400">@terminal</span>
          <span className="text-gray-500">:~$</span> <span className="text-green-400">{msg.messages}</span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

