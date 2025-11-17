import { NextWeekEventConfig } from "@/types/api"
import Card from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/typography"

interface EventsProps {
  nextWeekEvent: NextWeekEventConfig | null
}

interface WorshipSchedule {
  name: string
  time: string
  icon: string
}

const worshipSchedules: WorshipSchedule[] = [
  { name: "주일 낮 예배", time: "11:00 AM", icon: "🌅" },
  { name: "주일 오후 예배", time: "1:30 PM", icon: "☀️" },
  { name: "수요 기도회", time: "7:30 PM", icon: "🕯️" },
  { name: "금요 기도회", time: "개인기도", icon: "🙏" },
  { name: "새벽 기도회", time: "5:00 AM", icon: "🌄" },
]

const defaultEvents = [
  { name: "성경공부", time: "수요일 7시", icon: "📅" },
  { name: "가족 선교", time: "토요일 오후", icon: "👨‍👩‍👧‍👦" },
  { name: "찬양 콘서트", time: "일요일 12시 30분", icon: "🎵" },
  { name: "성경 세미나", time: "월요일 7시", icon: "📖" },
]

export default function Events({ nextWeekEvent }: EventsProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#F7F8FA] to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <Heading variant="title4" className="mb-4 text-[#0F1011]">
            예배 및 행사
          </Heading>
          <Text variant="regular" color="secondary" className="max-w-2xl mx-auto">
            주님을 찬양하며 함께 모이는 시간입니다
          </Text>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* 정기 예배 카드 */}
          <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-[0px_4px_24px_rgba(0,0,0,0.08)] group border-l-4 border-l-[#5E6AD2]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5E6AD2]/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <Heading variant="title3" className="text-[#0F1011]">
                  정기 예배
                </Heading>
              </div>
              <div className="space-y-4">
                {worshipSchedules.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#F7F8FA] hover:bg-[#F0F2F5] transition-colors group/item"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{schedule.icon}</span>
                      <Text variant="regular" className="text-[#0F1011] font-medium">
                        {schedule.name}
                      </Text>
                    </div>
                    <Text variant="regular" color="secondary" className="font-medium">
                      {schedule.time}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* 교회 행사 카드 */}
          <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-[0px_4px_24px_rgba(0,0,0,0.08)] group border-l-4 border-l-[#5E6AD2]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#EEF0FF] to-transparent rounded-bl-full opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <Heading variant="title3" className="text-[#0F1011]">
                  교회 행사
                </Heading>
              </div>
              {nextWeekEvent?.content ? (
                <div
                  className="prose prose-sm max-w-none text-[#3E4145] whitespace-pre-wrap [&_p]:mb-3 [&_p]:whitespace-pre-wrap [&_ul]:space-y-2 [&_li]:text-[#3E4145] [&_*]:whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: nextWeekEvent.content
                      .replace(/\n/g, "<br />")
                      .replace(/  /g, "&nbsp;&nbsp;"),
                  }}
                />
              ) : (
                <div className="space-y-4">
                  {defaultEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-[#FFF9E6] hover:bg-[#FFF5CC] transition-colors group/item border border-[#F2C94C]/20"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{event.icon}</span>
                        <Text variant="regular" className="text-[#0F1011] font-medium">
                          {event.name}
                        </Text>
                      </div>
                      <Text variant="regular" color="secondary" className="font-medium">
                        {event.time}
                      </Text>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
  