export default function WelcomeHero() {
    return (
      <section className="relative h-96 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('/grand-church-interior.png')",
          }}
        />
  
        <div className="relative z-10 text-center">
          <p className="text-gray-600 text-lg mb-2">강남교회 담임목사</p>
          <h1 className="text-5xl font-bold text-gray-800">고문산</h1>
          <div className="w-32 h-1 bg-yellow-600 mx-auto mt-4" />
        </div>
      </section>
    )
  }
  