"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ProfileCard } from "@/components/profile-card"
import { MatchDialog } from "@/components/match-dialog"
import { Heart, X } from "lucide-react"

// Sample profiles data
const sampleProfiles = [
  {
    id: 1,
    name: "Emma",
    age: 28,
    distance: 5,
    bio: "Coffee enthusiast, hiking lover, and bookworm. Looking for someone to share adventures with!",
    photos: ["/placeholder.svg?height=500&width=400&text=Emma"],
    interests: ["Hiking", "Reading", "Coffee", "Travel", "Photography"],
  },
  {
    id: 2,
    name: "Alex",
    age: 30,
    distance: 8,
    bio: "Music producer by day, chef by night. Let's talk about your favorite album while I cook you dinner.",
    photos: ["/placeholder.svg?height=500&width=400&text=Alex"],
    interests: ["Music", "Cooking", "Concerts", "Vinyl Records", "Food"],
  },
  {
    id: 3,
    name: "Sophia",
    age: 26,
    distance: 3,
    bio: "Art gallery curator with a passion for indie films and trying new restaurants. Dog lover and occasional painter.",
    photos: ["/placeholder.svg?height=500&width=400&text=Sophia"],
    interests: ["Art", "Films", "Painting", "Dogs", "Food"],
  },
  {
    id: 4,
    name: "James",
    age: 32,
    distance: 12,
    bio: "Software engineer who loves rock climbing and craft beer. Looking for someone to join me on weekend adventures.",
    photos: ["/placeholder.svg?height=500&width=400&text=James"],
    interests: ["Climbing", "Coding", "Beer", "Outdoors", "Technology"],
  },
]

export default function Dashboard() {
  const [profiles, setProfiles] = useState(sampleProfiles)
  const [currentProfile, setCurrentProfile] = useState(0)
  const [showMatchDialog, setShowMatchDialog] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState<any>(null)
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Reset swipe animation after it completes
    if (swipeDirection) {
      const timer = setTimeout(() => {
        setSwipeDirection(null)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [swipeDirection])

  const handleLike = () => {
    // 30% chance of a match for demo purposes
    const isMatch = Math.random() < 0.3

    if (isMatch) {
      setMatchedProfile(profiles[currentProfile])
      setShowMatchDialog(true)
    } else {
      setSwipeDirection("right")

      // Move to next profile after animation
      setTimeout(() => {
        if (currentProfile < profiles.length - 1) {
          setCurrentProfile(currentProfile + 1)
        } else {
          // No more profiles
          toast({
            title: "No more profiles",
            description: "Check back later for more matches!",
            variant: "default",
          })
          // Reset to first profile for demo purposes
          setCurrentProfile(0)
        }
      }, 300)
    }
  }

  const handleDislike = () => {
    setSwipeDirection("left")

    // Move to next profile after animation
    setTimeout(() => {
      if (currentProfile < profiles.length - 1) {
        setCurrentProfile(currentProfile + 1)
      } else {
        // No more profiles
        toast({
          title: "No more profiles",
          description: "Check back later for more matches!",
          variant: "default",
        })
        // Reset to first profile for demo purposes
        setCurrentProfile(0)
      }
    }, 300)
  }

  const handleCloseMatchDialog = () => {
    setShowMatchDialog(false)

    // Move to next profile
    if (currentProfile < profiles.length - 1) {
      setCurrentProfile(currentProfile + 1)
    } else {
      // Reset to first profile for demo purposes
      setCurrentProfile(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-20">
        {profiles.length > 0 && (
          <div
            className={`relative w-full max-w-md transition-transform duration-300 ${
              swipeDirection === "left"
                ? "translate-x-[-100vw] rotate-[-20deg]"
                : swipeDirection === "right"
                  ? "translate-x-[100vw] rotate-[20deg]"
                  : ""
            }`}
          >
            <ProfileCard profile={profiles[currentProfile]} />

            <div className="flex justify-center gap-4 mt-6">
              <Button
                onClick={handleDislike}
                className="h-16 w-16 rounded-full bg-white text-pink-500 border border-pink-200 shadow-lg hover:bg-pink-50"
              >
                <X className="h-8 w-8" />
              </Button>

              <Button
                onClick={handleLike}
                className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:from-pink-600 hover:to-purple-600"
              >
                <Heart className="h-8 w-8" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />

      {showMatchDialog && matchedProfile && <MatchDialog profile={matchedProfile} onClose={handleCloseMatchDialog} />}
    </div>
  )
}

