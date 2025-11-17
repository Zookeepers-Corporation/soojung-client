"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const categories = [
  { label: "주일예배", href: "/sermon/sunday" },
  { label: "수요예배", href: "/sermon/wednesday" },
  { label: "금요기도회", href: "/sermon/friday" },
  { label: "새벽기도회", href: "/sermon/dawn" },
]

export default function SermonCategoryTabs() {
  const pathname = usePathname()

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((category) => {
        const isActive = pathname === category.href

        return (
          <Link
            key={category.href}
            href={category.href}
            className={`
              px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-[#5E6AD2] text-white shadow-[0px_2px_4px_rgba(0,0,0,0.04)]"
                  : "bg-white text-[#0F1011] border border-[#E5E7EB] hover:bg-[rgba(0,0,0,0.05)] hover:border-[#5E6AD2]"
              }
            `}
          >
            {category.label}
          </Link>
        )
      })}
    </div>
  )
}
