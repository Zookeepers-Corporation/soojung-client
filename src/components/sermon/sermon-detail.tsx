"use client"

import { useState } from "react"
import Carousel from "@/components/ui/carousel"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/typography"
import Image from "next/image"
import { BoardFileInfo } from "@/types/api"

interface SermonDetailProps {
  title: string
  author: string
  date: string
  images?: string[]
  files?: BoardFileInfo[]
  content: string
  canEdit?: boolean
  canDelete?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export default function SermonDetail({
  title,
  author,
  date,
  images = [],
  files = [],
  content,
  canEdit = false,
  canDelete = false,
  onEdit,
  onDelete,
}: SermonDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const rawTextLength = content ? content.replace(/<[^>]*>?/gm, "").length : 0
  const shouldCollapse = rawTextLength >= 800

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <Heading variant="title3" className="flex-1">
              {title}
            </Heading>
            {(canEdit || canDelete) && (
              <div className="flex gap-2 ml-4">
                {canEdit && (
                  <Button variant="secondary" onClick={onEdit}>
                    수정
                  </Button>
                )}
                {canDelete && (
                  <Button variant="secondary" onClick={onDelete}>
                    삭제
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[#6B7075]">
            <Text variant="small" color="tertiary">
              작성자: {author}
            </Text>
            <Text variant="small" color="tertiary">
              작성일: {date}
            </Text>
          </div>
        </div>

        {/* Images Carousel */}
        {images.length > 0 && (
          <Card padding="none" className="overflow-hidden mb-8">
            <Carousel autoPlay={false} className="h-[400px] md:h-[500px]">
              {images.map((image, index) => (
                <div key={index} className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`${title} 이미지 ${index + 1}`}
                    fill
                    className="object-contain bg-[#F0F2F5]"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              ))}
            </Carousel>
          </Card>
        )}

        {/* Content */}
        <Card className="mb-8 relative overflow-hidden">
          <div
            className={`prose prose-sm max-w-none whitespace-pre-wrap [&_p]:mb-3 [&_p]:whitespace-pre-wrap [&_ul]:space-y-2 [&_li]:whitespace-pre-wrap transition-all duration-300 ${
              shouldCollapse && !isExpanded ? "max-h-[600px] overflow-hidden" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {shouldCollapse && !isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-4">
              <Button 
                onClick={() => setIsExpanded(true)} 
                variant="outline"
                className="rounded-full px-6 shadow-sm bg-white hover:bg-gray-50 text-gray-700"
              >
                본문 모두보기 ▾
              </Button>
            </div>
          )}
          {shouldCollapse && isExpanded && (
            <div className="flex justify-center mt-8 pt-6 border-t border-gray-100">
              <Button 
                onClick={() => setIsExpanded(false)} 
                variant="outline"
                className="rounded-full px-6 bg-white hover:bg-gray-50 text-gray-700"
              >
                본문 접기 ▴
              </Button>
            </div>
          )}
        </Card>

        {/* Files */}
        {files.length > 0 && (
          <Card className="mb-8">
            <Heading variant="title4" className="mb-4">
              첨부파일
            </Heading>
            <div className="space-y-2">
              {files.map((file) => (
                <a
                  key={file.identifier}
                  href={file.fileUrl}
                  download={file.originalFileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <Text variant="small" className="truncate font-medium text-blue-600 hover:underline inline-block max-w-full">
                      {file.originalFileName}
                    </Text>
                  </div>
                  <Text variant="tiny" color="tertiary" className="ml-4 whitespace-nowrap flex-shrink-0">
                    {(file.fileSize / 1024).toFixed(1)} KB
                  </Text>
                </a>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
