import Image from "next/image"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"

interface StaffMemberCardProps {
  name: string
  role: string
  image: string
  description?: string
}

export default function StaffMemberCard({
  name,
  role,
  image,
  description,
}: StaffMemberCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-[0px_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 p-0">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#F0F2F5]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <Heading variant="title2" className="mb-2">
          {name}
        </Heading>
        <Text variant="regular" className="text-[#5E6AD2] font-semibold mb-3 block">
          {role}
        </Text>
        {description && (
          <Text variant="small" color="secondary" className="leading-relaxed">
            {description}
          </Text>
        )}
      </div>
    </Card>
  )
}
