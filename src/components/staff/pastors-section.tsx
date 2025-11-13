import StaffMemberCard from "./staff-member-card"

interface Pastor {
  name: string
  role: string
  image: string
  description?: string
}

export default function PastorsSection() {
  const pastors: Pastor[] = [
    {
      name: "홍길동",
      role: "담임목사",
      image: "/pastor-main.jpg",
      description: "하나님의 말씀으로 교회를 섬기고 있습니다.",
    },
    {
      name: "김철수",
      role: "부목사",
      image: "/pastor-assistant.jpg",
      description: "청년 사역과 전도 사역을 담당하고 있습니다.",
    },
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            교역자
          </h2>
          <p className="text-gray-600 text-lg">
            하나님의 말씀으로 교회를 섬기는 교역자들을 소개합니다.
          </p>
        </div>

        {/* Pastors Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pastors.map((pastor, index) => (
            <StaffMemberCard
              key={index}
              name={pastor.name}
              role={pastor.role}
              image={pastor.image}
              description={pastor.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
