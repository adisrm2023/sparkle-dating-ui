"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X } from "lucide-react"

interface MatchDialogProps {
  profile: {
    name: string
    photos: string[]
  }
  onClose: () => void
}

export function MatchDialog({ profile, onClose }: MatchDialogProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    // In a real app, this would send the message to the backend
    // For demo purposes, we'll just close the dialog
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 text-center">
          <div className="relative h-24 w-24 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse blur-xl opacity-70"></div>
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#gradient-match)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12"
              >
                <defs>
                  <linearGradient id="gradient-match" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">It's a Match!</h2>
          <p className="text-gray-600 mb-6">You and {profile.name} have liked each other</p>

          <div className="flex justify-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="/placeholder.svg?height=100&width=100&text=You"
                alt="Your profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={profile.photos[0] || "/placeholder.svg"}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input
                placeholder={`Send a message to ${profile.name}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="pr-12 rounded-full border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
              <Button
                onClick={handleSendMessage}
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-0"
                disabled={!message.trim()}
              >
                <MessageCircle className="h-4 w-4 text-white" />
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                onClick={onClose}
              >
                Keep Swiping
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

