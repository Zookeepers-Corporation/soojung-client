import Link from "next/link"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"

export default function Categories() {
  const categories = [
    {
      id: 1,
      title: "교회소개",
      description: "교회의 소식을 만나보세요",
      icon: "⛪",
      href: "/intro",
      color: "bg-[#5E6AD2]",
    },
    {
      id: 2,
      title: "말씀과 찬양",
      description: "다양한 예배 시간과 설교 말씀",
      icon: "🙏",
      href: "/sermon",
      color: "bg-[#4CB782]",
    },
    {
      id: 3,
      title: "커뮤니티",
      description: "성도들과의 소통과 나눔",
      icon: "👥",
      href: "/community",
      color: "bg-[#4EA7FC]",
    },
    {
      id: 4,
      title: "내 정보",
      description: "마이페이지 및 회원정보 관리",
      icon: "👤",
      href: "/mypage",
      color: "bg-[#FC7840]",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <Heading variant="title4" className="mb-4">
            공지사항, 교회소식, 성도소식을 미리보기로 보여줌
          </Heading>
          <Text variant="regular" color="secondary">
            교회 정보와 다양한 커뮤니티에 쉽게 접근하세요.
          </Text>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card
                className={`${category.color} text-white hover:shadow-[0px_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer group transform hover:-translate-y-1`}
                padding="lg"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition">
                  {category.icon}
                </div>
                <Heading variant="title2" className="mb-3 text-white">
                  {category.title}
                </Heading>
                <Text variant="small" className="text-white/90">
                  {category.description}
                </Text>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
