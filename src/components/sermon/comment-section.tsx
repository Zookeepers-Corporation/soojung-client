"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { Heading, Text } from "@/components/ui/typography"
import { CommentResponse } from "@/types/api"
import { createComment, updateComment, deleteComment, ApiError } from "@/lib/api"
import { API_ERROR_CODES } from "@/types/api"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/toast"
import Dialog from "@/components/ui/dialog"

interface CommentSectionProps {
  boardIdentifier: string
  comments?: CommentResponse[]
  commentCount?: number
  onCommentUpdate?: () => void
}

export default function CommentSection({
  boardIdentifier,
  comments = [],
  commentCount,
  onCommentUpdate,
}: CommentSectionProps) {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const { showToast, ToastComponent } = useToast()
  const [newComment, setNewComment] = useState("")
  const [commentList, setCommentList] = useState<CommentResponse[]>(comments)
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [replyingToId, setReplyingToId] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isDeletingCommentId, setIsDeletingCommentId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setCommentList(comments)
  }, [comments])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    if (!isLoggedIn) {
      showToast("로그인이 필요합니다.", "warning")
      router.push("/login")
      return
    }

    setIsSubmitting(true)
    try {
      await createComment(boardIdentifier, {
        content: newComment.trim(),
      })
      setNewComment("")
      showToast("댓글이 성공적으로 작성되었습니다.", "success")
      if (onCommentUpdate) {
        onCommentUpdate()
      }
    } catch (error) {
      if (error instanceof ApiError) {
        showToast(error.message || "댓글 작성 중 오류가 발생했습니다.", "error")
      } else {
        showToast("댓글 작성 중 오류가 발생했습니다.", "error")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReplySubmit = async (parentCommentId: string) => {
    if (!replyContent.trim()) return

    if (!isLoggedIn) {
      showToast("로그인이 필요합니다.", "warning")
      router.push("/login")
      return
    }

    setIsSubmitting(true)
    try {
      await createComment(boardIdentifier, {
        content: replyContent.trim(),
        parentCommentIdentifier: parentCommentId,
      })
      setReplyContent("")
      setReplyingToId(null)
      showToast("대댓글이 성공적으로 작성되었습니다.", "success")
      if (onCommentUpdate) {
        onCommentUpdate()
      }
    } catch (error) {
      if (error instanceof ApiError) {
        showToast(error.message || "대댓글 작성 중 오류가 발생했습니다.", "error")
      } else {
        showToast("대댓글 작성 중 오류가 발생했습니다.", "error")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditStart = (comment: CommentResponse) => {
    setEditingCommentId(comment.identifier)
    setEditContent(comment.content)
  }

  const handleEditCancel = () => {
    setEditingCommentId(null)
    setEditContent("")
  }

  const handleEditSubmit = async (commentId: string) => {
    if (!editContent.trim()) return

    setIsSubmitting(true)
    try {
      await updateComment(boardIdentifier, commentId, {
        content: editContent.trim(),
      })
      setEditingCommentId(null)
      setEditContent("")
      showToast("댓글이 성공적으로 수정되었습니다.", "success")
      if (onCommentUpdate) {
        onCommentUpdate()
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === API_ERROR_CODES.COMMENT_UPDATE_FORBIDDEN) {
          showToast("댓글 수정 권한이 없습니다.", "error")
        } else {
          showToast(error.message || "댓글 수정 중 오류가 발생했습니다.", "error")
        }
      } else {
        showToast("댓글 수정 중 오류가 발생했습니다.", "error")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClick = (commentId: string) => {
    setIsDeletingCommentId(commentId)
  }

  const handleDeleteConfirm = async () => {
    if (!isDeletingCommentId) return

    setIsSubmitting(true)
    try {
      await deleteComment(boardIdentifier, isDeletingCommentId)
      setIsDeletingCommentId(null)
      showToast("댓글이 성공적으로 삭제되었습니다.", "success")
      if (onCommentUpdate) {
        onCommentUpdate()
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === API_ERROR_CODES.COMMENT_DELETE_FORBIDDEN) {
          showToast("댓글 삭제 권한이 없습니다.", "error")
        } else {
          showToast(error.message || "댓글 삭제 중 오류가 발생했습니다.", "error")
        }
      } else {
        showToast("댓글 삭제 중 오류가 발생했습니다.", "error")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderComment = (comment: CommentResponse, depth: number = 0) => {
    const isEditing = editingCommentId === comment.identifier
    const isReplying = replyingToId === comment.identifier

    return (
      <div key={comment.identifier} className={depth > 0 ? "ml-8 mt-4" : ""}>
        <div className="pb-6 border-b border-[#E5E7EB] last:border-b-0 last:pb-0">
          <div className="flex items-center gap-3 mb-3">
            <Text variant="small" className="font-semibold">
              {comment.authorName}
            </Text>
            <Text variant="small" color="tertiary">
              {formatDate(comment.createdAt)}
            </Text>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[0.9375rem] text-[#0F1011] focus:border-[#5E6AD2] focus:outline-none focus:ring-2 focus:ring-[rgba(94,106,210,0.2)] min-h-[80px] resize-y"
                required
              />
              <div className="flex gap-2 justify-end">
                <Button variant="secondary" onClick={handleEditCancel} disabled={isSubmitting}>
                  취소
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleEditSubmit(comment.identifier)}
                  disabled={isSubmitting || !editContent.trim()}
                >
                  수정
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Text variant="regular" color="secondary" className="mb-3">
                {comment.content}
              </Text>
              <div className="flex gap-2">
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        showToast("로그인이 필요합니다.", "warning")
                        router.push("/login")
                        return
                      }
                      setReplyingToId(comment.identifier)
                      setReplyContent("")
                    }}
                    className="text-[#5E6AD2] hover:text-[#4E5BBD] text-sm transition-colors"
                  >
                    답글
                  </button>
                )}
                {comment.canEdit && (
                  <button
                    onClick={() => handleEditStart(comment)}
                    className="text-[#5E6AD2] hover:text-[#4E5BBD] text-sm transition-colors"
                  >
                    수정
                  </button>
                )}
                {comment.canDelete && (
                  <button
                    onClick={() => handleDeleteClick(comment.identifier)}
                    className="text-red-600 hover:text-red-800 text-sm transition-colors"
                  >
                    삭제
                  </button>
                )}
              </div>
            </>
          )}

          {/* 대댓글 작성 폼 */}
          {isReplying && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="대댓글을 입력하세요..."
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[0.9375rem] text-[#0F1011] focus:border-[#5E6AD2] focus:outline-none focus:ring-2 focus:ring-[rgba(94,106,210,0.2)] min-h-[80px] resize-y mb-3"
                required
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setReplyingToId(null)
                    setReplyContent("")
                  }}
                  disabled={isSubmitting}
                >
                  취소
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleReplySubmit(comment.identifier)}
                  disabled={isSubmitting || !replyContent.trim()}
                >
                  등록
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 대댓글 렌더링 */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map((reply) => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <Heading variant="title3" className="mb-6">
            댓글 ({commentCount !== undefined ? commentCount : commentList.length})
          </Heading>

          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="space-y-4">
              <div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요..."
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[0.9375rem] text-[#0F1011] focus:border-[#5E6AD2] focus:outline-none focus:ring-2 focus:ring-[rgba(94,106,210,0.2)] min-h-[100px] resize-y"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button variant="primary" type="submit" disabled={isSubmitting || !isLoggedIn}>
                  {isSubmitting ? "등록 중..." : "댓글 등록"}
                </Button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {commentList.length > 0 ? (
              commentList.map((comment) => renderComment(comment))
            ) : (
              <div className="text-center py-8">
                <Text variant="regular" color="tertiary">
                  아직 댓글이 없습니다. 첫 댓글을 작성해보세요.
                </Text>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Toast */}
      {ToastComponent}

      {/* 삭제 확인 Dialog */}
      <Dialog
        isOpen={isDeletingCommentId !== null}
        onClose={() => setIsDeletingCommentId(null)}
        message="정말 이 댓글을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        showCancel={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeletingCommentId(null)}
      />
    </>
  )
}
