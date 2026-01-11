"use client";

import { Search, CornerDownLeft, Menu, X, FileText, BookOpen, File, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./ui/command";
import { supabase } from "@/integrations/supabase/client";

interface HeaderProps {
  showSearch?: boolean;
}

interface SearchResult {
  type: 'book' | 'section' | 'chapter';
  id: string;
  name: string;
  nameHindi?: string;
  bookCode: string;
  sectionNumber?: number;
  chapterNumber?: number;
  firstChapterNumber?: number; // Pre-cached first chapter for sections
  bookName: string;
  bookNameHindi?: string;
  sectionName?: string;
  sectionNameHindi?: string;
}

const Header = ({ showSearch = true }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isActive = (path: string) => pathname === path;

  // Prevent page shift when dialog opens by keeping scrollbar visible
  useEffect(() => {
    if (searchOpen) {
      const originalOverflow = document.body.style.overflow;
      const intervalId = setInterval(() => {
        if (document.body.style.overflow === 'hidden') {
          document.body.style.overflow = 'auto';
        }
      }, 10);

      const observer = new MutationObserver(() => {
        if (document.body.style.overflow === 'hidden') {
          document.body.style.overflow = 'auto';
        }
      });

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style', 'data-scroll-locked']
      });

      return () => {
        clearInterval(intervalId);
        observer.disconnect();
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [searchOpen]);

  // Pre-fetch all search data on mount for instant search
  const { data: searchData, isLoading: isLoadingSearch } = useQuery({
    queryKey: ["search-data"],
    queryFn: async (): Promise<SearchResult[]> => {
      // Fetch all data in parallel for speed
      const [booksRes, sectionsRes, chaptersRes] = await Promise.all([
        supabase.from("books").select("id, code, name_english, name_hindi").order("display_order", { ascending: true }),
        supabase.from("sections").select("id, book_id, section_number, name_english, name_hindi").order("section_number", { ascending: true }),
        supabase.from("chapters").select("id, section_id, chapter_number, name_english, name_hindi").order("chapter_number", { ascending: true }),
      ]);

      const books = booksRes.data || [];
      const sections = sectionsRes.data || [];
      const chapters = chaptersRes.data || [];

      // Create lookup maps for fast access
      const bookMap = new Map(books.map(b => [b.id, b]));
      const sectionsByBook = new Map<string, typeof sections>();
      const chaptersBySection = new Map<string, typeof chapters>();

      sections.forEach(s => {
        if (!sectionsByBook.has(s.book_id)) sectionsByBook.set(s.book_id, []);
        sectionsByBook.get(s.book_id)!.push(s);
      });

      chapters.forEach(c => {
        if (!chaptersBySection.has(c.section_id)) chaptersBySection.set(c.section_id, []);
        chaptersBySection.get(c.section_id)!.push(c);
      });

      const results: SearchResult[] = [];

      // Process all books
      for (const book of books) {
        results.push({
          type: 'book',
          id: book.id,
          name: book.name_english,
          nameHindi: book.name_hindi,
          bookCode: book.code,
          bookName: book.name_english,
          bookNameHindi: book.name_hindi,
        });

        const bookSections = sectionsByBook.get(book.id) || [];
        for (const section of bookSections) {
          const sectionChapters = chaptersBySection.get(section.id) || [];
          const firstChapter = sectionChapters[0];

          results.push({
            type: 'section',
            id: section.id,
            name: section.name_hindi || section.name_english,
            nameHindi: section.name_hindi,
            bookCode: book.code,
            sectionNumber: section.section_number,
            firstChapterNumber: firstChapter?.chapter_number, // Pre-cache first chapter
            bookName: book.name_english,
            bookNameHindi: book.name_hindi,
            sectionName: section.name_english,
            sectionNameHindi: section.name_hindi,
          });

          for (const chapter of sectionChapters) {
            results.push({
              type: 'chapter',
              id: chapter.id,
              name: chapter.name_hindi || chapter.name_english || `अध्याय ${chapter.chapter_number}`,
              nameHindi: chapter.name_hindi,
              bookCode: book.code,
              sectionNumber: section.section_number,
              chapterNumber: chapter.chapter_number,
              bookName: book.name_english,
              bookNameHindi: book.name_hindi,
              sectionName: section.name_english,
              sectionNameHindi: section.name_hindi,
            });
          }
        }
      }

      return results;
    },
    staleTime: 30 * 60 * 1000, // Cache for 30 minutes
    gcTime: 60 * 60 * 1000, // Keep in cache for 1 hour
  });

  // Normalize IAST to simple ASCII for easier searching
  const normalizeIAST = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/ā/g, 'a')
      .replace(/ī/g, 'i')
      .replace(/ū/g, 'u')
      .replace(/ṛ/g, 'r')
      .replace(/ṝ/g, 'r')
      .replace(/ḷ/g, 'l')
      .replace(/ḹ/g, 'l')
      .replace(/ē/g, 'e')
      .replace(/ō/g, 'o')
      .replace(/ṃ/g, 'm')
      .replace(/ḥ/g, 'h')
      .replace(/ś/g, 'sh')
      .replace(/ṣ/g, 'sh')
      .replace(/ñ/g, 'n')
      .replace(/ṭ/g, 't')
      .replace(/ḍ/g, 'd')
      .replace(/ṇ/g, 'n')
      .replace(/ṅ/g, 'n');
  };

  // Filter results instantly (no debounce - filtering is client-side and fast)
  const filteredResults = useMemo(() => {
    if (!searchData || !searchQuery.trim()) return { books: [], sections: [], chapters: [] };

    const query = searchQuery.toLowerCase().trim();
    const normalizedQuery = normalizeIAST(query);
    const books: SearchResult[] = [];
    const sections: SearchResult[] = [];
    const chapters: SearchResult[] = [];

    searchData.forEach((result) => {
      // Enhanced matching: check English names, Hindi names, book code, and section names
      // Normalize IAST to allow searching without diacritics
      // This allows users to search in both English and Devanagari without needing IAST
      const normalizedName = normalizeIAST(result.name);
      const normalizedBookName = normalizeIAST(result.bookName);
      const normalizedSectionName = result.sectionName ? normalizeIAST(result.sectionName) : '';

      const matches =
        result.name.toLowerCase().includes(query) ||
        normalizedName.includes(normalizedQuery) ||
        (result.nameHindi && result.nameHindi.includes(query)) ||
        result.bookName.toLowerCase().includes(query) ||
        normalizedBookName.includes(normalizedQuery) ||
        (result.bookNameHindi && result.bookNameHindi.includes(query)) ||
        result.bookCode.toLowerCase().includes(query) ||
        (result.sectionName && result.sectionName.toLowerCase().includes(query)) ||
        (normalizedSectionName && normalizedSectionName.includes(normalizedQuery)) ||
        (result.sectionNameHindi && result.sectionNameHindi.includes(query));

      if (matches) {
        if (result.type === 'book') {
          books.push(result);
        } else if (result.type === 'section') {
          sections.push(result);
        } else {
          chapters.push(result);
        }
      }
    });

    // Filter out sections that are also books (e.g., Bhagavad Gita)
    const bookNames = new Set(books.map(b => b.name.toLowerCase()));
    const filteredSections = sections.filter(s => !bookNames.has((s.sectionName || s.name).toLowerCase()));

    // Sort results: books first, then sections, then chapters
    return {
      books: books.sort((a, b) => a.name.localeCompare(b.name)),
      sections: filteredSections.sort((a, b) => {
        if (a.bookName !== b.bookName) return a.bookName.localeCompare(b.bookName);
        return (a.sectionName || '').localeCompare(b.sectionName || '');
      }),
      chapters: chapters.sort((a, b) => {
        if (a.bookName !== b.bookName) return a.bookName.localeCompare(b.bookName);
        if (a.sectionName !== b.sectionName) return (a.sectionName || '').localeCompare(b.sectionName || '');
        return (a.chapterNumber || 0) - (b.chapterNumber || 0);
      })
    };
  }, [searchData, searchQuery]);

  // Keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    // Custom event to open search from other components
    const openSearch = () => setSearchOpen(true);
    window.addEventListener("open-tatva-search", openSearch);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-tatva-search", openSearch);
    };
  }, []);

  // Scroll detection for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide header when scrolling down and past threshold
        setHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full py-4 px-4 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}
        style={{
          transition: headerVisible
            ? 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="max-w-4xl mx-auto flex h-14 items-center justify-between px-4 rounded-full bg-background/40 backdrop-blur-xl backdrop-saturate-150 border border-white/10 dark:border-white/5 shadow-lg shadow-black/5 dark:shadow-black/20 ring-1 ring-black/5 dark:ring-white/10">
          {/* Left: Logo with favicon */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/favicon.ico"
              alt="Tatva"
              width={32}
              height={32}
              className="object-contain cursor-pointer"
            />
            <span className="text-base font-bold text-foreground md:text-2xl font-sanskrit">तत्त्व</span>
          </Link>

          {/* Center: Navigation - Hidden on mobile, visible on desktop */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 items-center gap-2 hidden lg:flex">
            <Link
              href="/contents"
              className={`relative text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full ${isActive('/contents')
                ? 'text-black bg-muted/50 dark:text-white'
                : 'text-black hover:text-black hover:bg-muted/50 dark:text-white dark:hover:text-white'
                }`}
            >
              Explore
            </Link>
            <Link
              href="/structure"
              className={`relative text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full ${isActive('/structure')
                ? 'text-black bg-muted/50 dark:text-white'
                : 'text-black hover:text-black hover:bg-muted/50 dark:text-white dark:hover:text-white'
                }`}
            >
              Structure
            </Link>
            <Link
              href="/preface"
              className={`relative text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full ${isActive('/preface')
                ? 'text-black bg-muted/50 dark:text-white'
                : 'text-black hover:text-black hover:bg-muted/50 dark:text-white dark:hover:text-white'
                }`}
            >
              Preface
            </Link>
          </nav>

          {/* Right: Search, Icons, and Buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full transition-all duration-300 hover:bg-muted/50 bg-muted/30"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4 text-foreground transition-transform duration-200" />
              ) : (
                <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
            {/* Search Bar - Desktop only */}
            {showSearch && (
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 h-9 w-full max-w-xs rounded-full border border-border/20 bg-muted/50 px-3 text-sm text-black dark:text-white transition-colors hover:bg-muted hover:text-black dark:hover:text-white"
                type="button"
                aria-haspopup="dialog"
                aria-expanded={searchOpen}
              >
                <Search className="h-4 w-4 shrink-0 opacity-50" />
                <span className="flex-1 text-left">Search</span>
                <kbd className="pointer-events-none flex h-5 items-center justify-center gap-1 rounded border border-border/20 bg-background px-2 font-sans text-[0.7rem] font-medium text-muted-foreground">
                  <span>⌘ K</span>
                </kbd>
              </button>
            )}

            {/* Theme Toggle */}
            <AnimatedThemeToggler className="p-2 rounded-full transition-all duration-300 hover:bg-muted/50 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:text-foreground" />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden mt-2 mx-2 p-3 rounded-2xl bg-background/40 backdrop-blur-xl backdrop-saturate-150 border border-white/10 dark:border-white/5 shadow-lg shadow-black/5 dark:shadow-black/20 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden transition-all duration-300 ease-out ${mobileMenuOpen
            ? 'opacity-100 max-h-72 translate-y-0'
            : 'opacity-0 max-h-0 -translate-y-2 pointer-events-none'
            }`}
        >
          <nav className="flex flex-col gap-1">
            {showSearch && (
              <button
                onClick={() => {
                  setSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
                className={`text-base font-medium transition-all duration-200 px-4 py-3 rounded-xl text-center transform ${mobileMenuOpen ? 'translate-x-0 opacity-100 delay-75' : '-translate-x-4 opacity-0'} text-foreground hover:bg-primary/10`}
              >
                Search
              </button>
            )}
            <Link
              href="/contents"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium transition-all duration-200 px-4 py-3 rounded-xl text-center transform ${mobileMenuOpen ? 'translate-x-0 opacity-100 delay-100' : '-translate-x-4 opacity-0'
                } ${pathname === '/contents'
                  ? 'text-primary font-semibold bg-primary/10'
                  : 'text-foreground'
                }`}
            >
              Explore
            </Link>
            <Link
              href="/structure"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium transition-all duration-200 px-4 py-3 rounded-xl text-center transform ${mobileMenuOpen ? 'translate-x-0 opacity-100 delay-150' : '-translate-x-4 opacity-0'
                } ${pathname === '/structure'
                  ? 'text-primary font-semibold bg-primary/10'
                  : 'text-foreground'
                }`}
            >
              Structure
            </Link>
            <Link
              href="/preface"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium transition-all duration-200 px-4 py-3 rounded-xl text-center transform ${mobileMenuOpen ? 'translate-x-0 opacity-100 delay-200' : '-translate-x-4 opacity-0'
                } ${pathname === '/preface'
                  ? 'text-primary font-semibold bg-primary/10'
                  : 'text-foreground'
                }`}
            >
              Preface
            </Link>
          </nav>
        </div>
      </header>

      {/* Search Dialog */}
      <CommandDialog
        open={searchOpen}
        onOpenChange={(open) => {
          setSearchOpen(open);
          if (!open) setSearchQuery(""); // Reset search when closing
        }}
      >
        <CommandInput
          placeholder="Search documentation..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {isLoadingSearch && (
            <CommandEmpty>Loading...</CommandEmpty>
          )}

          {!isLoadingSearch && !searchQuery.trim() && (
            <>
              <CommandGroup heading="Pages">
                <CommandItem onSelect={() => { router.push('/contents'); setSearchOpen(false); }}>
                  <FileText className="mr-2 h-4 w-4 shrink-0" />
                  <span>Explore</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/preface'); setSearchOpen(false); }}>
                  <FileText className="mr-2 h-4 w-4 shrink-0" />
                  <span>Preface</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/structure'); setSearchOpen(false); }}>
                  <FileText className="mr-2 h-4 w-4 shrink-0" />
                  <span>Structure</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Books">
                <CommandItem onSelect={() => { router.push('/bhagavad-gita'); setSearchOpen(false); }}>
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span>Bhagavad Gita</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/ramayana'); setSearchOpen(false); }}>
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span>Ramayana</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/mahabharata'); setSearchOpen(false); }}>
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span>Mahabharata</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/ramopakyana'); setSearchOpen(false); }}>
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span>Rāmopākhyāna</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/rigveda'); setSearchOpen(false); }}>
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span>Ṛigveda</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/srimad-bhagavatam'); setSearchOpen(false); }}>
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span>Srimad Bhagavatam</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/devi-mahatmyam'); setSearchOpen(false); }}>
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span>Devi Mahatmyam</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/manu-smriti'); setSearchOpen(false); }}>
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span>Manu Smriti</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/markandeya-purana'); setSearchOpen(false); }}>
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span>Markandeya Purana</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/parashara'); setSearchOpen(false); }}>
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span>Parashara Hora Shastra</span>
                </CommandItem>
                <CommandItem onSelect={() => { router.push('/yoga-vasishtha'); setSearchOpen(false); }}>
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span>Yoga Vasishtha</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}

          {!isLoadingSearch && searchQuery.trim() && (
            <>
              {filteredResults.books.length === 0 && filteredResults.sections.length === 0 && filteredResults.chapters.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <>
                  {filteredResults.books.length > 0 && (
                    <CommandGroup heading="Books">
                      {filteredResults.books.map((book) => (
                        <CommandItem
                          key={book.id}
                          value={`book-${book.id}`}
                          onSelect={() => {
                            // Navigate to book placeholder page
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
                            const route = bookRoutes[book.bookCode] || '/contents';
                            router.push(route);
                            setSearchOpen(false);
                          }}
                        >
                          <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                          <span>{book.name}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {filteredResults.sections.length > 0 && (
                    <CommandGroup heading="Sections (Mandalas/Kandas/Parvas)">
                      {filteredResults.sections.map((section) => (
                        <CommandItem
                          key={section.id}
                          value={`section-${section.id}`}
                          className="group"
                          onSelect={() => {
                            // Use pre-cached firstChapterNumber for instant navigation
                            if (section.sectionNumber !== undefined && section.firstChapterNumber) {
                              router.push(`/shlokas/${section.bookCode}-${section.sectionNumber}-${section.firstChapterNumber}-1`);
                            } else {
                              // Fallback to book page
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
                              router.push(bookRoutes[section.bookCode] || '/contents');
                            }
                            setSearchOpen(false);
                          }}
                        >
                          <File className="mr-2 h-4 w-4 shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-sanskrit group-aria-selected:text-white dark:group-aria-selected:text-black">{section.nameHindi || section.name}</span>
                            <span className="text-xs text-foreground/70 group-aria-selected:text-white/70 dark:group-aria-selected:text-black/70">{section.bookName}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {filteredResults.chapters.length > 0 && (
                    <CommandGroup heading="Chapters">
                      {filteredResults.chapters.slice(0, 20).map((chapter) => (
                        <CommandItem
                          key={chapter.id}
                          value={`chapter-${chapter.id}`}
                          className="group"
                          onSelect={() => {
                            // Navigate to chapter: /shlokas/{bookCode}-{section}-{chapter}-1
                            if (chapter.sectionNumber !== undefined && chapter.chapterNumber !== undefined) {
                              router.push(`/shlokas/${chapter.bookCode}-${chapter.sectionNumber}-${chapter.chapterNumber}-1`);
                            }
                            setSearchOpen(false);
                          }}
                        >
                          <File className="mr-2 h-4 w-4 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-foreground group-aria-selected:text-white dark:group-aria-selected:text-black">{chapter.name}</span>
                            <span className="text-xs text-foreground/70 group-aria-selected:text-white/70 dark:group-aria-selected:text-black/70">
                              {chapter.sectionName} • {chapter.bookName}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                      {filteredResults.chapters.length > 20 && (
                        <div className="px-2 py-1.5 text-xs text-muted-foreground">
                          +{filteredResults.chapters.length - 20} more chapters
                        </div>
                      )}
                    </CommandGroup>
                  )}
                </>
              )}
            </>
          )}
        </CommandList>
        <div className="hidden md:flex items-center gap-3 border-t px-4 py-2 bg-muted/20">
          <div className="flex items-center gap-1">
            <span className="flex items-center justify-center p-0.5 rounded border border-border bg-muted/50 text-[10px] w-5 h-5">
              <ArrowUpDown className="h-3 w-3" />
            </span>
            <span className="text-xs text-muted-foreground">Navigate</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="flex items-center justify-center p-0.5 rounded border border-border bg-muted/50 text-[10px] w-5 h-5">
              <CornerDownLeft className="h-3 w-3" />
            </span>
            <span className="text-xs text-muted-foreground">Select</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="flex items-center justify-center px-1 py-0.5 rounded border border-border bg-muted/50 text-[10px] h-5 min-w-5 leading-none">
              Esc
            </span>
            <span className="text-xs text-muted-foreground">Close</span>
          </div>
        </div>
      </CommandDialog>
    </>
  );
};

export default Header;