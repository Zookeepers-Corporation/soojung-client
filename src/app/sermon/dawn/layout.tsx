import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "예화",
  description: "포항수정교회 예화 모음입니다.",
  openGraph: {
    title: "예화 | 포항수정교회",
    description: "포항수정교회 예화 모음입니다.",
    type: "website",
  },
}

export default function DawnSermonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

