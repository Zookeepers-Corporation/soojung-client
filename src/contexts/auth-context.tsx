"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { UserLoginResponse } from "@/types/api"

interface AuthContextType {
  isLoggedIn: boolean
  user: UserLoginResponse | null
  isInitialized: boolean // 초기 로드 완료 여부
  login: (userData: UserLoginResponse) => void
  logout: () => void
  checkSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USER_STORAGE_KEY = "user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserLoginResponse | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()

  // 초기 로드 시 세션 스토리지에서 사용자 정보 복원
  useEffect(() => {
    const storedUser = sessionStorage.getItem(USER_STORAGE_KEY)
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser) as UserLoginResponse
        setIsLoggedIn(true)
        setUser(userData)
      } catch (error) {
        // 저장된 데이터가 유효하지 않으면 삭제
        sessionStorage.removeItem(USER_STORAGE_KEY)
      }
    }
    // 초기화 완료 표시
    setIsInitialized(true)
  }, [])

  // 세션 만료 이벤트 리스너
  useEffect(() => {
    const handleSessionExpired = (event: CustomEvent) => {
      setIsLoggedIn(false)
      setUser(null)
      sessionStorage.removeItem(USER_STORAGE_KEY)
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
    // 세션 스토리지에 저장
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
  }

  const logout = async () => {
    setIsLoggedIn(false)
    setUser(null)
    // 세션 스토리지에서 삭제
    sessionStorage.removeItem(USER_STORAGE_KEY)
    
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
    // 세션 스토리지에서 확인
    const storedUser = sessionStorage.getItem(USER_STORAGE_KEY)
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser) as UserLoginResponse
        setIsLoggedIn(true)
        setUser(userData)
      } catch (error) {
        sessionStorage.removeItem(USER_STORAGE_KEY)
        setIsLoggedIn(false)
        setUser(null)
      }
    } else {
      setIsLoggedIn(false)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isInitialized, login, logout, checkSession }}>
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

