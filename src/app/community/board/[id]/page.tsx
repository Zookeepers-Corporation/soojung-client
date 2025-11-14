"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonDetail from "@/components/sermon/sermon-detail"
import CommentSection from "@/components/sermon/comment-section"
import { getBoardDetail, ApiError } from "@/lib/api"
import { BoardDetailResponse, API_ERROR_CODES } from "@/types/api"
import Dialog from "@/components/ui/dialog"

interface BoardDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function BoardDetailPage({ params }: BoardDetailPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [board, setBoard] = useState<BoardDetailResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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
            router.push("/community/board")
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

  const handleEdit = () => {
    router.push(`/boards/edit/${id}`)
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    // TODO: 삭제 API 호출
    setIsDeleteDialogOpen(false)
    console.log("삭제 기능은 추후 구현 예정")
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>로딩 중...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!board) {
    return null
  }

  const imageUrls = board.images
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((img) => img.imageUrl)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonDetail
          title={board.title}
          author={board.authorName}
          date={formatDate(board.createdAt)}
          images={imageUrls}
          content={board.content}
          canEdit={board.canEdit}
          canDelete={board.canDelete}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <div className="pb-12">
          <CommentSection
            boardIdentifier={id}
            comments={board.comments}
            commentCount={board.commentCount}
            onCommentUpdate={async () => {
              const refreshResponse = await getBoardDetail(id)
              if (refreshResponse.data) {
                setBoard(refreshResponse.data)
              }
            }}
          />
        </div>
      </main>
      <Footer />

      {/* 삭제 확인 Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        message="정말 이 게시글을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        showCancel={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  )
}
