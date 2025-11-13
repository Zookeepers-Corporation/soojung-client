import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonList from "@/components/sermon/sermon-list"

// TODO: API 연결 후 실제 데이터로 교체
const mockPosts = [
  {
    id: 1,
    title: "2025년 1월 첫째 주 설교",
    date: "2025-01-05",
    excerpt: "하나님의 말씀으로 시작하는 새해입니다.",
    href: "/sermon/sunday/1",
  },
  {
    id: 2,
    title: "2025년 1월 둘째 주 설교",
    date: "2025-01-12",
    excerpt: "믿음으로 나아가는 한 주가 되기를 바랍니다.",
    href: "/sermon/sunday/2",
  },
  // 더미 데이터 추가 (나중에 API로 교체)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 3,
    title: `2025년 설교 ${i + 3}`,
    date: `2025-01-${String(i + 19).padStart(2, "0")}`,
    excerpt: "하나님의 말씀을 전합니다.",
    href: `/sermon/sunday/${i + 3}`,
  })),
]

export default function SundaySermonPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonList title="주일예배" posts={mockPosts} />
      </main>
      <Footer />
    </div>
  )
}
