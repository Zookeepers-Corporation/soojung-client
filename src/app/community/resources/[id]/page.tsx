import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonDetail from "@/components/sermon/sermon-detail"
import CommentSection from "@/components/sermon/comment-section"

interface ResourcesDetailPageProps {
  params: {
    id: string
  }
}

// TODO: API 연결 후 실제 데이터로 교체
const getResourcesData = (id: string) => {
  return {
    title: "2025년 설교 자료 모음",
    author: "교회 행정부",
    date: "2025-01-05",
    images: [],
    content: `
      <p>2025년 1월 설교 자료를 다운로드 받으실 수 있습니다.</p>
      <h3>다운로드 파일</h3>
      <ul>
        <li>2025년 1월 첫째 주 설교 자료 (PDF)</li>
        <li>2025년 1월 둘째 주 설교 자료 (PDF)</li>
        <li>2025년 1월 셋째 주 설교 자료 (PDF)</li>
      </ul>
      <p>자료를 다운로드 받으시려면 아래 버튼을 클릭해주세요.</p>
    `,
    downloadUrl: "#", // TODO: 실제 다운로드 URL로 교체
  }
}

export default function ResourcesDetailPage({
  params,
}: ResourcesDetailPageProps) {
  const resource = getResourcesData(params.id)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonDetail
          title={resource.title}
          author={resource.author}
          date={resource.date}
          images={resource.images}
          content={resource.content}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex justify-end">
            <a
              href={resource.downloadUrl}
              download
              className="inline-flex items-center justify-center transition-colors duration-200 font-medium bg-[#5E6AD2] text-white hover:bg-[#4E5BBD] rounded-lg px-4 h-9 text-[13px]"
            >
              자료 다운로드
            </a>
          </div>
        </div>
        <div className="pb-12">
          <CommentSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
