import StaffMemberCard from "./staff-member-card"

interface Elder {
  name: string
  role: string
  image: string
  description?: string
}

export default function EldersSection() {
  const elders: Elder[] = [
    {
      name: "이영희",
      role: "장로",
      image: "/elder-1.jpg",
    },
    {
      name: "박민수",
      role: "장로",
      image: "/elder-2.jpg",
    },
    {
      name: "정수진",
      role: "장로",
      image: "/elder-3.jpg",
    },
    {
      name: "최동욱",
      role: "장로",
      image: "/elder-4.jpg",
    },
    {
      name: "강지훈",
      role: "장로",
      image: "/elder-5.jpg",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            장로
          </h2>
          <p className="text-gray-600 text-lg">
            교회를 섬기며 성도들을 돌보는 장로님들을 소개합니다.
          </p>
        </div>

        {/* Elders Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {elders.map((elder, index) => (
            <StaffMemberCard
              key={index}
              name={elder.name}
              role={elder.role}
              image={elder.image}
              description={elder.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
