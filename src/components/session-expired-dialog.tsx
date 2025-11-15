"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Dialog from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"

export default function SessionExpiredDialog() {
  const router = useRouter()
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("세션이 만료되었습니다. 다시 로그인해주세요.")

  useEffect(() => {
    const handleSessionExpired = (event: CustomEvent<{ message?: string }>) => {
      setMessage(event.detail?.message || "세션이 만료되었습니다. 다시 로그인해주세요.")
      setIsOpen(true)
    }

    window.addEventListener("session-expired", handleSessionExpired as EventListener)
    return () => {
      window.removeEventListener("session-expired", handleSessionExpired as EventListener)
    }
  }, [])

  const handleConfirm = () => {
    setIsOpen(false)
    logout()
    router.push("/login")
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleConfirm}
      message={message}
      confirmText="확인"
      onConfirm={handleConfirm}
    />
  )
}

