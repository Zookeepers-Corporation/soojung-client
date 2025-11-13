import Header from "@/components/header"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Carousel from "@/components/ui/carousel"
import { Heading, Text } from "@/components/ui/typography"
import Image from "next/image"

export default function ComponentsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F8FA]">
      <Header />
      <main className="flex-grow py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-12">
            <Heading variant="title5" className="text-[#0F1011] mb-4">
              디자인 시스템 컴포넌트
            </Heading>
            <Text variant="regular" color="secondary">
              Linear Light Theme을 기반으로 한 재사용 가능한 컴포넌트 라이브러리
            </Text>
          </div>

          {/* Buttons Section */}
          <section className="mb-16">
            <Heading variant="title3" className="text-[#0F1011] mb-6">
              버튼 (Button)
            </Heading>
            <Card className="mb-6">
              <div className="space-y-6">
                <div>
                  <Text variant="small" color="secondary" className="mb-3 block">
                    Primary Button
                  </Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="primary" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
                <div>
                  <Text variant="small" color="secondary" className="mb-3 block">
                    Secondary Button
                  </Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="secondary" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
                <div>
                  <Text variant="small" color="secondary" className="mb-3 block">
                    Ghost Button
                  </Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="ghost" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Cards Section */}
          <section className="mb-16">
            <Heading variant="title3" className="text-[#0F1011] mb-6">
              카드 (Card)
            </Heading>
            <div className="space-y-8">
              {/* Basic Cards */}
              <div>
                <Text variant="small" color="secondary" className="mb-4 block">
                  기본 카드 (Padding 옵션)
                </Text>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card padding="sm">
                    <Heading variant="title2" className="mb-2">
                      Small Padding
                    </Heading>
                    <Text variant="regular" color="secondary">
                      작은 패딩을 가진 카드입니다.
                    </Text>
                  </Card>
                  <Card padding="md">
                    <Heading variant="title2" className="mb-2">
                      Medium Padding
                    </Heading>
                    <Text variant="regular" color="secondary">
                      기본 패딩을 가진 카드입니다.
                    </Text>
                  </Card>
                  <Card padding="lg">
                    <Heading variant="title2" className="mb-2">
                      Large Padding
                    </Heading>
                    <Text variant="regular" color="secondary">
                      큰 패딩을 가진 카드입니다.
                    </Text>
                  </Card>
                </div>
              </div>

              {/* Image Cards */}
              <div>
                <Text variant="small" color="secondary" className="mb-4 block">
                  이미지가 포함된 카드
                </Text>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card padding="none" className="overflow-hidden">
                    <div className="relative w-full h-48 bg-[#F0F2F5]">
                      <div className="absolute inset-0 flex items-center justify-center text-[#6B7075]">
                        <Text variant="small" color="tertiary">
                          이미지 영역
                        </Text>
                      </div>
                    </div>
                    <div className="p-6">
                      <Heading variant="title2" className="mb-2">
                        이미지 카드
                      </Heading>
                      <Text variant="regular" color="secondary">
                        이미지와 함께 콘텐츠를 표시하는 카드입니다.
                      </Text>
                    </div>
                  </Card>

                  <Card padding="none" className="overflow-hidden">
                    <div className="relative w-full h-48 bg-gradient-to-br from-[#5E6AD2] to-[#4E5BBD]">
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <Text variant="regular" className="text-white">
                          그라데이션 배경
                        </Text>
                      </div>
                    </div>
                    <div className="p-6">
                      <Heading variant="title2" className="mb-2">
                        그라데이션 카드
                      </Heading>
                      <Text variant="regular" color="secondary">
                        다양한 배경 스타일을 적용할 수 있습니다.
                      </Text>
                    </div>
                  </Card>

                  <Card padding="none" className="overflow-hidden group">
                    <div className="relative w-full h-48 bg-[#F0F2F5] transition-transform duration-300 group-hover:scale-105">
                      <div className="absolute inset-0 flex items-center justify-center text-[#6B7075]">
                        <Text variant="small" color="tertiary">
                          호버 효과
                        </Text>
                      </div>
                    </div>
                    <div className="p-6">
                      <Heading variant="title2" className="mb-2">
                        인터랙티브 카드
                      </Heading>
                      <Text variant="regular" color="secondary">
                        호버 시 이미지가 확대됩니다.
                      </Text>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Inputs Section */}
          <section className="mb-16">
            <Heading variant="title3" className="text-[#0F1011] mb-6">
              입력 필드 (Input)
            </Heading>
            <Card>
              <div className="space-y-6 max-w-md">
                <Input label="기본 입력 필드" placeholder="텍스트를 입력하세요" />
                <Input
                  label="필수 입력 필드"
                  placeholder="필수 입력"
                  required
                />
                <Input
                  label="에러 상태"
                  placeholder="에러가 있는 입력"
                  error="이 필드는 필수입니다"
                />
                <Input
                  label="비활성화된 입력"
                  placeholder="비활성화됨"
                  disabled
                />
              </div>
            </Card>
          </section>

          {/* Typography Section */}
          <section className="mb-16">
            <Heading variant="title3" className="text-[#0F1011] mb-6">
              타이포그래피 (Typography)
            </Heading>
            <Card>
              <div className="space-y-8">
                <div>
                  <Text variant="small" color="secondary" className="mb-4 block">
                    Headings
                  </Text>
                  <div className="space-y-4">
                    <Heading variant="title1">Title 1</Heading>
                    <Heading variant="title2">Title 2</Heading>
                    <Heading variant="title3">Title 3</Heading>
                    <Heading variant="title4">Title 4</Heading>
                    <Heading variant="title5">Title 5</Heading>
                  </div>
                </div>
                <div>
                  <Text variant="small" color="secondary" className="mb-4 block">
                    Text Styles
                  </Text>
                  <div className="space-y-3">
                    <Text variant="micro">Micro Text</Text>
                    <Text variant="tiny">Tiny Text</Text>
                    <Text variant="mini">Mini Text</Text>
                    <Text variant="small">Small Text</Text>
                    <Text variant="regular">Regular Text</Text>
                    <Text variant="large">Large Text</Text>
                  </div>
                </div>
                <div>
                  <Text variant="small" color="secondary" className="mb-4 block">
                    Text Colors
                  </Text>
                  <div className="space-y-2">
                    <Text color="primary">Primary Color</Text>
                    <Text color="secondary">Secondary Color</Text>
                    <Text color="tertiary">Tertiary Color</Text>
                    <Text color="quaternary">Quaternary Color</Text>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Carousel Section */}
          <section className="mb-16">
            <Heading variant="title3" className="text-[#0F1011] mb-6">
              캐러셀 (Carousel)
            </Heading>
            <Card padding="none" className="overflow-hidden">
              <Carousel autoPlay={true} autoPlayInterval={4000}>
                <div className="h-64 bg-gradient-to-r from-[#5E6AD2] to-[#4E5BBD] flex items-center justify-center text-white">
                  <div className="text-center">
                    <Heading variant="title4" className="text-white mb-2">
                      슬라이드 1
                    </Heading>
                    <Text variant="regular" className="text-white/90">
                      자동 재생 캐러셀 예제
                    </Text>
                  </div>
                </div>
                <div className="h-64 bg-gradient-to-r from-[#4CB782] to-[#68CC58] flex items-center justify-center text-white">
                  <div className="text-center">
                    <Heading variant="title4" className="text-white mb-2">
                      슬라이드 2
                    </Heading>
                    <Text variant="regular" className="text-white/90">
                      그라데이션 배경 예제
                    </Text>
                  </div>
                </div>
                <div className="h-64 bg-gradient-to-r from-[#4EA7FC] to-[#5E6AD2] flex items-center justify-center text-white">
                  <div className="text-center">
                    <Heading variant="title4" className="text-white mb-2">
                      슬라이드 3
                    </Heading>
                    <Text variant="regular" className="text-white/90">
                      카드 내부에서 사용 가능
                    </Text>
                  </div>
                </div>
              </Carousel>
            </Card>

            <Card className="mt-6">
              <div className="space-y-4">
                <Text variant="small" color="secondary" className="mb-4 block">
                  캐러셀 옵션
                </Text>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Text variant="regular" className="font-semibold mb-2">
                      자동 재생 없음
                    </Text>
                    <Carousel autoPlay={false} className="h-32">
                      <Card padding="md" className="h-full">
                        <Text variant="regular">카드 1</Text>
                      </Card>
                      <Card padding="md" className="h-full">
                        <Text variant="regular">카드 2</Text>
                      </Card>
                      <Card padding="md" className="h-full">
                        <Text variant="regular">카드 3</Text>
                      </Card>
                    </Carousel>
                  </div>
                  <div>
                    <Text variant="regular" className="font-semibold mb-2">
                      화살표 없음
                    </Text>
                    <Carousel showArrows={false} className="h-32">
                      <div className="h-full bg-[#EEF0FF] flex items-center justify-center rounded-lg">
                        <Text variant="regular" color="secondary">
                          아이템 1
                        </Text>
                      </div>
                      <div className="h-full bg-[#EEF0FF] flex items-center justify-center rounded-lg">
                        <Text variant="regular" color="secondary">
                          아이템 2
                        </Text>
                      </div>
                      <div className="h-full bg-[#EEF0FF] flex items-center justify-center rounded-lg">
                        <Text variant="regular" color="secondary">
                          아이템 3
                        </Text>
                      </div>
                    </Carousel>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Header Section */}
          <section className="mb-16">
            <Heading variant="title3" className="text-[#0F1011] mb-6">
              헤더 (Header / Navbar)
            </Heading>
            <Card padding="none" className="overflow-hidden">
              <div className="border-b border-[#E5E7EB]">
                <Header />
              </div>
            </Card>
            <Card className="mt-6">
              <div className="space-y-4">
                <Text variant="regular" color="secondary">
                  <strong className="text-[#0F1011]">주요 기능:</strong>
                </Text>
                <ul className="list-disc list-inside space-y-2 text-[#3E4145]">
                  <li>스티키 헤더 (페이지 스크롤 시 상단 고정)</li>
                  <li>드롭다운 메뉴 (데스크톱 호버 시 표시)</li>
                  <li>모바일 반응형 햄버거 메뉴</li>
                  <li>로그인/회원가입 링크</li>
                  <li>다중 레벨 네비게이션 지원</li>
                </ul>
              </div>
            </Card>
          </section>

          {/* Hero Section */}
          <section className="mb-16">
            <Heading variant="title3" className="text-[#0F1011] mb-6">
              히어로 (Hero)
            </Heading>
            <Card padding="none" className="overflow-hidden">
              <div className="relative w-full h-64 md:h-96 bg-gradient-to-r from-[#5E6AD2] to-[#4E5BBD] overflow-hidden">
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
                  <Heading variant="title5" className="text-white text-center mb-4">
                    하나님의 사랑을 나누는 교회
                  </Heading>
                  <Text variant="large" className="text-white/90 text-center">
                    함께 믿음으로 성장하는 공동체
                  </Text>
                </div>
              </div>
            </Card>
            <Card className="mt-6">
              <div className="space-y-4">
                <Text variant="regular" color="secondary">
                  <strong className="text-[#0F1011]">주요 기능:</strong>
                </Text>
                <ul className="list-disc list-inside space-y-2 text-[#3E4145]">
                  <li>풀스크린 또는 고정 높이 옵션</li>
                  <li>배경 이미지 또는 그라데이션 지원</li>
                  <li>오버레이 효과 (가독성 향상)</li>
                  <li>중앙 정렬 콘텐츠</li>
                  <li>반응형 타이포그래피</li>
                </ul>
              </div>
            </Card>
          </section>

          {/* Footer Section */}
          <section className="mb-16">
            <Heading variant="title3" className="text-[#0F1011] mb-6">
              푸터 (Footer)
            </Heading>
            <Card padding="none" className="overflow-hidden">
              <div className="bg-[#0F1011] text-white">
                <Footer />
              </div>
            </Card>
            <Card className="mt-6">
              <div className="space-y-4">
                <Text variant="regular" color="secondary">
                  <strong className="text-[#0F1011]">주요 기능:</strong>
                </Text>
                <ul className="list-disc list-inside space-y-2 text-[#3E4145]">
                  <li>3열 그리드 레이아웃 (교회 정보, 빠른 링크, 지도)</li>
                  <li>네이버 지도 통합</li>
                  <li>소셜 미디어 링크</li>
                  <li>연락처 정보 표시</li>
                  <li>반응형 디자인 (모바일: 1열, 데스크톱: 3열)</li>
                </ul>
              </div>
            </Card>
          </section>

          {/* Colors Section */}
          <section className="mb-16">
            <Heading variant="title3" className="text-[#0F1011] mb-6">
              색상 팔레트 (Colors)
            </Heading>
            <Card>
              <div className="space-y-6">
                <div>
                  <Text variant="small" color="secondary" className="mb-3 block">
                    Brand Colors
                  </Text>
                  <div className="flex flex-wrap gap-3">
                    <div className="w-24 h-24 rounded-lg bg-[#5E6AD2] flex items-center justify-center text-white text-xs">
                      Brand
                    </div>
                    <div className="w-24 h-24 rounded-lg bg-[#4E5BBD] flex items-center justify-center text-white text-xs">
                      Brand Hover
                    </div>
                    <div className="w-24 h-24 rounded-lg bg-[#EEF0FF] flex items-center justify-center text-xs">
                      Brand Tint
                    </div>
                  </div>
                </div>
                <div>
                  <Text variant="small" color="secondary" className="mb-3 block">
                    Semantic Colors
                  </Text>
                  <div className="flex flex-wrap gap-3">
                    <div className="w-24 h-24 rounded-lg bg-[#EB5757] flex items-center justify-center text-white text-xs">
                      Red
                    </div>
                    <div className="w-24 h-24 rounded-lg bg-[#FC7840] flex items-center justify-center text-white text-xs">
                      Orange
                    </div>
                    <div className="w-24 h-24 rounded-lg bg-[#F2C94C] flex items-center justify-center text-xs">
                      Yellow
                    </div>
                    <div className="w-24 h-24 rounded-lg bg-[#4CB782] flex items-center justify-center text-white text-xs">
                      Green
                    </div>
                    <div className="w-24 h-24 rounded-lg bg-[#4EA7FC] flex items-center justify-center text-white text-xs">
                      Blue
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
