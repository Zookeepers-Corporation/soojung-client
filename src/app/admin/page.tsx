"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/types/api"
import { Users, Image, Calendar } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const { isLoggedIn, user } = useAuth()
  const isAdmin = isLoggedIn && user?.role === UserRole.ADMIN

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    if (!isAdmin) {
      router.push("/")
      return
    }
  }, [isLoggedIn, isAdmin, router])

  if (!isLoggedIn || !isAdmin) {
    return null
  }

  const adminMenus = [
    {
      title: "유저 관리",
      description: "회원 정보 조회 및 관리",
      href: "/admin/users",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "홈 배너 관리",
      description: "홈페이지 메인 배너 이미지 관리",
      href: "/admin/banners",
      icon: Image,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "다음주 이벤트 관리",
      description: "다음주 행사 내용 설정",
      href: "/admin/next-week-event",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Heading variant="title1" className="mb-2">
              관리자 페이지
            </Heading>
            <Text variant="regular" color="secondary">
              시스템 관리 및 설정을 진행할 수 있습니다.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminMenus.map((menu) => {
              const Icon = menu.icon
              return (
                <Link key={menu.href} href={menu.href}>
                  <Card padding="lg" className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className={`w-12 h-12 ${menu.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${menu.color}`} />
                    </div>
                    <Heading variant="title4" className="mb-2">
                      {menu.title}
                    </Heading>
                    <Text variant="small" color="secondary">
                      {menu.description}
                    </Text>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

