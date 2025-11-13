import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonList from "@/components/sermon/sermon-list"

// TODO: API 연결 후 실제 데이터로 교체
const mockPosts = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `2025년 금요기도회 ${i + 1}`,
  date: `2025-01-${String(i + 1).padStart(2, "0")}`,
  excerpt: "금요기도회 말씀입니다.",
  href: `/sermon/friday/${i + 1}`,
}))

export default function FridaySermonPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonList title="금요기도회" posts={mockPosts} />
      </main>
      <Footer />
    </div>
  )
}
