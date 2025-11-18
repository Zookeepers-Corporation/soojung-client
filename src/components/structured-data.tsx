"use client"

export default function StructuredData() {
  const baseUrl = "https://pohangsoojung.com"

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "포항수정교회",
    url: baseUrl,
    logo: `${baseUrl}/church_mark.svg`,
    description: "진정한 신앙 공동체, 하나님의 말씀으로 함께 성장합니다. 포항수정교회는 성령충만한 이들이 용사로 세워지는 교회입니다.",
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

