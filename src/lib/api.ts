import {
  UserSignupRequest,
  UserSignupResponse,
  UserLoginRequest,
  UserLoginApiResponse,
  HomeApiResponse,
  BoardCategory,
  BoardListApiResponse,
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
  
  const config: RequestInit = {
    ...options,
    credentials: "include", // 세션 쿠키 전송
    headers: {
      "Content-Type": "application/json",
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
