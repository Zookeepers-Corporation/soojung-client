import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pohangsoojung.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/login",
          "/signup",
          "/boards/write",
          "/boards/edit/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

