import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nouroudineamandou.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/app/",
          "/_next/",
          "/admin/",
        ],
      },
      {
        userAgent: [
          "Bytespider",
          "PetalBot",
          "MJ12bot",
          "MegaIndex",
          "ZoominfoBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
