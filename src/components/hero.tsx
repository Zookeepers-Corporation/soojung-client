"use client"

import Image from "next/image"
import Carousel from "@/components/ui/carousel"

// Hero 이미지 목록 (추가 이미지는 여기에 추가하세요)
const heroImages = [
  {
    src: "/main.jpg",
    alt: "교회 예배",
  },
  // 추가 이미지를 원하시면 아래에 추가하세요
  {
    src: "/main.jpg",
    alt: "교회 행사",
  },
  // {
  //   src: "/hero-image-3.jpg",
  //   alt: "교회 모임",
  // },
]

export default function Hero() {
  return (
    <section className="relative w-full h-96 md:h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Carousel
          autoPlay={true}
          autoPlayInterval={5000}
          showIndicators={true}
          showArrows={true}
          className="h-full"
        >
          {heroImages.map((image, index) => (
            <div key={index} className="relative w-full h-96 md:h-screen">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                quality={85}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1920px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 z-10" />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-20 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-balance">
          하나님의 사랑을 나누는 교회
        </h1>
        <p className="text-lg md:text-2xl mt-4 text-center">
          함께 믿음으로 성장하는 공동체
        </p>
      </div>
    </section>
  )
}
  