"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/typography"
import Dialog from "@/components/ui/dialog"
import { login, ApiError } from "@/lib/api"
import { UserLoginRequest } from "@/types/api"
import { useAuth } from "@/contexts/auth-context"
import { API_ERROR_CODES } from "@/types/api"

export default function LoginPage() {
  const router = useRouter()
  const { login: setAuth } = useAuth()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

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

    setIsLoading(true)
    try {
      const loginRequest: UserLoginRequest = {
        username: formData.username.trim(),
        password: formData.password,
      }

      const response = await login(loginRequest)

      if (response.data) {
        // 로그인 성공
        setAuth(response.data)
        router.push("/")
      }
    } catch (error) {
      if (error instanceof ApiError) {
        // 잘못된 자격증명 에러
        if (error.code === API_ERROR_CODES.INVALID_CREDENTIALS) {
          setErrors({ general: error.message })
        }
        // 승인 필요 에러
        else if (error.code === API_ERROR_CODES.USER_NOT_APPROVED) {
          setIsApprovalDialogOpen(true)
        }
        // 기타 에러
        else {
          setErrors({ general: error.message })
        }
      } else if (error instanceof Error) {
        setErrors({ general: error.message })
      } else {
        setErrors({ general: "로그인 중 오류가 발생했습니다. 다시 시도해주세요." })
      }
    } finally {
      setIsLoading(false)
    }
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
              {errors.general && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <Text variant="regular" className="text-red-800">
                    {errors.general}
                  </Text>
                </div>
              )}

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

              <Button variant="primary" type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "로그인 중..." : "로그인"}
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

      {/* 승인 필요 Dialog */}
      <Dialog
        isOpen={isApprovalDialogOpen}
        onClose={() => setIsApprovalDialogOpen(false)}
        message="관리자 승인이 필요합니다. 승인 후 로그인해주세요."
        confirmText="확인"
        onConfirm={() => setIsApprovalDialogOpen(false)}
      />
    </div>
  )
}
