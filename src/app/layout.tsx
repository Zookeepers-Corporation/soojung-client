import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import SessionExpiredDialog from "@/components/session-expired-dialog"
import "./globals.css"

export const metadata: Metadata = {
  title: "포항수정교회",
  description: "진정한 신앙 공동체, 하나님의 말씀으로 함께 성장합니다.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          {children}
          <SessionExpiredDialog />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
