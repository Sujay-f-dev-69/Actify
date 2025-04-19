/**
 * Service for interacting with the Karma System API
 */

// Base URL for the Karma API
const API_BASE_URL = process.env.NEXT_PUBLIC_KARMA_API_URL || "http://localhost:8000"

// Types
export interface KarmaResponse {
  points: number
  level: number
  nextLevelPoints: number
  badges: Badge[]
  rank: string
}

export interface Badge {
  id: number
  name: string
  description: string
  icon: string
  earned: boolean
  points: number
}

export interface KarmaCashResponse {
  balance: number
  transactions: KarmaCashTransaction[]
}

export interface KarmaCashTransaction {
  id: string
  amount: number
  type: "EARN" | "REDEEM"
  description: string
  timestamp: string
}

export interface RewardItem {
  id: number
  name: string
  description: string
  points: number
  image: string
}

// API functions
export async function getUserKarma(userId: string): Promise<KarmaResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/karma/${userId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch karma: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching karma:", error)
    // Return default values if API fails
    return {
      points: 0,
      level: 1,
      nextLevelPoints: 100,
      badges: [],
      rank: "Newcomer",
    }
  }
}

export async function getUserKarmaCash(userId: string): Promise<KarmaCashResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/karma-cash/${userId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch karma cash: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching karma cash:", error)
    // Return default values if API fails
    return {
      balance: 0,
      transactions: [],
    }
  }
}

export async function getRewards(): Promise<RewardItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/karma-cash/rewards`)

    if (!response.ok) {
      throw new Error(`Failed to fetch rewards: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching rewards:", error)
    return []
  }
}

export async function redeemReward(userId: string, rewardId: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/karma-cash/redeem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        rewardId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to redeem reward: ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error("Error redeeming reward:", error)
    return false
  }
}

export async function recordKarmaAction(
  userId: string,
  actionType: string,
  context: Record<string, any>,
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/karma/action`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        actionType,
        context,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to record karma action: ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error("Error recording karma action:", error)
    return false
  }
}

export async function getLeaderboard(category = "overall", limit = 10): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/leaderboard?category=${category}&limit=${limit}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch leaderboard: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return []
  }
}
