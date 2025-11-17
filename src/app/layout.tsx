import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import SessionExpiredDialog from "@/components/session-expired-dialog"
import StructuredData from "@/components/structured-data"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pohangsoojung.com"),
  title: {
    default: "포항수정교회",
    template: "%s | 포항수정교회",
  },
  description: "진정한 신앙 공동체, 하나님의 말씀으로 함께 성장합니다. 포항수정교회는 성령충만한 이들이 용사로 세워지는 교회입니다.",
  keywords: [
    "포항수정교회",
    "포항 교회",
    "수정교회",
    "기독교",
    "개신교",
    "대한예수교장로회",
    "예배",
    "설교",
    "교회소식",
    "성도소식",
    "주일예배",
    "수요예배",
    "금요기도회",
    "새벽기도회",
    "김재곤",
    "김재곤 목사",
    "두호동 교회",
    "포항 두호동 교회",
    "포항 두호동 대한예수교장로회 교회"
  ],
  authors: [{ name: "포항수정교회" }],
  creator: "포항수정교회",
  publisher: "포항수정교회",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "포항수정교회",
    title: "포항수정교회",
    description: "진정한 신앙 공동체, 하나님의 말씀으로 함께 성장합니다.",
    images: [
      {
        url: "/logo-image.png",
        width: 1200,
        height: 630,
        alt: "포항수정교회",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "포항수정교회",
    description: "진정한 신앙 공동체, 하나님의 말씀으로 함께 성장합니다.",
    images: ["/logo-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/church_mark.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-icon.png",
  },
  verification: {
    // Google Search Console 등에서 제공받은 verification code를 추가할 수 있습니다
    // google: "verification-code",
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
        <StructuredData />
        <AuthProvider>
          {children}
          <SessionExpiredDialog />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
