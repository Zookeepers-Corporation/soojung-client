interface SermonPageHeaderProps {
  title: string
  subtitle?: string
}

export default function SermonPageHeader({ title, subtitle }: SermonPageHeaderProps) {
  return (
    <section className="relative h-80 flex items-center justify-center overflow-hidden">
      {/* 배경 이미지 - main2.jpg 사용 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/main2.jpg')",
        }}
      />
      
      {/* 오버레이 - 불투명도 조금만 */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      <div className="relative z-10 text-center">
        {subtitle && (
          <p className="text-gray-600 text-lg mb-2">{subtitle}</p>
        )}
        <div className="inline-block">
          <h1 className="text-5xl font-bold text-gray-800">{title}</h1>
          <div className="w-full h-1 bg-yellow-600 mx-auto mt-4" />
        </div>
      </div>
    </section>
  )
}

