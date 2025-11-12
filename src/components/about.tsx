export default function About() {
    return (
      <section id="about" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">목사님 소개</h2>
            <p className="text-gray-600">하나님의 말씀으로 영혼을 돌보는 목사님을 소개합니다.</p>
          </div>
  
          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img src="/------.jpg" alt="목사님" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
  
            {/* Text Content */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">주임 목사</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                주님의 말씀을 중심으로 믿음의 공동체를 세우기 위해 헌신하고 있습니다.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                성도들의 영적 성장을 도우며, 사랑과 진리로 가득한 교회 공동체를 만들어가고 있습니다.
              </p>
  
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">학력</p>
                  <p className="text-gray-900 font-semibold">신학대학원 졸업</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">경력</p>
                  <p className="text-gray-900 font-semibold">20년 이상</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  