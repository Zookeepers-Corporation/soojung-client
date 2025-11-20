"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MembersPageHeader from "@/components/intro/members-page-header"
import SermonList from "@/components/sermon/sermon-list"
import Button from "@/components/ui/button"
import Link from "next/link"
import { getBoardList } from "@/lib/api"
import { BoardCategory, BoardListResponse, PageInfo } from "@/types/api"

function MembersPageContent() {
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
        const response = await getBoardList(BoardCategory.CHURCH_PEOPLE_NEWS, currentPage, 9)
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

  const customTabs = (
    <div className="flex justify-center gap-4">
      <Link href="/intro/news">
        <Button variant="secondary">교회소식</Button>
      </Link>
      <Link href="/intro/members">
        <Button variant="primary">성도소식</Button>
      </Link>
    </div>
  )

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
        <MembersPageHeader />
        <div className="pb-4 md:pb-8">
          <SermonList
            title=""
            posts={posts}
            pageInfo={pageInfo}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            basePath="/intro/members"
            category={BoardCategory.CHURCH_PEOPLE_NEWS}
            showCategoryTabs={false}
            customTabs={customTabs}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function MembersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MembersPageContent />
    </Suspense>
  )
}
