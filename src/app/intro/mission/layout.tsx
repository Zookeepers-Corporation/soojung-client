import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "사명선언문",
  description: "포항수정교회의 사명선언문입니다.",
}

export default function MissionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

