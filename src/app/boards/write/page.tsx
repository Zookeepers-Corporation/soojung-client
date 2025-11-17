"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/typography"
import Dialog from "@/components/ui/dialog"
import { createBoard, ApiError } from "@/lib/api"
import { BoardCategory, BoardCreateRequest, API_ERROR_CODES, UserRole } from "@/types/api"
import { useAuth } from "@/contexts/auth-context"

function WriteBoardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoggedIn, user } = useAuth()
  const categoryParam = searchParams.get("category") as BoardCategory | null

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: categoryParam || BoardCategory.BOARD,
  })

  // categoryParam이 변경되면 formData.category도 업데이트
  useEffect(() => {
    if (categoryParam) {
      setFormData((prev) => ({ ...prev, category: categoryParam }))
    }
  }, [categoryParam])
  const [images, setImages] = useState<File[]>([])
  const [imageOrders, setImageOrders] = useState<number[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<{
    title?: string
    content?: string
    category?: string
    general?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

  // 관리자 전용 카테고리인지 확인
  const isAdminOnlyCategory =
    formData.category === BoardCategory.SUNDAY_WORSHIP ||
    formData.category === BoardCategory.WEDNESDAY_WORSHIP ||
    formData.category === BoardCategory.FRIDAY_PRAYER ||
    formData.category === BoardCategory.DAWN_PRAYER ||
    formData.category === BoardCategory.SPECIAL_WORSHIP ||
    formData.category === BoardCategory.CHURCH_NEWS ||
    formData.category === BoardCategory.CHURCH_PEOPLE_NEWS

  const isAdmin = isLoggedIn && user?.role === UserRole.ADMIN

  // 로그인하지 않은 경우 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    // 관리자 전용 카테고리인데 관리자가 아닌 경우 리다이렉트
    if (isAdminOnlyCategory && !isAdmin) {
      router.push("/")
    }
  }, [isLoggedIn, isAdminOnlyCategory, isAdmin, router])

  if (!isLoggedIn) {
    return null
  }

  // 관리자 전용 카테고리인데 관리자가 아닌 경우
  if (isAdminOnlyCategory && !isAdmin) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: { title?: string; content?: string; category?: string } = {}

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요."
    }

    if (!formData.content.trim()) {
      newErrors.content = "내용을 입력해주세요."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      const request: BoardCreateRequest = {
        title: formData.title.trim(),
        content: formData.content.trim() || undefined,
        category: formData.category,
        images: images.length > 0 ? images : undefined,
        imageOrders: imageOrders.length > 0 ? imageOrders : undefined,
        files: files.length > 0 ? files : undefined,
      }

      const response = await createBoard(request)

      if (response.data) {
        setIsSuccessDialogOpen(true)
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === API_ERROR_CODES.ADMIN_ONLY) {
          setErrors({ general: error.message })
        } else if (error.code === API_ERROR_CODES.VALIDATION_ERROR && error.validationErrors) {
          setErrors({ general: error.validationErrors.join("\n") })
        } else {
          setErrors({ general: error.message })
        }
      } else if (error instanceof Error) {
        setErrors({ general: error.message })
      } else {
        setErrors({ general: "게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      const newPreviews: string[] = []
      let loadedCount = 0
      
      newImages.forEach((file, fileIndex) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews[fileIndex] = reader.result as string
          loadedCount++
          if (loadedCount === newImages.length) {
            setImagePreviews([...imagePreviews, ...newPreviews])
          }
        }
        reader.readAsDataURL(file)
      })
      
      setImages([...images, ...newImages])
      // 이미지 순서는 추가된 순서대로 설정
      const newOrders = newImages.map((_, index) => images.length + index)
      setImageOrders([...imageOrders, ...newOrders])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
    setImagePreviews(imagePreviews.filter((_, i) => i !== index))
    setImageOrders(imageOrders.filter((_, i) => i !== index).map((order, i) => i))
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    if (draggedIndex !== index) {
      const newImages = [...images]
      const newPreviews = [...imagePreviews]
      const newOrders = [...imageOrders]

      const draggedImage = newImages[draggedIndex]
      const draggedPreview = newPreviews[draggedIndex]
      const draggedOrder = newOrders[draggedIndex]

      newImages.splice(draggedIndex, 1)
      newPreviews.splice(draggedIndex, 1)
      newOrders.splice(draggedIndex, 1)

      newImages.splice(index, 0, draggedImage)
      newPreviews.splice(index, 0, draggedPreview)
      newOrders.splice(index, 0, draggedOrder)

      // 순서 재정렬 (0부터 시작)
      const reorderedOrders = newOrders.map((_, i) => i)

      setImages(newImages)
      setImagePreviews(newPreviews)
      setImageOrders(reorderedOrders)
      setDraggedIndex(index)
    }
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const getCategoryName = (category: BoardCategory) => {
    const categoryMap: Record<BoardCategory, string> = {
      [BoardCategory.SUNDAY_WORSHIP]: "주일예배",
      [BoardCategory.WEDNESDAY_WORSHIP]: "수요예배",
      [BoardCategory.FRIDAY_PRAYER]: "금요기도회",
      [BoardCategory.DAWN_PRAYER]: "새벽기도회",
      [BoardCategory.SPECIAL_WORSHIP]: "특별예배",
      [BoardCategory.BOARD]: "게시판",
      [BoardCategory.ALBUM]: "앨범",
      [BoardCategory.ARCHIVE]: "자료실",
      [BoardCategory.CHURCH_NEWS]: "교회소식",
      [BoardCategory.CHURCH_PEOPLE_NEWS]: "성도소식",
    }
    return categoryMap[category] || category
  }

  const getCategoryPath = (category: BoardCategory) => {
    const pathMap: Record<BoardCategory, string> = {
      [BoardCategory.SUNDAY_WORSHIP]: "/sermon/sunday",
      [BoardCategory.WEDNESDAY_WORSHIP]: "/sermon/wednesday",
      [BoardCategory.FRIDAY_PRAYER]: "/sermon/friday",
      [BoardCategory.DAWN_PRAYER]: "/sermon/dawn",
      [BoardCategory.SPECIAL_WORSHIP]: "/sermon/special",
      [BoardCategory.BOARD]: "/community/board",
      [BoardCategory.ALBUM]: "/community/album",
      [BoardCategory.ARCHIVE]: "/community/resources",
      [BoardCategory.CHURCH_NEWS]: "/intro/news",
      [BoardCategory.CHURCH_PEOPLE_NEWS]: "/intro/members",
    }
    return pathMap[category] || "/"
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <div className="mb-8">
              <Heading variant="title3" className="mb-2">
                게시글 작성
              </Heading>
              <Text variant="regular" color="secondary">
                {getCategoryName(formData.category)}에 게시글을 작성합니다
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
                label="제목 (필수)"
                type="text"
                placeholder="제목을 입력하세요"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                error={errors.title}
                required
              />

              <div className="w-full">
                <label className="block text-sm font-medium text-[#0F1011] mb-2">
                  내용 (필수)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="내용을 입력하세요"
                  className={`w-full bg-white border rounded-lg px-3 py-2 text-[0.9375rem] text-[#0F1011] focus:outline-none focus:ring-2 focus:ring-[rgba(94,106,210,0.2)] min-h-[300px] resize-y ${
                    errors.content ? "border-[#EB5757]" : "border-[#E5E7EB] focus:border-[#5E6AD2]"
                  }`}
                  required
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-[#EB5757]">{errors.content}</p>
                )}
              </div>

              {/* 이미지 업로드 */}
              <div className="w-full">
                <label className="block text-sm font-medium text-[#0F1011] mb-2">
                  이미지 (선택사항)
                </label>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="mt-4">
                  {images.length > 0 && (
                    <Text variant="small" color="secondary" className="mb-3 block">
                      드래그하여 순서를 변경할 수 있습니다
                    </Text>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {/* 이미지 추가 버튼 */}
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="aspect-square border-2 border-dashed border-[#E5E7EB] rounded-lg flex flex-col items-center justify-center hover:border-[#5E6AD2] hover:bg-[#F7F8FF] transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#5E6AD2] group-hover:bg-[#4E5BBD] flex items-center justify-center transition-colors mb-2">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                      <Text variant="small" color="secondary" className="text-center">
                        이미지 추가
                      </Text>
                    </button>

                    {/* 이미지 카드들 */}
                    {images.map((image, index) => (
                      <Card
                        key={index}
                        padding="none"
                        className={`
                          relative group cursor-move overflow-hidden
                          ${draggedIndex === index ? "opacity-50 scale-95" : ""}
                          hover:shadow-lg transition-all
                        `}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="aspect-square relative bg-gray-100">
                          {imagePreviews[index] && (
                            <img
                              src={imagePreviews[index]}
                              alt={`이미지 ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                              <div className="bg-white/90 rounded-full p-2">
                                <svg
                                  className="w-5 h-5 text-gray-800"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 8h16M4 16h16"
                                  />
                                </svg>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeImage(index)
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 bg-white">
                          <Text variant="small" color="secondary" className="truncate">
                            {image.name}
                          </Text>
                          <Text variant="tiny" color="tertiary">
                            순서: {index + 1}
                          </Text>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* 파일 업로드 */}
              <div className="w-full">
                <label className="block text-sm font-medium text-[#0F1011] mb-2">
                  첨부 파일 (선택사항)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[0.9375rem] text-[#0F1011] focus:border-[#5E6AD2] focus:outline-none focus:ring-2 focus:ring-[rgba(94,106,210,0.2)]"
                />
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <Text variant="small" color="secondary">
                          {file.name}
                        </Text>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-[#E5E7EB]">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  취소
                </Button>
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? "작성 중..." : "작성하기"}
                </Button>
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
          router.push(getCategoryPath(formData.category))
        }}
        message="게시글이 성공적으로 생성되었습니다."
        confirmText="확인"
        onConfirm={() => {
          setIsSuccessDialogOpen(false)
          router.push(getCategoryPath(formData.category))
        }}
      />
    </div>
  )
}

export default function WriteBoardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WriteBoardContent />
    </Suspense>
  )
}

