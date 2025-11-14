"use client"

import SermonPostCard from "./sermon-post-card"
import SermonCategoryTabs from "./sermon-category-tabs"
import Pagination from "@/components/ui/pagination"
import { Heading, Text } from "@/components/ui/typography"
import { BoardListResponse, PageInfo } from "@/types/api"

interface SermonListProps {
  title: string
  posts: BoardListResponse[]
  pageInfo: PageInfo
  currentPage: number
  onPageChange: (page: number) => void
  showCategoryTabs?: boolean
  customTabs?: React.ReactNode
  basePath: string // 예: "/sermon/sunday"
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
}: SermonListProps) {
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
          <Heading variant="title4" className={showCategoryTabs || customTabs ? "mb-6" : ""}>
            {title}
          </Heading>
          {customTabs && <div className="mb-6">{customTabs}</div>}
          {showCategoryTabs && <SermonCategoryTabs />}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => (
                <SermonPostCard
                  key={post.identifier}
                  id={post.identifier}
                  title={post.title}
                  date={formatDate(post.createdAt)}
                  image={post.thumbnailUrl}
                  href={`${basePath}/${post.identifier}`}
                />
              ))}
            </div>

            {/* Pagination */}
            {pageInfo.totalPages > 1 && (
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
