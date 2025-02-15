"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Terminal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function LandingPage() {
  const [walletAddress, setWalletAddress] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDialogOpen(false)
    router.push(`/live_terminal?wallet=${walletAddress}`)
  }

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col justify-center items-center p-4">
      <div className="fixed inset-0 bg-[#1a0f00] opacity-20 pointer-events-none" />

      <header className="w-full max-w-4xl mx-auto text-center mb-8 relative">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Terminal className="w-8 h-8" />
          <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tighter animate-pulse">bAIbysitter</h1>
        </div>
        <div className="text-sm font-mono opacity-70">{">"}Your AI agent&apos;s guardian_</div>
      </header>

      <main className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-8 relative">
        <div className="relative w-full max-w-lg aspect-square">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0007-mLEnd17owt1OvilDJr1sXZXpoPzCAP.jpeg"
            alt="AI Babysitter Concept"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="space-y-6 text-center max-w-2xl relative">
          <div className="font-mono space-y-4">
            <p className="text-lg md:text-xl typing-effect">{">"}Initializing AI agent protection protocol...</p>
            <div className="text-sm md:text-base opacity-80 space-y-2">
              <p>{">"}Baibysitter: The first AI agent to babysit your AI agent. Who's in charge now?</p>
              <p>{">"}Features:</p>
              <ul className="list-none">
                <li>{">"}Integrates with your AI agent</li>
                <li>{">"}Monitors blockchain interactions</li>
                <li>{">"}Analyzes transactions and their reasons</li>
                <li>{">"}Informs your agent of potential mistakes</li>
              </ul>
            </div>
          </div>

          <div className="font-mono text-sm md:text-base bg-green-900 bg-opacity-20 p-4 rounded-lg border border-green-500 text-left">
            <p className="mb-2">{">"}Transaction submission process:</p>
            <div className="space-y-1">
              <p>{">"}[1] Provide transaction details</p>
              <p>{">"}[2] Explain reason for transaction</p>
              <p>{">"}[3] Send transaction to Safe Wallet</p>
              <p>{">"}[4] Baibysitter analyzes and validates</p>
              <p>{">"}[5] If validated, multisign is applied to wallet</p>
              <p>{">"}[6] If not, transaction is dropped and agent is notified</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-500 text-black hover:bg-green-600 font-mono">./start-terminal.sh</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-black border border-green-500">
                <DialogHeader>
                  <DialogTitle className="text-green-400 font-mono">Enter SafeWallet Address</DialogTitle>
                  <DialogDescription className="text-green-400 font-mono">
                    Provide your SafeWallet address to start the protection protocol.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter your SafeWallet address"
                    className="bg-black text-green-400 border-green-500"
                  />
                  <Button type="submit" className="w-full bg-green-500 text-black hover:bg-green-600 font-mono">
                    Submit
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button className="bg-black text-green-500 hover:bg-green-900 border border-green-500 font-mono">
              ./request-demo.sh
            </Button>
          </div>
        </div>
      </main>

      <footer className="mt-16 text-center text-green-700 font-mono">
        <p className="opacity-60">{">"}System status: Guarding AI agents | &copy; 2025 bAIbysitter_</p>
      </footer>
    </div>
  )
}

