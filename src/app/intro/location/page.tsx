import Header from "@/components/header"
import Footer from "@/components/footer"
import LocationMap from "@/components/location-map"

export default function LocationPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">오시는 길</h1>
            <p className="text-gray-600">교회로 오시는 길을 안내해드립니다.</p>
          </div>

          {/* Map and Info Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Map */}
            <div className="w-full h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
              <LocationMap />
            </div>

            {/* Right: Location Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">교회 위치</h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">주소</h3>
                    <p className="text-lg">경상북도 포항시 남구 대잠동</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">교통편</h3>
                    <ul className="space-y-2 text-lg">
                      <li>• 대중교통: 버스 이용 시 대잠동 정류장 하차</li>
                      <li>• 자가용: 경상북도 포항시 남구 대잠동</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">주차 안내</h3>
                    <p className="text-lg">교회 내 주차장을 이용하실 수 있습니다.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">문의</h3>
                    <p className="text-lg">전화: (054) 000-0000</p>
                    <p className="text-lg">이메일: info@church.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
