import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonList from "@/components/sermon/sermon-list"
import Button from "@/components/ui/button"
import Link from "next/link"

// TODO: API 연결 후 실제 데이터로 교체
const mockPosts = [
  {
    id: 1,
    title: "2025년 1월 성도소식",
    date: "2025-01-05",
    excerpt: "성도들의 소식과 나눔을 전달드립니다.",
    href: "/intro/members/1",
  },
  {
    id: 2,
    title: "새가족 환영 모임",
    date: "2025-01-03",
    excerpt: "새로 오신 성도들을 환영하는 모임이 진행되었습니다.",
    href: "/intro/members/2",
  },
  // 더미 데이터 추가 (나중에 API로 교체)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 3,
    title: `성도소식 ${i + 3}`,
    date: `2025-01-${String(i + 5).padStart(2, "0")}`,
    excerpt: "성도소식 내용입니다.",
    href: `/intro/members/${i + 3}`,
  })),
]

export default function MembersPage() {
  const customTabs = (
    <div className="flex justify-center gap-4">
      <Link href="/intro/news">
        <Button variant="secondary">교회소식</Button>
      </Link>
      <Link href="/intro/members">
        <Button variant="primary">성도소식</Button>
      </Link>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonList
          title="성도소식"
          posts={mockPosts}
          showCategoryTabs={false}
          customTabs={customTabs}
        />
      </main>
      <Footer />
    </div>
  )
}
