interface SundaySchoolClass {
    name: string
    schedule: string
  }
  
  export default function SundaySchoolSection() {
    const classes: SundaySchoolClass[] = [
      { name: "유아부(0~4)", schedule: "주일 오전 10시 30분" },
      { name: "유치부(4~6)", schedule: "주일 오전 9시~10시교" },
      { name: "유초부(7~8)", schedule: "주일 오전 9시~10시" },
      { name: "저학년(8~11)", schedule: "주일 오전 / 2~3시교" },
      { name: "고학년(3~6)", schedule: "주일 오전 / 2~3시교" },
      { name: "초등(5~6학년)", schedule: "주일 오전 / 3~4시" },
      { name: "중등부", schedule: "주일 오전 / 3~4시교" },
      { name: "청년부", schedule: "주일 오전 / 1~3시교" },
    ]
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-600 mb-2">Worship</p>
            <h2 className="text-4xl font-bold text-gray-900">교회학교 예배안내</h2>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* 좌측: 교회학교 이미지 */}
            <div className="flex justify-center">
              <img
                src="/sunday-school-children-worship-gathering.jpg"
                alt="교회학교 예배"
                className="w-full max-w-sm h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
  
            {/* 우측: 반별 예배시간 */}
            <div className="space-y-4">
              {classes.map((classItem, index) => (
                <div key={index} className="pb-4 border-b border-gray-300 last:border-b-0">
                  <h4 className="font-semibold text-gray-900 mb-1">{classItem.name}</h4>
                  <p className="text-gray-600 text-sm">{classItem.schedule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  