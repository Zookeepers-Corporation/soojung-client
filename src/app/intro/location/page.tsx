import Header from "@/components/header"
import Footer from "@/components/footer"
import LocationPageHeader from "@/components/intro/location-page-header"
import LocationMap from "@/components/location-map"

export default function LocationPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <LocationPageHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

          {/* Map and Info Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Map */}
            <div className="w-full lg:w-1/2 h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <LocationMap />
            </div>

            {/* Location Info */}
            <div className="w-full lg:w-1/2 min-h-[500px] lg:h-[600px] flex flex-col justify-center items-center lg:items-start space-y-6 px-4 sm:px-0">
              <div className="w-full text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">교회 위치</h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">주소</h3>
                    <p className="text-sm sm:text-base lg:text-lg break-words">(37710) 경북 포항시 북구 두호로37번길 10 포항수정교회</p>
                  </div>
                  
                  <div>
                    <div className="space-y-3 text-sm sm:text-base lg:text-lg">
                     <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">자가용</h4>
                        <p className="text-gray-700 break-words">경북 포항시 북구 두호로37번길 10</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">버스</h4>
                        <ul className="space-y-1.5 text-gray-700">
                          <li className="break-words">• 216번 - 두호남부초등학교 하차, 걸어서 2분</li>
                          <li className="break-words">• 700, 206, 121, 302번 - 창포사거리 하차, 걸어서 8분</li>
                          <li className="break-words">• 900, 207, 600, 209번, 양덕3번 - 롯데아파트 하차, 걸어서 6분</li>
                          <li className="break-words">• 900, 207번 - 우방신천지타운 하차, 걸어서 8분</li>
                          <li className="break-words">• 9000번 - 영일대해수욕장 하차, 걸어서 10분</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">주차 안내</h3>
                    <p className="text-sm sm:text-base lg:text-lg break-words">교회 좌측 편의 전용 주차장을 이용하실 수 있습니다.</p>
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

