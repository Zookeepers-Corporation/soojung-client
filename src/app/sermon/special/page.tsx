import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonList from "@/components/sermon/sermon-list"

// TODO: API 연결 후 실제 데이터로 교체
const mockPosts = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `2025년 특별예배 ${i + 1}`,
  date: `2025-01-${String(i + 1).padStart(2, "0")}`,
  excerpt: "특별예배 말씀입니다.",
  href: `/sermon/special/${i + 1}`,
}))

export default function SpecialSermonPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonList title="특별예배" posts={mockPosts} />
      </main>
      <Footer />
    </div>
  )
}
