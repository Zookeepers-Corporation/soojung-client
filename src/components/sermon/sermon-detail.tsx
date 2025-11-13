"use client"

import Carousel from "@/components/ui/carousel"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"
import Image from "next/image"

interface SermonDetailProps {
  title: string
  author: string
  date: string
  images?: string[]
  content: string
}

export default function SermonDetail({
  title,
  author,
  date,
  images = [],
  content,
}: SermonDetailProps) {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Heading variant="title3" className="mb-4">
            {title}
          </Heading>
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
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Card>
      </div>
    </div>
  )
}
