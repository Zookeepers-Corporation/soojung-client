import Image from "next/image"

const PASTOR_IMAGE = "/sub1.jpg"

export default function PastorIntroduction() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {PASTOR_IMAGE && (
            <div className="flex justify-center md:justify-start md:sticky md:top-24">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <Image src={PASTOR_IMAGE} alt="담임목사 김재곤" fill className="object-cover" />
              </div>
            </div>
          )}

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">포항수정교회에 오신 것을 진심으로 환영합니다</h2>
              <p className="text-gray-600 leading-relaxed">
                이곳에 들어오신 모든 분들에게 하나님의 사랑과 은혜가 풍성해지기를 소망합니다.<br /><br />
                포항수정교회는 세대와 상황을 뛰어 넘어 누구나 편안하게 머물 수 있는 믿음의 공동체, 생명의 공동체를 꿈꾸고 있습니다.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">1) 우리는 함께 살아가는 믿음의 공동체를 추구합니다.</h3>
              <p className="text-gray-600 leading-relaxed">
                혼자 걷는 신앙이 아니라, 서로의 삶을 나누며 함께 웃고 함께 울어주는 교회가 되고 싶습니다. 예배도, 삶도, 신앙도 혼자가 아닌 ‘함께’라서 더 은혜로운 공동체를 소망합니다.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2) 또한 우리는 자연스럽게 성장하는 건강한 공동체를 꿈꿉니다.</h3>
              <p className="text-gray-600 leading-relaxed">
                급하게 커지기보다, 하루하루 말씀 안에서 자라가며 삶으로 믿음을 살아내는 교회가 되기를 원합니다. 꾸미지 않아도 따뜻하고, 애쓰지 않아도 힘이 되는, 건강한 신앙의 흐름이 이어지는 공동체를 지향합니다.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">3) 우리는 서로 힘을 모아 선을 이루어 가는 섬김의 공동체입니다.</h3>
              <p className="text-gray-600 leading-relaxed">
                누군가의 헌신 위에 누군가는 다시 희망을 얻고, 작은 섬김 하나가 또 다른 사람의 삶을 밝히는 교회가 되기를 바랍니다. 교회 안에서, 그리고 이웃과 지역 속에서 예수님의 사랑을 자연스럽게 흘려보내는 공동체가 되고 싶습니다.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">4) 그리고 우리는 함께 기뻐하고 즐거워하는 행복한 공동체를 지향합니다.</h3>
              <p className="text-gray-600 leading-relaxed">
                예배가 기쁨이 되고, 교제가 쉼이 되며, 교회에 오는 발걸음이 설렘이 되는 공동체 말입니다. 서로를 진심으로 응원하고 축복하며, 웃음과 감사가 자연스럽게 흘러가는 교회를 꿈꿉니다.
              </p>
            </div>

            <div>
              <p className="text-gray-600 leading-relaxed">
                이제 우리는 여러분과 함께 믿음 안에서 은혜롭고, 의미 있고, 행복한 삶을 살아가고 싶습니다. 완벽하지 않아도 괜찮고, 천천히 걸어가도 괜찮습니다. 중요한 것은 우리가 같은 방향을 바라보며 함께 걸어갈 것입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
