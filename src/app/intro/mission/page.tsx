"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import MissionPageHeader from "@/components/intro/mission-page-header"

export default function MissionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <MissionPageHeader />
        
        <div className="relative py-20 min-h-[600px] flex items-center justify-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/80 z-0"></div>

          {/* Content Box */}
          <div className="relative z-10 max-w-2xl w-full mx-4 text-center border border-gray-300 p-10 md:p-16 bg-white/50">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-relaxed">
              포항수정교회는<br /> 
              예수 그리스도의 복음으로
            </h2>

            <div className="space-y-6 mb-10">
              <div className="py-2">
                <p className="text-xl text-gray-800 font-medium font-bold">
                  가정을 행복하게
                </p>
              </div>
              
              <div className="py-2">
                <p className="text-xl text-gray-800 font-medium font-bold">
                  일터를 복되게
                </p>
              </div>

              <div className="py-2">
                <p className="text-xl text-gray-800 font-medium font-bold">
                  자녀를 지도자로 키워
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-2xl font-bold text-blue-900 leading-normal">
                하나님 나라를 든든히<br className="md:hidden" /> 세워가는 교회입니다.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

