"use client"

import { useEffect, ReactNode } from "react"
import Button from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/typography"

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  confirmText?: string
  onConfirm?: () => void
  showCancel?: boolean
  cancelText?: string
  onCancel?: () => void
  disabled?: boolean
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  message,
  confirmText = "확인",
  onConfirm,
  showCancel = false,
  cancelText = "취소",
  onCancel,
  disabled = false,
}: DialogProps) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // 배경 클릭으로 닫기 방지 (Dialog 내부 클릭만 허용)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const handleConfirm = () => {
    if (disabled) return
    if (onConfirm) {
      onConfirm()
    } else {
      onClose()
    }
  }

  const handleCancel = () => {
    if (disabled) return
    if (onCancel) {
      onCancel()
    } else {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[700] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "dialog-title" : undefined}
      aria-describedby="dialog-description"
    >
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black/50 z-[699]" />

      {/* Dialog 컨텐츠 */}
      <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full p-6 z-[700]">
        {title && (
          <Heading variant="title4" className="mb-4" id="dialog-title">
            {title}
          </Heading>
        )}

        <Text variant="regular" className="mb-6 text-[#0F1011]" id="dialog-description">
          {message}
        </Text>

        <div className="flex gap-3 justify-end">
          {showCancel && (
            <Button variant="secondary" onClick={handleCancel} disabled={disabled}>
              {cancelText}
            </Button>
          )}
          <Button variant="primary" onClick={handleConfirm} disabled={disabled}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

