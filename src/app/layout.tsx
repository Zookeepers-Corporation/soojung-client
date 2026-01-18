import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import SessionExpiredDialog from "@/components/session-expired-dialog"
import StructuredData from "@/components/structured-data"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://pohangsoojung.com"),
  title: {
    default: "포항수정교회",
    template: "%s | 포항수정교회",
  },
  description: "포항수정교회는 예수 그리스도의 복음으로 가정을 행복하게, 일터가 복되게, 자녀를 지도자로 키워 하나님의 나라를 든든히 세워가는 교회입니다.",
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
    description: "포항수정교회는 예수 그리스도의 복음으로 가정을 행복하게, 일터가 복되게, 자녀를 지도자로 키워 하나님의 나라를 든든히 세워가는 교회입니다.",
    images: [
      {
        url: new URL("/logo-image.png", "https://pohangsoojung.com").toString(),
        width: 1200,
        height: 630,
        alt: "포항수정교회",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/logo.png", sizes: "96x96", type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "포항수정교회",
    description: "포항수정교회는 예수 그리스도의 복음으로 가정을 행복하게, 일터가 복되게, 자녀를 지도자로 키워 하나님의 나라를 든든히 세워가는 교회입니다.",
    images: [new URL("/logo-image.png", "https://pohangsoojung.com").toString()],
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
