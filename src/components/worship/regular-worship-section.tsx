interface WorshipItem {
    category: string
    times: string[]
  }
  
  export default function RegularWorshipSection() {
    const worshipSchedule: WorshipItem[] = [
      {
        category: "주일예배",
        times: ["오전 10시 30분", "오후 3시 30분"],
      },
      {
        category: "수요예배",
        times: ["저녁 7시 30분", "밤 10시 30분"],
      },
      {
        category: "금요기도회",
        times: ["오전 6시 30분"],
      },
      {
        category: "새벽기도",
        times: ["매일 오전 5시 30분"],
      },
    ]
  
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* 좌측: 이미지 */}
            <div className="flex gap-4 justify-center">
              <img
                src="/church-worship-service-1.jpg"
                alt="예배 모습 1"
                className="w-48 h-80 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/church-worship-service-2.jpg"
                alt="예배 모습 2"
                className="w-48 h-80 object-cover rounded-lg shadow-lg mt-8"
              />
            </div>
  
            {/* 우측: 예배시간 정보 */}
            <div className="space-y-8">
              {worshipSchedule.map((item, index) => (
                <div key={index} className="border-b border-gray-300 pb-6 last:border-b-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.category}</h3>
                  <ul className="space-y-2">
                    {item.times.map((time, timeIndex) => (
                      <li key={timeIndex} className="text-gray-600">
                        {time}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  