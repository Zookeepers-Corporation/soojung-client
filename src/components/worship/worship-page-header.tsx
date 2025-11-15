export default function WorshipPageHeader() {
    return (
      <div 
        className="relative py-12 border-b border-gray-200 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/church-background.jpeg)',
        }}
      >
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-white/90 mb-2">Worship</p>
          <h1 className="text-center text-4xl font-bold text-white">예배안내</h1>
        </div>
      </div>
    )
  }
  