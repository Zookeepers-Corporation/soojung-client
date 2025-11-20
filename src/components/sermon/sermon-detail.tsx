"use client"

import Carousel from "@/components/ui/carousel"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/typography"
import Image from "next/image"

interface SermonDetailProps {
  title: string
  author: string
  date: string
  images?: string[]
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
  content,
  canEdit = false,
  canDelete = false,
  onEdit,
  onDelete,
}: SermonDetailProps) {
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
        <Card className="mb-8">
          <div
            className="prose prose-sm max-w-none whitespace-pre-wrap [&_p]:mb-3 [&_p]:whitespace-pre-wrap [&_ul]:space-y-2 [&_li]:whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Card>
      </div>
    </div>
  )
}
