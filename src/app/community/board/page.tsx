import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonList from "@/components/sermon/sermon-list"

// TODO: API 연결 후 실제 데이터로 교체
const mockPosts = [
  {
    id: 1,
    title: "2025년 1월 교회 공지사항",
    date: "2025-01-05",
    excerpt: "새해를 맞이하여 교회 공지사항을 전달드립니다.",
    href: "/community/board/1",
  },
  {
    id: 2,
    title: "새해 예배 안내",
    date: "2025-01-03",
    excerpt: "새해 첫 주일예배에 많은 참석 부탁드립니다.",
    href: "/community/board/2",
  },
  // 더미 데이터 추가 (나중에 API로 교체)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 3,
    title: `게시판 글 ${i + 3}`,
    date: `2025-01-${String(i + 5).padStart(2, "0")}`,
    excerpt: "게시판 내용입니다.",
    href: `/community/board/${i + 3}`,
  })),
]

export default function BoardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonList title="게시판" posts={mockPosts} showCategoryTabs={false} />
      </main>
      <Footer />
    </div>
  )
}
