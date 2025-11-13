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
    title: "2025년 1월 첫째 주 설교",
    author: "담임목사",
    date: "2025-01-05",
    images: [
      "/sermon-image-1.jpg",
      "/sermon-image-2.jpg",
      "/sermon-image-3.jpg",
    ],
    content: `
      <p>하나님의 말씀으로 시작하는 새해입니다.</p>
      <p>이번 주일예배에서는 하나님의 사랑과 은혜에 대해 함께 나누고자 합니다.</p>
      <p>성도 여러분의 많은 참여를 부탁드립니다.</p>
      <h3>본문 말씀</h3>
      <p>요한복음 3장 16절</p>
      <p>"하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라"</p>
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
