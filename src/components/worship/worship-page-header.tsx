export default function WorshipPageHeader() {
    return (
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        {/* 배경 이미지 - 불투명도 조금만 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/church-background.jpeg')",
          }}
        />
        
        {/* 오버레이 - 불투명도 조금만 */}
        <div className="absolute inset-0 bg-black/10 z-0"></div>

        <div className="relative z-10 text-center">
          <p className="text-gray-600 text-lg mb-2">Worship</p>
          <h1 className="text-5xl font-bold text-gray-800">예배안내</h1>
          <div className="w-44 h-1 bg-yellow-600 mx-auto mt-4" />
        </div>
      </section>
    )
  }
  