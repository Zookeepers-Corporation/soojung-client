# Next.js + TypeScript + Tailwind CSS 개발 규칙

## 프로젝트 구조
- `src/app/` - Next.js App Router 사용
- `src/components/` - 재사용 가능한 컴포넌트들
- `src/lib/` - 유틸리티 함수와 설정들
- `src/types/` - TypeScript 타입 정의
- `src/hooks/` - 커스텀 React 훅들

## 코드 스타일
- **TypeScript 엄격 모드** 사용 (`strict: true`)
- **함수형 컴포넌트**와 **훅** 우선 사용
- **PascalCase**로 컴포넌트 이름 지정
- **camelCase**로 변수/함수 이름 지정
- **상수**는 **UPPER_SNAKE_CASE** 사용

## Next.js 규칙
- **App Router** 사용 (`src/app/` 구조)
- **Server Components** 우선 사용, 필요한 경우에만 Client Components 사용
- **'use client'** 지시어는 필요한 경우에만 사용
- **Image 컴포넌트** 사용 (일반 `<img>` 태그 대신)
- **Next.js Link 컴포넌트** 사용 (`<a>` 태그 대신)

## React 규칙
- **의미 있는 컴포넌트 이름** 사용 (Button, Card, Modal 등)
- **props 인터페이스** 명확히 정의
- **children**이나 **render props** 패턴 적절히 사용
- **불필요한 리렌더링** 방지 (memo, useMemo, useCallback)

## Tailwind CSS 규칙
- 항상 **반응형 디자인**을 고려 (`sm:`, `md:`, `lg:`, `xl:`)
- **다크 모드** 지원 고려 (`dark:`)
- **커스텀 클래스** 최소화, Tailwind 유틸리티 우선 사용
- **일관된 spacing** 사용 (`space-y-*`, `gap-*`)

## 성능 최적화
- **불필요한 import** 제거
- **트리 쉐이킹** 고려하여 import 방식 선택
- **번들 크기** 최적화 (dynamic import, lazy loading)
- SEO를 고려한 개발 진행

## 접근성
- **시맨틱 HTML** 사용 (`<main>`, `<section>`, `<article>`)
- **ARIA 속성** 적절히 사용
- **키보드 네비게이션** 지원
- **alt 속성** 이미지에 필수 제공

## 보안
- **외부 링크**에 `rel="noopener noreferrer"` 사용
- **사용자 입력** 적절히 검증 및 이스케이프
- **환경 변수** 안전하게 사용

## 커밋 메시지
- **영어로 작성**: `feat: add user authentication`
- **형식**: `type: description` (feat, fix, docs, style, refactor, test, chore)

### 폰트 사용
- 기본 폰트: **KimJeongCheolGothic** (자동 적용)
- 모든 텍스트는 자동으로 KimJeongCheolGothic 폰트 사용
- 폰트 weight: 300 (light), 400 (normal), 700 (bold)

## ESLint 규칙 준수
- **모든 ESLint 경고/에러** 수정 후 커밋
- **TypeScript 에러** 없음 확인 후 커밋

---

## 컴포넌트 사용 규칙

### 새 컴포넌트 생성 규칙
**중요**: 새로운 컴포넌트를 만들기 전에 반드시 사용자에게 확인해야 합니다.

- **새 컴포넌트 생성 전 필수 확인 사항**:
  1. 어떤 컴포넌트를 만들 것인지
  2. 이 컴포넌트가 왜 필요한지 (사용 목적)
  3. 어디에 사용될 것인지 (사용 위치/페이지)
  4. 기존 컴포넌트로 대체 가능한지

- **절대 금지 사항**:
  - 사용자 확인 없이 임의로 새 컴포넌트 생성 금지
  - 기존 컴포넌트로 해결 가능한데 새 컴포넌트 생성 금지
  - 사용자 요청 없이 "더 나은" 컴포넌트를 제안하며 자동 생성 금지

- **올바른 프로세스**:
  1. 사용자가 컴포넌트가 필요하다고 명시하거나
  2. 기존 컴포넌트로 해결 불가능한 경우
  3. 사용자에게 새 컴포넌트 생성에 대해 물어보고 승인 받은 후 생성

### 필수 사용 컴포넌트
프로젝트 전반에서 일관된 디자인을 위해 다음 컴포넌트들을 **반드시 사용**해야 합니다:

#### UI 컴포넌트 (`src/components/ui/`)
- **Button**: 모든 버튼은 `@/components/ui/button` 사용
  - `variant="primary"` - 주요 액션 버튼
  - `variant="secondary"` - 보조 버튼
  - `variant="ghost"` - 텍스트 버튼
  - 일반 `<button>` 태그 직접 사용 금지

- **Card**: 모든 카드 레이아웃은 `@/components/ui/card` 사용
  - `padding="none" | "sm" | "md" | "lg"` 옵션 사용
  - 이미지가 포함된 카드는 `padding="none"` 사용 후 내부에서 패딩 제어
  - 일반 `<div>`로 카드 스타일 직접 구현 금지

- **Input**: 모든 입력 필드는 `@/components/ui/input` 사용
  - `label` prop으로 라벨 표시
  - `error` prop으로 에러 메시지 표시
  - 일반 `<input>` 태그 직접 사용 금지

- **Typography**: 모든 텍스트는 `@/components/ui/typography` 사용
  - `Heading` 컴포넌트: 제목 (variant: title1-title9)
  - `Text` 컴포넌트: 본문 (variant: micro, tiny, mini, small, regular, large)
  - `color` prop으로 텍스트 색상 제어 (primary, secondary, tertiary, quaternary)
  - 일반 `<h1>`, `<p>` 태그 직접 사용 금지 (Heading, Text 컴포넌트 사용)

- **Carousel**: 슬라이드/캐러셀이 필요한 경우 `@/components/ui/carousel` 사용
  - `autoPlay`, `autoPlayInterval` 옵션으로 자동 재생 제어
  - `showArrows`, `showIndicators` 옵션으로 UI 제어
  - 일반 슬라이드 라이브러리 직접 사용 금지

#### 레이아웃 컴포넌트
- **Header**: 모든 페이지의 헤더는 `@/components/header` 사용
  - 네비게이션 메뉴, 드롭다운, 모바일 메뉴 포함
  - 직접 헤더 컴포넌트 구현 금지

- **Footer**: 모든 페이지의 푸터는 `@/components/footer` 사용
  - 교회 정보, 빠른 링크, 지도 포함
  - 직접 푸터 컴포넌트 구현 금지

- **Hero**: 히어로 섹션이 필요한 경우 `@/components/hero` 사용
  - 배경 이미지/그라데이션, 오버레이 효과 포함
  - 직접 히어로 섹션 구현 금지

#### 특수 컴포넌트
- **StaffMemberCard**: 인물 카드 표시 시 `@/components/staff/staff-member-card` 사용
  - 이미지, 이름, 역할, 설명 표시
  - 재사용 가능한 구조

- **LocationMap**: 지도가 필요한 경우 `@/components/location-map` 사용
  - 네이버 지도 API 통합
  - 마커 및 정보창 포함

- **FooterMap**: 푸터용 작은 지도는 `@/components/footer-map` 사용

### 컴포넌트 사용 예시

```tsx
// ✅ 올바른 사용
import Button from "@/components/ui/button"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"

export default function MyPage() {
  return (
    <Card padding="md">
      <Heading variant="title3">제목</Heading>
      <Text variant="regular" color="secondary">본문 내용</Text>
      <Button variant="primary">확인</Button>
    </Card>
  )
}

// ❌ 잘못된 사용
export default function MyPage() {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h1 className="text-2xl font-bold">제목</h1>
      <p className="text-gray-600">본문 내용</p>
      <button className="bg-blue-500 text-white px-4 py-2">확인</button>
    </div>
  )
}
```

### 디자인 시스템 준수
- 모든 컴포넌트는 `src/lib/theme.json`의 디자인 시스템을 따름
- 색상, 타이포그래피, 간격은 테마 파일에서 관리
- 커스텀 스타일 최소화, 테마 기반 스타일 사용
