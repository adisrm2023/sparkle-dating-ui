"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Send } from "lucide-react"

// Sample conversations data
const sampleConversations = [
  {
    id: 1,
    name: "Emma",
    photo: "/placeholder.svg?height=100&width=100&text=Emma",
    lastActive: "2 min ago",
    messages: [
      {
        id: 1,
        text: "Hey there! I noticed we both like hiking. What's your favorite trail?",
        sender: "them",
        time: "10:30 AM",
      },
      { id: 2, text: "Hi Emma! I love the Sunset Ridge trail. Have you been there?", sender: "me", time: "10:35 AM" },
      { id: 3, text: "Yes! The views are amazing. We should go sometime!", sender: "them", time: "10:38 AM" },
    ],
  },
  {
    id: 2,
    name: "Alex",
    photo: "/placeholder.svg?height=100&width=100&text=Alex",
    lastActive: "1 hour ago",
    messages: [
      { id: 1, text: "What kind of music are you into?", sender: "them", time: "Yesterday" },
      {
        id: 2,
        text: "I'm pretty eclectic, but I've been listening to a lot of indie rock lately. You?",
        sender: "me",
        time: "Yesterday",
      },
      {
        id: 3,
        text: "Nice! I'm a producer actually. Mostly electronic and hip hop. I'd love to share some tracks with you.",
        sender: "them",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    name: "Sophia",
    photo: "/placeholder.svg?height=100&width=100&text=Sophia",
    lastActive: "3 hours ago",
    messages: [
      { id: 1, text: "Have you been to the new art exhibition downtown?", sender: "them", time: "2 days ago" },
      { id: 2, text: "Not yet! I've been meaning to go. Would you recommend it?", sender: "me", time: "2 days ago" },
      {
        id: 3,
        text: "The modern art section is incredible. Maybe we could check it out together?",
        sender: "them",
        time: "2 days ago",
      },
    ],
  },
]

export default function Messages() {
  const [conversations, setConversations] = useState(sampleConversations)
  const [activeConversation, setActiveConversation] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim() || activeConversation === null) return

    const updatedConversations = [...conversations]
    const conversationIndex = updatedConversations.findIndex((c) => c.id === activeConversation)

    if (conversationIndex !== -1) {
      updatedConversations[conversationIndex].messages.push({
        id: Math.max(...updatedConversations[conversationIndex].messages.map((m) => m.id)) + 1,
        text: newMessage,
        sender: "me",
        time: "Just now",
      })

      setConversations(updatedConversations)
      setNewMessage("")

      // Simulate reply after 1-3 seconds
      setTimeout(
        () => {
          const replyMessages = [
            "That sounds great!",
            "I'd love to hear more about that.",
            "Interesting! Tell me more.",
            "I was just thinking the same thing!",
            "That's awesome! When are you free to meet up?",
            "I've been wondering about that too.",
            "You have great taste!",
            "I'm so glad we matched!",
          ]

          const randomReply = replyMessages[Math.floor(Math.random() * replyMessages.length)]

          const updatedWithReply = [...conversations]
          updatedWithReply[conversationIndex].messages.push({
            id: Math.max(...updatedWithReply[conversationIndex].messages.map((m) => m.id)) + 1,
            text: randomReply,
            sender: "them",
            time: "Just now",
          })

          setConversations(updatedWithReply)
        },
        1000 + Math.random() * 2000,
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Conversations List */}
        <div
          className={`w-full md:w-1/3 md:max-w-xs border-r border-purple-100 bg-white ${activeConversation !== null ? "hidden md:block" : ""}`}
        >
          <div className="p-4 border-b border-purple-100">
            <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="flex items-center gap-3 p-4 border-b border-purple-100 hover:bg-purple-50 cursor-pointer transition-colors"
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="relative">
                  <img
                    src={conversation.photo || "/placeholder.svg"}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-800 truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.lastActive}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.messages[conversation.messages.length - 1].text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Conversation */}
        {activeConversation !== null ? (
          <div className="flex-1 flex flex-col h-[calc(100vh-5rem)]">
            {/* Conversation Header */}
            <div className="flex items-center gap-3 p-4 border-b border-purple-100 bg-white">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setActiveConversation(null)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Button>

              <div className="relative">
                <img
                  src={conversations.find((c) => c.id === activeConversation)?.photo || "/placeholder.svg"}
                  alt={conversations.find((c) => c.id === activeConversation)?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  {conversations.find((c) => c.id === activeConversation)?.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {conversations.find((c) => c.id === activeConversation)?.lastActive}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {conversations
                  .find((c) => c.id === activeConversation)
                  ?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === "me"
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                            : "bg-white border border-purple-100 text-gray-800"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === "me" ? "text-pink-100" : "text-gray-500"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-purple-100 bg-white">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="rounded-full border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
                <Button
                  onClick={handleSendMessage}
                  className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#gradient-message)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10"
                >
                  <defs>
                    <linearGradient id="gradient-message" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Your Messages</h2>
              <p className="text-gray-600 mt-2">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation activeTab="messages" />
    </div>
  )
}

