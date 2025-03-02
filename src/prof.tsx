"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Camera, Plus, X } from "lucide-react"

export default function CreateProfile() {
  const [step, setStep] = useState(1)
  const [photos, setPhotos] = useState<string[]>([])
  const [bio, setBio] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [newInterest, setNewInterest] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleAddPhoto = () => {
    // In a real app, this would open a file picker and upload the image
    // For demo purposes, we'll add a placeholder image
    if (photos.length < 6) {
      const newPhoto = `/placeholder.svg?height=300&width=300&text=Photo ${photos.length + 1}`
      setPhotos([...photos, newPhoto])
    }
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos]
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)
  }

  const handleAddInterest = () => {
    if (newInterest && !interests.includes(newInterest) && interests.length < 10) {
      setInterests([...interests, newInterest])
      setNewInterest("")
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest))
  }

  const handleNextStep = () => {
    if (step === 1 && photos.length < 1) {
      toast({
        title: "Add at least one photo",
        description: "Please add at least one photo to continue.",
        variant: "destructive",
      })
      return
    }

    if (step === 2 && !bio) {
      toast({
        title: "Add a bio",
        description: "Please write a short bio to continue.",
        variant: "destructive",
      })
      return
    }

    if (step === 3 && interests.length < 3) {
      toast({
        title: "Add more interests",
        description: "Please add at least 3 interests to continue.",
        variant: "destructive",
      })
      return
    }

    if (step < 4) {
      setStep(step + 1)
    } else {
      handleCompleteProfile()
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleCompleteProfile = () => {
    setIsLoading(true)

    // Simulate profile creation process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile created!",
        description: "Your profile is now ready. Start exploring!",
        variant: "default",
      })
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-900"
          onClick={handlePrevStep}
          disabled={step === 1}
        >
          Back
        </Button>
        <div className="text-gray-600">Step {step} of 4</div>
        <Button
          variant="ghost"
          className="text-purple-600 hover:text-purple-800"
          onClick={() => router.push("/dashboard")}
        >
          Skip
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Create your profile</h1>
            <p className="mt-2 text-gray-600">
              {step === 1 && "Add some photos to show off your best self"}
              {step === 2 && "Tell others about yourself"}
              {step === 3 && "What are you interested in?"}
              {step === 4 && "Review your profile"}
            </p>

            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full ${
                    i === step
                      ? "bg-gradient-to-r from-pink-500 to-purple-500"
                      : i < step
                        ? "bg-purple-300"
                        : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-100">
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-purple-100">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`Profile photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                      >
                        <X className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  ))}

                  {photos.length < 6 && (
                    <button
                      onClick={handleAddPhoto}
                      className="aspect-square rounded-xl border-2 border-dashed border-purple-200 flex items-center justify-center bg-purple-50 hover:bg-purple-100 transition-colors"
                    >
                      <div className="flex flex-col items-center text-purple-500">
                        <Camera className="h-6 w-6 mb-1" />
                        <span className="text-xs">Add Photo</span>
                      </div>
                    </button>
                  )}
                </div>

                <p className="text-sm text-gray-500 text-center">
                  Add up to 6 photos. The first one will be your main profile picture.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-700">
                    About Me
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Share a bit about yourself, what you're looking for, and what makes you unique..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="min-h-[150px] rounded-xl border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                  <p className="text-sm text-gray-500 text-right">{bio.length}/500 characters</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="interests" className="text-gray-700">
                    Your Interests
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {interests.map((interest) => (
                      <div
                        key={interest}
                        className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full"
                      >
                        <span>{interest}</span>
                        <button onClick={() => handleRemoveInterest(interest)}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      id="interests"
                      placeholder="Add an interest (e.g., Hiking, Movies, Cooking)"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddInterest()}
                      className="rounded-xl border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                    <Button onClick={handleAddInterest} variant="outline" className="border-purple-200 text-purple-700">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-gray-500">Add up to 10 interests to help find better matches.</p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="url(#gradient-check)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10"
                    >
                      <defs>
                        <linearGradient id="gradient-check" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800">Looking good!</h2>

                  <p className="text-gray-600">
                    Your profile is ready to go. You can always edit it later from your settings.
                  </p>
                </div>
              </div>
            )}

            <Button
              onClick={handleNextStep}
              className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-xl py-6"
              disabled={isLoading}
            >
              {isLoading ? "Creating profile..." : step < 4 ? "Continue" : "Complete Profile"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

