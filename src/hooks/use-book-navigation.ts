import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Section {
  id: string;
  section_number: number;
  name_english: string;
  name_hindi: string;
}

export interface Chapter {
  id: string;
  chapter_number: number;
  name_english: string;
  name_hindi: string;
  section_id: string;
}

export interface BookNavigation {
  sections: Section[];
  chaptersBySection: Record<number, Chapter[]>;
}

export const useBookNavigation = (bookCode: string) => {
  return useQuery({
    queryKey: ["book-navigation", bookCode],
    queryFn: async (): Promise<BookNavigation | null> => {
      if (!bookCode) return null;

      // Fetch book
      const { data: book, error: bookError } = await supabase
        .from("books")
        .select("id")
        .eq("code", bookCode)
        .single();

      if (bookError || !book) return null;

      // Fetch all sections
      const { data: sections, error: sectionsError } = await supabase
        .from("sections")
        .select("id, section_number, name_english, name_hindi")
        .eq("book_id", book.id)
        .order("section_number", { ascending: true });

      if (sectionsError || !sections) return null;

      // Fetch all chapters grouped by section
      const { data: chapters, error: chaptersError } = await supabase
        .from("chapters")
        .select("id, chapter_number, name_english, name_hindi, section_id")
        .in(
          "section_id",
          sections.map((s) => s.id)
        )
        .order("chapter_number", { ascending: true });

      if (chaptersError) return null;

      // Group chapters by section
      const chaptersBySection: Record<number, Chapter[]> = {};
      sections.forEach((section) => {
        chaptersBySection[section.section_number] =
          chapters
            ?.filter((c) => c.section_id === section.id)
            .map((c) => ({
              id: c.id,
              chapter_number: c.chapter_number,
              name_english: c.name_english,
              name_hindi: c.name_hindi,
              section_id: c.section_id,
            })) || [];
      });

      return {
        sections: sections.map((s) => ({
          id: s.id,
          section_number: s.section_number,
          name_english: s.name_english,
          name_hindi: s.name_hindi,
        })),
        chaptersBySection,
      };
    },
    enabled: !!bookCode,
  });
};

