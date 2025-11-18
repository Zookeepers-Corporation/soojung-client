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
import { signup, ApiError } from "@/lib/api"
import { UserSignupRequest } from "@/types/api"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birthDate: "",
    phone: "",
    email: "",
    joinPath: "",
    joinPathOther: "",
  })
  const [errors, setErrors] = useState<{
    username?: string
    password?: string
    passwordConfirm?: string
    name?: string
    birthDate?: string
    phone?: string
    email?: string
    general?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const joinPathOptions = [
    { value: "member", label: "교인" },
    { value: "want-to-know", label: "수정교회를 알고싶어서" },
    { value: "new-family", label: "수정교회 새가족으로 등록하고 싶어서" },
    { value: "other", label: "기타(직접입력)" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage("")

    const newErrors: {
      username?: string
      password?: string
      passwordConfirm?: string
      name?: string
      birthDate?: string
      phone?: string
      email?: string
    } = {}

    // 아이디 검증 (6-20자)
    if (!formData.username.trim()) {
      newErrors.username = "아이디를 입력해주세요."
    } else if (formData.username.length < 6 || formData.username.length > 20) {
      newErrors.username = "아이디는 6자 이상 20자 이하로 입력해주세요."
    }

    // 비밀번호 검증 (8-30자)
    if (!formData.password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요."
    } else if (formData.password.length < 8 || formData.password.length > 30) {
      newErrors.password = "비밀번호는 8자 이상 30자 이하로 입력해주세요."
    }

    // 비밀번호 확인 검증
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다."
    }

    // 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요."
    }

    // 생년월일 검증
    if (!formData.birthDate.trim()) {
      newErrors.birthDate = "생년월일을 입력해주세요."
    }

    // 휴대폰 번호 검증
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

    // API 호출
    setIsLoading(true)
    try {
      const signupRequest: UserSignupRequest = {
        username: formData.username.trim(),
        password: formData.password,
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        phoneNumber: formData.phone.trim() || undefined,
        birth: formData.birthDate || undefined,
        signupSource: formData.joinPath === "other" 
          ? formData.joinPathOther.trim() || undefined
          : formData.joinPath || undefined,
      }

      const response = await signup(signupRequest)
      
      // 성공 메시지 설정 및 Dialog 표시
      setSuccessMessage(response.message || "회원가입이 성공적으로 완료되었습니다.")
      setIsSuccessDialogOpen(true)
    } catch (error) {
      if (error instanceof ApiError) {
        // Validation 에러인 경우
        if (error.validationErrors && error.validationErrors.length > 0) {
          // Validation 에러 메시지들을 일반 에러로 표시
          // (필드별 매핑이 어려우므로 모든 메시지를 표시)
          setErrors({ 
            general: error.validationErrors.join("\n") 
          })
        } 
        // 중복 유저 에러인 경우 (code가 40104)
        else if (error.code === 40104) {
          setErrors({ username: error.message })
        }
        // 기타 API 에러
        else {
          setErrors({ general: error.message })
        }
      } else if (error instanceof Error) {
        setErrors({ general: error.message })
      } else {
        setErrors({ general: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요." })
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
                회원가입
              </Heading>
              <Text variant="regular" color="secondary">
                포항수정교회에 함께하세요
              </Text>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  {errors.general.includes("\n") ? (
                    <ul className="list-disc list-inside space-y-1">
                      {errors.general.split("\n").map((msg, index) => (
                        <li key={index}>
                          <Text variant="regular" className="text-red-800">
                            {msg}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Text variant="regular" className="text-red-800">
                      {errors.general}
                    </Text>
                  )}
                </div>
              )}

              <Input
                label="아이디 (필수)"
                type="text"
                placeholder="6자 이상 20자 이하로 입력하세요"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                error={errors.username}
                required
              />

              <Input
                label="비밀번호 (필수)"
                type="password"
                placeholder="8자 이상 30자 이하로 입력하세요"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                error={errors.password}
                required
              />

              <Input
                label="비밀번호 확인 (필수)"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.passwordConfirm}
                onChange={(e) =>
                  setFormData({ ...formData, passwordConfirm: e.target.value })
                }
                error={errors.passwordConfirm}
                required
              />

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

              <Button 
                variant="primary" 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "처리 중..." : "회원가입"}
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

      {/* 성공 Dialog */}
      <Dialog
        isOpen={isSuccessDialogOpen}
        onClose={() => {
          setIsSuccessDialogOpen(false)
          router.push("/login")
        }}
        message={successMessage}
        confirmText="확인"
        onConfirm={() => {
          setIsSuccessDialogOpen(false)
          router.push("/login")
        }}
      />
    </div>
  )
}
