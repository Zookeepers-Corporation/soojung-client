"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/typography"
import { useAuth } from "@/contexts/auth-context"
import { UserRole, BannerItem } from "@/types/api"
import { getHomeBannerConfig, updateHomeBannerConfig, ApiError } from "@/lib/api"
import { ArrowLeft, X, GripVertical, Plus } from "lucide-react"
import Dialog from "@/components/ui/dialog"
import { useToast } from "@/components/ui/toast"

interface BannerItemWithFile extends BannerItem {
  file?: File // 새로 추가된 이미지 파일
  preview?: string // 새로 추가된 이미지의 프리뷰
}

export default function AdminBannersPage() {
  const router = useRouter()
  const { isLoggedIn, user, isInitialized } = useAuth()
  const isAdmin = isLoggedIn && user?.role === UserRole.ADMIN

  const [banners, setBanners] = useState<BannerItemWithFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const { showToast } = useToast()

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
      fetchBanners()
    }
  }, [isAdmin])

  const fetchBanners = async () => {
    setIsLoading(true)
    try {
      const response = await getHomeBannerConfig()
      if (response.data) {
        // displayOrder 순서대로 정렬
        const sortedBanners = [...response.data.banners].sort(
          (a, b) => a.displayOrder - b.displayOrder
        )
        setBanners(sortedBanners)
      }
    } catch (error) {
      console.error("배너 조회 실패:", error)
      showToast("배너 조회 중 오류가 발생했습니다.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const newBanners: BannerItemWithFile[] = []

      newFiles.forEach((file, index) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const newBanner: BannerItemWithFile = {
            identifier: `new-${Date.now()}-${index}`, // 임시 식별자
            imageUrl: "", // 새 이미지는 아직 URL이 없음
            displayOrder: banners.length + index,
            file,
            preview: reader.result as string,
          }
          newBanners.push(newBanner)

          // 모든 파일이 로드되면 상태 업데이트
          if (newBanners.length === newFiles.length) {
            setBanners([...banners, ...newBanners])
          }
        }
        reader.readAsDataURL(file)
      })
    }
    // input 초기화
    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }
  }

  const handleRemoveBanner = (index: number) => {
    setDeleteTargetIndex(index)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deleteTargetIndex !== null) {
      setBanners(banners.filter((_, i) => i !== deleteTargetIndex))
      setIsDeleteDialogOpen(false)
      setDeleteTargetIndex(null)
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    if (draggedIndex !== index) {
      const newBanners = [...banners]
      const draggedItem = newBanners[draggedIndex]
      newBanners.splice(draggedIndex, 1)
      newBanners.splice(index, 0, draggedItem)
      setBanners(newBanners)
      setDraggedIndex(index)
    }
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // 기존 배너와 새 배너 분리
      const keepBanners = banners.filter((banner) => !banner.file)
      const newBanners = banners.filter((banner) => banner.file)

      const request = {
        keepBannerIdentifiers: keepBanners.map((banner) => banner.identifier),
        keepBannerOrders: keepBanners.map((_, index) => index),
        newImages: newBanners.map((banner) => banner.file!),
        newImageOrders: newBanners.map((_, index) => keepBanners.length + index),
      }

      await updateHomeBannerConfig(request)
      showToast("홈 배너 설정이 성공적으로 수정되었습니다.", "success")
      // 리스트 새로고침
      await fetchBanners()
    } catch (error) {
      if (error instanceof ApiError) {
        showToast(error.message || "배너 저장 중 오류가 발생했습니다.", "error")
      } else {
        showToast("배너 저장 중 오류가 발생했습니다.", "error")
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              홈 배너 관리
            </Heading>
            <Text variant="regular" color="secondary">
              홈페이지 메인 배너 이미지를 관리할 수 있습니다. 드래그하여 순서를 변경할 수 있습니다.
            </Text>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Text variant="regular" color="secondary">
                로딩 중...
              </Text>
            </div>
          ) : (
            <>
              <Card padding="md" className="mb-6">
                <div className="space-y-4">
                  {/* 배너 리스트 */}
                  <div className="space-y-4">
                    {banners.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                        <Text variant="regular" color="secondary">
                          배너가 없습니다. 이미지를 추가해주세요.
                        </Text>
                      </div>
                    ) : (
                      banners.map((banner, index) => (
                        <div
                          key={banner.identifier}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragEnd={handleDragEnd}
                          className={`flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition ${
                            draggedIndex === index ? "opacity-50" : ""
                          }`}
                        >
                          {/* 드래그 핸들 */}
                          <div className="cursor-move text-gray-400 hover:text-gray-600">
                            <GripVertical size={20} />
                          </div>

                          {/* 이미지 프리뷰 */}
                          <div className="relative w-32 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                            <Image
                              src={banner.preview || banner.imageUrl}
                              alt={`배너 ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="128px"
                            />
                          </div>

                          {/* 정보 */}
                          <div className="flex-1">
                            <Text variant="small" color="secondary">
                              순서: {index + 1}
                            </Text>
                            {banner.file && (
                              <Text variant="small" className="text-blue-600 mt-1">
                                새로 추가된 이미지
                              </Text>
                            )}
                          </div>

                          {/* 삭제 버튼 */}
                          <Button
                            variant="ghost"
                            onClick={() => handleRemoveBanner(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X size={20} />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* 이미지 추가 버튼 */}
                  <div>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button
                      variant="secondary"
                      onClick={() => imageInputRef.current?.click()}
                      className="w-full"
                    >
                      <Plus size={20} className="mr-2" />
                      이미지 추가
                    </Button>
                  </div>
                </div>
              </Card>

              {/* 저장 버튼 */}
              <div className="flex justify-end gap-4">
                <Button variant="secondary" onClick={() => router.push("/admin")}>
                  취소
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "저장 중..." : "저장"}
                </Button>
              </div>
            </>
          )}

          {/* 삭제 확인 Dialog */}
          <Dialog
            isOpen={isDeleteDialogOpen}
            onClose={() => {
              setIsDeleteDialogOpen(false)
              setDeleteTargetIndex(null)
            }}
            message="이 배너를 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            showCancel={true}
            onConfirm={handleDeleteConfirm}
            onCancel={() => {
              setIsDeleteDialogOpen(false)
              setDeleteTargetIndex(null)
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

