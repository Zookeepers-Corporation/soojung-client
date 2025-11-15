"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Pagination from "@/components/ui/pagination"
import { Heading, Text } from "@/components/ui/typography"
import { useAuth } from "@/contexts/auth-context"
import { UserRole, AdminUserListResponse } from "@/types/api"
import { getAdminUserList, ApiError } from "@/lib/api"
import { API_ERROR_CODES } from "@/types/api"
import { Search, ArrowLeft, CheckCircle, XCircle } from "lucide-react"

export default function AdminUsersPage() {
  const router = useRouter()
  const { isLoggedIn, user } = useAuth()
  const isAdmin = isLoggedIn && user?.role === UserRole.ADMIN

  const [users, setUsers] = useState<AdminUserListResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [pageSize] = useState(20)

  // 필터 및 검색 상태
  const [searchKeyword, setSearchKeyword] = useState("")
  const [isApprovedFilter, setIsApprovedFilter] = useState<boolean | undefined>(undefined)
  const [sort, setSort] = useState("latest")

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

  useEffect(() => {
    if (isAdmin) {
      fetchUsers()
    }
  }, [currentPage, isApprovedFilter, sort, isAdmin])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const response = await getAdminUserList({
        isApproved: isApprovedFilter,
        searchKeyword: searchKeyword.trim() || undefined,
        page: currentPage,
        size: pageSize,
        sort,
      })

      if (response.data) {
        setUsers(response.data.content)
        setTotalPages(response.data.totalPages)
        setTotalElements(response.data.totalElements)
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === API_ERROR_CODES.ADMIN_ONLY) {
          router.push("/")
        }
      }
      console.error("유저 리스트 조회 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    setCurrentPage(0)
    fetchUsers()
  }

  const handleFilterChange = (value: boolean | undefined) => {
    setIsApprovedFilter(value)
    setCurrentPage(0)
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    setCurrentPage(0)
  }

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

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
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
              유저 관리
            </Heading>
            <Text variant="regular" color="secondary">
              회원 정보를 조회하고 관리할 수 있습니다.
            </Text>
          </div>

          {/* 검색 및 필터 */}
          <Card padding="md" className="mb-6">
            <div className="space-y-4">
              {/* 검색 */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    label="검색"
                    type="text"
                    placeholder="이름 또는 이메일로 검색"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSearch()
                      }
                    }}
                  />
                </div>
                <div className="flex items-end">
                  <Button variant="primary" onClick={handleSearch}>
                    <Search size={16} className="mr-2" />
                    검색
                  </Button>
                </div>
              </div>

              {/* 필터 및 정렬 */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* 승인 여부 필터 */}
                <div className="flex items-center gap-2">
                  <Text variant="small" className="font-medium">
                    승인 여부:
                  </Text>
                  <div className="flex gap-2">
                    <Button
                      variant={isApprovedFilter === undefined ? "primary" : "secondary"}
                      onClick={() => handleFilterChange(undefined)}
                      className="text-xs px-3 py-1"
                    >
                      전체
                    </Button>
                    <Button
                      variant={isApprovedFilter === true ? "primary" : "secondary"}
                      onClick={() => handleFilterChange(true)}
                      className="text-xs px-3 py-1"
                    >
                      승인됨
                    </Button>
                    <Button
                      variant={isApprovedFilter === false ? "primary" : "secondary"}
                      onClick={() => handleFilterChange(false)}
                      className="text-xs px-3 py-1"
                    >
                      미승인
                    </Button>
                  </div>
                </div>

                {/* 정렬 */}
                <div className="flex items-center gap-2">
                  <Text variant="small" className="font-medium">
                    정렬:
                  </Text>
                  <select
                    value={sort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된순</option>
                    <option value="name">이름순</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* 유저 리스트 */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Text variant="regular" color="secondary">
                로딩 중...
              </Text>
            </div>
          ) : users.length === 0 ? (
            <Card padding="lg">
              <div className="text-center py-12">
                <Text variant="regular" color="secondary">
                  조회된 유저가 없습니다.
                </Text>
              </div>
            </Card>
          ) : (
            <>
              <Card padding="none" className="mb-6 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        이름
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        생년월일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        이메일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        역할
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        승인 여부
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        가입 경로
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        가입일
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {users.map((user, index) => (
                      <tr
                        key={user.identifier}
                        className={`hover:bg-gray-50 transition ${
                          index < users.length - 1 ? "border-b border-gray-200" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Text variant="regular" className="font-medium">
                            {user.name}
                          </Text>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Text variant="small" color="secondary">
                            {user.birth ? formatDate(user.birth) : "-"}
                          </Text>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Text variant="small" color="secondary">
                            {user.email || "-"}
                          </Text>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === UserRole.ADMIN
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role === UserRole.ADMIN ? "관리자" : "일반"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.approved ? (
                            <span className="inline-flex items-center gap-1 text-green-600">
                              <CheckCircle size={16} />
                              <Text variant="small" className="text-green-600">
                                승인됨
                              </Text>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-600">
                              <XCircle size={16} />
                              <Text variant="small" className="text-red-600">
                                미승인
                              </Text>
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Text variant="small" color="secondary">
                            {user.signupSource || "-"}
                          </Text>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Text variant="small" color="secondary">
                            {formatDateTime(user.createdAt)}
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mb-6">
                  <Text variant="small" color="secondary">
                    총 {totalElements}명의 유저
                  </Text>
                  <Pagination
                    currentPage={currentPage + 1}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page - 1)}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

