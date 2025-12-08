"use client"

export default function StructuredData() {
  const baseUrl = "https://pohangsoojung.com"

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "포항수정교회",
    url: baseUrl,
    logo: `${baseUrl}/church_mark.svg`,
    description: "포항수정교회는 예수 그리스도의 복음으로 가정을 행복하게, 일터가 복되게, 자녀를 지도자로 키워 하나님의 나라를 든든히 세워가는 교회입니다.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressLocality: "포항",
    },
    sameAs: [
      // 소셜 미디어 링크가 있다면 여기에 추가
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "포항수정교회",
    url: baseUrl,
    description: "진정한 신앙 공동체, 하나님의 말씀으로 함께 성장합니다.",
    publisher: {
      "@type": "Organization",
      name: "포항수정교회",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

