"use client"

import { useEffect, useState, use, useRef } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonDetail from "@/components/sermon/sermon-detail"
import CommentSection from "@/components/sermon/comment-section"
import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/typography"
import Dialog from "@/components/ui/dialog"
import { getBoardDetail, updateBoard, ApiError } from "@/lib/api"
import { BoardDetailResponse, BoardUpdateRequest, API_ERROR_CODES } from "@/types/api"

interface SermonDetailPageProps {
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

export default function SermonDetailPage({ params }: SermonDetailPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [board, setBoard] = useState<BoardDetailResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
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
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [errors, setErrors] = useState<{
    title?: string
    content?: string
    general?: string
  }>({})

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
          const sortedImages = [...response.data.images].sort((a, b) => a.displayOrder - b.displayOrder)
          setEditImages(
            sortedImages.map((img) => ({
              identifier: img.identifier,
              url: img.imageUrl,
              isNew: false,
            }))
          )
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
            router.push("/sermon/wednesday")
          }
        }
        console.error("게시글 상세 조회 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  const handleEdit = () => {
    setIsEditMode(true)
  }

  const handleCancelEdit = () => {
    setIsEditMode(false)
    setErrors({})
    if (board) {
      setEditFormData({
        title: board.title,
        content: board.content || "",
      })
      const sortedImages = [...board.images].sort((a, b) => a.displayOrder - b.displayOrder)
      setEditImages(
        sortedImages.map((img) => ({
          identifier: img.identifier,
          url: img.imageUrl,
          isNew: false,
        }))
      )
      setEditFiles(
        board.files.map((file) => ({
          identifier: file.identifier,
          fileUrl: file.fileUrl,
          originalFileName: file.originalFileName,
          fileSize: file.fileSize,
          isNew: false,
        }))
      )
      setNewFiles([])
      setDeleteFileIdentifiers([])
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImageFiles = Array.from(e.target.files)
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
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFiles([...newFiles, ...Array.from(e.target.files)])
  }
}

  const removeImage = (index: number) => {
    setEditImages(editImages.filter((_, i) => i !== index))
  }

  const removeFile = (index: number) => {
    const file = editFiles[index]
    if (file.identifier) {
      setDeleteFileIdentifiers([...deleteFileIdentifiers, file.identifier])
    }
    setEditFiles(editFiles.filter((_, i) => i !== index))
  }

  const removeNewFile = (index: number) => {
    setNewFiles(newFiles.filter((_, i) => i !== index))
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

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: { title?: string; content?: string } = {}

    if (!editFormData.title.trim()) {
      newErrors.title = "제목을 입력해주세요."
    }

    if (!editFormData.content.trim()) {
      newErrors.content = "내용을 입력해주세요."
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

      if (response.data === null) {
        setIsSuccessDialogOpen(true)
        const refreshResponse = await getBoardDetail(id)
        if (refreshResponse.data) {
          setBoard(refreshResponse.data)
          setIsEditMode(false)
        }
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

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    // TODO: 삭제 API 호출
    setIsDeleteDialogOpen(false)
    console.log("삭제 기능은 추후 구현 예정")
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

  const imageUrls = board.images
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((img) => img.imageUrl)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {isEditMode ? (
          <div className="py-12 md:py-16">
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

                <form onSubmit={handleUpdateSubmit} className="space-y-6">
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
                    {errors.content && <p className="mt-1 text-sm text-[#EB5757]">{errors.content}</p>}
                  </div>

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
                      {editImages.length > 0 && (
                        <Text variant="small" color="secondary" className="mb-3 block">
                          드래그하여 순서를 변경할 수 있습니다
                        </Text>
                      )}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

                        {editImages.map((image, index) => (
                          <Card
                            key={image.identifier || `new-${index}`}
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
                              <img
                                src={image.url}
                                alt={`이미지 ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
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
                              <Text variant="tiny" color="tertiary">
                                순서: {index + 1}
                              </Text>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-[#0F1011] mb-2">
                      첨부 파일 (선택사항)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-[#E5E7EB] rounded-lg px-4 py-3 hover:border-[#5E6AD2] hover:bg-[#F7F8FF] transition-colors text-center"
                    >
                      <Text variant="small" color="secondary">
                        파일 추가
                      </Text>
                    </button>

                    {editFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {editFiles.map((file, index) => (
                          <div
                            key={file.identifier || index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <Text variant="small" color="secondary" className="font-medium">
                                {file.originalFileName}
                              </Text>
                              <Text variant="tiny" color="tertiary">
                                {(file.fileSize / 1024).toFixed(2)} KB
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

                    {newFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {newFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                          >
                            <Text variant="small" color="secondary">
                              {file.name} (새 파일)
                            </Text>
                            <button
                              type="button"
                              onClick={() => removeNewFile(index)}
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
                      onClick={handleCancelEdit}
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
          </div>
        ) : (
          <>
        <SermonDetail
              title={board.title}
              author={board.authorName}
              date={formatDate(board.createdAt)}
              images={imageUrls}
              content={board.content}
              canEdit={board.canEdit}
              canDelete={board.canDelete}
              onEdit={handleEdit}
              onDelete={handleDelete}
        />
        <div className="pb-12">
              <CommentSection
                boardIdentifier={id}
                comments={board.comments}
                commentCount={board.commentCount}
                onCommentUpdate={async () => {
                  const refreshResponse = await getBoardDetail(id)
                  if (refreshResponse.data) {
                    setBoard(refreshResponse.data)
                  }
                }}
              />
        </div>
          </>
        )}
      </main>
      <Footer />

      <Dialog
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        message="게시글이 성공적으로 수정되었습니다."
        confirmText="확인"
        onConfirm={() => setIsSuccessDialogOpen(false)}
      />

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        message="정말 이 게시글을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        showCancel={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  )
}
