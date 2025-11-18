import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "금요기도회",
  description: "포항수정교회 금요기도회 설교를 듣고 하나님의 말씀을 나눕니다.",
  openGraph: {
    title: "금요기도회 | 포항수정교회",
    description: "포항수정교회 금요기도회 설교를 듣고 하나님의 말씀을 나눕니다.",
    type: "website",
  },
}

export default function FridaySermonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

