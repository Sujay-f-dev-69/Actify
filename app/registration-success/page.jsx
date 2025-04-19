"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Copy, ArrowRight, Trophy, Star, Sparkles } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import LevelBadge from "@/components/gamification/level-badge"
import XpProgress from "@/components/gamification/xp-progress"

export default function RegistrationSuccessPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [registrationData, setRegistrationData] = useState(null)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Get registration data from localStorage
    const data = localStorage.getItem("registrationSuccess")
    if (!data) {
      router.push("/register")
      return
    }

    try {
      setRegistrationData(JSON.parse(data))

      // Show achievement toast
      setTimeout(() => {
        toast({
          title: "Achievement Unlocked!",
          description: "Welcome to ActiSathi! +50 XP",
          action: (
            <div className="flex items-center justify-center rounded-full bg-amber-100 p-1 dark:bg-amber-900/30">
              <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          ),
        })
      }, 1000)
    } catch (error) {
      console.error("Error parsing registration data:", error)
      router.push("/register")
    }

    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [router, toast])

  const handleCopyUserId = () => {
    if (registrationData?.userId) {
      navigator.clipboard.writeText(registrationData.userId)
      toast({
        title: "User ID copied",
        description: "Your user ID has been copied to clipboard",
      })
    }
  }

  if (!registrationData) {
    return null // Loading or redirecting
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
              }}
            >
              <div
                className="w-4 h-4 rounded-sm"
                style={{
                  backgroundColor: [
                    "#6366F1", // Indigo
                    "#8B5CF6", // Violet
                    "#EC4899", // Pink
                    "#10B981", // Emerald
                    "#F59E0B", // Amber
                  ][Math.floor(Math.random() * 5)],
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center">
              <div className="relative w-10 h-10 mr-2">
                <Image src="/placeholder.svg?height=40&width=40" alt="ActiSathi Logo" fill className="rounded-md" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ActiSathi
              </span>
            </div>
          </Link>
        </div>

        <Card className="shadow-lg border-0 game-card-gradient beginner overflow-visible">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border-4 border-indigo-100 dark:border-indigo-900">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold animate-pulse">
                +1
              </div>
            </div>
          </div>

          <CardHeader className="pt-12 pb-6">
            <CardTitle className="text-center text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Registration Successful!
            </CardTitle>
            <CardDescription className="text-center">Your adventure begins now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-indigo-200 dark:bg-gray-800 dark:border-indigo-800 shadow-sm">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{registrationData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Username</p>
                  <p className="font-medium text-gray-900 dark:text-white">{registrationData.username}</p>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Your User ID</p>
                      <p className="font-medium text-gray-900 dark:text-white">{registrationData.userId}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyUserId}
                      className="h-8 border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-medium text-gray-900 dark:text-white">Your Progress</span>
                </div>
                <LevelBadge level={1} size="sm" showLabel={true} />
              </div>

              <XpProgress currentXp={50} nextLevelXp={100} level={1} />

              <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Karma Points</span>
                </div>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">50</span>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-md text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
              <p className="text-sm">
                Please save your User ID for future reference. You can log in using your username and password.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button className="w-full game-button primary" asChild>
              <Link href="/login">
                Continue to Login <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
              asChild
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
