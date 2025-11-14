// API 응답 타입 (백엔드 ApiResponseData와 동일한 구조)
// 모든 API 응답은 이 형식을 사용합니다 (성공/실패 모두)
export interface ApiResponseData<T> {
  code: number // 응답 코드
  message: string // 응답 메시지
  data: T | null // 응답 데이터 (실패 시 null일 수 있음)
}

// 회원가입 요청 타입
export interface UserSignupRequest {
  username: string
  password: string
  name: string
  email?: string
  phoneNumber?: string
  birth?: string // LocalDate를 문자열로 전송 (YYYY-MM-DD 형식)
  signupSource?: string
}

// 회원가입 응답 타입
export type UserSignupResponse = ApiResponseData<string>

// 로그인 요청 타입
export interface UserLoginRequest {
  username: string
  password: string
}

// 로그인 응답 데이터 타입
export interface UserLoginResponse {
  identifier: string
  username: string
  name: string
  email?: string
  phoneNumber?: string
}

// 로그인 응답 타입
export type UserLoginApiResponse = ApiResponseData<UserLoginResponse>

// 홈 배너 아이템 타입
export interface BannerItem {
  identifier: string
  imageUrl: string
  displayOrder: number
}

// 홈 배너 응답 타입
export interface HomeBannerResponse {
  banners: BannerItem[]
}

// 다음주 행사 설정 타입
export interface NextWeekEventConfig {
  content: string
}

// 홈 응답 타입
export interface HomeResponse {
  banners: HomeBannerResponse
  nextWeekEvent: NextWeekEventConfig
}

// 홈 API 응답 타입
export type HomeApiResponse = ApiResponseData<HomeResponse>

// API 에러 코드 상수
export const API_ERROR_CODES = {
  VALIDATION_ERROR: 100,
  UNAUTHORIZED: 40100,
  INVALID_CREDENTIALS: 40101,
  USER_NOT_APPROVED: 40102,
  USER_ALREADY_EXIST: 40104,
  SESSION_EXPIRED: 40105,
} as const

