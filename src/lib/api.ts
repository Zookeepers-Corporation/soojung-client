import {
  UserSignupRequest,
  UserSignupResponse,
  UserLoginRequest,
  UserLoginApiResponse,
  HomeApiResponse,
  BoardCategory,
  BoardListApiResponse,
  BoardCreateRequest,
  BoardCreateApiResponse,
  BoardDetailApiResponse,
  BoardUpdateRequest,
  BoardUpdateApiResponse,
  CommentCreateRequest,
  CommentCreateApiResponse,
  CommentUpdateRequest,
  CommentUpdateApiResponse,
  CommentDeleteApiResponse,
  AdminUserListApiResponse,
  HomeBannerApiResponse,
  UpdateHomeBannerRequest,
  UpdateHomeBannerApiResponse,
  NextWeekEventConfigApiResponse,
  UpdateNextWeekEventRequest,
  UpdateNextWeekEventApiResponse,
  API_ERROR_CODES,
  ApiResponseData,
} from "@/types/api"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: number,
    public validationErrors?: string[]
  ) {
    super(message)
    this.name = "ApiError"
  }
}

/**
 * API 요청 기본 설정
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`
  
  // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 boundary 포함 설정)
  const isFormData = options.body instanceof FormData
  
  const config: RequestInit = {
    ...options,
    credentials: "include", // 세션 쿠키 전송
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    // 모든 응답은 ApiResponseData 형식
    let responseData: ApiResponseData<unknown>
    try {
      responseData = await response.json()
    } catch {
      // JSON 파싱 실패 시
      throw new ApiError(
        `서버 응답을 파싱할 수 없습니다: ${response.status} ${response.statusText}`,
        response.status
      )
    }

    // HTTP 상태 코드가 200-299가 아니거나, 응답 code가 에러 코드인 경우
    const isError =
      !response.ok ||
      responseData.code === API_ERROR_CODES.VALIDATION_ERROR ||
      responseData.code === API_ERROR_CODES.UNAUTHORIZED ||
      responseData.code === API_ERROR_CODES.INVALID_CREDENTIALS ||
      responseData.code === API_ERROR_CODES.USER_NOT_APPROVED ||
      responseData.code === API_ERROR_CODES.USER_ALREADY_EXIST ||
      responseData.code === API_ERROR_CODES.SESSION_EXPIRED ||
      responseData.code === API_ERROR_CODES.BOARD_NOT_FOUND ||
      responseData.code === API_ERROR_CODES.COMMENT_UPDATE_FORBIDDEN ||
      responseData.code === API_ERROR_CODES.COMMENT_DELETE_FORBIDDEN ||
      (responseData.code !== undefined && responseData.code >= 400)

    if (isError) {
      let errorMessage = responseData.message || "요청 처리 중 오류가 발생했습니다."
      const errorCode: number | undefined = responseData.code
      let validationErrors: string[] | undefined

      // Validation 에러인 경우 (code가 100이고 data가 배열인 경우)
      if (
        responseData.code === API_ERROR_CODES.VALIDATION_ERROR &&
        Array.isArray(responseData.data)
      ) {
        validationErrors = responseData.data as string[]
        errorMessage = responseData.message || "유효성 검사 오류"
      }
      // 중복 유저 에러인 경우 (code가 40104인 경우)
      else if (responseData.code === API_ERROR_CODES.USER_ALREADY_EXIST) {
        errorMessage = responseData.message || "ID가 중복 되었습니다. 다른 ID를 입력해주세요"
      }
      // 세션 만료 에러인 경우 (code가 40105인 경우)
      else if (responseData.code === API_ERROR_CODES.SESSION_EXPIRED) {
        errorMessage = responseData.message || "세션이 만료되었습니다. 다시 로그인해주세요."
        // 세션 만료는 특별 처리 (전역 Dialog 표시)
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("session-expired", {
              detail: { message: errorMessage },
            })
          )
        }
      }
      // 인증 필요 에러인 경우 (code가 40100인 경우)
      else if (responseData.code === API_ERROR_CODES.UNAUTHORIZED) {
        errorMessage = responseData.message || "인증이 필요합니다."
      }
      // 잘못된 자격증명 에러인 경우 (code가 40101인 경우)
      else if (responseData.code === API_ERROR_CODES.INVALID_CREDENTIALS) {
        errorMessage = responseData.message || "아이디 또는 비밀번호가 올바르지 않습니다."
      }
      // 승인 필요 에러인 경우 (code가 40102인 경우)
      else if (responseData.code === API_ERROR_CODES.USER_NOT_APPROVED) {
        errorMessage = responseData.message || "관리자 승인이 필요합니다. 승인 후 로그인해주세요."
      }
      // 게시글을 찾을 수 없는 경우 (code가 40001인 경우)
      else if (responseData.code === API_ERROR_CODES.BOARD_NOT_FOUND) {
        errorMessage = responseData.message || "게시글을 찾을 수 없습니다."
      }
      // 댓글 수정 권한 없음 에러인 경우 (code가 40304인 경우)
      else if (responseData.code === API_ERROR_CODES.COMMENT_UPDATE_FORBIDDEN) {
        errorMessage = responseData.message || "댓글 수정 권한이 없습니다."
      }
      // 댓글 삭제 권한 없음 에러인 경우 (code가 40305인 경우)
      else if (responseData.code === API_ERROR_CODES.COMMENT_DELETE_FORBIDDEN) {
        errorMessage = responseData.message || "댓글 삭제 권한이 없습니다."
      }

      throw new ApiError(errorMessage, response.status, errorCode, validationErrors)
    }

    // 성공 응답 반환 (ApiResponseData 형식)
    return responseData as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error("네트워크 오류가 발생했습니다.")
  }
}

/**
 * 회원가입 API 호출
 */
export async function signup(request: UserSignupRequest): Promise<UserSignupResponse> {
  return fetchApi<UserSignupResponse>("/v1/users/signup", {
    method: "POST",
    body: JSON.stringify(request),
  })
}

/**
 * 로그인 API 호출
 */
export async function login(request: UserLoginRequest): Promise<UserLoginApiResponse> {
  return fetchApi<UserLoginApiResponse>("/v1/users/login", {
    method: "POST",
    body: JSON.stringify(request),
  })
}

/**
 * 홈 정보 조회 API 호출
 */
export async function getHomeInfo(): Promise<HomeApiResponse> {
  return fetchApi<HomeApiResponse>("/v1/home", {
    method: "GET",
  })
}

/**
 * 게시글 리스트 조회 API 호출
 */
export async function getBoardList(
  category: BoardCategory,
  page: number = 0,
  size: number = 20
): Promise<BoardListApiResponse> {
  const params = new URLSearchParams({
    category,
    page: page.toString(),
    size: size.toString(),
  })

  return fetchApi<BoardListApiResponse>(`/v1/boards?${params.toString()}`, {
    method: "GET",
  })
}

/**
 * 게시글 상세 조회 API 호출
 */
export async function getBoardDetail(identifier: string): Promise<BoardDetailApiResponse> {
  return fetchApi<BoardDetailApiResponse>(`/v1/boards/${identifier}`, {
    method: "GET",
  })
}

/**
 * 게시글 수정 API 호출 (multipart/form-data)
 */
export async function updateBoard(
  identifier: string,
  request: BoardUpdateRequest
): Promise<BoardUpdateApiResponse> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
  const url = `${API_URL}/v1/boards/${identifier}`

  const formData = new FormData()
  formData.append("title", request.title)
  if (request.content) {
    formData.append("content", request.content)
  }

  // 유지할 이미지 identifier 추가
  if (request.keepImageIdentifiers && request.keepImageIdentifiers.length > 0) {
    request.keepImageIdentifiers.forEach((identifier) => {
      formData.append("keepImageIdentifiers", identifier)
    })
  }

  // 유지할 이미지 순서 추가
  if (request.keepImageOrders && request.keepImageOrders.length > 0) {
    request.keepImageOrders.forEach((order) => {
      formData.append("keepImageOrders", order.toString())
    })
  }

  // 새 이미지 파일 추가
  if (request.newImages && request.newImages.length > 0) {
    request.newImages.forEach((image) => {
      formData.append("newImages", image)
    })
  }

  // 새 이미지 순서 추가
  if (request.newImageOrders && request.newImageOrders.length > 0) {
    request.newImageOrders.forEach((order) => {
      formData.append("newImageOrders", order.toString())
    })
  }

  // 삭제할 파일 identifier 추가
  if (request.deleteFileIdentifiers && request.deleteFileIdentifiers.length > 0) {
    request.deleteFileIdentifiers.forEach((identifier) => {
      formData.append("deleteFileIdentifiers", identifier)
    })
  }

  // 새 파일 추가
  if (request.newFiles && request.newFiles.length > 0) {
    request.newFiles.forEach((file) => {
      formData.append("newFiles", file)
    })
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      credentials: "include",
      body: formData,
    })

    const responseData: ApiResponseData<unknown> = await response.json()

    if (!response.ok || (responseData.code !== undefined && responseData.code >= 400)) {
      let errorMessage = responseData.message || "요청 처리 중 오류가 발생했습니다."
      const errorCode: number | undefined = responseData.code
      let validationErrors: string[] | undefined

      // Validation 에러인 경우
      if (
        responseData.code === API_ERROR_CODES.VALIDATION_ERROR &&
        Array.isArray(responseData.data)
      ) {
        validationErrors = responseData.data as string[]
        errorMessage = responseData.message || "유효성 검사 오류"
      }
      // 세션 만료 에러인 경우
      else if (responseData.code === API_ERROR_CODES.SESSION_EXPIRED) {
        errorMessage = responseData.message || "세션이 만료되었습니다. 다시 로그인해주세요."
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("session-expired", {
              detail: { message: errorMessage },
            })
          )
        }
      }
      // 인증 필요 에러인 경우
      else if (responseData.code === API_ERROR_CODES.UNAUTHORIZED) {
        errorMessage = responseData.message || "인증이 필요합니다."
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
      }
      // 수정 권한 없음 에러
      else if (responseData.code === API_ERROR_CODES.BOARD_UPDATE_FORBIDDEN) {
        errorMessage = responseData.message || "게시글 수정 권한이 없습니다."
      }
      // 파일 업로드/삭제 관련 에러
      else if (
        responseData.code === API_ERROR_CODES.FILE_UPLOAD_FAILED ||
        responseData.code === API_ERROR_CODES.FILE_DELETE_FAILED ||
        responseData.code === API_ERROR_CODES.FILE_SIZE_EXCEEDED ||
        responseData.code === API_ERROR_CODES.INVALID_IMAGE_FILE ||
        responseData.code === API_ERROR_CODES.INVALID_FILE ||
        responseData.code === API_ERROR_CODES.INVALID_FILE_EXTENSION
      ) {
        errorMessage = responseData.message || "파일 처리 중 오류가 발생했습니다."
      }

      throw new ApiError(errorMessage, response.status, errorCode, validationErrors)
    }

    return responseData as BoardUpdateApiResponse
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error("네트워크 오류가 발생했습니다.")
  }
}

/**
 * 게시글 작성 API 호출 (multipart/form-data)
 */
export async function createBoard(request: BoardCreateRequest): Promise<BoardCreateApiResponse> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
  const url = `${API_URL}/v1/boards`

  const formData = new FormData()
  formData.append("title", request.title)
  if (request.content) {
    formData.append("content", request.content)
  }
  formData.append("category", request.category)

  // 이미지 파일 추가
  if (request.images && request.images.length > 0) {
    request.images.forEach((image) => {
      formData.append("images", image)
    })
  }

  // 이미지 순서 추가
  if (request.imageOrders && request.imageOrders.length > 0) {
    request.imageOrders.forEach((order) => {
      formData.append("imageOrders", order.toString())
    })
  }

  // 첨부 파일 추가
  if (request.files && request.files.length > 0) {
    request.files.forEach((file) => {
      formData.append("files", file)
    })
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: formData,
    })

    const responseData: ApiResponseData<unknown> = await response.json()

    if (!response.ok || (responseData.code !== undefined && responseData.code >= 400)) {
      let errorMessage = responseData.message || "요청 처리 중 오류가 발생했습니다."
      const errorCode: number | undefined = responseData.code
      let validationErrors: string[] | undefined

      // Validation 에러인 경우
      if (
        responseData.code === API_ERROR_CODES.VALIDATION_ERROR &&
        Array.isArray(responseData.data)
      ) {
        validationErrors = responseData.data as string[]
        errorMessage = responseData.message || "유효성 검사 오류"
      }
      // 세션 만료 에러인 경우 (code가 40105인 경우)
      else if (responseData.code === API_ERROR_CODES.SESSION_EXPIRED) {
        errorMessage = responseData.message || "세션이 만료되었습니다. 다시 로그인해주세요."
        // 세션 만료는 특별 처리 (전역 Dialog 표시)
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("session-expired", {
              detail: { message: errorMessage },
            })
          )
        }
      }
      // 인증 필요 에러인 경우 (code가 40100인 경우)
      else if (responseData.code === API_ERROR_CODES.UNAUTHORIZED) {
        errorMessage = responseData.message || "인증이 필요합니다."
        // 로그인 페이지로 리다이렉트
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
      }
      // 관리자 전용 카테고리 에러
      else if (responseData.code === API_ERROR_CODES.ADMIN_ONLY) {
        errorMessage = responseData.message || "관리자만 접근할 수 있습니다."
      }
      // 파일 업로드 관련 에러
      else if (
        responseData.code === API_ERROR_CODES.FILE_UPLOAD_FAILED ||
        responseData.code === API_ERROR_CODES.FILE_SIZE_EXCEEDED ||
        responseData.code === API_ERROR_CODES.INVALID_IMAGE_FILE ||
        responseData.code === API_ERROR_CODES.INVALID_FILE ||
        responseData.code === API_ERROR_CODES.INVALID_FILE_EXTENSION
      ) {
        errorMessage = responseData.message || "파일 업로드 중 오류가 발생했습니다."
      }

      throw new ApiError(errorMessage, response.status, errorCode, validationErrors)
    }

    return responseData as BoardCreateApiResponse
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error("네트워크 오류가 발생했습니다.")
  }
}

/**
 * 댓글 작성 API 호출
 */
export async function createComment(
  boardIdentifier: string,
  request: CommentCreateRequest
): Promise<CommentCreateApiResponse> {
  return fetchApi<CommentCreateApiResponse>(`/v1/boards/${boardIdentifier}/comments`, {
    method: "POST",
    body: JSON.stringify(request),
  })
}

/**
 * 댓글 수정 API 호출
 */
export async function updateComment(
  boardIdentifier: string,
  commentIdentifier: string,
  request: CommentUpdateRequest
): Promise<CommentUpdateApiResponse> {
  return fetchApi<CommentUpdateApiResponse>(
    `/v1/boards/${boardIdentifier}/comments/${commentIdentifier}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    }
  )
}

/**
 * 댓글 삭제 API 호출
 */
export async function deleteComment(
  boardIdentifier: string,
  commentIdentifier: string
): Promise<CommentDeleteApiResponse> {
  return fetchApi<CommentDeleteApiResponse>(
    `/v1/boards/${boardIdentifier}/comments/${commentIdentifier}`,
    {
      method: "DELETE",
    }
  )
}

/**
 * 관리자 유저 리스트 조회 API 호출
 */
export async function getAdminUserList(params: {
  isApproved?: boolean
  searchKeyword?: string
  page?: number
  size?: number
  sort?: string
}): Promise<AdminUserListApiResponse> {
  const queryParams = new URLSearchParams()
  
  if (params.isApproved !== undefined) {
    queryParams.append("isApproved", params.isApproved.toString())
  }
  if (params.searchKeyword) {
    queryParams.append("searchKeyword", params.searchKeyword)
  }
  if (params.page !== undefined) {
    queryParams.append("page", params.page.toString())
  }
  if (params.size !== undefined) {
    queryParams.append("size", params.size.toString())
  }
  if (params.sort) {
    queryParams.append("sort", params.sort)
  }

  const queryString = queryParams.toString()
  const endpoint = `/v1/admin/users${queryString ? `?${queryString}` : ""}`

  return fetchApi<AdminUserListApiResponse>(endpoint, {
    method: "GET",
  })
}

/**
 * 관리자 유저 승인 API 호출
 */
export async function approveUser(identifier: string): Promise<ApiResponseData<null>> {
  return fetchApi<ApiResponseData<null>>(`/v1/admin/users/${identifier}/approve`, {
    method: "POST",
  })
}

/**
 * 관리자 유저 거절 API 호출
 */
export async function rejectUser(identifier: string): Promise<ApiResponseData<null>> {
  return fetchApi<ApiResponseData<null>>(`/v1/admin/users/${identifier}/reject`, {
    method: "DELETE",
  })
}

/**
 * 관리자 홈 배너 조회 API 호출
 */
export async function getHomeBannerConfig(): Promise<HomeBannerApiResponse> {
  return fetchApi<HomeBannerApiResponse>("/v1/admin/configs/home-banner", {
    method: "GET",
  })
}

/**
 * 관리자 홈 배너 수정 API 호출
 */
export async function updateHomeBannerConfig(
  request: UpdateHomeBannerRequest
): Promise<UpdateHomeBannerApiResponse> {
  const formData = new FormData()

  if (request.keepBannerIdentifiers && request.keepBannerIdentifiers.length > 0) {
    request.keepBannerIdentifiers.forEach((identifier) => {
      formData.append("keepBannerIdentifiers", identifier)
    })
  }

  if (request.keepBannerOrders && request.keepBannerOrders.length > 0) {
    request.keepBannerOrders.forEach((order) => {
      formData.append("keepBannerOrders", order.toString())
    })
  }

  if (request.newImages && request.newImages.length > 0) {
    request.newImages.forEach((file) => {
      formData.append("newImages", file)
    })
  }

  if (request.newImageOrders && request.newImageOrders.length > 0) {
    request.newImageOrders.forEach((order) => {
      formData.append("newImageOrders", order.toString())
    })
  }

  return fetchApi<UpdateHomeBannerApiResponse>("/v1/admin/configs/home-banner", {
    method: "PUT",
    body: formData,
  })
}

/**
 * 관리자 다음주 이벤트 설정 조회 API 호출
 */
export async function getNextWeekEventConfig(): Promise<NextWeekEventConfigApiResponse> {
  return fetchApi<NextWeekEventConfigApiResponse>("/v1/admin/configs/next-week-event", {
    method: "GET",
  })
}

/**
 * 관리자 다음주 이벤트 설정 수정 API 호출
 */
export async function updateNextWeekEventConfig(
  request: UpdateNextWeekEventRequest
): Promise<UpdateNextWeekEventApiResponse> {
  return fetchApi<UpdateNextWeekEventApiResponse>("/v1/admin/configs/next-week-event", {
    method: "PUT",
    body: JSON.stringify(request),
  })
}
