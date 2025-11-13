import FooterMap from "./footer-map"

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Church Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">교회명</h3>
              <p className="text-gray-400 mb-6">하나님의 사랑과 진리로 세워가는 공동체입니다.</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 전화: (000) 0000-0000</p>
                <p>📧 이메일: info@church.com</p>
              </div>
            </div>
  
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">빠른 링크</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    예배 시간표
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    설교
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    사역
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    연락처
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Location */}
            <div>
              <h4 className="text-lg font-bold mb-4">찾아오는 길</h4>
              <p className="text-gray-400 mb-4">경상북도 포항시 남구 대잠동</p>
              <div className="bg-gray-800 rounded-lg h-40 overflow-hidden">
                <FooterMap />
              </div>
            </div>
          </div>
  
          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                YouTube
              </a>
            </div>
  
            {/* Copyright */}
            <p className="text-center text-gray-500 text-sm">© 2025 교회명. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
  