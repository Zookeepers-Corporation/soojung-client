"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { UserLoginResponse } from "@/types/api"

interface AuthContextType {
  isLoggedIn: boolean
  user: UserLoginResponse | null
  login: (userData: UserLoginResponse) => void
  logout: () => void
  checkSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserLoginResponse | null>(null)
  const router = useRouter()

  // 초기 로드 시 세션 확인
  useEffect(() => {
    checkSession()
  }, [])

  // 세션 만료 이벤트 리스너
  useEffect(() => {
    const handleSessionExpired = (event: CustomEvent) => {
      setIsLoggedIn(false)
      setUser(null)
      // 세션 만료 Dialog는 전역에서 처리
    }

    window.addEventListener("session-expired", handleSessionExpired as EventListener)
    return () => {
      window.removeEventListener("session-expired", handleSessionExpired as EventListener)
    }
  }, [])

  const login = (userData: UserLoginResponse) => {
    setIsLoggedIn(true)
    setUser(userData)
  }

  const logout = async () => {
    setIsLoggedIn(false)
    setUser(null)
    
    // 로그아웃 API 호출 (세션 삭제)
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
      await fetch(`${API_URL}/v1/users/logout`, {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      // 로그아웃 API 실패해도 클라이언트 상태는 초기화
      console.error("로그아웃 API 호출 실패:", error)
    }
    
    router.push("/")
  }

  const checkSession = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
      const response = await fetch(`${API_URL}/v1/users/me`, {
        method: "GET",
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        if (data.code === 200 && data.data) {
          setIsLoggedIn(true)
          setUser(data.data)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
    } catch (error) {
      // 세션 확인 실패 시 로그인하지 않은 것으로 처리
      setIsLoggedIn(false)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, checkSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

