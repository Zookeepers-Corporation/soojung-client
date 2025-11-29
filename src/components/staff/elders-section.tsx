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
      name: "박재원",
      role: "장로",
      image: "/elder-1.jpg",
    },
    {
      name: "김승환",
      role: "장로",
      image: "/elder-3.jpg",
    },
    {
      name: "방청록",
      role: "장로",
      image: "/elder1.jpg",
    },
    {
      name: "황영택",
      role: "장로",
      image: "/elder-5.jpg",
    },
    {
      name: "송갑천",
      role: "장로(은퇴)",
      image: "/elder-6.jpg",
    },
  ]

  return (
    <section className="pb-4 md:pb-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Elders Grid */}
        <div className="flex flex-col md:flex-row justify-center gap-4 md:overflow-x-auto px-4">
          {elders.map((elder, index) => (
            <div key={index} className="flex-shrink-0 w-56 mx-auto md:mx-0">
              <StaffMemberCard
                name={elder.name}
                role={elder.role}
                image={elder.image}
                description={elder.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
