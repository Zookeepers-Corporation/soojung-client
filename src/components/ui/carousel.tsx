"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  children: ReactNode[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
  showArrows?: boolean
  className?: string
  arrowStyle?: "default" | "minimal" // 화살표 스타일 옵션
}

export default function Carousel({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showArrows = true,
  className = "",
  arrowStyle = "default",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const items = Array.isArray(children) ? children : [children]
  const totalItems = items.length

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setTranslateX(0)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    )
    setTranslateX(0)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalItems - 1 ? 0 : prevIndex + 1
    )
    setTranslateX(0)
  }

  // 마우스 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    if (totalItems <= 1) return
    setIsDragging(true)
    setIsPaused(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
  }

  // 마우스 드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || totalItems <= 1) return
    e.preventDefault()
    setCurrentX(e.clientX)
    const diff = e.clientX - startX
    setTranslateX(diff)
  }

  // 마우스 드래그 종료
  const handleMouseUp = () => {
    if (!isDragging || totalItems <= 1) return
    setIsDragging(false)
    setIsPaused(false)

    const diff = currentX - startX
    const threshold = 50 // 드래그 임계값 (픽셀)

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
    } else {
      setTranslateX(0)
    }
  }

  // 터치 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    if (totalItems <= 1) return
    setIsDragging(true)
    setIsPaused(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }

  // 터치 이동
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || totalItems <= 1) return
    setCurrentX(e.touches[0].clientX)
    const diff = e.touches[0].clientX - startX
    setTranslateX(diff)
  }

  // 터치 종료
  const handleTouchEnd = () => {
    if (!isDragging || totalItems <= 1) return
    setIsDragging(false)
    setIsPaused(false)

    const diff = currentX - startX
    const threshold = 50 // 드래그 임계값 (픽셀)

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
    } else {
      setTranslateX(0)
    }
  }

  // 전역 마우스 이벤트 처리
  useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || totalItems <= 1) return
      setCurrentX(e.clientX)
      const diff = e.clientX - startX
      setTranslateX(diff)
    }

    const handleGlobalMouseUp = () => {
      if (!isDragging || totalItems <= 1) return
      setIsDragging(false)
      setIsPaused(false)

      const diff = currentX - startX
      const threshold = 50

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          goToPrevious()
        } else {
          goToNext()
        }
      } else {
        setTranslateX(0)
      }
    }

    window.addEventListener("mousemove", handleGlobalMouseMove)
    window.addEventListener("mouseup", handleGlobalMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove)
      window.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging, startX, currentX, totalItems])

  useEffect(() => {
    if (autoPlay && !isPaused && totalItems > 1) {
      const interval = setInterval(() => {
        goToNext()
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }
  }, [autoPlay, isPaused, autoPlayInterval, totalItems])

  if (totalItems === 0) return null

  return (
    <div
      ref={carouselRef}
      className={`relative w-full overflow-hidden ${className} ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      onMouseEnter={() => !isDragging && setIsPaused(true)}
      onMouseLeave={() => !isDragging && setIsPaused(false)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Container */}
      <div className="relative h-full">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
            transition: isDragging ? "none" : "transform 0.5s ease-in-out",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-full flex-shrink-0 h-full"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalItems > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={
              arrowStyle === "minimal"
                ? "absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:bg-transparent border-none rounded-none p-2 shadow-none transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                : "absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-[#E5E7EB] rounded-full p-2 shadow-[0px_2px_4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0px_4px_24px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] focus:ring-offset-2"
            }
            aria-label="Previous slide"
          >
            <ChevronLeft
              className={
                arrowStyle === "minimal"
                  ? "w-8 h-8 text-white drop-shadow-lg"
                  : "w-5 h-5 text-[#0F1011]"
              }
            />
          </button>
          <button
            onClick={goToNext}
            className={
              arrowStyle === "minimal"
                ? "absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:bg-transparent border-none rounded-none p-2 shadow-none transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                : "absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-[#E5E7EB] rounded-full p-2 shadow-[0px_2px_4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0px_4px_24px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] focus:ring-offset-2"
            }
            aria-label="Next slide"
          >
            <ChevronRight
              className={
                arrowStyle === "minimal"
                  ? "w-8 h-8 text-white drop-shadow-lg"
                  : "w-5 h-5 text-[#0F1011]"
              }
            />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && totalItems > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${
                  index === currentIndex
                    ? "bg-[#5E6AD2] w-6"
                    : "bg-white/60 hover:bg-white/80"
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
