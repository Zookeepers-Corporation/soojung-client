import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "자유게시판",
  description: "포항수정교회 자유게시판에서 성도들과 소통하고 나눕니다.",
  openGraph: {
    title: "자유게시판 | 포항수정교회",
    description: "포항수정교회 자유게시판에서 성도들과 소통하고 나눕니다.",
    type: "website",
  },
}

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

