"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  User,
  MapPin,
  Calendar,
  Edit,
  Settings,
  FileText,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Award,
  Leaf,
  ShoppingBag,
  Lightbulb,
} from "lucide-react"
import AchievementBadge from "@/components/gamification/achievement-badge"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // Calculate progress to next level
  const nextLevelPoints = user.level * 200
  const progress = Math.round((user.karma / nextLevelPoints) * 100)

  // Mock data for profile sections
  const recentActivities = [
    {
      id: 1,
      type: "hazard",
      title: "Reported a pothole on Main Street",
      date: "2 days ago",
      status: "verified",
      karma: 15,
    },
    {
      id: 2,
      type: "skill",
      title: "Offered web development help",
      date: "1 week ago",
      status: "active",
      karma: 10,
    },
    {
      id: 3,
      type: "community",
      title: "Commented on 'Park Cleanup Initiative'",
      date: "2 weeks ago",
      status: "completed",
      karma: 5,
    },
    {
      id: 4,
      type: "eco",
      title: "Completed 'Plant a Tree' challenge",
      date: "3 weeks ago",
      status: "verified",
      karma: 50,
    },
    {
      id: 5,
      type: "welfare",
      title: "Helped Ramesh apply for PM Kisan scheme",
      date: "1 month ago",
      status: "completed",
      karma: 20,
    },
  ]

  const badges = [
    {
      id: 1,
      name: "First Report",
      description: "Submitted your first hazard report",
      icon: AlertTriangle,
      earned: true,
      date: "Jan 20, 2023",
    },
    {
      id: 2,
      name: "Helpful Neighbor",
      description: "Helped 5 community members",
      icon: User,
      earned: true,
      date: "Feb 15, 2023",
    },
    {
      id: 3,
      name: "Problem Solver",
      description: "10 of your reported issues were resolved",
      icon: CheckCircle,
      earned: true,
      date: "Mar 10, 2023",
    },
    {
      id: 4,
      name: "Community Leader",
      description: "Started a discussion with 50+ participants",
      icon: MessageSquare,
      earned: false,
    },
    {
      id: 5,
      name: "Eco Warrior",
      description: "Completed 3 eco challenges",
      icon: Leaf,
      earned: true,
      date: "Apr 5, 2023",
    },
    {
      id: 6,
      name: "Scheme Navigator",
      description: "Applied for 2+ welfare schemes",
      icon: Lightbulb,
      earned: true,
      date: "May 12, 2023",
    },
    {
      id: 7,
      name: "Marketplace Maven",
      description: "Listed 5+ items in the marketplace",
      icon: ShoppingBag,
      earned: false,
      progress: 2,
      total: 5,
    },
    {
      id: 8,
      name: "Skill Guru",
      description: "Shared 5 skills with the community",
      icon: Award,
      earned: false,
      progress: 1,
      total: 5,
    },
  ]

  const stats = [
    { label: "Hazards Reported", value: 12 },
    { label: "Skills Offered", value: 3 },
    { label: "Forum Posts", value: 8 },
    { label: "Issues Resolved", value: 7 },
    { label: "Eco Challenges", value: 3 },
    { label: "Welfare Applications", value: 2 },
  ]

  const skills = [
    { name: "Web Development", endorsements: 5 },
    { name: "Graphic Design", endorsements: 3 },
    { name: "Content Writing", endorsements: 2 },
  ]

  const interests = ["Environment", "Technology", "Community Service", "Education"]

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white ring-2 ring-indigo-100 dark:border-gray-800 dark:ring-gray-700">
                    <Image
                      src={user.avatar || "/placeholder.svg?height=96&width=96"}
                      alt={user.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <Badge className="absolute -bottom-2 -right-2 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600">
                    Level {user.level}
                  </Badge>
                </div>

                <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>

                <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.location || "Location not set"}</span>
                </div>

                <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Joined {user.joinedDate}</span>
                </div>

                <div className="mt-6 w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{user.karma} Karma</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {nextLevelPoints} needed for Level {user.level + 1}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/profile/edit">
                      <Edit className="h-4 w-4 mr-2" /> Edit Profile
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" /> Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <Badge variant="outline" className="flex items-center">
                      <Award className="h-3 w-3 mr-1 text-indigo-500" />
                      <span>{skill.endorsements} endorsements</span>
                    </Badge>
                  </div>
                ))}
                {skills.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">No skills added yet</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <Badge key={index} variant="outline">
                    {interest}
                  </Badge>
                ))}
                {interests.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No interests added yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    {user.bio || "No bio information added yet. Click 'Edit Profile' to add your bio."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.slice(0, 3).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800"
                      >
                        <div
                          className={`p-2 rounded-full ${
                            activity.type === "hazard"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                              : activity.type === "skill"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                : activity.type === "eco"
                                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                  : activity.type === "welfare"
                                    ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                    : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                          }`}
                        >
                          {activity.type === "hazard" ? (
                            <AlertTriangle className="h-5 w-5" />
                          ) : activity.type === "skill" ? (
                            <FileText className="h-5 w-5" />
                          ) : activity.type === "eco" ? (
                            <Leaf className="h-5 w-5" />
                          ) : activity.type === "welfare" ? (
                            <Lightbulb className="h-5 w-5" />
                          ) : (
                            <MessageSquare className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">{activity.title}</div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</div>
                            <Badge variant="outline" className="text-xs">
                              +{activity.karma} Karma
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("activities")}>
                    View All Activities
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {badges
                      .filter((badge) => badge.earned)
                      .slice(0, 4)
                      .map((badge) => (
                        <div key={badge.id} className="flex flex-col items-center text-center">
                          <AchievementBadge
                            name={badge.name}
                            description={badge.description}
                            icon={badge.icon}
                            status="unlocked"
                          />
                        </div>
                      ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("badges")}>
                    View All Badges
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Activities</CardTitle>
                  <CardDescription>Your recent actions and contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800"
                      >
                        <div
                          className={`p-2 rounded-full ${
                            activity.type === "hazard"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                              : activity.type === "skill"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                : activity.type === "eco"
                                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                  : activity.type === "welfare"
                                    ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                    : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                          }`}
                        >
                          {activity.type === "hazard" ? (
                            <AlertTriangle className="h-5 w-5" />
                          ) : activity.type === "skill" ? (
                            <FileText className="h-5 w-5" />
                          ) : activity.type === "eco" ? (
                            <Leaf className="h-5 w-5" />
                          ) : activity.type === "welfare" ? (
                            <Lightbulb className="h-5 w-5" />
                          ) : (
                            <MessageSquare className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">{activity.title}</div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  activity.status === "verified"
                                    ? "default"
                                    : activity.status === "active"
                                      ? "outline"
                                      : "secondary"
                                }
                                className="text-xs"
                              >
                                {activity.status}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                +{activity.karma} Karma
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Badges</CardTitle>
                  <CardDescription>Achievements you've earned through your contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {badges.map((badge) => (
                      <div key={badge.id} className="flex flex-col items-center text-center">
                        <AchievementBadge
                          name={badge.name}
                          description={badge.description}
                          icon={badge.icon}
                          status={badge.earned ? "unlocked" : "locked"}
                          progress={badge.progress}
                          total={badge.total}
                        />
                        {badge.earned && (
                          <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                            Earned on {badge.date}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
