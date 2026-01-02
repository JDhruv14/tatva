"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { List, Grid, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent } from "@/components/ui/card";

const rigvedaMandalas = [
  { id: 1, hindi: "मण्डल १", english: "Mandala 1", description: "Various sages, including Madhucchanda, Gotama, and Medhatithi.", shlokaLink: "rv-1-1-1" },
  { id: 2, hindi: "मण्डल २", english: "Mandala 2", description: "Gṛtsamada and his family.", shlokaLink: "rv-2-1-1" },
  { id: 3, hindi: "मण्डल ३", english: "Mandala 3", description: "Vishwamitra and his family.", shlokaLink: "rv-3-1-1" },
  { id: 4, hindi: "मण्डल ४", english: "Mandala 4", description: "Vāmadeva and his family.", shlokaLink: "rv-4-1-1" },
  { id: 5, hindi: "मण्डल ५", english: "Mandala 5", description: "Atris and their family.", shlokaLink: "rv-5-1-1" },
  { id: 6, hindi: "मण्डल ६", english: "Mandala 6", description: "Bharadvajas and their family.", shlokaLink: "rv-6-1-1" },
  { id: 7, hindi: "मण्डल ७", english: "Mandala 7", description: "Vasishthas and their family.", shlokaLink: "rv-7-1-1" },
  { id: 8, hindi: "मण्डल ८", english: "Mandala 8", description: "Kanvas and Angiras.", shlokaLink: "rv-8-1-1" },
  { id: 9, hindi: "मण्डल ९", english: "Mandala 9", description: "Entirely devoted to the deity Soma, known as Soma Pavamana.", shlokaLink: "rv-9-1-1" },
  { id: 10, hindi: "मण्डल १०", english: "Mandala 10", description: "Contains later hymns to various deities, including the famous Purusha Sukta.", shlokaLink: "rv-10-1-1" },
];

const ramayanaKandas = [
  { id: 1, hindi: "बाल काण्ड", english: "Bāla Kāṇḍa", description: "The childhood of Rama.", shlokaLink: "rm-1-1-1" },
  { id: 2, hindi: "अयोध्या काण्ड", english: "Ayodhyā Kāṇḍa", description: "Events in Ayodhya and exile.", shlokaLink: "rm-2-1-1" },
  { id: 3, hindi: "अरण्य काण्ड", english: "Araṇya Kāṇḍa", description: "Forest wanderings.", shlokaLink: "rm-3-1-1" },
  { id: 4, hindi: "किष्किन्धा काण्ड", english: "Kiṣkindhā Kāṇḍa", description: "Alliance with the monkeys.", shlokaLink: "rm-4-1-1" },
  { id: 5, hindi: "सुंदर काण्ड", english: "Sundara Kāṇḍa", description: "Hanuman's journey to Lanka.", shlokaLink: "rm-5-1-1" },
  { id: 6, hindi: "युद्ध काण्ड", english: "Yuddha Kāṇḍa", description: "The great war.", shlokaLink: "rm-6-1-1" },
  { id: 7, hindi: "उत्तर काण्ड", english: "Uttara Kāṇḍa", description: "Life after the war.", shlokaLink: "rm-7-1-1" },
];

const mahabharataParvas = [
  { id: 1, hindi: "आदि पर्व", english: "Adi Parva", description: "Origins of the Kuru dynasty.", shlokaLink: "mb-1-1-1" },
  { id: 2, hindi: "सभा पर्व", english: "Sabhā Parva", description: "The dice game.", shlokaLink: "mb-2-1-1" },
  { id: 3, hindi: "वन पर्व", english: "Vana Parva", description: "Exile in the forest.", shlokaLink: "mb-3-1-1" },
  { id: 4, hindi: "विराट पर्व", english: "Virāṭa Parva", description: "Year of disguise.", shlokaLink: "mb-4-1-1" },
  { id: 5, hindi: "उद्योग पर्व", english: "Udyoga Parva", description: "Preparations for war.", shlokaLink: "mb-5-1-1" },
  { id: 6, hindi: "भीष्म पर्व", english: "Bhīṣma Parva", description: "Bhishma's command, contains Bhagavad Gita.", shlokaLink: "mb-6-1-1" },
  { id: 7, hindi: "द्रोण पर्व", english: "Droṇa Parva", description: "Drona's command.", shlokaLink: "mb-7-1-1" },
  { id: 8, hindi: "कर्ण पर्व", english: "Karṇa Parva", description: "Karna's command.", shlokaLink: "mb-8-1-1" },
];

const bhagavadGitaChapters = [
  { id: 1, hindi: "अध्याय १", english: "Chapter 1", description: "Arjuna Vishada Yoga - The Yoga of Arjuna's Dejection", shlokaLink: "bg-1-1-1" },
  { id: 2, hindi: "अध्याय २", english: "Chapter 2", description: "Sankhya Yoga - The Yoga of Knowledge", shlokaLink: "bg-1-2-1" },
  { id: 3, hindi: "अध्याय ३", english: "Chapter 3", description: "Karma Yoga - The Yoga of Action", shlokaLink: "bg-1-3-1" },
  { id: 4, hindi: "अध्याय ४", english: "Chapter 4", description: "Jnana Karma Sanyasa Yoga - The Yoga of Knowledge and Renunciation", shlokaLink: "bg-1-4-1" },
  { id: 5, hindi: "अध्याय ५", english: "Chapter 5", description: "Karma Sanyasa Yoga - The Yoga of Renunciation", shlokaLink: "bg-1-5-1" },
  { id: 6, hindi: "अध्याय ६", english: "Chapter 6", description: "Dhyana Yoga - The Yoga of Meditation", shlokaLink: "bg-1-6-1" },
  { id: 7, hindi: "अध्याय ७", english: "Chapter 7", description: "Jnana Vijnana Yoga - The Yoga of Knowledge and Wisdom", shlokaLink: "bg-1-7-1" },
  { id: 8, hindi: "अध्याय ८", english: "Chapter 8", description: "Aksara Brahma Yoga - The Yoga of the Imperishable Brahman", shlokaLink: "bg-1-8-1" },
  { id: 9, hindi: "अध्याय ९", english: "Chapter 9", description: "Raja Vidya Raja Guhya Yoga - The Yoga of Royal Knowledge and Royal Secret", shlokaLink: "bg-1-9-1" },
  { id: 10, hindi: "अध्याय १०", english: "Chapter 10", description: "Vibhuti Yoga - The Yoga of Divine Glories", shlokaLink: "bg-1-10-1" },
  { id: 11, hindi: "अध्याय ११", english: "Chapter 11", description: "Visvarupa Darsana Yoga - The Yoga of the Vision of the Universal Form", shlokaLink: "bg-1-11-1" },
  { id: 12, hindi: "अध्याय १२", english: "Chapter 12", description: "Bhakti Yoga - The Yoga of Devotion", shlokaLink: "bg-1-12-1" },
  { id: 13, hindi: "अध्याय १३", english: "Chapter 13", description: "Kshetra Kshetrajna Vibhaga Yoga - The Yoga of the Field and the Knower of the Field", shlokaLink: "bg-1-13-1" },
  { id: 14, hindi: "अध्याय १४", english: "Chapter 14", description: "Gunatraya Vibhaga Yoga - The Yoga of the Division of the Three Gunas", shlokaLink: "bg-1-14-1" },
  { id: 15, hindi: "अध्याय १५", english: "Chapter 15", description: "Purusottama Yoga - The Yoga of the Supreme Person", shlokaLink: "bg-1-15-1" },
  { id: 16, hindi: "अध्याय १६", english: "Chapter 16", description: "Daivasura Sampad Vibhaga Yoga - The Yoga of the Division between the Divine and Demoniacal", shlokaLink: "bg-1-16-1" },
  { id: 17, hindi: "अध्याय १७", english: "Chapter 17", description: "Sraddhatraya Vibhaga Yoga - The Yoga of the Threefold Faith", shlokaLink: "bg-1-17-1" },
  { id: 18, hindi: "अध्याय १८", english: "Chapter 18", description: "Moksha Sanyasa Yoga - The Yoga of Liberation and Renunciation", shlokaLink: "bg-1-18-1" },
];

const srimadBhagavatamSkandas = [
  { id: 1, hindi: "स्कन्ध १", english: "Skanda 1", description: "Creation and the story of King Parikshit", shlokaLink: "sbp-1-1-1" },
  { id: 2, hindi: "स्कन्ध २", english: "Skanda 2", description: "The cosmic manifestation and the process of creation", shlokaLink: "sbp-2-1-1" },
  { id: 3, hindi: "स्कन्ध ३", english: "Skanda 3", description: "The status quo and the story of Kapila", shlokaLink: "sbp-3-1-1" },
  { id: 4, hindi: "स्कन्ध ४", english: "Skanda 4", description: "The creation of the fourth order and the story of Dhruva", shlokaLink: "sbp-4-1-1" },
  { id: 5, hindi: "स्कन्ध ५", english: "Skanda 5", description: "The creative impetus and the story of King Priyavrata", shlokaLink: "sbp-5-1-1" },
  { id: 6, hindi: "स्कन्ध ६", english: "Skanda 6", description: "Prescribed duties for mankind and the story of Ajamila", shlokaLink: "sbp-6-1-1" },
  { id: 7, hindi: "स्कन्ध ७", english: "Skanda 7", description: "The science of God and the story of Prahlada", shlokaLink: "sbp-7-1-1" },
  { id: 8, hindi: "स्कन्ध ८", english: "Skanda 8", description: "Withdrawal of the cosmic creations and the story of Gajendra", shlokaLink: "sbp-8-1-1" },
  { id: 9, hindi: "स्कन्ध ९", english: "Skanda 9", description: "Liberation and the story of the kings of the solar dynasty", shlokaLink: "sbp-9-1-1" },
  { id: 10, hindi: "स्कन्ध १०", english: "Skanda 10", description: "The summum bonum and the pastimes of Lord Krishna", shlokaLink: "sbp-10-1-1" },
  { id: 11, hindi: "स्कन्ध ११", english: "Skanda 11", description: "General history and the story of Uddhava", shlokaLink: "sbp-11-1-1" },
  { id: 12, hindi: "स्कन्ध १२", english: "Skanda 12", description: "The age of deterioration and the future of the universe", shlokaLink: "sbp-12-1-1" },
];

const yogaVasishthaPrakaranas = [
  { id: 1, hindi: "वैराग्य प्रकरण", english: "Vairagya Prakarana", description: "The section on dispassion", shlokaLink: "yv-1-1-1" },
  { id: 2, hindi: "मुमुक्षु प्रकरण", english: "Mumukshu Prakarana", description: "The section on the seeker", shlokaLink: "yv-2-1-1" },
  { id: 3, hindi: "उत्पत्ति प्रकरण", english: "Utpatti Prakarana", description: "The section on creation", shlokaLink: "yv-3-1-1" },
  { id: 4, hindi: "स्थिति प्रकरण", english: "Sthiti Prakarana", description: "The section on existence", shlokaLink: "yv-4-1-1" },
  { id: 5, hindi: "उपशम प्रकरण", english: "Upashama Prakarana", description: "The section on dissolution", shlokaLink: "yv-5-1-1" },
  { id: 6, hindi: "निर्वाण प्रकरण", english: "Nirvana Prakarana", description: "The section on liberation", shlokaLink: "yv-6-1-1" },
  { id: 7, hindi: "उपदेश प्रकरण", english: "Upadesha Prakarana", description: "The section on instruction", shlokaLink: "yv-7-1-1" },
];

const books = [
  {
    id: "rigveda",
    sanskrit: "ऋग्वेद",
    english: "Ṛigveda",
    description: "The oldest Vedic text with 1,028 hymns.",
    placeholderLink: "/rigveda",
    sections: rigvedaMandalas,
    imageGradient: "from-amber-900 via-orange-800 to-amber-700",
  },
  {
    id: "ramayana",
    sanskrit: "श्री रामायण",
    english: "Śrī Ramayana",
    description: "The epic tale of Lord Rama's journey.",
    placeholderLink: "/ramayana",
    sections: ramayanaKandas,
    imageGradient: "from-blue-900 via-indigo-800 to-blue-700",
  },
  {
    id: "mahabharata",
    sanskrit: "महाभारत",
    english: "Mahābhārata",
    description: "The great epic containing the Bhagavad Gita.",
    placeholderLink: "/mahabharata",
    sections: mahabharataParvas,
    imageGradient: "from-purple-900 via-violet-800 to-purple-700",
  },
  {
    id: "bhagavad-gita",
    sanskrit: "भगवद्गीता",
    english: "Bhagavad Gita",
    description: "The Song of God, a spiritual dialogue.",
    placeholderLink: "/bhagavad-gita",
    sections: bhagavadGitaChapters,
    imageGradient: "from-rose-900 via-pink-800 to-rose-700",
  },
  {
    id: "srimad-bhagavatam",
    sanskrit: "श्रीमद् भागवतम्",
    english: "Śrīmad Bhāgavatam",
    description: "The story of Lord Krishna and his divine pastimes.",
    placeholderLink: "/srimad-bhagavatam",
    sections: srimadBhagavatamSkandas,
    imageGradient: "from-emerald-900 via-teal-800 to-emerald-700",
  },
  {
    id: "manu-smriti",
    sanskrit: "मनु स्मृति",
    english: "Manu Smṛti",
    description: "Ancient legal and social code of conduct.",
    placeholderLink: "/manu-smriti",
    sections: [],
    imageGradient: "from-stone-900 via-neutral-800 to-stone-700",
  },
  {
    id: "yoga-vasishtha",
    sanskrit: "योग वासिष्ठ",
    english: "Yoga Vāsiṣṭha",
    description: "Philosophical dialogue on Advaita Vedanta and yoga.",
    placeholderLink: "/yoga-vasishtha",
    sections: yogaVasishthaPrakaranas,
    imageGradient: "from-cyan-900 via-blue-800 to-cyan-700",
  },
  {
    id: "markandeya-puran",
    sanskrit: "मार्कण्डेय पुराण",
    english: "Mārkaṇḍeya Purāṇa",
    description: "Ancient Purana containing the Devi Mahatmyam.",
    placeholderLink: "/markandeya-purana",
    sections: [],
    imageGradient: "from-violet-900 via-purple-800 to-violet-700",
  },
  {
    id: "parashara-hora-shastra",
    sanskrit: "पराशर होरा शास्त्र",
    english: "Parāśara Hora Śāstra",
    description: "Classical text on Vedic astrology and horoscopy.",
    placeholderLink: "/parashara",
    sections: [],
    imageGradient: "from-indigo-900 via-blue-800 to-indigo-700",
  },
  {
    id: "ramopakyana",
    sanskrit: "रामोपाख्यान",
    english: "Rāmopākhyāna",
    description: "The story of Rama as narrated in the Mahabharata.",
    placeholderLink: "/ramopakyana",
    sections: [],
    imageGradient: "from-sky-900 via-cyan-800 to-sky-700",
  },
  {
    id: "devi-mahatmyam",
    sanskrit: "देवी महात्म्यम्",
    english: "Devī Mahātmyam",
    description: "The glory of the Goddess, also known as Durga Saptashati.",
    placeholderLink: "/devi-mahatmyam",
    sections: [],
    imageGradient: "from-fuchsia-900 via-pink-800 to-fuchsia-700",
  },
];

export default function ContentsPage() {
  const [viewMode, setViewMode] = useState<"list" | "tiles">("list");

  useEffect(() => {
    const saved = localStorage.getItem("contents-view-mode");
    if (saved === "list" || saved === "tiles") {
      setViewMode(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contents-view-mode", viewMode);
  }, [viewMode]);

  const handleViewChange = (value: string | null) => {
    if (value && (value === "list" || value === "tiles")) {
      setViewMode(value);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="glow-ambient animate-pulse-slow" />
      <Header />

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 animate-fade-up"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Title and View Toggle */}
        <div className="mb-12 animate-fade-up-delay-1">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight text-foreground">
                Read book
              </h1>
              <p className="text-muted-foreground text-lg">
                Explore our collection of ancient texts
              </p>
            </div>
            <div className="flex-shrink-0 pt-2">
              <ToggleGroup type="single" value={viewMode} onValueChange={handleViewChange}>
                <ToggleGroupItem value="list" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="tiles" aria-label="Tiles view">
                  <Grid className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div key={viewMode}>
          {viewMode === "list" ? (
            <div className="space-y-8 animate-fade-up-delay-3">
              {books.map((book) => (
                book.sections.length > 0 ? (
                  <Accordion key={book.id} type="single" collapsible className="w-full">
                    <AccordionItem value={book.id} className="border-b border-border">
                      <AccordionTrigger className="hover:no-underline items-center">
                        <div className="text-left flex-1">
                          <Link
                            href={book.placeholderLink}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-block"
                          >
                            <h2 className="text-4xl font-sanskrit text-foreground mb-2 hover:text-primary transition-colors inline-block">
                              {book.sanskrit}
                            </h2>
                          </Link>
                          <p className="text-xl font-english text-muted-foreground">{book.english}</p>
                          <p className="text-sm text-muted-foreground mt-2 font-english">{book.description}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pl-4 pt-4">
                          {book.sections.map((section) => (
                            <div key={section.id} className="mandala-entry">
                              <Link href={`/shlokas/${section.shlokaLink}`} className="book-title text-sm">
                                <span className="font-sanskrit">{section.hindi}</span>
                                <span className="book-subtitle font-english"> ({section.english})</span>
                              </Link>
                              <span className="book-description"> - {section.description}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    key={book.id}
                    href={book.placeholderLink}
                    className="block border-b border-border pb-8 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-left flex-1">
                        <h2 className="text-4xl font-sanskrit text-foreground mb-2 hover:text-primary transition-colors">
                          {book.sanskrit}
                        </h2>
                        <p className="text-xl font-english text-muted-foreground">{book.english}</p>
                        <p className="text-sm text-muted-foreground mt-2 font-english">{book.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Link>
                )
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12 animate-fade-up-delay-3 px-2 md:px-0">
              {books.map((book) => (
                <Link key={book.id} href={book.placeholderLink} className="block group h-full">
                  <Card className="overflow-hidden h-full flex flex-col hover:border-primary/50 hover:shadow-lg transition-all duration-300 border-border/50">
                    {/* Image Section */}
                    {book.id === "mahabharata" ? (
                      <div className="h-48 relative overflow-hidden flex-shrink-0">
                        <img
                          src="/mahabharata.png"
                          alt={book.english}
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ) : book.id === "ramayana" ? (
                      <div className="h-48 relative overflow-hidden flex-shrink-0">
                        <img
                          src="/ramayana.png"
                          alt={book.english}
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ) : book.id === "rigveda" ? (
                      <div className="h-48 relative overflow-hidden flex-shrink-0">
                        <img
                          src="/rigveda.png"
                          alt={book.english}
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ) : book.id === "yoga-vasishtha" ? (
                      <div className="h-48 relative overflow-hidden flex-shrink-0">
                        <img
                          src="/yoga%20vasistha.png"
                          alt={book.english}
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ) : book.id === "markandeya-puran" ? (
                      <div className="h-48 relative overflow-hidden flex-shrink-0">
                        <img
                          src="/markandaye%20puran.png"
                          alt={book.english}
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ) : book.id === "devi-mahatmyam" ? (
                      <div className="h-48 relative overflow-hidden flex-shrink-0">
                        <img
                          src="/devi.png"
                          alt={book.english}
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ) : book.id === "bhagavad-gita" ? (
                      <div className="h-48 relative overflow-hidden flex-shrink-0">
                        <img
                          src="/gita.png"
                          alt={book.english}
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ) : book.id === "manu-smriti" ? (
                      <div className="h-48 relative overflow-hidden flex-shrink-0">
                        <img
                          src="/manu%20smriti.png"
                          alt={book.english}
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ) : book.id === "parashara-hora-shastra" ? (
                      <div className="h-48 relative overflow-hidden flex-shrink-0">
                        <img
                          src="/parahar%20sastra.png"
                          alt={book.english}
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ) : book.id === "ramopakyana" ? (
                      <div className="h-48 relative overflow-hidden flex-shrink-0">
                        <img
                          src="/Rāmopākhyāna.png"
                          alt={book.english}
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ) : book.id === "srimad-bhagavatam" ? (
                      <div className="h-48 relative overflow-hidden flex-shrink-0">
                        <img
                          src="/srimad%20bhagvatam.png"
                          alt={book.english}
                          className="w-full h-full object-cover brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ) : (
                      <div className={`h-48 bg-gradient-to-br ${book.imageGradient} relative overflow-hidden flex-shrink-0`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                      </div>
                    )}
                    {/* Content Section */}
                    <CardContent className="p-6 bg-card flex-1 flex flex-col">
                      <h2 className="text-2xl font-sanskrit text-foreground mb-2 group-hover:text-primary transition-colors">
                        {book.sanskrit}
                      </h2>
                      <p className="text-base font-english text-muted-foreground mb-3">{book.english}</p>
                      <div className="flex items-center justify-between mt-auto h-[40px]">
                        <p className="text-sm text-muted-foreground font-english leading-relaxed flex-1 pr-2 line-clamp-2">
                          {book.description}
                        </p>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary dark:group-hover:text-accent transition-colors flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 font-english italic">More Books will be added soon</p>

        <Footer />
      </main>
    </div>
  );
}

