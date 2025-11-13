import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonDetail from "@/components/sermon/sermon-detail"
import CommentSection from "@/components/sermon/comment-section"

interface BoardDetailPageProps {
  params: {
    id: string
  }
}

// TODO: API 연결 후 실제 데이터로 교체
const getBoardData = (id: string) => {
  return {
    title: "2025년 1월 교회 공지사항",
    author: "교회 행정부",
    date: "2025-01-05",
    images: [],
    content: `
      <p>새해를 맞이하여 교회 공지사항을 전달드립니다.</p>
      <h3>주요 일정</h3>
      <ul>
        <li>1월 첫째 주: 새해 예배</li>
        <li>1월 둘째 주: 교회 총회</li>
        <li>1월 셋째 주: 전도 집회</li>
      </ul>
      <p>성도 여러분의 많은 참여를 부탁드립니다.</p>
    `,
  }
}

export default function BoardDetailPage({ params }: BoardDetailPageProps) {
  const board = getBoardData(params.id)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonDetail
          title={board.title}
          author={board.author}
          date={board.date}
          images={board.images}
          content={board.content}
        />
        <div className="pb-12">
          <CommentSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
