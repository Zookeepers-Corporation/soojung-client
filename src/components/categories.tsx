"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"
import { getLatestBoards } from "@/lib/api"
import { BoardCategory, LatestBoardResponse } from "@/types/api"

interface CategoryConfig {
  id: number
  title: string
  description: string
  icon: string
  href: string
  color: string
  textColorHex: string
  accentColorHex: string
  category: BoardCategory
  detailPath: (id: string) => string
}

const categoryConfigs: CategoryConfig[] = [
  {
    id: 1,
    title: "교회소식",
    description: "교회의 소식을 만나보세요",
    icon: "📢",
    href: "/intro/news",
    color: "bg-[#5E6AD2]",
    textColorHex: "#5E6AD2",
    accentColorHex: "#4E5BBD",
    category: BoardCategory.CHURCH_NEWS,
    detailPath: (id: string) => `/intro/news/${id}`,
  },
  {
    id: 2,
    title: "교회학교행사",
    description: "교회학교의 다양한 소식을 만나보세요",
    icon: "🏫",
    href: "/community/resources",
    color: "bg-[#4CB782]",
    textColorHex: "#4CB782",
    accentColorHex: "#3DA572",
    category: BoardCategory.ARCHIVE,
    detailPath: (id: string) => `/community/resources/${id}`,
  },
  {
    id: 3,
    title: "주일예배",
    description: "주일예배 말씀과 찬양",
    icon: "🙏",
    href: "/sermon/sunday",
    color: "bg-[#4EA7FC]",
    textColorHex: "#4EA7FC",
    accentColorHex: "#3E97EC",
    category: BoardCategory.SUNDAY_WORSHIP,
    detailPath: (id: string) => `/sermon/sunday/${id}`,
  },
  {
    id: 4,
    title: "게시판",
    description: "성도들과의 소통과 나눔",
    icon: "💬",
    href: "/community/board",
    color: "bg-[#FC7840]",
    textColorHex: "#FC7840",
    accentColorHex: "#EC6830",
    category: BoardCategory.BOARD,
    detailPath: (id: string) => `/community/board/${id}`,
  },
]

const getCategoryLabel = (category: BoardCategory): string => {
  const config = categoryConfigs.find((c) => c.category === category)
  return config?.title || category
}

const formatDate = (dateString: string): string => {
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

const getRelativeDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "오늘"
    if (diffDays === 1) return "1일전"
    if (diffDays < 7) return `${diffDays}일전`
    
    return formatDate(dateString)
  } catch {
    return formatDate(dateString)
  }
}

const isNewPost = (dateString: string): boolean => {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 // 7일 이내면 새 게시글
  } catch {
    return false
  }
}

interface PostWithDetailPath extends LatestBoardResponse {
  detailPath: string
}

interface CategoryPosts {
  config: CategoryConfig
  posts: PostWithDetailPath[]
}

export default function Categories() {
  const [categoryPosts, setCategoryPosts] = useState<CategoryPosts[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef<number>(typeof window !== "undefined" ? window.scrollY : 0)
  const wasIntersecting = useRef<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY
        const isScrollingDown = currentScrollY >= lastScrollY.current

        if (entry.isIntersecting) {
          // 아래로 스크롤할 때만 애니메이션 트리거
          // 또는 처음 뷰포트에 들어올 때
          if (isScrollingDown || !wasIntersecting.current) {
            setIsVisible(true)
          }
          wasIntersecting.current = true
        } else {
          setIsVisible(false)
          wasIntersecting.current = false
        }
        lastScrollY.current = currentScrollY
      },
      { threshold: 0.1 }
    )

    const handleScroll = () => {
      lastScrollY.current = window.scrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const fetchLatestBoards = async () => {
      setIsLoading(true)
      try {
        const response = await getLatestBoards()
        if (!response.data) {
          setIsLoading(false)
          return
        }
        
        const data = response.data
        const categories: CategoryPosts[] = []
        
        // 각 카테고리별로 게시글 처리
        categoryConfigs.forEach((config) => {
          let posts: LatestBoardResponse[] = []
          
            // API 응답에서 해당 카테고리의 게시글 가져오기
            if (config.category === BoardCategory.CHURCH_NEWS && data.churchNews) {
              posts = data.churchNews
            } else if (config.category === BoardCategory.ARCHIVE && data.archive) {
              posts = data.archive
            } else if (config.category === BoardCategory.SUNDAY_WORSHIP && data.sundayWorship) {
              posts = data.sundayWorship
            } else if (config.category === BoardCategory.BOARD && data.board) {
              posts = data.board
            }
          
          // 최대 4개까지만, detailPath 추가
          const postsWithPath: PostWithDetailPath[] = posts
            .slice(0, 4)
            .map((post) => ({
              ...post,
              detailPath: config.detailPath(post.identifier),
            }))
          
          categories.push({
            config,
            posts: postsWithPath,
          })
        })
        
        setCategoryPosts(categories)
      } catch (error) {
        console.error("최신 게시글 조회 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestBoards()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 pb-0 md:pb-0 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Sections */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-400">
            <Text variant="regular">로딩 중...</Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {categoryPosts.map((categoryData, index) => {
              // 첫 번째 줄의 카테고리들 (id: 1, 2)의 게시글 수 계산
              const firstRowCategories = categoryPosts.filter((cat) => cat.config.id <= 2)
              const maxFirstRowPosts = Math.max(...firstRowCategories.map((cat) => cat.posts.length), 0)
              
              // 첫 번째 줄 (id: 1, 2)이고 게시글이 있을 때만 동적 마진 추가
              const isFirstRow = categoryData.config.id <= 2
              const dynamicMarginBottom = isFirstRow && maxFirstRowPosts > 0 
                ? `${Math.min(32 + maxFirstRowPosts * 16, 80)}px` // 8 + posts * 2 rem을 px로 변환 (기본 32px + 게시글당 16px, 최대 80px)
                : undefined
              
              return (
                <div
                  key={categoryData.config.id}
                  className={`space-y-5 transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    ...(dynamicMarginBottom ? { marginBottom: dynamicMarginBottom } : {}),
                    transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                  }}
                >
                  {/* Category Title */}
                  <div className="flex items-center justify-between">
                    <h3 
                      className="text-2xl font-bold"
                      style={{ color: categoryData.config.textColorHex }}
                    >
                      {categoryData.config.title}
                    </h3>
                    <Link 
                      href={categoryData.config.href}
                      className="text-sm transition-colors"
                      style={{ color: categoryData.config.textColorHex }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = categoryData.config.accentColorHex
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = categoryData.config.textColorHex
                      }}
                    >
                      더보기 →
                    </Link>
                  </div>
                  
                  {/* Posts List */}
                  <div className="space-y-0">
                    {categoryData.posts.length === 0 ? (
                      <div className="text-center py-8 text-gray-400 border-b border-gray-200">
                        <Text variant="small">게시글이 없습니다</Text>
                      </div>
                    ) : (
                      <>
                        {categoryData.posts.map((post, postIndex) => (
                          <div 
                            key={post.identifier} 
                            className={`border-b border-gray-200 ${postIndex === categoryData.posts.length - 1 ? 'last:border-b-0' : ''}`}
                          >
                            <Link href={post.detailPath}>
                              <div className="py-3 px-3 hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span 
                                      className="text-lg font-medium line-clamp-1 flex-1"
                                      style={{ color: categoryData.config.textColorHex }}
                                    >
                                      {post.title}
                                    </span>
                                  </div>
                                  <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0">
                                    {formatDate(post.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                        {/* 빈 칸 채우기 (4개 미만인 경우) */}
                        {Array.from({ length: 4 - categoryData.posts.length }).map((_, emptyIndex) => (
                          <div 
                            key={`empty-${emptyIndex}`}
                            className="border-b border-gray-200 border-dashed opacity-30"
                          >
                            <div className="py-3 px-3">
                              <div className="h-14"></div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
