import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonList from "@/components/sermon/sermon-list"
import Button from "@/components/ui/button"
import Link from "next/link"

// TODO: API 연결 후 실제 데이터로 교체
const mockPosts = [
  {
    id: 1,
    title: "2025년 1월 교회소식",
    date: "2025-01-05",
    excerpt: "새해를 맞이하여 교회의 다양한 소식을 전달드립니다.",
    href: "/intro/news/1",
  },
  {
    id: 2,
    title: "2025년 교회 행사 안내",
    date: "2025-01-03",
    excerpt: "이번 달 진행되는 교회 행사 일정을 안내드립니다.",
    href: "/intro/news/2",
  },
  // 더미 데이터 추가 (나중에 API로 교체)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 3,
    title: `교회소식 ${i + 3}`,
    date: `2025-01-${String(i + 5).padStart(2, "0")}`,
    excerpt: "교회소식 내용입니다.",
    href: `/intro/news/${i + 3}`,
  })),
]

export default function NewsPage() {
  const customTabs = (
    <div className="flex justify-center gap-4">
      <Link href="/intro/news">
        <Button variant="primary">교회소식</Button>
      </Link>
      <Link href="/intro/members">
        <Button variant="secondary">성도소식</Button>
      </Link>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonList
          title="교회소식"
          posts={mockPosts}
          showCategoryTabs={false}
          customTabs={customTabs}
        />
      </main>
      <Footer />
    </div>
  )
}
