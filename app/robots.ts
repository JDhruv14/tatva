import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://tatva.info";

  return {
    rules: [
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Bytespider",
          "FacebookBot",
          "magpie-crawler",
          "Omgilibot",
          "Diffbot",
          "PetalBot",
          "SemrushBot",
          "AhrefsBot",
          "MJ12bot",
          "DotBot",
          "BLEXBot",
        ],
        disallow: "/",
      },
      // Allow Google and its services
      {
        userAgent: ["Googlebot", "Googlebot-Image", "Googlebot-News", "Googlebot-Video", "GoogleOther", "Google-InspectionTool", "Storebot-Google"],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Allow Bing and Microsoft crawlers
      {
        userAgent: ["Bingbot", "BingPreview", "msnbot"],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Allow other legitimate search engines
      {
        userAgent: ["DuckDuckBot", "Slurp", "Baiduspider", "YandexBot", "Applebot"],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Allow social media preview bots
      {
        userAgent: ["Twitterbot", "facebookexternalhit", "LinkedInBot", "WhatsApp", "TelegramBot", "Pinterest"],
        allow: "/",
      },
      // Default rule for other bots - allow with restrictions
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
        crawlDelay: 10,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
