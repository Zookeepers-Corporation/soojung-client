import Link from "next/link"

export default function Categories() {
  const categories = [
    {
      id: 1,
      title: "교회소개",
      description: "교회의 비전과 소식을 만나보세요",
      icon: "⛪",
      href: "/intro",
      color: "bg-blue-900",
    },
    {
      id: 2,
      title: "말씀과 찬양",
      description: "다양한 예배 시간과 설교 말씀",
      icon: "🙏",
      href: "/sermon",
      color: "bg-green-800",
    },
    {
      id: 3,
      title: "커뮤니티",
      description: "성도들과의 소통과 나눔",
      icon: "👥",
      href: "/community",
      color: "bg-purple-800",
    },
    {
      id: 4,
      title: "내 정보",
      description: "마이페이지 및 회원정보 관리",
      icon: "👤",
      href: "/mypage",
      color: "bg-amber-700",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">주요 카테고리</h2>
          <p className="text-gray-600">교회 정보와 다양한 커뮤니티에 쉽게 접근하세요.</p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={`${category.color} text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer group transform hover:-translate-y-1`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">{category.icon}</div>
              <h3 className="text-xl font-bold mb-3">{category.title}</h3>
              <p className="text-sm text-gray-100">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
