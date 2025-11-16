"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"
import Image from "next/image"
import { getLatestAlbums } from "@/lib/api"
import { LatestAlbumResponse } from "@/types/api"

export default function Gallery() {
  const [albums, setAlbums] = useState<LatestAlbumResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">교회 갤러리</h2>
          <p className="text-gray-600">우리 교회의 다양한 활동들을 소개합니다.</p>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-400">
            <Text variant="regular">로딩 중...</Text>
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Text variant="regular">앨범이 없습니다</Text>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {albums.map((album) => (
              <Link key={album.identifier} href={`/community/album/${album.identifier}`}>
                <Card
                  padding="none"
                  className="overflow-hidden cursor-pointer bg-gray-50 border-0 shadow-none"
                >
                  {/* Image */}
                  <div className="relative w-full h-56 bg-[#F0F2F5] overflow-hidden">
                    {album.thumbnailUrl ? (
                      <Image
                        src={album.thumbnailUrl}
                        alt={album.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[#6B7075]">
                        <Text variant="small" color="tertiary">
                          이미지 없음
                        </Text>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-gray-50 text-center">
                    <Text variant="small" color="tertiary" className="mb-2 block">
                      {formatDate(album.createdAt)}
                    </Text>
                    <Heading variant="title2" className="line-clamp-2">
                      {album.title}
                    </Heading>
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
  