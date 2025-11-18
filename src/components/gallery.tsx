"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"
import Image from "next/image"
import { getLatestAlbums } from "@/lib/api"
import { LatestAlbumResponse } from "@/types/api"

export default function Gallery() {
  const [albums, setAlbums] = useState<LatestAlbumResponse[]>([])
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
    const fetchAlbums = async () => {
      setIsLoading(true)
      try {
        const response = await getLatestAlbums()
        if (response.data) {
          setAlbums(response.data.slice(0, 4)) // 최대 4개만 표시
        }
      } catch (error) {
        console.error("최신 앨범 조회 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAlbums()
  }, [])

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

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/main3 .jpg')",
        }}
      />
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/75 to-white/80"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block mb-4">
            <Heading variant="title4" className="text-[#1a1a1a] mb-3 font-bold">
              수정 갤러리
            </Heading>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto"></div>
          </div>
          <Text variant="regular" className="text-[#4a4a4a] max-w-2xl mx-auto font-medium">
            우리 교회의 다양한 활동들을 소개합니다
          </Text>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B7355]"></div>
            <Text variant="regular" color="secondary" className="mt-4 block">
              로딩 중...
            </Text>
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📷</div>
            <Text variant="regular" color="secondary">
              앨범이 없습니다
            </Text>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {albums.map((album, index) => (
              <Link
                key={album.identifier}
                href={`/community/album/${album.identifier}`}
                className={`group transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 translate-y-8"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
              >
                <Card
                  padding="none"
                  className="overflow-hidden cursor-pointer bg-white border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {album.thumbnailUrl ? (
                      <>
                        <Image
                          src={album.thumbnailUrl}
                          alt={album.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        {/* 이미지 오버레이 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        {/* 호버 시 아이콘 */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <svg
                              className="w-8 h-8 text-[#8B7355]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[#6B7075]">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📷</div>
                          <Text variant="small" color="tertiary">
                            이미지 없음
                          </Text>
                        </div>
                      </div>
                    )}
                    {/* 날짜 배지 */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                      <Text variant="tiny" className="text-[#8B7355] font-semibold">
                        {formatDate(album.createdAt)}
                      </Text>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 bg-white flex-1 flex flex-col">
                    <Heading
                      variant="title2"
                      className="line-clamp-2 text-[#1a1a1a] group-hover:text-[#8B7355] transition-colors duration-300"
                    >
                      {album.title}
                    </Heading>
                    {/* 하단 장식 라인 */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <Text variant="small" color="tertiary" className="text-xs">
                          자세히 보기
                        </Text>
                        <svg
                          className="w-4 h-4 text-[#8B7355] transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
  