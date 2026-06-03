"use client"

import { useEffect, useRef, useState } from "react"
import { NextWeekEventConfig } from "@/types/api"
import { Heading, Text } from "@/components/ui/typography"

interface EventsProps {
  nextWeekEvent: NextWeekEventConfig | null
}

interface ScheduleItem {
  name: string
  time: string
}

const worshipSchedules: ScheduleItem[] = [
  { name: "주일 낮 예배", time: "11:00 AM" },
  { name: "주일 오후 예배", time: "1:30 PM" },
  { name: "수요 기도회", time: "7:30 PM" },
  { name: "금요 기도회", time: "개인기도" },
  { name: "새벽 기도회", time: "5:00 AM" },
]

const defaultEvents: ScheduleItem[] = [
  { name: "성경공부", time: "수요일 7시" },
  { name: "가족 선교", time: "토요일 오후" },
  { name: "찬양 콘서트", time: "일요일 12시 30분" },
  { name: "성경 세미나", time: "월요일 7시" },
]

// 예배별 사진이 준비되기 전까지 사용하는 인디고 계열 그라데이션 (순환)
const tileGradients = [
  "from-[#5E6AD2] to-[#3E4AAD]",
  "from-[#6D78D9] to-[#4E5BBD]",
  "from-[#4E5BBD] to-[#363F8F]",
  "from-[#7B86E0] to-[#5E6AD2]",
  "from-[#5862C9] to-[#3E4AAD]",
]

interface ScheduleTileProps {
  item: ScheduleItem
  gradient: string
  isVisible: boolean
  delay: number
}

function ScheduleTile({ item, gradient, isVisible, delay }: ScheduleTileProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} p-5 min-h-[104px] flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {/* 장식 원 */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-4 w-20 h-20 rounded-full bg-black/10" />
      <h4 className="relative text-white text-lg md:text-xl font-bold tracking-tight">
        {item.name}
      </h4>
      <span className="relative text-white/85 text-sm font-medium">{item.time}</span>
    </div>
  )
}

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
    <section ref={sectionRef} className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-10 md:mb-12 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block mb-4">
            <Heading variant="title4" className="text-[#0F1011] mb-3 font-bold tracking-tight">
              예배 및 행사
            </Heading>
            <div className="w-12 h-1 bg-[#5E6AD2] rounded-full mx-auto"></div>
          </div>
          <Text variant="large" className="text-[#3E4145] max-w-2xl mx-auto">
            주님을 찬양하며 함께 모이는 시간입니다
          </Text>
        </div>

        {/* 정기 예배 타일 그리드 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#5E6AD2] rounded-full"></div>
            <Heading variant="title3" className="text-[#0F1011] font-bold">
              정기 예배
            </Heading>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {worshipSchedules.map((schedule, index) => (
              <ScheduleTile
                key={schedule.name}
                item={schedule}
                gradient={tileGradients[index % tileGradients.length]}
                isVisible={isVisible}
                delay={index * 80}
              />
            ))}
          </div>
        </div>

        {/* 교회 행사 */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#5E6AD2] rounded-full"></div>
            <Heading variant="title3" className="text-[#0F1011] font-bold">
              교회 행사
            </Heading>
          </div>
          {nextWeekEvent?.content ? (
            <div
              className={`bg-white border border-[#E5E7EB] shadow-sm p-6 transition-all duration-500 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div
                className="prose prose-sm max-w-none text-[#3E4145] whitespace-pre-wrap [&_p]:mb-3 [&_p]:whitespace-pre-wrap [&_ul]:space-y-2 [&_li]:text-[#3E4145] [&_*]:whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: nextWeekEvent.content
                    .replace(/\n/g, "<br />")
                    .replace(/  /g, "&nbsp;&nbsp;"),
                }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {defaultEvents.map((event, index) => (
                <ScheduleTile
                  key={event.name}
                  item={event}
                  gradient={tileGradients[index % tileGradients.length]}
                  isVisible={isVisible}
                  delay={index * 80}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
