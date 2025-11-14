"use client"

import { useState } from "react"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/typography"
import { CommentResponse } from "@/types/api"

interface CommentSectionProps {
  comments?: CommentResponse[]
  commentCount?: number
}

export default function CommentSection({
  comments = [],
  commentCount,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [commentList, setCommentList] = useState<CommentResponse[]>(comments)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // TODO: API 연결 후 실제 댓글 등록
    setNewComment("")
  }

  const renderComment = (comment: CommentResponse, depth: number = 0) => {
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
          <Text variant="regular" color="secondary">
            {comment.content}
          </Text>
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
              <Button variant="primary" type="submit">
                댓글 등록
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
  )
}
