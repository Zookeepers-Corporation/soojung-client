"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/typography"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    phone: "",
    email: "",
    joinPath: "",
    joinPathOther: "",
  })
  const [errors, setErrors] = useState<{
    name?: string
    birthDate?: string
    phone?: string
    email?: string
  }>({})

  const joinPathOptions = [
    { value: "member", label: "교인" },
    { value: "want-to-know", label: "수정교회를 알고싶어서" },
    { value: "new-family", label: "수정교회 새가족으로 등록하고 싶어서" },
    { value: "other", label: "기타(직접입력)" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: {
      name?: string
      birthDate?: string
      phone?: string
      email?: string
    } = {}

    // 필수 입력 검증
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요."
    }

    if (!formData.birthDate.trim()) {
      newErrors.birthDate = "생년월일을 입력해주세요."
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "휴대폰 번호를 입력해주세요."
    }

    // 이메일 형식 검증 (입력된 경우에만)
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // TODO: API 연결 후 실제 회원가입 처리
    console.log("회원가입 시도:", formData)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <div className="text-center mb-8">
              <Heading variant="title3" className="mb-2">
                회원가입
              </Heading>
              <Text variant="regular" color="secondary">
                포항수정교회에 함께하세요
              </Text>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="이름 (필수)"
                type="text"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                error={errors.name}
                required
              />

              <Input
                label="생년월일 (필수)"
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                error={errors.birthDate}
                required
              />

              <Input
                label="휴대폰 번호 (필수)"
                type="tel"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                error={errors.phone}
                required
              />

              <Input
                label="이메일 (선택사항)"
                type="email"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={errors.email}
              />

              <div className="w-full">
                <label className="block text-sm font-medium text-[#0F1011] mb-2">
                  가입경로 (선택사항)
                </label>
                <select
                  value={formData.joinPath}
                  onChange={(e) =>
                    setFormData({ ...formData, joinPath: e.target.value })
                  }
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[0.9375rem] text-[#0F1011] focus:border-[#5E6AD2] focus:outline-none focus:ring-2 focus:ring-[rgba(94,106,210,0.2)]"
                >
                  <option value="">선택해주세요</option>
                  {joinPathOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {formData.joinPath === "other" && (
                <Input
                  label="가입경로 직접입력 (선택사항)"
                  type="text"
                  placeholder="가입경로를 입력하세요"
                  value={formData.joinPathOther}
                  onChange={(e) =>
                    setFormData({ ...formData, joinPathOther: e.target.value })
                  }
                />
              )}

              <Button variant="primary" type="submit" className="w-full">
                회원가입
              </Button>

              <div className="text-center pt-4 border-t border-[#E5E7EB]">
                <Text variant="small" color="secondary">
                  이미 계정이 있으신가요?{" "}
                  <Link
                    href="/login"
                    className="text-[#5E6AD2] hover:text-[#4E5BBD] font-medium transition"
                  >
                    로그인
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
