"use client"

import { useEffect, useState } from "react"

interface SermonPageHeaderProps {
  title: string
  subtitle?: string
}

export default function SermonPageHeader({ title, subtitle }: SermonPageHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-80 flex items-center justify-center overflow-hidden">
      {/* 배경 이미지 - bible.jpg 사용 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 transition-opacity duration-1000"
        style={{
          backgroundImage: "url('/bible.jpg')",
        }}
      />
      
      {/* 오버레이 - 불투명도 조금만 */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      <div className="relative z-10 text-center">
        {subtitle && (
          <p
            className={`text-gray-600 text-lg mb-2 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            {subtitle}
          </p>
        )}
        <div className="inline-block">
          <h1
            className={`text-5xl font-bold text-gray-800 transition-all duration-700 ease-out delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            {title}
          </h1>
          <div
            className={`w-full h-1 bg-yellow-600 mx-auto mt-4 transition-all duration-700 ease-out delay-300 ${
              isVisible
                ? "opacity-100 scale-x-100"
                : "opacity-0 scale-x-0"
            }`}
          />
        </div>
      </div>
    </section>
  )
}

