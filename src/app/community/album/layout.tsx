import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "갤러리",
  description: "포항수정교회의 다양한 활동과 모임 사진을 확인하세요.",
  openGraph: {
    title: "갤러리 | 포항수정교회",
    description: "포항수정교회의 다양한 활동과 모임 사진을 확인하세요.",
    type: "website",
  },
}

export default function AlbumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

