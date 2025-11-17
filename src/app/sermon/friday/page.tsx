"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonPageHeader from "@/components/sermon/sermon-page-header"
import SermonList from "@/components/sermon/sermon-list"
import { getBoardList } from "@/lib/api"
import { BoardCategory, BoardListResponse, PageInfo } from "@/types/api"

function FridaySermonPageContent() {
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
        const response = await getBoardList(BoardCategory.FRIDAY_PRAYER, currentPage, 9)
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SermonPageHeader title="금요기도회" subtitle="Friday Prayer" />
        <div className="py-12 md:py-16">
          {!isLoading && (
            <SermonList
              title=""
              posts={posts}
              pageInfo={pageInfo}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              basePath="/sermon/friday"
              category={BoardCategory.FRIDAY_PRAYER}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function FridaySermonPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FridaySermonPageContent />
    </Suspense>
  )
}
