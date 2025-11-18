import { InputHTMLAttributes, forwardRef } from "react"
import { inputStyles } from "@/lib/theme"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#0F1011] mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-white border border-[#E5E7EB] rounded-lg
            px-3 py-2 text-[0.9375rem] text-[#0F1011]
            focus:border-[#5E6AD2] focus:outline-none focus:ring-2 focus:ring-[rgba(94,106,210,0.2)]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-[#EB5757]" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[#EB5757]">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
