"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { Heading, Text } from "@/components/ui/typography"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/types/api"
import {
  getNextWeekEventConfig,
  updateNextWeekEventConfig,
  ApiError,
} from "@/lib/api"
import { API_ERROR_CODES } from "@/types/api"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/toast"

export default function AdminNextWeekEventPage() {
  const router = useRouter()
  const { isLoggedIn, user, isInitialized } = useAuth()
  const isAdmin = isLoggedIn && user?.role === UserRole.ADMIN

  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<{ content?: string; general?: string }>({})

  const { showToast, ToastComponent } = useToast()

  useEffect(() => {
    // 초기화가 완료된 후에만 인증 체크
    if (!isInitialized) {
      return
    }
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    if (!isAdmin) {
      router.push("/")
      return
    }
  }, [isInitialized, isLoggedIn, isAdmin, router])

  useEffect(() => {
    if (isAdmin) {
      fetchConfig()
    }
  }, [isAdmin])

  const fetchConfig = async () => {
    setIsLoading(true)
    try {
      const response = await getNextWeekEventConfig()
      if (response.data) {
        setContent(response.data.content || "")
      }
    } catch (error) {
      console.error("다음주 이벤트 설정 조회 실패:", error)
      showToast("설정 조회 중 오류가 발생했습니다.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setErrors({})

    const newErrors: { content?: string } = {}

    if (!content.trim()) {
      newErrors.content = "내용을 입력해주세요."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSaving(true)
    try {
      const response = await updateNextWeekEventConfig({ content: content.trim() })
      if (response.code === 200) {
        // 약간의 지연을 주어 Toast가 표시되도록 함
        setTimeout(() => {
          showToast("다음주 특별행사 설정이 성공적으로 수정되었습니다.", "success")
        }, 100)
      } else {
        showToast(response.message || "설정 저장 중 오류가 발생했습니다.", "error")
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === API_ERROR_CODES.VALIDATION_ERROR && error.validationErrors) {
          setErrors({ general: error.validationErrors.join("\n") })
        } else {
          setErrors({ general: error.message || "설정 저장 중 오류가 발생했습니다." })
        }
        showToast(error.message || "설정 저장 중 오류가 발생했습니다.", "error")
      } else {
        setErrors({ general: "설정 저장 중 오류가 발생했습니다." })
        showToast("설정 저장 중 오류가 발생했습니다.", "error")
      }
    } finally {
      setIsSaving(false)
    }
  }

  // 초기화가 완료되기 전까지는 아무것도 렌더링하지 않음
  if (!isInitialized) {
    return null
  }

  if (!isLoggedIn || !isAdmin) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-900 mb-4 transition"
            >
              <ArrowLeft size={20} />
              <Text variant="small">관리자 페이지로 돌아가기</Text>
            </Link>
            <Heading variant="title1" className="mb-2">
              다음주 이벤트 관리
            </Heading>
            <Text variant="regular" color="secondary">
              다음주 특별행사 내용을 설정할 수 있습니다.
            </Text>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Text variant="regular" color="secondary">
                로딩 중...
              </Text>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Card padding="md" className="mb-6">
                <div className="space-y-4">
                  {/* 내용 입력 */}
                  <div>
                    <label htmlFor="content" className="block mb-2">
                      <Text variant="small" className="font-medium">
                        내용
                      </Text>
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={10}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y ${
                        errors.content ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="다음주 특별행사 내용을 입력해주세요."
                    />
                    {errors.content && (
                      <Text variant="small" className="text-red-600 mt-1">
                        {errors.content}
                      </Text>
                    )}
                  </div>

                  {/* 에러 메시지 */}
                  {errors.general && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <Text variant="small" className="text-red-600 whitespace-pre-line">
                        {errors.general}
                      </Text>
                    </div>
                  )}
                </div>
              </Card>

              {/* 저장 버튼 */}
              <div className="flex justify-end gap-4">
                <Button variant="secondary" onClick={() => router.push("/admin")}>
                  취소
                </Button>
                <Button variant="primary" type="submit" disabled={isSaving}>
                  {isSaving ? "저장 중..." : "저장"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
      {ToastComponent}
    </div>
  )
}

