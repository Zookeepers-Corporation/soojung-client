export default function StaffPageHeader() {
  return (
    <div className="relative py-16 md:py-24">
      {/* 배경 이미지 - 불투명도 적용 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(/church-background.jpeg)',
        }}
      />
      
      {/* 오버레이 - 불투명도 조금만 */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-gray-800 text-4xl md:text-5xl font-bold mb-4">섬기는 사람들</h1>
        <p className="text-gray-600 text-xl md:text-2xl">
          하나님의 사랑으로 교회를 섬기는 분들을 소개합니다
        </p>
      </div>
    </div>
  )
}
