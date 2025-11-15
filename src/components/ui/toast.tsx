"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { Text } from "./typography"

interface ToastProps {
  message: string
  type?: "info" | "success" | "error" | "warning"
  duration?: number
  onClose: () => void
}

export default function Toast({ message, type = "info", duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // 애니메이션 완료 후 제거
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const typeStyles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  }

  if (!isVisible) return null

  return createPortal(
    <div
      className={`fixed top-4 right-4 z-[800] border rounded-lg shadow-lg p-4 min-w-[300px] max-w-[500px] transition-all duration-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} ${typeStyles[type]}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <Text variant="regular" className="flex-1">
          {message}
        </Text>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="text-current opacity-60 hover:opacity-100 transition-opacity"
          aria-label="닫기"
        >
          <X size={18} />
        </button>
      </div>
    </div>,
    document.body
  )
}

// Toast 관리 훅
export function useToast() {
  const [toast, setToast] = useState<{ message: string; type?: "info" | "success" | "error" | "warning" } | null>(null)

  const showToast = (message: string, type?: "info" | "success" | "error" | "warning") => {
    setToast({ message, type })
  }

  const ToastComponent = toast ? (
    <Toast
      message={toast.message}
      type={toast.type}
      onClose={() => setToast(null)}
    />
  ) : null

  return { showToast, ToastComponent }
}

