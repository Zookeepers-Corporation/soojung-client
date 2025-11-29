import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "주보",
  description: "포항수정교회 주보를 확인하세요.",
  openGraph: {
    title: "주보 | 포항수정교회",
    description: "포항수정교회 주보를 확인하세요.",
    type: "website",
  },
}

export default function WednesdaySermonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

