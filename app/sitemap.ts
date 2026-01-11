import { MetadataRoute } from "next";
import { supabase } from "@/integrations/supabase/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tatva.info";

  // Static pages with high priority
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
      priority: 0.6,
    },
    {
      url: `${baseUrl}/structure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Book landing pages
  const books = [
    { slug: "rigveda", code: "rv", priority: 0.9 },
    { slug: "ramayana", code: "rm", priority: 0.9 },
    { slug: "mahabharata", code: "mb", priority: 0.9 },
    { slug: "bhagavad-gita", code: "bg", priority: 0.9 },
    { slug: "srimad-bhagavatam", code: "sbp", priority: 0.8 },
    { slug: "devi-mahatmyam", code: "dm", priority: 0.8 },
    { slug: "manu-smriti", code: "ms", priority: 0.8 },
    { slug: "yoga-vasishtha", code: "yv", priority: 0.8 },
    { slug: "markandeya-purana", code: "mp", priority: 0.8 },
    { slug: "ramopakyana", code: "ro", priority: 0.8 },
    { slug: "parashara", code: "ph", priority: 0.8 },
  ];

  const bookPages: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${baseUrl}/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: book.priority,
  }));

  // Dynamically fetch shloka pages from database
  let shlokaPages: MetadataRoute.Sitemap = [];

  try {
    // Get all books with their codes
    const { data: booksData } = await supabase
      .from("books")
      .select("id, code");

    if (booksData) {
      for (const book of booksData) {
        // Get sections for this book
        const { data: sections } = await supabase
          .from("sections")
          .select("id, section_number")
          .eq("book_id", book.id)
          .order("section_number");

        if (sections) {
          for (const section of sections) {
            // Get chapters for this section
            const { data: chapters } = await supabase
              .from("chapters")
              .select("chapter_number")
              .eq("section_id", section.id)
              .order("chapter_number");

            if (chapters) {
              for (const chapter of chapters) {
                // Add shloka page URL (starting from verse 1)
                shlokaPages.push({
                  url: `${baseUrl}/shlokas/${book.code}-${section.section_number}-${chapter.chapter_number}-1`,
                  lastModified: new Date(),
                  changeFrequency: "monthly" as const,
                  priority: 0.7,
                });
              }
            }
          }
        }
      }
    }
  } catch (error) {
    // If database fetch fails, continue with static pages only
    console.error("Error fetching shloka pages for sitemap:", error);
  }

  return [...staticPages, ...bookPages, ...shlokaPages];
}
