"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Loader2, Trophy } from "lucide-react"
import LevelBadge from "@/components/gamification/level-badge"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const redirectPath = searchParams.get("redirect") || "/"

  const [usernameOrEmail, setUsernameOrEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or email is required"
    }

    if (!password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would make an API call to your MongoDB backend
      // For demo purposes, we'll simulate a successful login

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful login
      const mockUser = {
        userId: "ACT123456789",
        username: usernameOrEmail,
        fullName: "Demo User",
        email: "demo@example.com",
        phone: "9876543210",
        age: 28,
        profession: "Software Developer",
        location: {
          locality: "Green Park",
          pincode: "110016",
          district: "South Delhi",
          state: "Delhi",
        },
        karma: 120,
        level: 2,
        avatar: "/placeholder.svg?height=200&width=200",
      }

      // Store user data and token in localStorage
      localStorage.setItem("user", JSON.stringify(mockUser))
      localStorage.setItem("token", "mock-jwt-token-" + Math.random().toString(36).substring(2))

      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.fullName}! +5 XP`,
        action: (
          <div className="flex items-center justify-center p-1 bg-green-100 rounded-full dark:bg-green-900/30">
            <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
        ),
      })

      // Redirect to the requested page or home
      router.push(redirectPath)
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center">
              <div className="relative w-10 h-10 mr-2">
                <Image src="/placeholder.svg?height=40&width=40" alt="ActiSathi Logo" fill className="rounded-md" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                ActiSathi
              </span>
            </div>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to your ActiSathi account</p>
        </div>

        <Card className="border-0 shadow-lg game-card-gradient intermediate">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Sign In</CardTitle>
              <LevelBadge level={2} size="sm" />
            </div>
            <CardDescription>Continue your community journey</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="usernameOrEmail">Username or Email</Label>
                <Input
                  id="usernameOrEmail"
                  placeholder="Enter your username or email"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className={errors.usernameOrEmail ? "border-red-500" : ""}
                />
                {errors.usernameOrEmail && <p className="text-sm text-red-500">{errors.usernameOrEmail}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="flex items-center">
                <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={setRememberMe} />
                <Label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" disabled={isSubmitting} className="w-full game-button primary">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
