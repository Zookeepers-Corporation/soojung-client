import FooterMap from "./footer-map"

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Church Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">포항수정교회</h3>
              <p className="text-gray-400 mb-6">성령충만한 이들이 용사로 세워지는 교회입니다.</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 전화: 054-248-7831</p>
                <p>📧 이메일: pohangsoojungofficial@gmail.com</p>
              </div>
            </div>
  
            {/* Location */}
            <div>
              <h4 className="text-lg font-bold mb-4">찾아오는 길</h4>
              <p className="text-gray-400 mb-4">(37710) 경북 포항시 북구 두호로37번길 10 포항수정교회</p>
              <div className="bg-gray-800 rounded-lg h-40 overflow-hidden">
                <FooterMap />
              </div>
            </div>
          </div>
  
          {/* Divider */}
          <div className="border-t border-gray-800 pt-6">
            {/* Address and Copyright */}
            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm">
                (37710) 경북 포항시 북구 두호로37번길 10 포항수정교회
              </p>
              <p className="text-gray-500 text-sm">
                Copyright (c) 2025 포항수정교회 All rights reserved. provided by Zookeepers
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  