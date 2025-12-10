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
      name: "김재곤",
      role: "담임목사",
      image: "/sub1.jpg",
    },
    {
      name: "박미정",
      role: "교육목사",
      image: "/edu_pastor.png",
    },
  ]

  return (
    <section className="pb-4 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
