"use client"

import { useState } from "react"
import SermonPostCard from "./sermon-post-card"
import SermonCategoryTabs from "./sermon-category-tabs"
import Pagination from "@/components/ui/pagination"
import { Heading, Text } from "@/components/ui/typography"

interface SermonPost {
  id: string | number
  title: string
  date: string
  image?: string
  excerpt?: string
  href: string
}

interface SermonListProps {
  title: string
  posts: SermonPost[]
  itemsPerPage?: number
  showCategoryTabs?: boolean
}

export default function SermonList({
  title,
  posts,
  itemsPerPage = 9,
  showCategoryTabs = true,
}: SermonListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(posts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPosts = posts.slice(startIndex, endIndex)

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <Heading variant="title4" className={showCategoryTabs ? "mb-6" : ""}>
            {title}
          </Heading>
          {showCategoryTabs && <SermonCategoryTabs />}
        </div>

        {/* Posts Grid */}
        {currentPosts.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentPosts.map((post) => (
                <SermonPostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  date={post.date}
                  image={post.image}
                  excerpt={post.excerpt}
                  href={post.href}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
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
