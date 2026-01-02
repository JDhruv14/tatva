"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useChapter } from "@/hooks/use-chapter";
import { useBookNavigation } from "@/hooks/use-book-navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShlokaPageProps {
  id: string;
}

export default function ShlokaPage({ id }: ShlokaPageProps) {
  const router = useRouter();

  const { data, isLoading, error } = useChapter(id);

  // Parse book code from id (e.g., "rm-1-1-1" -> "rm")
  const bookCode = id?.split("-")[0] || "";
  const { data: navigation } = useBookNavigation(bookCode);

  // Parse current section and chapter from id
  const currentSection = id ? parseInt(id.split("-")[1]) : 0;
  const currentChapter = id ? parseInt(id.split("-")[2]) : 0;

  // Map book codes to placeholder routes
  const bookRoutes: Record<string, string> = {
    'rm': '/ramayana',
    'mb': '/mahabharata',
    'bg': '/bhagavad-gita',
    'rv': '/rigveda',
    'sbp': '/srimad-bhagavatam',
    'ms': '/manu-smriti',
    'mp': '/markandeya-purana',
    'dm': '/devi-mahatmyam',
    'ph': '/parashara',
    'ro': '/ramopakyana',
    'yv': '/yoga-vasishtha',
  };

  // Get placeholder route for current book, fallback to /contents
  const placeholderRoute = bookRoutes[bookCode] || '/contents';

  // Handle return navigation
  const handleReturn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(placeholderRoute);
  };

  // Get current section and chapter names
  const currentSectionData = navigation?.sections.find((s) => s.section_number === currentSection);
  const currentChapterData = navigation?.chaptersBySection[currentSection]?.find(
    (c) => c.chapter_number === currentChapter
  );

  // Navigation handlers
  const handleSectionChange = (sectionNum: string) => {
    const sectionNumber = parseInt(sectionNum);
    const chapters = navigation?.chaptersBySection[sectionNumber] || [];
    if (chapters.length > 0) {
      router.push(`/shlokas/${bookCode}-${sectionNumber}-${chapters[0].chapter_number}-1`);
    }
  };

  const handleChapterChange = (chapterNum: string) => {
    const chapterNumber = parseInt(chapterNum);
    router.push(`/shlokas/${bookCode}-${currentSection}-${chapterNumber}-1`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="glow-ambient animate-pulse-slow" />
        <Header />
        <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-10 text-center">
          <h1 className="text-2xl font-english text-foreground mb-4">Loading...</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="glow-ambient animate-pulse-slow" />
        <Header />
        <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-10 text-center">
          <h1 className="text-2xl font-english text-foreground mb-4">Shloka Not Found</h1>
          <p className="text-muted-foreground font-english mb-8">The requested shloka could not be found.</p>
          <Link href="/contents" className="btn-primary font-english">Back to Contents</Link>
        </main>
      </div>
    );
  }

  // Determine section and chapter labels based on book
  const getSectionLabel = () => {
    if (bookCode === "rm") return "काण्ड";
    if (bookCode === "mb") return "पर्व";
    if (bookCode === "rv") return "मण्डल";
    return "Section";
  };

  const getChapterLabel = () => {
    if (bookCode === "rm") return "सर्गः";
    if (bookCode === "mb" || bookCode === "bg") return "अध्याय";
    if (bookCode === "rv") return "सूक्त";
    return "Chapter";
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="glow-ambient animate-pulse-slow" />
      <Header />

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32">
        {/* Back Link */}
        <button
          onClick={handleReturn}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 animate-fade-up"
        >
          <ArrowLeft className="w-4 h-4" />
          Return
        </button>

        {/* Book Title */}
        <div className="text-center mb-8 animate-fade-up-delay-1">
          <h1 className="font-sanskrit text-4xl md:text-5xl text-primary mb-6">
            {data.bookNameHindi}
          </h1>

          {/* Dropdown Navigation */}
          {navigation && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                <label className="text-sm font-sanskrit text-foreground whitespace-nowrap w-[60px] text-right">{getSectionLabel()}:</label>
                <Select
                  value={currentSection.toString()}
                  onValueChange={handleSectionChange}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue>
                      <span className="font-sanskrit">{currentSectionData?.name_hindi}</span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {navigation.sections.map((section) => (
                      <SelectItem key={section.id} value={section.section_number.toString()}>
                        <span className="font-sanskrit">{section.name_hindi}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                <label className="text-sm font-sanskrit text-foreground whitespace-nowrap w-[60px] text-right">
                  {getChapterLabel()}{getChapterLabel() === "सर्गः" ? "" : ":"}
                </label>
                <Select
                  value={currentChapter.toString()}
                  onValueChange={handleChapterChange}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue>
                      <span className="font-sanskrit">
                        {currentChapterData?.name_hindi || `${getChapterLabel()} ${currentChapter}`}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {(navigation.chaptersBySection[currentSection] || []).map((chapter) => (
                      <SelectItem key={chapter.id} value={chapter.chapter_number.toString()}>
                        <span className="font-sanskrit">
                          {chapter.name_hindi || `${getChapterLabel()} ${chapter.chapter_number}`}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Meta */}
          <p className="text-xs text-muted-foreground mt-4 font-mono">
            <span className="text-primary">[{id?.split("-").slice(0, 2).join("-")}]</span> • {data.totalShlokas}{" "}
            <span className="font-sanskrit">श्लोकाः</span>
          </p>
        </div>

        {/* Shlokas */}
        <div className="animate-fade-up-delay-2">
          {data.shlokas.map((shloka, index) => (
            <article key={shloka.id} className={`shloka-card ${index === data.shlokas.length - 1 ? 'border-b-0' : ''}`}>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 md:gap-8 items-start">
                {/* Left: Sanskrit & Transliteration */}
                <div className="text-center">
                  <p className="shloka-id">
                    [{shloka.code}]{shloka.is_highlighted && <span className="ml-1 text-primary">*</span>}
                  </p>
                  {shloka.sanskrit && (
                    <p className="shloka-sanskrit">{shloka.sanskrit}</p>
                  )}
                  {shloka.transliteration && (
                    <p className="shloka-transliteration">{shloka.transliteration}</p>
                  )}
                </div>

                {/* Right: Translation */}
                {data.hasTranslation && shloka.translation_english && (
                  <div className="mt-4 lg:mt-0 lg:pt-8">
                    <p className="shloka-translation">{shloka.translation_english}</p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <Footer />
      </main>
    </div>
  );
}

