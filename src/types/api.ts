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

// 사용자 역할 enum
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

// 로그인 응답 데이터 타입
export interface UserLoginResponse {
  identifier: string
  username: string
  name: string
  email?: string
  phoneNumber?: string
  role?: UserRole
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

// 게시판 카테고리 enum
export enum BoardCategory {
  SUNDAY_WORSHIP = "SUNDAY_WORSHIP",
  WEDNESDAY_WORSHIP = "WEDNESDAY_WORSHIP",
  FRIDAY_PRAYER = "FRIDAY_PRAYER",
  DAWN_PRAYER = "DAWN_PRAYER",
  SPECIAL_WORSHIP = "SPECIAL_WORSHIP",
  BOARD = "BOARD",
  ALBUM = "ALBUM",
  ARCHIVE = "ARCHIVE",
}

// 게시글 리스트 응답 아이템 타입
export interface BoardListResponse {
  identifier: string
  title: string
  authorName: string
  thumbnailUrl?: string
  createdAt: string
}

// 페이지 정보 타입
export interface PageInfo {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

// 페이지네이션 응답 타입
export interface PageResponse<T> {
  content: T[]
  page: PageInfo
}

// 게시글 리스트 페이지 응답 타입
export type BoardListPageResponse = PageResponse<BoardListResponse>

// 게시글 리스트 API 응답 타입
export type BoardListApiResponse = ApiResponseData<BoardListPageResponse>

// 게시글 작성 요청 타입
export interface BoardCreateRequest {
  title: string
  content?: string
  category: BoardCategory
  images?: File[]
  imageOrders?: number[]
  files?: File[]
}

// 게시글 작성 응답 타입
export interface BoardCreateResponse {
  identifier: string
}

// 게시글 작성 API 응답 타입
export type BoardCreateApiResponse = ApiResponseData<BoardCreateResponse>

// API 에러 코드 상수
export const API_ERROR_CODES = {
  VALIDATION_ERROR: 100,
  UNAUTHORIZED: 40100,
  INVALID_CREDENTIALS: 40101,
  USER_NOT_APPROVED: 40102,
  USER_ALREADY_EXIST: 40104,
  SESSION_EXPIRED: 40105,
  ADMIN_ONLY: 40301,
  FILE_UPLOAD_FAILED: 40200,
  FILE_SIZE_EXCEEDED: 40202,
  INVALID_IMAGE_FILE: 40203,
  INVALID_FILE: 40204,
  INVALID_FILE_EXTENSION: 40205,
} as const

