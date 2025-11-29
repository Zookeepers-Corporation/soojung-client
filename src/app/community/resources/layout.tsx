import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "교회학교행사",
  description: "포항수정교회 교회학교행사를 확인하세요.",
  openGraph: {
    title: "교회학교행사 | 포항수정교회",
    description: "포항수정교회 교회학교행사를 확인하세요.",
    type: "website",
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
