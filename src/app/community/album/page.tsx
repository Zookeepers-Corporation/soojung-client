import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonList from "@/components/sermon/sermon-list"

// TODO: API 연결 후 실제 데이터로 교체
const mockPosts = [
  {
    id: 1,
    title: "2025년 새해 예배 앨범",
    date: "2025-01-05",
    excerpt: "새해 첫 주일예배의 소중한 순간들을 담았습니다.",
    image: "/album-image-1.jpg",
    href: "/community/album/1",
  },
  {
    id: 2,
    title: "2024년 성탄절 예배 앨범",
    date: "2024-12-25",
    excerpt: "성탄절 예배의 감동적인 순간들입니다.",
    image: "/album-image-2.jpg",
    href: "/community/album/2",
  },
  // 더미 데이터 추가 (나중에 API로 교체)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 3,
    title: `앨범 ${i + 3}`,
    date: `2024-12-${String(i + 20).padStart(2, "0")}`,
    excerpt: "교회 행사 앨범입니다.",
    image: `/album-image-${i + 3}.jpg`,
    href: `/community/album/${i + 3}`,
  })),
]

export default function AlbumPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonList title="앨범" posts={mockPosts} showCategoryTabs={false} />
      </main>
      <Footer />
    </div>
  )
}
