import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonList from "@/components/sermon/sermon-list"

// TODO: API 연결 후 실제 데이터로 교체
const mockPosts = [
  {
    id: 1,
    title: "2025년 설교 자료 모음",
    date: "2025-01-05",
    excerpt: "1월 설교 자료를 다운로드 받으실 수 있습니다.",
    href: "/community/resources/1",
  },
  {
    id: 2,
    title: "찬양 악보 모음",
    date: "2025-01-03",
    excerpt: "주일예배에서 사용하는 찬양 악보입니다.",
    href: "/community/resources/2",
  },
  // 더미 데이터 추가 (나중에 API로 교체)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 3,
    title: `자료실 파일 ${i + 3}`,
    date: `2024-12-${String(i + 25).padStart(2, "0")}`,
    excerpt: "다운로드 가능한 자료입니다.",
    href: `/community/resources/${i + 3}`,
  })),
]

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonList title="자료실" posts={mockPosts} showCategoryTabs={false} />
      </main>
      <Footer />
    </div>
  )
}
