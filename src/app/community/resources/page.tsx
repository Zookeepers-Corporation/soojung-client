"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CommunityPageHeader from "@/components/community/community-page-header"
import SermonList from "@/components/sermon/sermon-list"
import { getBoardList } from "@/lib/api"
import { BoardCategory, BoardListResponse, PageInfo } from "@/types/api"

function ResourcesPageContent() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<BoardListResponse[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    size: 20,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  })
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "0", 10)
    setCurrentPage(page)
  }, [searchParams])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await getBoardList(BoardCategory.ARCHIVE, currentPage, 9)
        if (response.data) {
          setPosts(response.data.content)
          setPageInfo(response.data.page)
        }
      } catch (error) {
        console.error("게시글 리스트 조회 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CommunityPageHeader title="교회학교행사" subtitle="Church School Events" />
        <div className="py-12 md:py-16">
          <SermonList
            title=""
            posts={posts}
            pageInfo={pageInfo}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            basePath="/community/resources"
            category={BoardCategory.ARCHIVE}
            showCategoryTabs={false}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResourcesPageContent />
    </Suspense>
  )
}
