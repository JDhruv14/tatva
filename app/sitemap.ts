import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tatva.info";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contents`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/preface`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/structure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Book pages
  const books = [
    { slug: "rigveda", priority: 0.9 },
    { slug: "ramayana", priority: 0.9 },
    { slug: "mahabharata", priority: 0.9 },
    { slug: "bhagavad-gita", priority: 0.9 },
    { slug: "srimad-bhagavatam", priority: 0.8 },
    { slug: "devi-mahatmyam", priority: 0.8 },
    { slug: "manu-smriti", priority: 0.8 },
    { slug: "yoga-vasishtha", priority: 0.8 },
    { slug: "markandeya-purana", priority: 0.8 },
    { slug: "ramopakyana", priority: 0.8 },
    { slug: "parashara", priority: 0.8 },
  ];

  const bookPages: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${baseUrl}/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: book.priority,
  }));

  return [...staticPages, ...bookPages];
}

