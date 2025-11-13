import { ButtonHTMLAttributes, ReactNode } from "react"
import { buttonStyles } from "@/lib/theme"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  children: ReactNode
  className?: string
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center transition-colors duration-200 font-medium"
  
  const variantStyles = {
    primary: `
      bg-[#5E6AD2] text-white
      hover:bg-[#4E5BBD]
      disabled:opacity-50 disabled:cursor-not-allowed
      rounded-lg px-4 h-9 text-[13px]
    `,
    secondary: `
      bg-[rgba(0,0,0,0.05)] text-[#0F1011]
      hover:bg-[rgba(0,0,0,0.08)]
      disabled:opacity-50 disabled:cursor-not-allowed
      rounded-lg px-4 h-9 text-[13px]
    `,
    ghost: `
      bg-transparent text-[#6B7075]
      hover:bg-[rgba(0,0,0,0.05)] hover:text-[#0F1011]
      disabled:opacity-50 disabled:cursor-not-allowed
      rounded-lg px-3 h-9 text-[13px]
    `,
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
