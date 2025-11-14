"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonList from "@/components/sermon/sermon-list"
import { getBoardList } from "@/lib/api"
import { BoardCategory, BoardListResponse, PageInfo } from "@/types/api"

export default function BoardPage() {
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
        const response = await getBoardList(BoardCategory.BOARD, currentPage, 9)
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
        {!isLoading && (
          <SermonList
            title="게시판"
            posts={posts}
            pageInfo={pageInfo}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            basePath="/community/board"
            showCategoryTabs={false}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}
