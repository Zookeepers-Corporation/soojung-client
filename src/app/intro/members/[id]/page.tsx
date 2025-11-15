"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonDetail from "@/components/sermon/sermon-detail"
import CommentSection from "@/components/sermon/comment-section"
import { getBoardDetail, ApiError } from "@/lib/api"
import { BoardDetailResponse, API_ERROR_CODES } from "@/types/api"

interface MembersDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function MembersDetailPage({ params }: MembersDetailPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [board, setBoard] = useState<BoardDetailResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await getBoardDetail(id)
        if (response.data) {
          setBoard(response.data)
        }
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.code === API_ERROR_CODES.BOARD_NOT_FOUND) {
            router.push("/intro/members")
          }
        }
        console.error("게시글 상세 조회 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, router])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div>Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!board) {
    return null
  }

  const sortedImages = [...board.images].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonDetail
          title={board.title}
          author={board.authorName}
          date={formatDate(board.createdAt)}
          images={sortedImages.map((img) => img.imageUrl)}
          content={board.content || ""}
        />
        <div className="pb-12">
          <CommentSection boardIdentifier={id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
