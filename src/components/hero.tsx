"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Carousel from "@/components/ui/carousel"
import { BannerItem } from "@/types/api"

interface HeroProps {
  banners: BannerItem[]
  isLoading?: boolean
}

export default function Hero({ banners, isLoading = false }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef<number>(typeof window !== "undefined" ? window.scrollY : 0)
  const wasIntersecting = useRef<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY
        const isScrollingDown = currentScrollY >= lastScrollY.current

        if (entry.isIntersecting) {
          // 아래로 스크롤할 때만 애니메이션 트리거
          // 또는 처음 뷰포트에 들어올 때
          if (isScrollingDown || !wasIntersecting.current) {
            setIsVisible(true)
          }
          wasIntersecting.current = true
        } else {
          setIsVisible(false)
          wasIntersecting.current = false
        }
        lastScrollY.current = currentScrollY
      },
      { threshold: 0.1 }
    )

    const handleScroll = () => {
      lastScrollY.current = window.scrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <section ref={sectionRef} className="relative w-full h-96 md:h-[100dvh] overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-20">
          <div className="h-16 md:h-24 w-64 md:w-96 bg-white/20 rounded-lg mb-4"></div>
          <div className="h-8 md:h-12 w-80 md:w-[500px] bg-white/20 rounded-lg"></div>
        </div>
      </section>
    )
  }

  // 배너가 없으면 렌더링하지 않음
  if (banners.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="relative w-full h-96 md:h-[100dvh] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Carousel
          autoPlay={true}
          autoPlayInterval={5000}
          showIndicators={banners.length > 1}
          showArrows={banners.length > 1}
          className="h-full"
          arrowStyle="minimal"
        >
          {banners.map((banner, index) => (
            <div key={banner.identifier} className="relative w-full h-96 md:h-[100dvh]">
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
        <h1
          className={`text-4xl md:text-6xl font-bold text-center text-balance transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          포항수정교회
        </h1>
        <p
          className={`text-lg md:text-2xl mt-4 text-center transition-all duration-1000 ease-out delay-300 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          성령충만한 이들이 용사로 세워지는 교회
        </p>
      </div>
    </section>
  )
}
  