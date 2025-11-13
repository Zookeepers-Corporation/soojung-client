import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonDetail from "@/components/sermon/sermon-detail"
import CommentSection from "@/components/sermon/comment-section"

interface AlbumDetailPageProps {
  params: {
    id: string
  }
}

// TODO: API 연결 후 실제 데이터로 교체
const getAlbumData = (id: string) => {
  return {
    title: "2025년 새해 예배 앨범",
    author: "교회 사진부",
    date: "2025-01-05",
    images: [
      "/album-image-1.jpg",
      "/album-image-2.jpg",
      "/album-image-3.jpg",
      "/album-image-4.jpg",
    ],
    content: `
      <p>2025년 새해 첫 주일예배의 소중한 순간들을 담았습니다.</p>
      <p>하나님의 은혜가 가득했던 예배 시간이었습니다.</p>
    `,
  }
}

export default function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  const album = getAlbumData(params.id)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonDetail
          title={album.title}
          author={album.author}
          date={album.date}
          images={album.images}
          content={album.content}
        />
        <div className="pb-12">
          <CommentSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
