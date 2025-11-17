import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "교회소식",
  description: "포항수정교회의 최신 소식과 공지를 확인하세요.",
  openGraph: {
    title: "교회소식 | 포항수정교회",
    description: "포항수정교회의 최신 소식과 공지를 확인하세요.",
    type: "website",
  },
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

