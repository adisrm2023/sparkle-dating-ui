import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="space-y-6 max-w-md">
          <div className="relative h-24 w-24 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse blur-xl opacity-70"></div>
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12"
              >
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Sparkle
          </h1>

          <p className="text-lg text-gray-600">
            Find your perfect match with our colorful, fun, and intuitive dating experience
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-full py-6">
                Create Account
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-medium rounded-full py-6"
              >
                Log In
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 pt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

