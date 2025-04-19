"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Loader2, Upload, X, CheckCircle, Info, Trophy, Award } from "lucide-react"
import LevelBadge from "@/components/gamification/level-badge"

// Mock data for dropdowns
const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

const PROFESSIONS = [
  "Student",
  "Teacher",
  "Doctor",
  "Engineer",
  "Lawyer",
  "Accountant",
  "Farmer",
  "Business Owner",
  "Government Employee",
  "IT Professional",
  "Healthcare Worker",
  "Social Worker",
  "Retired",
  "Homemaker",
  "Other",
]

const ID_TYPES = ["Aadhaar Card", "PAN Card", "Voter ID", "Driving License", "Passport"]

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputGovtId = useRef(null)
  const fileInputCertificate = useRef(null)

  const [activeStep, setActiveStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errors, setErrors] = useState({})

  // Personal Information
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [age, setAge] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Professional Information
  const [profession, setProfession] = useState("")
  const [experience, setExperience] = useState("")
  const [certifications, setCertifications] = useState([])

  // Location Information
  const [locality, setLocality] = useState("")
  const [pincode, setPincode] = useState("")
  const [block, setBlock] = useState("")
  const [district, setDistrict] = useState("")
  const [state, setState] = useState("")

  // Verification Information
  const [idType, setIdType] = useState("")
  const [idNumber, setIdNumber] = useState("")
  const [govtIdDocuments, setGovtIdDocuments] = useState([])

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 0) {
      if (!fullName.trim()) newErrors.fullName = "Full name is required"
      if (!email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email is invalid"
      }
      if (!phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\d{10}$/.test(phone)) {
        newErrors.phone = "Phone number must be 10 digits"
      }
      if (!age.trim()) {
        newErrors.age = "Age is required"
      } else if (isNaN(age) || Number.parseInt(age) < 18) {
        newErrors.age = "Age must be at least 18"
      }
      if (!username.trim()) {
        newErrors.username = "Username is required"
      } else if (username.length < 5) {
        newErrors.username = "Username must be at least 5 characters"
      }
      if (!password) {
        newErrors.password = "Password is required"
      } else if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    } else if (step === 1) {
      if (!profession) newErrors.profession = "Profession is required"
    } else if (step === 2) {
      if (!locality.trim()) newErrors.locality = "Locality/Village is required"
      if (!pincode.trim()) {
        newErrors.pincode = "PIN code is required"
      } else if (!/^\d{6}$/.test(pincode)) {
        newErrors.pincode = "PIN code must be 6 digits"
      }
      if (!district.trim()) newErrors.district = "District is required"
      if (!state) newErrors.state = "State is required"
    } else if (step === 3) {
      if (!idType) newErrors.idType = "ID type is required"
      if (!idNumber.trim()) {
        newErrors.idNumber = "ID number is required"
      } else if (
        (idType === "Aadhaar Card" && !/^\d{12}$/.test(idNumber)) ||
        (idType === "PAN Card" && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(idNumber))
      ) {
        newErrors.idNumber = "Invalid ID number format"
      }
      if (govtIdDocuments.length === 0) {
        newErrors.govtIdDocuments = "Government ID document is required"
      }
      if (!agreeTerms) {
        newErrors.agreeTerms = "You must agree to the terms and conditions"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1)

      // Show gamification toast when moving to next step
      const stepMessages = [
        "Personal details completed! +10 XP",
        "Professional info added! +15 XP",
        "Location details set! +20 XP",
      ]

      if (activeStep < 3) {
        toast({
          title: "Achievement Unlocked!",
          description: stepMessages[activeStep],
          action: (
            <div className="flex items-center justify-center p-1 bg-indigo-100 rounded-full dark:bg-indigo-900/30">
              <Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          ),
        })
      }
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleGovtIdUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    if (govtIdDocuments.length + files.length > 2) {
      toast({
        title: "Too many files",
        description: "You can upload a maximum of 2 government ID documents",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would upload these to a server
    // For this demo, we'll just create object URLs
    const newFiles = files.map((file) => ({
      id: Math.random().toString(36).substring(2),
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }))

    setGovtIdDocuments([...govtIdDocuments, ...newFiles])

    // Show gamification toast for document upload
    toast({
      title: "Document Uploaded!",
      description: "ID document added successfully! +5 XP",
      action: (
        <div className="flex items-center justify-center p-1 bg-green-100 rounded-full dark:bg-green-900/30">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
      ),
    })
  }

  const handleCertificateUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    if (certifications.length + files.length > 3) {
      toast({
        title: "Too many files",
        description: "You can upload a maximum of 3 certification documents",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would upload these to a server
    const newFiles = files.map((file) => ({
      id: Math.random().toString(36).substring(2),
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }))

    setCertifications([...certifications, ...newFiles])

    // Show gamification toast for certification upload
    toast({
      title: "Certification Added!",
      description: "Professional certification uploaded! +15 XP",
      action: (
        <div className="flex items-center justify-center p-1 bg-blue-100 rounded-full dark:bg-blue-900/30">
          <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
      ),
    })
  }

  const handleRemoveGovtId = (id) => {
    setGovtIdDocuments(govtIdDocuments.filter((doc) => doc.id !== id))
  }

  const handleRemoveCertificate = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  const generateUserId = () => {
    // In a real app, this would be generated by the server
    const prefix = "ACT"
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    return `${prefix}${timestamp}${random}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep(activeStep)) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would submit this to your MongoDB backend
      // For demo purposes, we'll simulate a successful registration

      // Generate a unique user ID
      const userId = generateUserId()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Prepare user data for MongoDB
      const userData = {
        userId,
        fullName,
        username,
        email,
        phone,
        age: Number.parseInt(age),
        profession,
        experience,
        location: {
          locality,
          pincode,
          block,
          district,
          state,
        },
        idType,
        idNumber,
        // In a real app, document URLs would be stored after uploading to cloud storage
        // govtIdDocuments: govtIdDocuments.map(doc => doc.url),
        // certifications: certifications.map(cert => cert.url),
        createdAt: new Date().toISOString(),
      }

      console.log("User data to be stored in MongoDB:", userData)

      // Simulate successful registration
      localStorage.setItem(
        "registrationSuccess",
        JSON.stringify({
          userId,
          username,
          fullName,
        }),
      )

      toast({
        title: "Registration successful!",
        description: `Your user ID is ${userId}. Please use your username and password to login.`,
      })

      // Redirect to login page
      router.push("/registration-success")
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "There was an error during registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { title: "Personal Information", description: "Basic details and account setup" },
    { title: "Professional Information", description: "Your occupation and expertise" },
    { title: "Location Details", description: "Where you are located" },
    { title: "Verification", description: "ID verification and final steps" },
  ]

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Join the Adventure</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Create your account and start making a difference</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    index < activeStep
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : index === activeStep
                        ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                        : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                  } ${index < activeStep ? "animate-pulse" : ""}`}
                >
                  {index < activeStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <div className="hidden mt-2 text-xs text-center sm:block">
                  <div
                    className={`font-medium ${
                      index <= activeStep ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`${
                      index <= activeStep ? "text-gray-600 dark:text-gray-400" : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex items-center justify-between mt-2">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-1">
                {index > 0 && (
                  <div
                    className={`h-1 flex-1 ${
                      index <= activeStep ? "bg-indigo-600 dark:bg-indigo-400" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 ${
                      index < activeStep ? "bg-indigo-600 dark:bg-indigo-400" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-0 shadow-lg game-card-gradient beginner">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{steps[activeStep].title}</CardTitle>
                <CardDescription>{steps[activeStep].description}</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Registration Progress</div>
                  <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {Math.round(((activeStep + 1) / steps.length) * 100)}%
                  </div>
                </div>
                <LevelBadge level={1} size="sm" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {activeStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">
                        Age <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        min="18"
                        max="120"
                        placeholder="Your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className={errors.age ? "border-red-500" : ""}
                      />
                      {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">
                        Username <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="username"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
                        className={errors.username ? "border-red-500" : ""}
                      />
                      {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                      {!errors.username && username && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">You will use this username to log in</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">
                        Password <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
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

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm Password <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={errors.confirmPassword ? "border-red-500" : ""}
                      />
                      {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Professional Information */}
              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profession">
                      Profession <span className="text-red-500">*</span>
                    </Label>
                    <Select value={profession} onValueChange={setProfession}>
                      <SelectTrigger className={errors.profession ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select your profession" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROFESSIONS.map((prof) => (
                          <SelectItem key={prof} value={prof}>
                            {prof}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.profession && <p className="text-sm text-red-500">{errors.profession}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      max="70"
                      placeholder="Years of experience in your profession"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Professional Certifications (Optional)</Label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {certifications.map((cert) => (
                        <div
                          key={cert.id}
                          className="relative h-32 overflow-hidden transition-all duration-300 bg-white border border-indigo-200 rounded-md shadow-sm dark:bg-gray-800 dark:border-indigo-800 hover:shadow-md"
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                            <div className="flex items-center justify-center w-10 h-10 mb-2 bg-indigo-100 rounded-full dark:bg-indigo-900/30">
                              <Upload className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <p className="w-full text-sm text-center text-gray-700 truncate dark:text-gray-300">
                              {cert.name}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveCertificate(cert.id)}
                            className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      {certifications.length < 3 && (
                        <div className="relative flex flex-col items-center justify-center h-32 text-indigo-500 transition-colors duration-300 border-2 border-indigo-300 border-dashed rounded-md dark:border-indigo-700 dark:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-600">
                          <Upload className="w-8 h-8 mb-2 animate-bounce" />
                          <span className="px-2 text-sm text-center">Upload certification</span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">PDF, JPG, PNG (Max 5MB)</span>
                          <input
                            type="file"
                            ref={fileInputCertificate}
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleCertificateUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Upload certifications or qualifications related to your profession (if available)
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Location Details */}
              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="locality">
                        Locality/Village <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="locality"
                        placeholder="Your village or locality"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        className={errors.locality ? "border-red-500" : ""}
                      />
                      {errors.locality && <p className="text-sm text-red-500">{errors.locality}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">
                        PIN Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="pincode"
                        placeholder="6-digit PIN code"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className={errors.pincode ? "border-red-500" : ""}
                      />
                      {errors.pincode && <p className="text-sm text-red-500">{errors.pincode}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="block">Block/Tehsil</Label>
                      <Input
                        id="block"
                        placeholder="Your block or tehsil"
                        value={block}
                        onChange={(e) => setBlock(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="district">
                        District <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="district"
                        placeholder="Your district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className={errors.district ? "border-red-500" : ""}
                      />
                      {errors.district && <p className="text-sm text-red-500">{errors.district}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Select value={state} onValueChange={setState}>
                        <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATES.map((stateName) => (
                            <SelectItem key={stateName} value={stateName}>
                              {stateName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Verification */}
              {activeStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="idType">
                          Government ID Type <span className="text-red-500">*</span>
                        </Label>
                        <Select value={idType} onValueChange={setIdType}>
                          <SelectTrigger className={errors.idType ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                          <SelectContent>
                            {ID_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.idType && <p className="text-sm text-red-500">{errors.idType}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="idNumber">
                          ID Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="idNumber"
                          placeholder={
                            idType === "Aadhaar Card"
                              ? "12-digit Aadhaar number"
                              : idType === "PAN Card"
                                ? "10-character PAN"
                                : "ID number"
                          }
                          value={idNumber}
                          onChange={(e) => setIdNumber(e.target.value)}
                          className={errors.idNumber ? "border-red-500" : ""}
                        />
                        {errors.idNumber && <p className="text-sm text-red-500">{errors.idNumber}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Upload Government ID <span className="text-red-500">*</span>
                      </Label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {govtIdDocuments.map((doc) => (
                          <div
                            key={doc.id}
                            className="relative h-32 overflow-hidden transition-all duration-300 bg-white border border-indigo-200 rounded-md shadow-sm dark:bg-gray-800 dark:border-indigo-800 hover:shadow-md"
                          >
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                              <div className="flex items-center justify-center w-10 h-10 mb-2 bg-indigo-100 rounded-full dark:bg-indigo-900/30">
                                <Upload className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                              </div>
                              <p className="w-full text-sm text-center text-gray-700 truncate dark:text-gray-300">
                                {doc.name}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveGovtId(doc.id)}
                              className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}

                        {govtIdDocuments.length < 2 && (
                          <div className="relative flex flex-col items-center justify-center h-32 text-indigo-500 transition-colors duration-300 border-2 border-indigo-300 border-dashed rounded-md dark:border-indigo-700 dark:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-600">
                            <Upload className="w-8 h-8 mb-2 animate-bounce" />
                            <span className="px-2 text-sm text-center">Upload ID document</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">PDF, JPG, PNG (Max 5MB)</span>
                            <input
                              type="file"
                              ref={fileInputGovtId}
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleGovtIdUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                      {errors.govtIdDocuments && <p className="text-sm text-red-500">{errors.govtIdDocuments}</p>}
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Upload front and back of your government ID for verification
                      </p>
                    </div>

                    <div className="p-4 border border-indigo-100 rounded-md bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-800">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Info className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
                            Verification Information
                          </h3>
                          <div className="mt-2 text-sm text-indigo-700 dark:text-indigo-400">
                            <ul className="pl-5 space-y-1 list-disc">
                              <li>Your ID will be used only for verification purposes</li>
                              <li>We follow strict security protocols to protect your data</li>
                              <li>Verification usually takes 24-48 hours</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <Checkbox
                          id="terms"
                          checked={agreeTerms}
                          onCheckedChange={setAgreeTerms}
                          className={errors.agreeTerms ? "border-red-500" : ""}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <Label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
                          I agree to the{" "}
                          <Link href="/terms" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                            Privacy Policy
                          </Link>
                        </Label>
                        {errors.agreeTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeTerms}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={activeStep === 0 ? () => router.push("/login") : handleBack}
              disabled={isSubmitting}
              className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
            >
              {activeStep === 0 ? "Cancel" : "Back"}
            </Button>

            {activeStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNext} className="game-button primary">
                Continue
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={isSubmitting} className="game-button success">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
