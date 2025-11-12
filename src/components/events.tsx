export default function Events() {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Special Event Banner */}
          <div className="relative rounded-lg overflow-hidden shadow-xl mb-16">
            {/* Background Image */}
            <img src="/--------.jpg" alt="이벤트" className="w-full h-64 md:h-80 object-cover" />
  
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-balance">추수감사절 감사예배</h3>
                <p className="text-lg md:text-xl mb-6">주님께 감사드리는 시간에 초대합니다</p>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                  자세히 보기
                </button>
              </div>
            </div>
          </div>
  
          {/* Events Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">정기 모임</h4>
              <ul className="space-y-3 text-gray-600">
                <li>✓ 주일 예배: 11:00 AM</li>
                <li>✓ 수요 중보기도: 7:30 PM</li>
                <li>✓ 금요 찬양예배: 7:30 PM</li>
                <li>✓ 새벽기도: 6:00 AM</li>
              </ul>
            </div>
  
            <div className="bg-yellow-50 p-8 rounded-lg border-l-4 border-yellow-600">
              <h4 className="text-xl font-bold text-gray-900 mb-4">다음주 특별 행사</h4>
              <ul className="space-y-3 text-gray-600">
                <li>📅 성경공부: 수요일 7시</li>
                <li>👨‍👩‍👧‍👦 가족 선교: 토요일 오후</li>
                <li>🎵 찬양 콘서트: 일요일 12시 30분</li>
                <li>📖 성경 세미나: 월요일 7시</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
  