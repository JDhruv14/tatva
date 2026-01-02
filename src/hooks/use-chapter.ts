import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Shloka {
  id: string;
  code: string;
  shloka_number: number;
  sanskrit: string | null;
  transliteration: string | null;
  translation_english: string | null;
  translation_hindi: string | null;
  is_highlighted: boolean;
}

export interface ChapterData {
  bookCode: string;
  bookName: string;
  bookNameHindi: string;
  sectionNumber: number;
  sectionName: string;
  sectionNameHindi: string;
  chapterNumber: number;
  chapterName: string;
  chapterNameHindi: string;
  totalShlokas: number;
  shlokas: Shloka[];
  hasTranslation: boolean;
  contentFormat: string;
}

export const useChapter = (code: string | undefined) => {
  return useQuery({
    queryKey: ["chapter", code],
    queryFn: async (): Promise<ChapterData | null> => {
      if (!code) return null;
      
      // Check if supabase client is available
      if (!supabase) {
        console.error("Supabase client is not initialized. Check your environment variables.");
        return null;
      }

      // Parse code: {book_code}-{section}-{chapter}-{shloka}
      const parts = code.split("-");
      if (parts.length < 3) return null;

      const bookCode = parts[0];
      const sectionNum = parseInt(parts[1]);
      const chapterNum = parseInt(parts[2]);

      try {
        // Get book
        const { data: book, error: bookError } = await supabase
          .from("books")
          .select("id, name_english, name_hindi, has_translation_english, content_format")
          .eq("code", bookCode)
          .single();

        if (bookError) {
          console.error("Error fetching book:", bookError);
          return null;
        }
        if (!book) return null;

        // Get section
        const { data: section, error: sectionError } = await supabase
          .from("sections")
          .select("id, section_number, name_english, name_hindi")
          .eq("book_id", book.id)
          .eq("section_number", sectionNum)
          .single();

        if (sectionError) {
          console.error("Error fetching section:", sectionError);
          return null;
        }
        if (!section) return null;

        // Get chapter
        const { data: chapter, error: chapterError } = await supabase
          .from("chapters")
          .select("id, chapter_number, name_english, name_hindi, total_shlokas")
          .eq("section_id", section.id)
          .eq("chapter_number", chapterNum)
          .single();

        if (chapterError) {
          console.error("Error fetching chapter:", chapterError);
          return null;
        }
        if (!chapter) return null;

        // Get shlokas
        const { data: shlokas, error: shlokasError } = await supabase
          .from("shlokas")
          .select("id, code, shloka_number, sanskrit, transliteration, translation_english, translation_hindi, is_highlighted")
          .eq("chapter_id", chapter.id)
          .order("shloka_number", { ascending: true });

        if (shlokasError) {
          console.error("Error fetching shlokas:", shlokasError);
          return null;
        }

        return {
          bookCode,
          bookName: book.name_english,
          bookNameHindi: book.name_hindi,
          sectionNumber: section.section_number,
          sectionName: section.name_english,
          sectionNameHindi: section.name_hindi,
          chapterNumber: chapter.chapter_number,
          chapterName: chapter.name_hindi || chapter.name_english || `अध्याय ${chapter.chapter_number}`,
          chapterNameHindi: chapter.name_hindi || `अध्याय ${chapter.chapter_number}`,
          totalShlokas: chapter.total_shlokas || shlokas?.length || 0,
          shlokas: (shlokas || []).map((s) => ({
            id: s.id,
            code: s.code,
            shloka_number: s.shloka_number,
            sanskrit: s.sanskrit,
            transliteration: s.transliteration,
            translation_english: s.translation_english,
            translation_hindi: s.translation_hindi,
            is_highlighted: s.is_highlighted,
          })),
          hasTranslation: book.has_translation_english || false,
          contentFormat: book.content_format || "shloka",
        };
      } catch (err) {
        console.error("Error in useChapter:", err);
        return null;
      }
    },
    enabled: !!code,
  });
};
