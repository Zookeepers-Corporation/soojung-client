"use client"

import Image from "next/image"
import Carousel from "@/components/ui/carousel"
import { BannerItem } from "@/types/api"

interface HeroProps {
  banners: BannerItem[]
}

export default function Hero({ banners }: HeroProps) {
  // 배너가 없을 경우 기본 이미지 사용
  const displayBanners = banners.length > 0 
    ? banners 
    : [{ identifier: "default", imageUrl: "/main.jpg", displayOrder: 0 }]

  return (
    <section className="relative w-full h-96 md:h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Carousel
          autoPlay={true}
          autoPlayInterval={5000}
          showIndicators={displayBanners.length > 1}
          showArrows={displayBanners.length > 1}
          className="h-full"
        >
          {displayBanners.map((banner, index) => (
            <div key={banner.identifier} className="relative w-full h-96 md:h-screen">
              <Image
                src={banner.imageUrl}
                alt={`배너 이미지 ${index + 1}`}
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
  