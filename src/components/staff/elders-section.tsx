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
  ]

  return (
    <section className="pb-4 md:pb-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Elders Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {elders.map((elder, index) => (
            <div key={index} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[240px]">
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
