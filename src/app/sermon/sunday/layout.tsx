import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "설교",
  description: "포항수정교회 설교를 듣고 하나님의 말씀을 나눕니다.",
  openGraph: {
    title: "설교 | 포항수정교회",
    description: "포항수정교회 설교를 듣고 하나님의 말씀을 나눕니다.",
    type: "website",
  },
}

export default function SundaySermonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

