"use client"

import { useEffect, useRef, useState } from "react"
import { NextWeekEventConfig } from "@/types/api"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"

interface EventsProps {
  nextWeekEvent: NextWeekEventConfig | null
}

interface WorshipSchedule {
  name: string
  time: string
  icon: string
}

const worshipSchedules: WorshipSchedule[] = [
  { name: "주일 낮 예배", time: "11:00 AM", icon: "🌅" },
  { name: "주일 오후 예배", time: "1:30 PM", icon: "☀️" },
  { name: "수요 기도회", time: "7:30 PM", icon: "🕯️" },
  { name: "금요 기도회", time: "개인기도", icon: "🙏" },
  { name: "새벽 기도회", time: "5:00 AM", icon: "🌄" },
]

const defaultEvents = [
  { name: "성경공부", time: "수요일 7시", icon: "📅" },
  { name: "가족 선교", time: "토요일 오후", icon: "👨‍👩‍👧‍👦" },
  { name: "찬양 콘서트", time: "일요일 12시 30분", icon: "🎵" },
  { name: "성경 세미나", time: "월요일 7시", icon: "📖" },
]

export default function Events({ nextWeekEvent }: EventsProps) {
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

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bible.jpg')",
        }}
      />
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/75 to-white/80"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block mb-4">
            <Heading variant="title4" className="text-[#1a1a1a] mb-3 font-bold">
              예배 및 행사
            </Heading>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto"></div>
          </div>
          <Text variant="large" className="text-[#4a4a4a] max-w-2xl mx-auto font-medium">
            주님을 찬양하며 함께 모이는 시간입니다
          </Text>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {/* 정기 예배 카드 */}
          <Card
            padding="lg"
            className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl group backdrop-blur-sm ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isVisible ? "200ms" : "0ms",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              border: "1px solid rgba(139, 115, 85, 0.2)",
            }}
          >
            {/* 장식 요소 */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B7355]/30 via-[#8B7355]/50 to-[#8B7355]/30"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#8B7355]/5 to-transparent rounded-bl-full opacity-60 group-hover:opacity-80 transition-opacity"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-[#8B7355] to-[#A68B6B] rounded-full"></div>
                <Heading variant="title3" className="text-[#2c2c2c] font-bold">
                  정기 예배
                </Heading>
              </div>
              <div className="space-y-3">
                {worshipSchedules.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/60 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 group/item border border-[#8B7355]/10 hover:border-[#8B7355]/20 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl filter drop-shadow-sm">{schedule.icon}</div>
                      <Text variant="regular" className="text-[#2c2c2c] font-semibold">
                        {schedule.name}
                      </Text>
                    </div>
                    <Text variant="regular" className="text-[#8B7355] font-bold">
                      {schedule.time}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* 교회 행사 카드 */}
          <Card
            padding="lg"
            className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl group backdrop-blur-sm ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isVisible ? "400ms" : "0ms",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              border: "1px solid rgba(139, 115, 85, 0.2)",
            }}
          >
            {/* 장식 요소 */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B7355]/30 via-[#8B7355]/50 to-[#8B7355]/30"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#8B7355]/5 to-transparent rounded-bl-full opacity-60 group-hover:opacity-80 transition-opacity"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-[#8B7355] to-[#A68B6B] rounded-full"></div>
                <Heading variant="title3" className="text-[#2c2c2c] font-bold">
                  교회 행사
                </Heading>
              </div>
            {nextWeekEvent?.content ? (
              <div
                  className="prose prose-sm max-w-none text-[#3E4145] whitespace-pre-wrap [&_p]:mb-3 [&_p]:whitespace-pre-wrap [&_ul]:space-y-2 [&_li]:text-[#3E4145] [&_*]:whitespace-pre-wrap bg-white/40 p-4 rounded-lg backdrop-blur-sm border border-[#8B7355]/10"
                  dangerouslySetInnerHTML={{
                    __html: nextWeekEvent.content
                      .replace(/\n/g, "<br />")
                      .replace(/  /g, "&nbsp;&nbsp;"),
                  }}
              />
            ) : (
                <div className="space-y-3">
                  {defaultEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/60 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 group/item border border-[#8B7355]/10 hover:border-[#8B7355]/20 hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl filter drop-shadow-sm">{event.icon}</div>
                        <Text variant="regular" className="text-[#2c2c2c] font-semibold">
                          {event.name}
                        </Text>
                      </div>
                      <Text variant="regular" className="text-[#8B7355] font-bold">
                        {event.time}
                      </Text>
                    </div>
                  ))}
                </div>
            )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
  