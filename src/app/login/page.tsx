"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/typography"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { username?: string; password?: string } = {}

    if (!formData.username.trim()) {
      newErrors.username = "아이디를 입력해주세요."
    }

    if (!formData.password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // TODO: API 연결 후 실제 로그인 처리
    console.log("로그인 시도:", formData)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <div className="text-center mb-8">
              <Heading variant="title3" className="mb-2">
                로그인
              </Heading>
              <Text variant="regular" color="secondary">
                포항수정교회에 오신 것을 환영합니다
              </Text>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="아이디"
                type="text"
                placeholder="아이디를 입력하세요"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                error={errors.username}
                required
              />

              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                error={errors.password}
                required
              />

              <Button variant="primary" type="submit" className="w-full">
                로그인
              </Button>

              <div className="text-center pt-4 border-t border-[#E5E7EB]">
                <Text variant="small" color="secondary">
                  계정이 없으신가요?{" "}
                  <Link
                    href="/signup"
                    className="text-[#5E6AD2] hover:text-[#4E5BBD] font-medium transition"
                  >
                    회원가입
                  </Link>
                </Text>
              </div>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
