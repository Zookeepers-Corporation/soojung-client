export default function ChurchValues() {
    const values = [
      {
        title: "목회자를 알상하는 고혜",
        description:
          "전선을 가꾸는 것이 교회 새프-목사들을 알성들과 되는 것을 할 성들은 성경정 평 수 있는 것이든 것이고기",
      },
      {
        title: "정하인마다 깊게하는 고혜",
        description:
          "우린 데이전 같이 함께 우겸고 새로미 통하는 교 좋중 되다. 정하인 우런 함께 더자 진취 고곡을 깊게하는 기도합니다.",
      },
    ]
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  