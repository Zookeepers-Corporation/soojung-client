import Header from "@/components/header"
import Footer from "@/components/footer"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"

export default function NewFamilyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <Heading variant="title4" className="mb-4">
              새가족 안내
            </Heading>
            <Text variant="regular" color="secondary">
              포항수정교회에 오신 것을 환영합니다
            </Text>
          </div>

          {/* Welcome Section */}
          <Card className="mb-8">
            <Heading variant="title3" className="mb-4">
              환영합니다
            </Heading>
            <Text variant="regular" color="secondary" className="mb-4">
              포항수정교회에 새로 오신 분들을 진심으로 환영합니다. 하나님의 사랑과 은혜가 가득한 교회에서 함께 예배하며 믿음의 여정을 시작하시길 바랍니다.
            </Text>
            <Text variant="regular" color="secondary">
              교회에 처음 오셨거나 궁금한 점이 있으시면 언제든지 문의해 주세요. 성도들과 함께 따뜻하게 맞이하겠습니다.
            </Text>
          </Card>

          {/* Worship Time Section */}
          <Card className="mb-8">
            <Heading variant="title3" className="mb-6">
              예배 시간 안내
            </Heading>
            <div className="space-y-4">
              <div>
                <Text variant="regular" className="font-semibold mb-2">
                  주일예배
                </Text>
                <Text variant="regular" color="secondary">
                  매주 일요일 오전 11시
                </Text>
              </div>
              <div>
                <Text variant="regular" className="font-semibold mb-2">
                  수요예배
                </Text>
                <Text variant="regular" color="secondary">
                  매주 수요일 오후 7시 30분
                </Text>
              </div>
              <div>
                <Text variant="regular" className="font-semibold mb-2">
                  금요기도회
                </Text>
                <Text variant="regular" color="secondary">
                  매주 금요일 오후 8시
                </Text>
              </div>
              <div>
                <Text variant="regular" className="font-semibold mb-2">
                  새벽기도회
                </Text>
                <Text variant="regular" color="secondary">
                  매일 새벽 5시 30분
                </Text>
              </div>
            </div>
          </Card>

          {/* Contact Section */}
          <Card className="mb-8">
            <Heading variant="title3" className="mb-6">
              문의 및 연락처
            </Heading>
            <div className="space-y-4">
              <div>
                <Text variant="regular" className="font-semibold mb-2">
                  전화
                </Text>
                <Text variant="regular" color="secondary">
                  054-248-7831
                </Text>
              </div>
              <div>
                <Text variant="regular" className="font-semibold mb-2">
                  주소
                </Text>
                <Text variant="regular" color="secondary">
                  (37710) 경북 포항시 북구 두호로37번길 10 포항수정교회
                </Text>
              </div>
            </div>
          </Card>

          {/* Guide Section */}
          <Card>
            <Heading variant="title3" className="mb-6">
              새가족을 위한 안내
            </Heading>
            <div className="space-y-4">
              <div>
                <Text variant="regular" className="font-semibold mb-2">
                  예배 참석
                </Text>
                <Text variant="regular" color="secondary">
                  예배 시간에 맞춰 교회에 오시면 됩니다. 복장은 편안한 차림으로 오셔도 됩니다.
                </Text>
              </div>
              <div>
                <Text variant="regular" className="font-semibold mb-2">
                  주차 안내
                </Text>
                <Text variant="regular" color="secondary">
                  교회 내 주차장을 이용하실 수 있습니다. 주차 공간이 부족할 경우 주변 공영주차장을 이용해 주세요.
                </Text>
              </div>
              <div>
                <Text variant="regular" className="font-semibold mb-2">
                  새가족 등록
                </Text>
                <Text variant="regular" color="secondary">
                  교회에 정기적으로 참석하시려면 새가족 등록을 해주시기 바랍니다. 등록 후 교회 소식과 행사 안내를 받으실 수 있습니다.
                </Text>
              </div>
              <div>
                <Text variant="regular" className="font-semibold mb-2">
                  교제 및 소그룹
                </Text>
                <Text variant="regular" color="secondary">
                  다양한 소그룹과 교제 모임이 있습니다. 관심 있는 모임에 참여하시어 성도들과 교제하며 함께 성장해 나가시길 바랍니다.
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
