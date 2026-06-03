"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"
import { getLatestBoards } from "@/lib/api"
import { BoardCategory, LatestBoardResponse } from "@/types/api"

interface CategoryConfig {
  id: number
  title: string
  description: string
  icon: string
  image: string
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
    image: "/pray.png",
    href: "/intro/news",
    color: "bg-[#5E6AD2]",
    textColorHex: "#5E6AD2",
    accentColorHex: "#4E5BBD",
    category: BoardCategory.CHURCH_NEWS,
    detailPath: (id: string) => `/intro/news/${id}`,
  },
  {
    id: 3,
    title: "주일예배",
    description: "주일예배 말씀과 찬양",
    icon: "🙏",
    image: "/bible.jpg",
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
    image: "/nature_background.png",
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
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden bg-[#F7F8FA]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-10 md:mb-12 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block mb-4">
            <Heading variant="title4" className="text-[#0F1011] mb-3 font-bold tracking-tight">
              교회 소식
            </Heading>
            <div className="w-12 h-1 bg-[#5E6AD2] rounded-full mx-auto"></div>
          </div>
          <Text variant="large" className="text-[#3E4145] max-w-2xl mx-auto">
            교회의 다양한 소식을 전합니다
          </Text>
        </div>

        {/* Category Sections */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-400">
            <Text variant="regular">로딩 중...</Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {categoryPosts.map((categoryData, index) => {
              return (
                <div
                  key={categoryData.config.id}
                  className={`bg-white border border-[#E5E7EB] shadow-sm overflow-hidden transition-all duration-700 ease-out hover:shadow-md ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                  }}
                >
                  {/* Card Image */}
                  <Link href={categoryData.config.href} className="relative block w-full h-40 overflow-hidden">
                    <Image
                      src={categoryData.config.image}
                      alt={categoryData.config.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>

                  <div className="p-6 space-y-4">
                  {/* Category Title */}
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1 h-5 bg-[#5E6AD2] rounded-full"></span>
                      <h3 className="text-xl font-bold text-[#0F1011] tracking-tight">
                        {categoryData.config.title}
                      </h3>
                    </div>
                    <Link
                      href={categoryData.config.href}
                      className="text-sm text-[#6B7075] hover:text-[#5E6AD2] transition-colors"
                    >
                      더보기 →
                    </Link>
                  </div>
                  
                  {/* Posts List */}
                  <div className="space-y-0">
                    {categoryData.posts.length === 0 ? (
                      <div className="text-center py-8 text-[#A0A4A8] border-b border-[#F0F2F5]">
                        <Text variant="small">게시글이 없습니다</Text>
                      </div>
                    ) : (
                      <>
                        {categoryData.posts.map((post, postIndex) => (
                          <div
                            key={post.identifier}
                            className={`border-b border-[#F0F2F5] ${postIndex === categoryData.posts.length - 1 ? 'last:border-b-0' : ''}`}
                          >
                            <Link href={post.detailPath} className="group/post block">
                              <div className="py-3 px-3 rounded-lg hover:bg-[#F7F8FA] transition-colors cursor-pointer">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span className="text-base font-medium line-clamp-1 flex-1 text-[#3E4145] group-hover/post:text-[#5E6AD2] transition-colors">
                                      {post.title}
                                    </span>
                                  </div>
                                  <span className="text-[#A0A4A8] text-xs whitespace-nowrap shrink-0">
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
                            className="border-b border-[#F0F2F5] border-dashed"
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
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
