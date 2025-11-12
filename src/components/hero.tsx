export default function Hero() {
    return (
      <section className="relative w-full h-96 md:h-screen bg-cover bg-center overflow-hidden">
        {/* Background Image */}
        <img src="/--------.jpg" alt="교회 예배" className="absolute inset-0 w-full h-full object-cover" />
  
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
  
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-balance">하나님의 사랑을 나누는 교회</h1>
          <p className="text-lg md:text-2xl mt-4 text-center">함께 믿음으로 성장하는 공동체</p>
        </div>
      </section>
    )
  }
  