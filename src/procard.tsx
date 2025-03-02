"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Info } from "lucide-react"

interface Profile {
  id: number
  name: string
  age: number
  distance: number
  bio: string
  photos: string[]
  interests: string[]
}

interface ProfileCardProps {
  profile: Profile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(0)

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentPhoto < profile.photos.length - 1) {
      setCurrentPhoto(currentPhoto + 1)
    } else {
      setCurrentPhoto(0)
    }
  }

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentPhoto > 0) {
      setCurrentPhoto(currentPhoto - 1)
    } else {
      setCurrentPhoto(profile.photos.length - 1)
    }
  }

  return (
    <Card className="overflow-hidden rounded-3xl shadow-xl border-0" onClick={() => setShowDetails(!showDetails)}>
      <div className="relative aspect-[3/4] w-full">
        <img
          src={profile.photos[currentPhoto] || "/placeholder.svg"}
          alt={profile.name}
          className="w-full h-full object-cover"
        />

        {/* Photo navigation dots */}
        {profile.photos.length > 1 && (
          <div className="absolute top-4 left-0 right-0 flex justify-center gap-1">
            {profile.photos.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full ${index === currentPhoto ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
              ></div>
            ))}
          </div>
        )}

        {/* Photo navigation buttons */}
        {profile.photos.length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white"
              onClick={handlePrevPhoto}
            >
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
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white"
              onClick={handleNextPhoto}
            >
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
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Profile info overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {profile.name}, {profile.age}
              </h2>
              <p className="text-white/80">{profile.distance} miles away</p>
            </div>
            <button
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                setShowDetails(!showDetails)
              }}
            >
              <Info className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Expanded details */}
        {showDetails && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm p-6 overflow-y-auto text-white">
            <h2 className="text-2xl font-bold mb-2">
              {profile.name}, {profile.age}
            </h2>
            <p className="text-white/80 mb-4">{profile.distance} miles away</p>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p>{profile.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

