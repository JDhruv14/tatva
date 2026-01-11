"use client";

import { useState, useMemo, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
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
import Sanscript from "@indic-transliteration/sanscript";

// Script options for transliteration
const scriptOptions = [
  { value: "devanagari", label: "देवनागरी", labelEn: "Devanagari" },
  { value: "gujarati", label: "ગુજરાતી", labelEn: "Gujarati" },
  { value: "bengali", label: "বাংলা", labelEn: "Bengali" },
  { value: "tamil", label: "தமிழ்", labelEn: "Tamil" },
  { value: "telugu", label: "తెలుగు", labelEn: "Telugu" },
  { value: "kannada", label: "ಕನ್ನಡ", labelEn: "Kannada" },
  { value: "malayalam", label: "മലയാളം", labelEn: "Malayalam" },
  { value: "oriya", label: "ଓଡ଼ିଆ", labelEn: "Odia" },
  { value: "modi", label: "उर्दू", labelEn: "Urdu" },
  { value: "assamese", label: "অসমীয়া", labelEn: "Assamese" },
];

interface ShlokaPageProps {
  id: string;
}

export default function ShlokaPage({ id }: ShlokaPageProps) {
  const router = useRouter();

  const { data, isLoading, error } = useChapter(id);

  // Script selection state with localStorage persistence
  const [selectedScript, setSelectedScript] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tatva-script') || 'devanagari';
    }
    return 'devanagari';
  });

  // Persist script selection to localStorage
  useEffect(() => {
    localStorage.setItem('tatva-script', selectedScript);
  }, [selectedScript]);

  // Transliterate text helper
  const transliterate = useMemo(() => {
    return (text: string | null) => {
      if (!text) return null;
      if (selectedScript === "devanagari") return text; // Already in Devanagari
      try {
        return Sanscript.t(text, "devanagari", selectedScript);
      } catch {
        return text; // Return original if transliteration fails
      }
    };
  }, [selectedScript]);

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
    if (bookCode === "sbp" || bookCode === "ms" || bookCode === "yv" || bookCode === "mp" || bookCode === "ph" || bookCode === "ro" || bookCode === "dm") return "स्कन्ध";
    return "Section";
  };

  const getChapterLabel = () => {
    if (bookCode === "rm") return "सर्गः";
    if (bookCode === "mb" || bookCode === "bg") return "अध्याय";
    if (bookCode === "rv") return "सूक्त";
    if (bookCode === "sbp" || bookCode === "ms" || bookCode === "yv" || bookCode === "mp" || bookCode === "ph" || bookCode === "ro" || bookCode === "dm") return "अध्याय";
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6">
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
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
                  <SelectContent side="bottom">
                    {navigation.sections.map((section) => (
                      <SelectItem key={section.id} value={section.section_number.toString()}>
                        <span className="font-sanskrit">{section.name_hindi}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
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
                  <SelectContent side="bottom">
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

              {/* Script Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                <label className="text-sm font-sanskrit text-foreground whitespace-nowrap w-[60px] text-right">भाषा:</label>
                <Select value={selectedScript} onValueChange={setSelectedScript}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue>
                      {scriptOptions.find(s => s.value === selectedScript)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    {scriptOptions.map((script) => (
                      <SelectItem key={script.value} value={script.value}>
                        <span>{script.label}</span>
                        <span className="ml-2 text-xs">({script.labelEn})</span>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">
                {/* Left: Sanskrit & Transliteration */}
                <div className="text-center min-w-0">
                  <p className="shloka-id">
                    [{shloka.code}]{shloka.is_highlighted && <span className="ml-1 text-primary">*</span>}
                  </p>
                  {shloka.sanskrit && (
                    <p className="shloka-sanskrit break-words">{transliterate(shloka.sanskrit)}</p>
                  )}
                  {shloka.transliteration && (
                    <p className="shloka-transliteration break-words">{shloka.transliteration}</p>
                  )}
                </div>

                {/* Right: Translation */}
                {data.hasTranslation && shloka.translation_english && (
                  <div className="mt-4 lg:mt-0 lg:pt-8 min-w-0">
                    <p className="shloka-translation break-words">{shloka.translation_english}</p>
                  </div>
                )}
              </div>
            </article>
          ))}


        </div>

        {/* Divider */}
        <hr className="divider-glow mt-2 mb-8" />

        {/* Navigation Footer */}
        {(() => {
          const getPrevRoute = () => {
            if (!navigation) return null;

            const currentSectionIndex = navigation.sections.findIndex(s => s.section_number === currentSection);
            const currentChapters = navigation.chaptersBySection[currentSection] || [];
            const currentChapterIndex = currentChapters.findIndex(c => c.chapter_number === currentChapter);

            // Previous chapter in same section
            if (currentChapterIndex > 0) {
              const prevChapter = currentChapters[currentChapterIndex - 1];
              return `/shlokas/${bookCode}-${currentSection}-${prevChapter.chapter_number}-1`;
            }

            // Last chapter of previous section
            if (currentSectionIndex > 0) {
              const prevSection = navigation.sections[currentSectionIndex - 1];
              const prevSectionChapters = navigation.chaptersBySection[prevSection.section_number] || [];
              if (prevSectionChapters.length > 0) {
                const lastChapter = prevSectionChapters[prevSectionChapters.length - 1];
                return `/shlokas/${bookCode}-${prevSection.section_number}-${lastChapter.chapter_number}-1`;
              }
            }

            return null;
          };

          const getNextRoute = () => {
            if (!navigation) return null;

            const currentSectionIndex = navigation.sections.findIndex(s => s.section_number === currentSection);
            const currentChapters = navigation.chaptersBySection[currentSection] || [];
            const currentChapterIndex = currentChapters.findIndex(c => c.chapter_number === currentChapter);

            // Next chapter in same section
            if (currentChapterIndex !== -1 && currentChapterIndex < currentChapters.length - 1) {
              const nextChapter = currentChapters[currentChapterIndex + 1];
              return `/shlokas/${bookCode}-${currentSection}-${nextChapter.chapter_number}-1`;
            }

            // First chapter of next section
            if (currentSectionIndex !== -1 && currentSectionIndex < navigation.sections.length - 1) {
              const nextSection = navigation.sections[currentSectionIndex + 1];
              const nextSectionChapters = navigation.chaptersBySection[nextSection.section_number] || [];
              if (nextSectionChapters.length > 0) {
                const firstChapter = nextSectionChapters[0];
                return `/shlokas/${bookCode}-${nextSection.section_number}-${firstChapter.chapter_number}-1`;
              }
            }

            return null;
          };

          const prevRoute = getPrevRoute();
          const nextRoute = getNextRoute();

          return (
            <div className="flex justify-between items-center mb-0 animate-fade-up-delay-3">
              <div className="flex-1">
                {prevRoute ? (
                  <Link href={prevRoute} className="btn-outline font-english text-sm inline-flex items-center justify-center w-[100px]">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Link>
                ) : <div className="w-[100px]" />}
              </div>

              <div className="flex-1 text-center">
                <Link href="/contents" className="text-muted-foreground hover:text-foreground font-english text-sm transition-colors">
                  Back to Contents
                </Link>
              </div>

              <div className="flex-1 flex justify-end">
                {nextRoute ? (
                  <Link href={nextRoute} className="btn-outline font-english text-sm inline-flex items-center justify-center w-[100px]">
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                ) : <div className="w-[100px]" />}
              </div>
            </div>
          );
        })()}

        <Footer />
      </main>
    </div>
  );
}

