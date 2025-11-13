import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonDetail from "@/components/sermon/sermon-detail"
import CommentSection from "@/components/sermon/comment-section"

interface MembersDetailPageProps {
  params: {
    id: string
  }
}

// TODO: API 연결 후 실제 데이터로 교체
const getMembersData = (id: string) => {
  return {
    title: "2025년 1월 성도소식",
    author: "교회 행정부",
    date: "2025-01-05",
    images: [],
    content: `
      <p>성도들의 소식과 나눔을 전달드립니다.</p>
      <h3>이번 달 소식</h3>
      <ul>
        <li>새가족 환영 모임이 성황리에 진행되었습니다.</li>
        <li>성도들의 기도와 나눔이 활발히 이루어지고 있습니다.</li>
        <li>다음 달 행사 준비가 진행 중입니다.</li>
      </ul>
      <p>성도 여러분의 많은 관심과 참여 부탁드립니다.</p>
    `,
  }
}

export default function MembersDetailPage({ params }: MembersDetailPageProps) {
  const members = getMembersData(params.id)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonDetail
          title={members.title}
          author={members.author}
          date={members.date}
          images={members.images}
          content={members.content}
        />
        <div className="pb-12">
          <CommentSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
