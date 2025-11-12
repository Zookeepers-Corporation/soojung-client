export default function Ministry() {
    const ministries = [
      {
        id: 1,
        title: "청년사역",
        description: "청년들의 영적 성장과 사회 참여를 돕는 사역",
        image: "/-----.jpg",
        link: "/ministries/youth",
      },
      {
        id: 2,
        title: "어린이사역",
        description: "어린이들의 신앙 교육과 영적 발전을 위한 사역",
        image: "/------.jpg",
        link: "/ministries/children",
      },
    ]
  
    return (
      <section id="ministries" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">세부 사역</h2>
            <p className="text-gray-600">연령대별 맞춤 사역으로 모든 세대를 섬기고 있습니다.</p>
          </div>
  
          {/* Ministry Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {ministries.map((ministry) => (
              <div key={ministry.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <img
                  src={ministry.image || "/placeholder.svg"}
                  alt={ministry.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{ministry.title}</h3>
                  <p className="text-gray-600 mb-6">{ministry.description}</p>
                  <button className="text-blue-900 font-semibold hover:text-blue-700 transition">더보기 →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  