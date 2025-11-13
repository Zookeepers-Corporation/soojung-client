import { HTMLAttributes, ReactNode } from "react"
import { cardStyles } from "@/lib/theme"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg"
}

export default function Card({
  children,
  className = "",
  padding = "md",
  ...props
}: CardProps) {
  const paddingStyles = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }

  return (
    <div
      className={`
        bg-white border border-[#E5E7EB] rounded-xl
        shadow-[0px_2px_4px_rgba(0,0,0,0.04)]
        ${paddingStyles[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
