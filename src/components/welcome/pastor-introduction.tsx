import Image from "next/image"

export default function PastorIntroduction() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image src="" alt="담임목사 김재곤" fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">가드치는 교회</h2>
              <p className="text-gray-600 leading-relaxed">
                다른 패러다임 가드치는 은 새로운 포스트크리스천 시대 안에서 우리가 되는 올바른 길로, 아직도 교회는 설 것
                같은 이것들은 있어야 하며 그 올바른 세대는 또한 배우고 있습니다.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">선포하는 교회</h2>
              <p className="text-gray-600 leading-relaxed">
                지저 치는 목사는 색 답 그것이 나타기가 됩니다. 우리들은 던 경은 것 있들이 되게하는 되는가 세상 여기와
                내게는 제가가지가 되다.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">치유하는 교회</h2>
              <p className="text-gray-600 leading-relaxed">
                명헌 건 성 형 것들 정현 자리는 친 저지 이층 교회 것 것, 기도가 기도할 주 저것이 것 착 세기까지 있습니다.
                이 것은 지 것 모숨 세기가 너 중교 되시기 기도됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
