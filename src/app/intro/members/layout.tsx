import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "성도소식",
  description: "포항수정교회 성도들의 소식과 나눔을 확인하세요.",
  openGraph: {
    title: "성도소식 | 포항수정교회",
    description: "포항수정교회 성도들의 소식과 나눔을 확인하세요.",
    type: "website",
  },
}

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

