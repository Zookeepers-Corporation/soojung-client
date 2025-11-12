export default function Gallery() {
    const images = [
      {
        id: 1,
        title: "주일 예배",
        image: "/--------.jpg",
      },
      {
        id: 2,
        title: "선교 활동",
        image: "/--------.jpg",
      },
      {
        id: 3,
        title: "찬양 시간",
        image: "/------.jpg",
      },
      {
        id: 4,
        title: "기도 모임",
        image: "/--------.jpg",
      },
    ]
  
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">교회 소식</h2>
            <p className="text-gray-600">우리 교회의 다양한 활동들을 소개합니다.</p>
          </div>
  
          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {images.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer group"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-white font-semibold text-lg">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  