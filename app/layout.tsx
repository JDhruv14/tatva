import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import "@/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tatva.info"),
  title: {
    default: "तत्त्व (Tatva) - Digital Museum of Ancient Indian Scriptures",
    template: "%s | तत्त्व (Tatva)",
  },
  description:
    "Discover ancient Indian texts through a modern digital library designed to make reading, exploration, and understanding more approachable and interconnected",
  keywords: [
    "Vedas",
    "Rigveda",
    "Mahabharata",
    "Ramayana",
    "Bhagavad Gita",
    "Srimad Bhagavatam",
    "Devi Mahatmyam",
    "Manu Smriti",
    "Yoga Vasishtha",
    "Sanskrit",
    "Hindi",
    "Ancient Indian Texts",
    "Hindu Scriptures",
    "Indian Philosophy",
    "Dharma",
    "Sanatan Dharma",
    "तत्त्व",
    "वेद",
    "ऋग्वेद",
    "महाभारत",
    "रामायण",
    "भगवद्गीता",
  ],
  authors: [{ name: "Dhruv", url: "https://tatva.info" }],
  creator: "Dhruv",
  publisher: "Tatva",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: "hi_IN",
    url: "https://tatva.info",
    siteName: "तत्त्व (Tatva)",
    title: "तत्त्व (Tatva) - Digital Museum of Ancient Indian Scriptures",
    description:
      "Explore the timeless wisdom of ancient India through our digital museum. Read Rigveda, Mahabharata, Ramayana, Bhagavad Gita, and more sacred texts.",
    images: [
      {
        url: "/web_home.jpg",
        width: 1200,
        height: 630,
        alt: "तत्त्व (Tatva) - Ancient Indian Scriptures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dhruvtwt_",
    creator: "@dhruvtwt_",
    title: "तत्त्व (Tatva) - Digital Museum of Ancient Indian Scriptures",
    description:
      "Explore the timeless wisdom of ancient India through our digital museum. Read Rigveda, Mahabharata, Ramayana, Bhagavad Gita, and more.",
    images: ["/web_home.jpg"],
  },
  alternates: {
    canonical: "https://tatva.info",
    languages: {
      "en-IN": "https://tatva.info",
      "hi-IN": "https://tatva.info",
      "sa-IN": "https://tatva.info",
    },
  },
  category: "Education",
  classification: "Religious & Spiritual",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "google-site-verification": "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts - preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Domine:wght@400;500;600;700&family=Martel:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "तत्त्व (Tatva)",
              alternateName: "Tatva",
              url: "https://tatva.info",
              description:
                "Digital museum of ancient Indian scriptures including Vedas, Upanishads, Puranas, and Epics.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://tatva.info/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "Tatva",
                logo: {
                  "@type": "ImageObject",
                  url: "https://tatva.info/logo.png",
                },
              },
            }),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

