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
    <Card className="overflow-hidden p-0 border-none shadow-none">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#F0F2F5]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        <Heading variant="title3" className="mb-1">
          {name}
        </Heading>
        <Text variant="small" className="text-[#5E6AD2] font-semibold mb-2 block">
          {role}
        </Text>
        {description && (
          <Text variant="tiny" color="secondary" className="leading-relaxed">
            {description}
          </Text>
        )}
      </div>
    </Card>
  )
}
