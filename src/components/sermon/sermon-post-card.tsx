import Link from "next/link"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"
import Image from "next/image"

interface SermonPostCardProps {
  id: string | number
  title: string
  date: string
  image?: string
  excerpt?: string
  href: string
}

export default function SermonPostCard({
  title,
  date,
  image,
  excerpt,
  href,
}: SermonPostCardProps) {
  return (
    <Link href={href}>
      <Card
        padding="none"
        className="overflow-hidden group hover:shadow-[0px_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer"
      >
        {/* Image */}
        <div className="relative w-full h-48 bg-[#F0F2F5] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        <div className="p-6">
          <Text variant="small" color="tertiary" className="mb-2 block">
            {date}
          </Text>
          <Heading variant="title2" className="mb-3 line-clamp-2">
            {title}
          </Heading>
          {excerpt && (
            <Text variant="regular" color="secondary" className="line-clamp-2">
              {excerpt}
            </Text>
          )}
        </div>
      </Card>
    </Link>
  )
}
