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
    title: "2025년 새벽기도회 설교",
    author: "담임목사",
    date: "2025-01-09",
    images: [],
    content: `
      <p>새벽기도회 말씀입니다.</p>
      <p>새벽에 하나님 앞에 나아가 기도하며 하루를 시작합니다.</p>
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
