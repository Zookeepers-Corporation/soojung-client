import { HTMLAttributes, ReactNode } from "react"
import { typography } from "@/lib/theme"

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  variant?: "title1" | "title2" | "title3" | "title4" | "title5" | "title6" | "title7" | "title8" | "title9"
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

export function Heading({
  variant = "title1",
  children,
  className = "",
  as,
  ...props
}: TypographyProps) {
  const headingStyle = typography.headings[variant]
  const Tag = as || (variant.startsWith("title") ? `h${variant.slice(-1)}` as "h1" : "h1")

  return (
    <Tag
      className={className}
      style={{
        fontSize: headingStyle.size,
        lineHeight: headingStyle.lineHeight,
        letterSpacing: headingStyle.letterSpacing,
        fontWeight: headingStyle.fontWeight,
        fontFamily: 'KimJeongCheolGothic, "Inter Variable", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", sans-serif',
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}

interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  variant?: "micro" | "tiny" | "mini" | "small" | "regular" | "large"
  color?: "primary" | "secondary" | "tertiary" | "quaternary"
  className?: string
  as?: "p" | "span" | "div"
}

export function Text({
  variant = "regular",
  color = "primary",
  children,
  className = "",
  as = "p",
  ...props
}: TextProps) {
  const textStyle = typography.textStyles[variant]
  const colorMap = {
    primary: "#0F1011",
    secondary: "#3E4145",
    tertiary: "#6B7075",
    quaternary: "#A0A4A8",
  }
  const Tag = as

  return (
    <Tag
      className={className}
      style={{
        fontSize: textStyle.size,
        lineHeight: textStyle.lineHeight,
        letterSpacing: textStyle.letterSpacing,
        color: colorMap[color],
        fontFamily: 'KimJeongCheolGothic, "Inter Variable", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", sans-serif',
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}
