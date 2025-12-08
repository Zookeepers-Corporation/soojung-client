"use client"

import { useState, useEffect, useRef, use, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/typography"
import { getBoardDetail, updateBoard, ApiError } from "@/lib/api"
import { BoardDetailResponse, BoardUpdateRequest, BoardCategory, API_ERROR_CODES } from "@/types/api"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"

interface EditBoardPageProps {
  params: Promise<{
    id: string
  }>
}

interface ImageItem {
  identifier?: string
  url: string
  file?: File
  preview?: string
  isNew: boolean
}

interface FileItem {
  identifier?: string
  fileUrl: string
  originalFileName: string
  fileSize: number
  file?: File
  isNew: boolean
}

function EditBoardContent({ params }: EditBoardPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { id } = use(params)
  const { isLoggedIn } = useAuth()
  const [board, setBoard] = useState<BoardDetailResponse | null>(null)
  const [category, setCategory] = useState<BoardCategory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // URL 경로에서 카테고리 추론 (referrer 기반)
  useEffect(() => {
    // 쿼리 파라미터에서 카테고리 가져오기 (우선순위 1)
    const categoryParam = searchParams.get("category")
    if (categoryParam && Object.values(BoardCategory).includes(categoryParam as BoardCategory)) {
      setCategory(categoryParam as BoardCategory)
      return
    }
    
    // document.referrer에서 카테고리 추론 (우선순위 2)
    if (typeof window !== "undefined" && document.referrer) {
      const referrer = new URL(document.referrer)
      const pathname = referrer.pathname
      
      // 경로에서 카테고리 추론
      if (pathname.startsWith("/community/board")) {
        setCategory(BoardCategory.BOARD)
      } else if (pathname.startsWith("/community/album")) {
        setCategory(BoardCategory.ALBUM)
      } else if (pathname.startsWith("/community/resources")) {
        setCategory(BoardCategory.ARCHIVE)
      } else if (pathname.startsWith("/intro/news")) {
        setCategory(BoardCategory.CHURCH_NEWS)
      } else if (pathname.startsWith("/intro/members")) {
        setCategory(BoardCategory.CHURCH_PEOPLE_NEWS)
      } else if (pathname.startsWith("/sermon/sunday")) {
        setCategory(BoardCategory.SUNDAY_WORSHIP)
      } else if (pathname.startsWith("/sermon/wednesday")) {
        setCategory(BoardCategory.WEDNESDAY_WORSHIP)
      } else if (pathname.startsWith("/sermon/friday")) {
        setCategory(BoardCategory.FRIDAY_PRAYER)
      } else if (pathname.startsWith("/sermon/dawn")) {
        setCategory(BoardCategory.DAWN_PRAYER)
      } else if (pathname.startsWith("/sermon/special")) {
        setCategory(BoardCategory.SPECIAL_WORSHIP)
      }
    }
  }, [searchParams])
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
  })
  const [editImages, setEditImages] = useState<ImageItem[]>([])
  const [editFiles, setEditFiles] = useState<FileItem[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [deleteFileIdentifiers, setDeleteFileIdentifiers] = useState<string[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [errors, setErrors] = useState<{
    title?: string
    content?: string
    general?: string
    files?: string
  }>({})

  // 파일과 이미지 합산 총 용량 제한 (20MB)
  // 이미지와 파일을 구분하지 않고 모두 합쳐서 20MB 제한 적용
  const MAX_TOTAL_FILE_SIZE = 20 * 1024 * 1024 // 20MB in bytes

  // 현재 파일들과 이미지들의 총 용량 계산 (이미지 + 파일 합산)
  const getTotalFileSize = () => {
    // 기존 파일들의 용량 (fileSize가 API에서 제공됨)
    const existingFileSize = editFiles.reduce((total, file) => total + file.fileSize, 0)
    // 새로 추가한 파일들의 용량
    const newFileSize = newFiles.reduce((total, file) => total + file.size, 0)
    // 기존 이미지들의 용량 (API에서 용량 정보가 제공되지 않으므로 0으로 처리)
    // const existingImageSize = 0
    // 새로 추가한 이미지들의 용량 (isNew가 true인 것들)
    const newImageSize = editImages
      .filter(img => img.isNew)
      .reduce((total, img) => total + (img.file?.size || 0), 0)

    return existingFileSize + newFileSize + newImageSize
  }


  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
  }, [isLoggedIn, router])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await getBoardDetail(id)
        if (response.data) {
          setBoard(response.data)
          setEditFormData({
            title: response.data.title,
            content: response.data.content || "",
          })
          // 기존 이미지 설정
          const sortedImages = [...response.data.images].sort((a, b) => a.displayOrder - b.displayOrder)
          setEditImages(
            sortedImages.map((img) => ({
              identifier: img.identifier,
              url: img.imageUrl,
              isNew: false,
            }))
          )
          // 기존 파일 설정
          setEditFiles(
            response.data.files.map((file) => ({
              identifier: file.identifier,
              fileUrl: file.fileUrl,
              originalFileName: file.originalFileName,
              fileSize: file.fileSize,
              isNew: false,
            }))
          )
        }
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.code === API_ERROR_CODES.BOARD_NOT_FOUND) {
            router.push("/community/board")
            return
          }
        }
        console.error("게시글 상세 조회 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isLoggedIn) {
      fetchData()
    }
  }, [id, isLoggedIn, router, searchParams])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: { title?: string; content?: string; general?: string } = {}

    if (!editFormData.title.trim()) {
      newErrors.title = "제목을 입력해주세요."
    }

    if (!editFormData.content.trim()) {
      newErrors.content = "내용을 입력해주세요."
    }

    if (getTotalFileSize() > MAX_TOTAL_FILE_SIZE) {
      newErrors.general = `파일 총 용량이 20MB를 초과합니다. 현재: ${formatFileSize(getTotalFileSize())}`
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsUpdating(true)
    try {
      // editImages 배열의 순서대로 keepImageIdentifiers, keepImageOrders, newImages, newImageOrders 설정
      const keepImageIdentifiers: string[] = []
      const keepImageOrders: number[] = []
      const newImages: File[] = []
      const newImageOrders: number[] = []

      editImages.forEach((img, index) => {
        if (img.isNew && img.file) {
          // 새 이미지인 경우
          newImages.push(img.file)
          newImageOrders.push(index)
        } else if (img.identifier) {
          // 기존 이미지인 경우
          keepImageIdentifiers.push(img.identifier)
          keepImageOrders.push(index)
        }
      })

      const request: BoardUpdateRequest = {
        title: editFormData.title.trim(),
        content: editFormData.content.trim(),
        keepImageIdentifiers: keepImageIdentifiers.length > 0 ? keepImageIdentifiers : undefined,
        keepImageOrders: keepImageOrders.length > 0 ? keepImageOrders : undefined,
        newImages: newImages.length > 0 ? newImages : undefined,
        newImageOrders: newImageOrders.length > 0 ? newImageOrders : undefined,
        deleteFileIdentifiers: deleteFileIdentifiers.length > 0 ? deleteFileIdentifiers : undefined,
        newFiles: newFiles.length > 0 ? newFiles : undefined,
      }

      const response = await updateBoard(id, request)

      if (response.data === null && category) {
        // 수정 성공 시 해당 게시글 상세 페이지로 리다이렉트
        router.push(`${getCategoryPath(category)}/${id}`)
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === API_ERROR_CODES.BOARD_UPDATE_FORBIDDEN) {
          setErrors({ general: error.message })
        } else if (error.code === API_ERROR_CODES.VALIDATION_ERROR && error.validationErrors) {
          setErrors({ general: error.validationErrors.join("\n") })
        } else {
          setErrors({ general: error.message })
        }
      } else if (error instanceof Error) {
        setErrors({ general: error.message })
      } else {
        setErrors({ general: "게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요." })
      }
    } finally {
      setIsUpdating(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImageFiles = Array.from(e.target.files)
      const currentTotalSize = getTotalFileSize()
      const newImagesTotalSize = newImageFiles.reduce((total, file) => total + file.size, 0)
      const totalSizeAfterAdd = currentTotalSize + newImagesTotalSize

      if (totalSizeAfterAdd > MAX_TOTAL_FILE_SIZE) {
        setErrors({
          ...errors,
          files: `파일 총 용량이 20MB를 초과합니다. 현재: ${formatFileSize(currentTotalSize)}, 추가하려는 이미지: ${formatFileSize(newImagesTotalSize)}, 합계: ${formatFileSize(totalSizeAfterAdd)}`
        })
        return
      }

      const newPreviews: string[] = []
      let loadedCount = 0

      newImageFiles.forEach((file, fileIndex) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews[fileIndex] = reader.result as string
          loadedCount++
          if (loadedCount === newImageFiles.length) {
            const newImageItems: ImageItem[] = newImageFiles.map((file, index) => ({
              file,
              url: newPreviews[index],
              preview: newPreviews[index],
              isNew: true,
            }))
            setEditImages([...editImages, ...newImageItems])
            setErrors({ ...errors, files: undefined })
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFileList = Array.from(e.target.files)
      const currentTotalSize = getTotalFileSize()
      const newFilesTotalSize = newFileList.reduce((total, file) => total + file.size, 0)
      const totalSizeAfterAdd = currentTotalSize + newFilesTotalSize

      if (totalSizeAfterAdd > MAX_TOTAL_FILE_SIZE) {
        setErrors({
          ...errors,
          files: `파일 총 용량이 20MB를 초과합니다. 현재: ${formatFileSize(currentTotalSize)}, 추가하려는 파일: ${formatFileSize(newFilesTotalSize)}, 합계: ${formatFileSize(totalSizeAfterAdd)}`
        })
        return
      }

      setNewFiles([...newFiles, ...newFileList])
      setErrors({ ...errors, files: undefined })
    }
  }

  const removeImage = (index: number) => {
    setEditImages(editImages.filter((_, i) => i !== index))
    setErrors({ ...errors, files: undefined }) // 이미지 제거 시 에러 초기화
  }

  const removeFile = (index: number) => {
    const file = editFiles[index]
    if (file.identifier) {
      setDeleteFileIdentifiers([...deleteFileIdentifiers, file.identifier])
    }
    setEditFiles(editFiles.filter((_, i) => i !== index))
    setErrors({ ...errors, files: undefined }) // 파일 제거 시 에러 초기화
  }

  const removeNewFile = (index: number) => {
    setNewFiles(newFiles.filter((_, i) => i !== index))
    setErrors({ ...errors, files: undefined }) // 새 파일 제거 시 에러 초기화
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    if (draggedIndex !== index) {
      const newImages = [...editImages]
      const draggedImage = newImages[draggedIndex]
      newImages.splice(draggedIndex, 1)
      newImages.splice(index, 0, draggedImage)
      setEditImages(newImages)
      setDraggedIndex(index)
    }
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
  }

  if (!isLoggedIn) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>로딩 중...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!board) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <div className="mb-8">
              <Heading variant="title3" className="mb-2">
                게시글 수정
              </Heading>
              <Text variant="regular" color="secondary">
                게시글을 수정합니다
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
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                error={errors.title}
                required
              />

              <div className="w-full">
                <label className="block text-sm font-medium text-[#0F1011] mb-2">
                  내용 (필수)
                </label>
                <textarea
                  value={editFormData.content}
                  onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
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
                <Text variant="small" color="tertiary" className="mb-2">
                  PNG, JPG, JPEG 파일만 업로드 가능합니다. 동영상은 업로드할 수 없습니다.
                </Text>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="mt-4">
                  {editImages.length > 0 && (
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
                    {editImages.map((image, index) => (
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
                          {(image.preview || image.url) && (
                            <Image
                              src={image.preview || image.url}
                              alt={`이미지 ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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
                            {image.isNew ? (image.file?.name || "새 이미지") : "기존 이미지"}
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
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-800 font-medium">
                      파일 총 용량 제한: 20MB
                    </span>
                    <span className={`font-semibold ${getTotalFileSize() > MAX_TOTAL_FILE_SIZE * 0.8 ? 'text-red-600' : 'text-blue-600'}`}>
                      현재: {formatFileSize(getTotalFileSize())} / 20MB
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        getTotalFileSize() > MAX_TOTAL_FILE_SIZE * 0.8 ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{
                        width: `${Math.min((getTotalFileSize() / MAX_TOTAL_FILE_SIZE) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
                {errors.files && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">{errors.files}</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  disabled={getTotalFileSize() >= MAX_TOTAL_FILE_SIZE}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={getTotalFileSize() >= MAX_TOTAL_FILE_SIZE}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[0.9375rem] text-[#0F1011] focus:border-[#5E6AD2] focus:outline-none focus:ring-2 focus:ring-[rgba(94,106,210,0.2)] hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  파일 추가
                </button>

                {/* 기존 파일 목록 */}
                {editFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {editFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <Text variant="small" color="secondary" className="font-medium">
                            {file.originalFileName}
                          </Text>
                          <Text variant="tiny" color="tertiary">
                            {formatFileSize(file.fileSize)}
                          </Text>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800 text-sm ml-4"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* 새 파일 목록 */}
                {newFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {newFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-blue-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <Text variant="small" color="secondary" className="font-medium">
                            {file.name}
                          </Text>
                          <Text variant="tiny" color="tertiary">
                            {formatFileSize(file.size)}
                          </Text>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeNewFile(index)}
                          className="text-red-600 hover:text-red-800 text-sm ml-4"
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
                  disabled={isUpdating}
                >
                  취소
                </Button>
                <Button variant="primary" type="submit" disabled={isUpdating}>
                  {isUpdating ? "수정 중..." : "수정하기"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function EditBoardPage({ params }: EditBoardPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBoardContent params={params} />
    </Suspense>
  )
}

