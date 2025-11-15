"use client"

import Link from "next/link"
import SermonPostCard from "./sermon-post-card"
import SermonCategoryTabs from "./sermon-category-tabs"
import Pagination from "@/components/ui/pagination"
import { Heading, Text } from "@/components/ui/typography"
import { BoardListResponse, PageInfo, BoardCategory, UserRole } from "@/types/api"
import { useAuth } from "@/contexts/auth-context"

interface SermonListProps {
  title: string
  posts: BoardListResponse[]
  pageInfo?: PageInfo
  currentPage?: number
  onPageChange?: (page: number) => void
  showCategoryTabs?: boolean
  customTabs?: React.ReactNode
  basePath?: string // 예: "/sermon/sunday"
  category?: BoardCategory
}

export default function SermonList({
  title,
  posts,
  pageInfo,
  currentPage,
  onPageChange,
  showCategoryTabs = true,
  customTabs,
  basePath,
  category,
}: SermonListProps) {
  const { isLoggedIn, user } = useAuth()

  // 관리자 전용 카테고리인지 확인
  const isAdminOnlyCategory =
    category === BoardCategory.SUNDAY_WORSHIP ||
    category === BoardCategory.WEDNESDAY_WORSHIP ||
    category === BoardCategory.FRIDAY_PRAYER ||
    category === BoardCategory.DAWN_PRAYER ||
    category === BoardCategory.SPECIAL_WORSHIP

  // 작성 버튼 표시 여부
  const canWrite =
    category
      ? isAdminOnlyCategory
        ? isLoggedIn && user?.role === UserRole.ADMIN
        : isLoggedIn
      : false

  // 날짜 포맷팅 (ISO 8601 -> YYYY-MM-DD)
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

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Heading variant="title4">{title}</Heading>
            {canWrite && category && (
              <Link
                href={`/boards/write?category=${category}`}
                className="text-[#5E6AD2] hover:text-[#4E5BBD] font-medium text-sm transition-colors"
              >
                게시글 작성
              </Link>
            )}
          </div>
          {customTabs && <div className="mb-6">{customTabs}</div>}
          {showCategoryTabs && <SermonCategoryTabs />}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => {
                // basePath가 있으면 동적 경로 사용, 없으면 href 직접 사용
                const href = basePath
                  ? `${basePath}/${post.identifier}`
                  : (post as any).href || `#`
                
                return (
                  <SermonPostCard
                    key={post.identifier || (post as any).id}
                    id={post.identifier || (post as any).id}
                    title={post.title}
                    date={formatDate(post.createdAt || (post as any).date)}
                    image={post.thumbnailUrl}
                    href={href}
                  />
                )
              })}
            </div>

            {/* Pagination */}
            {pageInfo && pageInfo.totalPages > 1 && currentPage !== undefined && onPageChange && (
              <Pagination
                currentPage={currentPage + 1} // API는 0부터 시작, UI는 1부터 시작
                totalPages={pageInfo.totalPages}
                onPageChange={(page) => onPageChange(page - 1)} // UI는 1부터 시작, API는 0부터 시작
              />
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Text variant="regular" color="tertiary">
              아직 등록된 글이 없습니다.
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}
