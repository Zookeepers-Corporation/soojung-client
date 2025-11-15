"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Categories from "@/components/categories"
import Gallery from "@/components/gallery"
import Events from "@/components/events"
import Ministry from "@/components/ministry"
import Footer from "@/components/footer"
import { getHomeInfo } from "@/lib/api"
import { BannerItem, NextWeekEventConfig } from "@/types/api"

export default function Home() {
  const [banners, setBanners] = useState<BannerItem[]>([])
  const [nextWeekEvent, setNextWeekEvent] = useState<NextWeekEventConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await getHomeInfo()
        if (response.data) {
          // displayOrder로 정렬
          const sortedBanners = [...response.data.banners.banners].sort(
            (a, b) => a.displayOrder - b.displayOrder
          )
          setBanners(sortedBanners)
          setNextWeekEvent(response.data.nextWeekEvent)
        }
      } catch (error) {
        console.error("홈 정보 조회 실패:", error)
        // 에러 발생 시 기본값 유지
      } finally {
        setIsLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  return (
    <div className="w-full">
      <Header />
      {!isLoading && banners.length > 0 && <Hero banners={banners} />}
      <Events nextWeekEvent={nextWeekEvent} />
      <Categories />
      <Gallery />
      <Footer />
    </div>
  )
}
