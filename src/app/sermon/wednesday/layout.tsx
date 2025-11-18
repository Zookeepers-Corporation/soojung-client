import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "수요예배",
  description: "포항수정교회 수요예배 설교를 듣고 하나님의 말씀을 나눕니다.",
  openGraph: {
    title: "수요예배 | 포항수정교회",
    description: "포항수정교회 수요예배 설교를 듣고 하나님의 말씀을 나눕니다.",
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

