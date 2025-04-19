import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Lightbulb, MessageSquare, Leaf, ShoppingBag, Share2 } from "lucide-react"
import LevelBadge from "@/components/gamification/level-badge"
import XpProgress from "@/components/gamification/xp-progress"
import KarmaCard from "@/components/gamification/karma-card"
import QuestCard from "@/components/gamification/quest-card"

export default function Home() {
  const features = [
    {
      icon: <MessageSquare className="w-10 h-10 text-indigo-600" />,
      title: "Community",
      description: "Collaborate, discuss issues, share knowledge, and organize events with community members.",
      href: "/community",
      color: "bg-indigo-50 dark:bg-indigo-950",
      textColor: "text-indigo-600 dark:text-indigo-400",
      cta: "Join the Conversation",
    },
    {
      icon: <Share2 className="w-10 h-10 text-purple-600" />,
      title: "Skill Sharing",
      description: "Teach and learn skills from community members. Become a mentor or find one.",
      href: "/skill-sharing",
      color: "bg-purple-50 dark:bg-purple-950",
      textColor: "text-purple-600 dark:text-purple-400",
      cta: "Share Your Skills",
    },
    {
      icon: <ShoppingBag className="w-10 h-10 text-pink-600" />,
      title: "Marketplace",
      description: "Buy and sell products created by community members. Support local crafts.",
      href: "/marketplace",
      color: "bg-pink-50 dark:bg-pink-950",
      textColor: "text-pink-600 dark:text-pink-400",
      cta: "Explore Marketplace",
    },
    {
      icon: <MapPin className="w-10 h-10 text-red-600" />,
      title: "Public Issue Reporting",
      description: "Report local problems with location tags and media. Be a civic hero.",
      href: "/public-issues",
      color: "bg-red-50 dark:bg-red-950",
      textColor: "text-red-600 dark:text-red-400",
      cta: "Report an Issue",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-amber-600" />,
      title: "Welfare Schemes",
      description: "Discover government schemes tailored to your needs. Check eligibility easily.",
      href: "/welfare-schemes",
      color: "bg-amber-50 dark:bg-amber-950",
      textColor: "text-amber-600 dark:text-amber-400",
      cta: "Check Your Benefits",
    },
    {
      icon: <Leaf className="w-10 h-10 text-green-600" />,
      title: "Eco Challenges",
      description: "Participate in environmental tasks. Take challenges and earn eco-karma.",
      href: "/eco-challenges",
      color: "bg-green-50 dark:bg-green-950",
      textColor: "text-green-600 dark:text-green-400",
      cta: "Take a Challenge",
    },
  ]

  const activeQuests = [
    {
      title: "Community Starter",
      description: "Create your first post in the community forum",
      difficulty: "easy",
      reward: 20,
      progress: 0,
      total: 1,
      timeLeft: "6 days left",
      status: "active",
      actionUrl: "/community",
    },
    {
      title: "Eco Warrior",
      description: "Complete your first environmental challenge",
      difficulty: "medium",
      reward: 50,
      progress: 0,
      total: 1,
      timeLeft: "3 days left",
      status: "active",
      actionUrl: "/eco-challenges",
    },
    {
      title: "Civic Hero",
      description: "Report a public issue in your area",
      difficulty: "easy",
      reward: 30,
      progress: 0,
      total: 1,
      timeLeft: "5 days left",
      status: "active",
      actionUrl: "/public-issues",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden md:py-28">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10" />

        {/* Animated background shapes */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-64 h-64 rounded-full top-1/4 left-1/4 bg-indigo-200/30 dark:bg-indigo-900/20 blur-3xl animate-blob" />
          <div className="absolute rounded-full top-1/3 right-1/4 w-72 h-72 bg-purple-200/30 dark:bg-purple-900/20 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute rounded-full bottom-1/4 right-1/3 w-60 h-60 bg-pink-200/30 dark:bg-pink-900/20 blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  ActiSathi – Empowering Communities with Trust & Action!
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-400">
                  Join our gamified community platform that integrates public issue reporting, skill-sharing,
                  marketplace, and eco challenges with a trust-based Karma system.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 min-[400px]:gap-4">
                <Link href="/register">
                  <Button size="lg" className="game-button primary">
                    Join the Movement
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 overflow-hidden bg-gray-200 border-2 border-white rounded-full dark:border-gray-800 dark:bg-gray-700"
                    >
                      <Image src={`https://th.bing.com/th?q=People+Unity+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247`} alt={`User ${i}`} width={32} height={32} />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">1,200+</span> community members
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <Image
                  src="https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-2c64-622f-991e-bf793aea359c/raw?se=2025-04-19T08%3A45%3A16Z&sp=r&sv=2024-08-04&sr=b&scid=ad0a81a7-d475-5f1f-afb4-b282a7bd34f1&skoid=de76bc29-7017-43d4-8d90-7a49512bae0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-18T19%3A27%3A54Z&ske=2025-04-19T19%3A27%3A54Z&sks=b&skv=2024-08-04&sig=zTrSN/PTPrjOx8F2bdZ5fvNkM/tjwYgdWGcciCyPm1c%3D"
                  alt="Community Engagement"
                  width={500}
                  height={500}
                  className="shadow-xl rounded-2xl"
                  priority
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-[200px] dark:bg-gray-800 animate-float">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Issues Reported</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">2,543</div>
                  <div className="flex items-center text-xs text-green-500">+12% this month</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-[200px] dark:bg-gray-800 animate-float float-delay-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Karma Points</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">152K</div>
                  <div className="flex items-center text-xs text-green-500">Growing community</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center mb-12 space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
              Our Features
            </h2>
            <p className="text-gray-600 md:text-xl max-w-[800px] dark:text-gray-400">
              ActiSathi offers a comprehensive suite of tools to empower your community
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href} className="group">
                <div className="h-full overflow-hidden transition-all duration-300 border border-gray-200 rounded-xl hover:shadow-lg dark:border-gray-800 game-card">
                  <div className={`p-6 ${feature.color}`}>
                    <div className="flex flex-col items-center space-y-4 text-center">
                      <div className="p-3 rounded-full bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                        {feature.icon}
                      </div>
                      <h3 className={`text-xl font-bold ${feature.textColor}`}>{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                      <Button className={`game-button primary w-full`}>
                        {feature.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center mb-12 space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl dark:text-white">
              Gamified Experience
            </h2>
            <p className="text-gray-600 md:text-xl max-w-[800px] dark:text-gray-400">
              Earn Karma, level up, and unlock achievements as you contribute to your community
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <KarmaCard karma={450} level={3} nextLevelKarma={600} rank="Community Champion" />

              <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl dark:bg-gray-800 dark:border-gray-700">
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Your Level Progress</h3>
                <div className="flex items-center gap-4 mb-6">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div key={level} className="flex flex-col items-center">
                      <LevelBadge level={level} size="md" showLabel={true} />
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {level <= 3 ? "Unlocked" : "Locked"}
                      </div>
                    </div>
                  ))}
                </div>
                <XpProgress currentXp={450} nextLevelXp={600} level={3} showValues={true} showLevel={true} />
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  You're making great progress! Keep contributing to the community to reach Level 4.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl dark:bg-gray-800 dark:border-gray-700">
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Active Quests</h3>
                <div className="space-y-4">
                  {activeQuests.map((quest, index) => (
                    <QuestCard
                      key={index}
                      title={quest.title}
                      description={quest.description}
                      difficulty={quest.difficulty}
                      reward={quest.reward}
                      timeLeft={quest.timeLeft}
                      progress={quest.progress}
                      total={quest.total}
                      status={quest.status}
                      actionUrl={quest.actionUrl}
                      actionText="Start Quest"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="p-6 text-center border border-indigo-100 shadow-sm bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl dark:from-indigo-900/30 dark:to-indigo-800/30 dark:border-indigo-800">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">2,543</div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">Issues Reported</div>
            </div>
            <div className="p-6 text-center border border-purple-100 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl dark:from-purple-900/30 dark:to-purple-800/30 dark:border-purple-800">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">850+</div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">Skills Shared</div>
            </div>
            <div className="p-6 text-center border border-pink-100 shadow-sm bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl dark:from-pink-900/30 dark:to-pink-800/30 dark:border-pink-800">
              <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">120</div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">Welfare Schemes</div>
            </div>
            <div className="p-6 text-center border border-green-100 shadow-sm bg-gradient-to-br from-green-50 to-green-100 rounded-xl dark:from-green-900/30 dark:to-green-800/30 dark:border-green-800">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">1,200+</div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">Active Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center mb-12 space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl dark:text-white">
              What Our Users Say
            </h2>
            <p className="text-gray-600 md:text-xl max-w-[800px] dark:text-gray-400">
              Hear from people who are already making a difference in their communities
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "ActiSathi has transformed how I interact with my community. I've reported several issues that have been fixed, and I've connected with amazing people.",
                name: "Priya Sharma",
                role: "Community Member",
                level: 3,
                karma: 245,
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                quote:
                  "As a local government official, ActiSathi has been invaluable. The data insights help us allocate resources more effectively, and the community engagement is higher than ever.",
                name: "Rajesh Kumar",
                role: "Municipal Officer",
                level: 4,
                karma: 520,
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                quote:
                  "I've been able to share my web development skills with others in my community, and in return, I've learned gardening from a neighbor. It's a win-win!",
                name: "Anita Desai",
                role: "Software Developer",
                level: 2,
                karma: 180,
                image: "/placeholder.svg?height=80&width=80",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 shadow-md rounded-xl dark:bg-gray-800 dark:border-gray-700 game-card"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <p className="mb-4 text-gray-600 dark:text-gray-400">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="relative">
                      <div className="w-12 h-12 mr-3 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1">
                        <LevelBadge level={testimonial.level} size="sm" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400">{testimonial.karma} Karma</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join the ActiSathi Movement Today
              </h2>
              <p className="mt-4 text-white/80 md:text-xl max-w-[600px]">
                Be part of a growing community that's making a real difference. Together, we can create safer, more
                connected neighborhoods.
              </p>
              <div className="flex flex-col gap-4 mt-8 sm:flex-row">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="text-indigo-600 bg-white hover:bg-white/90">
                    Join Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-bold">Stay Updated</h3>
              <p className="mb-6 text-white/80">
                Subscribe to our newsletter for the latest updates, events, and community initiatives.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  placeholder="Enter your email"
                  className="text-white bg-white/20 border-white/20 placeholder:text-white/50"
                />
                <Button variant="secondary" className="text-indigo-600 bg-white hover:bg-white/90 shrink-0">
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-xs text-white/60">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
