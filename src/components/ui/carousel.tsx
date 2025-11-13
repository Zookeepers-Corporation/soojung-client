"use client"

import { useState, useEffect, ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  children: ReactNode[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
  showArrows?: boolean
  className?: string
}

export default function Carousel({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showArrows = true,
  className = "",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const items = Array.isArray(children) ? children : [children]
  const totalItems = items.length

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalItems - 1 ? 0 : prevIndex + 1
    )
  }

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
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="relative h-full">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                     bg-white/90 hover:bg-white border border-[#E5E7EB] 
                     rounded-full p-2 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]
                     transition-all duration-200
                     hover:shadow-[0px_4px_24px_rgba(0,0,0,0.06)]
                     focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] focus:ring-offset-2"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-[#0F1011]" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                     bg-white/90 hover:bg-white border border-[#E5E7EB] 
                     rounded-full p-2 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]
                     transition-all duration-200
                     hover:shadow-[0px_4px_24px_rgba(0,0,0,0.06)]
                     focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] focus:ring-offset-2"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-[#0F1011]" />
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
