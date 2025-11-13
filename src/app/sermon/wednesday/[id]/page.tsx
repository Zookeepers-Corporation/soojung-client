import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonDetail from "@/components/sermon/sermon-detail"
import CommentSection from "@/components/sermon/comment-section"

interface SermonDetailPageProps {
  params: {
    id: string
  }
}

// TODO: API 연결 후 실제 데이터로 교체
const getSermonData = (id: string) => {
  return {
    title: "2025년 수요예배 설교",
    author: "담임목사",
    date: "2025-01-08",
    images: ["/sermon-image-1.jpg"],
    content: `
      <p>수요예배 말씀입니다.</p>
      <p>하나님의 말씀을 통해 우리의 믿음을 더욱 견고하게 세워가겠습니다.</p>
    `,
  }
}

export default function SermonDetailPage({ params }: SermonDetailPageProps) {
  const sermon = getSermonData(params.id)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonDetail
          title={sermon.title}
          author={sermon.author}
          date={sermon.date}
          images={sermon.images}
          content={sermon.content}
        />
        <div className="pb-12">
          <CommentSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
