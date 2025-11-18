import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://pohangsoojung.com"

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

