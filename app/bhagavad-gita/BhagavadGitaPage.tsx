"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, Brain, Sword, BookOpen, Sparkles, Crown } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const chapters = [
  { id: 1, english: "Arjuna Viṣāda Yoga", sanskrit: "अर्जुनविषादयोगः", theme: "The Yoga of Arjuna's Dejection", description: "Arjuna's crisis on the battlefield, where he sees his relatives and teachers arrayed for war and loses the will to fight.", keyEvents: ["Arjuna's Dilemma", "Seeing Relatives", "Moral Conflict", "Laying Down Arms"], link: "bg-1-1-1" },
  { id: 2, english: "Sāṅkhya Yoga", sanskrit: "साङ्ख्ययोगः", theme: "The Yoga of Knowledge", description: "Krishna begins his teachings, explaining the nature of the eternal soul, the importance of duty, and the path of selfless action.", keyEvents: ["Nature of Soul", "Duty and Dharma", "Selfless Action", "Equanimity"], link: "bg-1-2-1" },
  { id: 3, english: "Karma Yoga", sanskrit: "कर्मयोगः", theme: "The Yoga of Action", description: "The path of selfless action, performing duties without attachment to results, as exemplified by ancient sages.", keyEvents: ["Selfless Action", "Yajna Principle", "Duty vs Desire", "Action vs Inaction"], link: "bg-1-3-1" },
  { id: 4, english: "Jñāna Karma Sannyāsa Yoga", sanskrit: "ज्ञानकर्मसंन्यासयोगः", theme: "The Yoga of Knowledge and Renunciation", description: "Krishna reveals his divine nature and explains the path of knowledge, action, and renunciation.", keyEvents: ["Divine Manifestations", "Path of Knowledge", "Transcendental Knowledge", "Sacrifice of Knowledge"], link: "bg-1-4-1" },
  { id: 5, english: "Karma Sannyāsa Yoga", sanskrit: "कर्मसंन्यासयोगः", theme: "The Yoga of Renunciation of Action", description: "The distinction between renunciation of action and renunciation in action, emphasizing the superiority of Karma Yoga.", keyEvents: ["Renunciation Types", "Karma Yoga Superiority", "Self-Realization", "Brahman Realization"], link: "bg-1-5-1" },
  { id: 6, english: "Dhyāna Yoga", sanskrit: "ध्यानयोगः", theme: "The Yoga of Meditation", description: "The practice of meditation, control of mind and senses, and the characteristics of a yogi.", keyEvents: ["Meditation Practice", "Mind Control", "Yogi's Characteristics", "Self-Realization"], link: "bg-1-6-1" },
  { id: 7, english: "Jñāna Vijñāna Yoga", sanskrit: "ज्ञानविज्ञानयोगः", theme: "The Yoga of Knowledge and Wisdom", description: "Krishna explains his divine nature, the material and spiritual energies, and how to attain him.", keyEvents: ["Divine Nature", "Material Energy", "Spiritual Energy", "Surrender to Krishna"], link: "bg-1-7-1" },
  { id: 8, english: "Akṣara Brahma Yoga", sanskrit: "अक्षरब्रह्मयोगः", theme: "The Yoga of the Imperishable Brahman", description: "The nature of Brahman, the process of leaving the body, and the paths leading to liberation.", keyEvents: ["Brahman Nature", "Departure from Body", "Path of Light", "Path of Darkness"], link: "bg-1-8-1" },
  { id: 9, english: "Rāja Vidyā Rāja Guhya Yoga", sanskrit: "राजविद्याराजगुह्ययोगः", theme: "The Yoga of Royal Knowledge and Royal Secret", description: "The most confidential knowledge - Krishna's relationship with all beings and the path of devotion.", keyEvents: ["Royal Knowledge", "Divine Relationship", "Path of Devotion", "Equal Vision"], link: "bg-1-9-1" },
  { id: 10, english: "Vibhūti Yoga", sanskrit: "विभूतियोगः", theme: "The Yoga of Divine Glories", description: "Krishna reveals his opulences and divine manifestations in the material world.", keyEvents: ["Divine Opulences", "Material Manifestations", "Supreme Source", "Universal Form"], link: "bg-1-10-1" },
  { id: 11, english: "Viśvarūpa Darśana Yoga", sanskrit: "विश्वरूपदर्शनयोगः", theme: "The Yoga of the Universal Form", description: "Arjuna beholds Krishna's universal form, seeing all beings, time, and the entire universe within him.", keyEvents: ["Universal Form", "Divine Vision", "Arjuna's Awe", "Cosmic Manifestation"], link: "bg-1-11-1" },
  { id: 12, english: "Bhakti Yoga", sanskrit: "भक्तियोगः", theme: "The Yoga of Devotion", description: "The path of devotion, the characteristics of devotees, and the means to attain Krishna.", keyEvents: ["Path of Devotion", "Devotee's Qualities", "Meditation on Krishna", "Supreme Goal"], link: "bg-1-12-1" },
  { id: 13, english: "Kṣetra Kṣetrajña Vibhāga Yoga", sanskrit: "क्षेत्रक्षेत्रज्ञविभागयोगः", theme: "The Yoga of the Field and Knower of the Field", description: "The distinction between the body (field) and the soul (knower of the field), and the nature of material nature.", keyEvents: ["Field and Knower", "Material Nature", "Puruṣa and Prakṛti", "Liberation"], link: "bg-1-13-1" },
  { id: 14, english: "Guṇa Traya Vibhāga Yoga", sanskrit: "गुणत्रयविभागयोगः", theme: "The Yoga of the Three Modes of Material Nature", description: "The three modes of material nature (sattva, rajas, tamas), their characteristics, and how to transcend them.", keyEvents: ["Three Modes", "Sattva Mode", "Rajas Mode", "Tamas Mode", "Transcendence"], link: "bg-1-14-1" },
  { id: 15, english: "Puruṣottama Yoga", sanskrit: "पुरुषोत्तमयोगः", theme: "The Yoga of the Supreme Person", description: "The analogy of the banyan tree, the nature of the Supreme Person, and the path to the eternal abode.", keyEvents: ["Banyan Tree Analogy", "Supreme Person", "Eternal Abode", "Divine Nature"], link: "bg-1-15-1" },
  { id: 16, english: "Daivāsura Sampad Vibhāga Yoga", sanskrit: "दैवासुरसम्पद्विभागयोगः", theme: "The Yoga of the Divine and Demoniac Natures", description: "The characteristics of divine and demoniac natures, and the consequences of each path.", keyEvents: ["Divine Qualities", "Demoniac Qualities", "Threefold Desire", "Three Gates to Hell"], link: "bg-1-16-1" },
  { id: 17, english: "Śraddhā Traya Vibhāga Yoga", sanskrit: "श्रद्धात्रयविभागयोगः", theme: "The Yoga of the Three Kinds of Faith", description: "The three types of faith, food, sacrifice, austerity, and charity according to the three modes.", keyEvents: ["Three Types of Faith", "Food and Modes", "Sacrifice and Modes", "Charity and Modes"], link: "bg-1-17-1" },
  { id: 18, english: "Mokṣa Sannyāsa Yoga", sanskrit: "मोक्षसंन्यासयोगः", theme: "The Yoga of Liberation and Renunciation", description: "The final chapter, summarizing all teachings and emphasizing the path to liberation through devotion, knowledge, and selfless action.", keyEvents: ["Renunciation Types", "Summary of Teachings", "Path to Liberation", "Supreme Secret"], link: "bg-1-18-1" },
];

const thematicData = [
  { subject: "Knowledge", value: 95, fullMark: 100 },
  { subject: "Devotion", value: 92, fullMark: 100 },
  { subject: "Action", value: 88, fullMark: 100 },
  { subject: "Meditation", value: 85, fullMark: 100 },
  { subject: "Philosophy", value: 98, fullMark: 100 },
  { subject: "Ethics", value: 90, fullMark: 100 },
];

const themeCategories = [
  { name: "Knowledge & Wisdom", icon: Brain, color: "#f49d25", chapters: [2, 4, 7, 13], description: "Understanding the eternal soul and supreme reality" },
  { name: "Devotion & Love", icon: Heart, color: "#ef4444", chapters: [9, 12], description: "The path of bhakti and surrender to Krishna" },
  { name: "Action & Duty", icon: Sword, color: "#10b981", chapters: [3, 5, 18], description: "Karma yoga and selfless service" },
  { name: "Meditation & Yoga", icon: Sparkles, color: "#8b5cf6", chapters: [6], description: "Mind control and spiritual practice" },
  { name: "Divine Nature", icon: Crown, color: "#3b82f6", chapters: [10, 11], description: "Krishna's glories and universal form" },
  { name: "Philosophy", icon: BookOpen, color: "#fbbf24", chapters: [1, 8, 14, 15, 16, 17], description: "Metaphysics and spiritual principles" },
];

const radarChartConfig = {
  value: { label: "Coverage", color: "#f49d25" },
} satisfies ChartConfig;

const barChartConfig = {
  shlokas: { label: "Shlokas", color: "#f49d25" },
} satisfies ChartConfig;

export default function BhagavadGitaPage() {
  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ["bhagavad-gita-stats"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "bg").single();
      if (!book) return [];
      const { data: sections } = await supabase.from("sections").select("id, section_number, name_english, name_hindi").eq("book_id", book.id).order("section_number", { ascending: true });
      if (!sections || sections.length === 0) return [];
      const { data: chaptersData } = await supabase.from("chapters").select("id, chapter_number, name_english, name_hindi").eq("section_id", sections[0].id).order("chapter_number", { ascending: true });
      if (!chaptersData || chaptersData.length === 0) return [];
      const stats = await Promise.all(
        chaptersData.map(async (chapter: any) => {
          const { count } = await supabase.from("shlokas").select("*", { count: "exact", head: true }).eq("chapter_id", chapter.id);
          return { name: `Ch.${chapter.chapter_number}`, shlokas: count || 0, chapter: chapter.chapter_number };
        })
      );
      return stats;
    },
  });

  const barChartData = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];
    return chartData;
  }, [chartData]);

  const totalShlokas = useMemo(() => {
    if (chartData && chartData.length > 0) {
      return chartData.reduce((sum, item) => sum + item.shlokas, 0);
    }
    return 700;
  }, [chartData]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="glow-ambient animate-pulse-slow" />
      <Header />
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32">
        <Link href="/contents" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 animate-fade-up">
          <ArrowLeft className="w-4 h-4" />Return
        </Link>
        <div className="text-center mb-12 animate-fade-up-delay-1">
          <h1 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-[#c65c39] dark:text-[#f49d25] hover:opacity-80 transition-opacity"><span className="font-sanskrit">भगवद्गीता</span></h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Bhagavad Gītā</h2>
          <p className="text-lg text-muted-foreground mb-4 font-english">श्रीमद्भगवद्गीता - The Song of God</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 font-english leading-relaxed">A {totalShlokas}-verse dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra. The Bhagavad Gita is a timeless guide to life, covering philosophy, ethics, and spirituality across 18 chapters.</p>
        </div>
        <section className="mb-16 animate-fade-up-delay-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"><Image src="/gita.png" alt="Bhagavad Gita" width={512} height={512} className="w-full h-auto object-cover" priority /></div>
            <Link href="/shlokas/bg-1-1-1" className="btn-primary inline-block font-english text-sm px-6 py-2">Begin Journey</Link>
          </div>
        </section>

        {/* Thematic Categories */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Thematic Overview</h2>
          <p className="text-sm text-muted-foreground mb-8 text-center font-english max-w-3xl mx-auto">The Bhagavad Gita covers six major themes that encompass all aspects of spiritual life and self-realization.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {themeCategories.map((theme) => (
              <Card key={theme.name} className="bg-card border border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4 text-center">
                  <theme.icon className="w-8 h-8 mx-auto mb-2" style={{ color: theme.color }} />
                  <h3 className="font-medium text-foreground text-sm mb-1">{theme.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{theme.description}</p>
                  <p className="text-xs text-primary">Chapters: {theme.chapters.join(", ")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Content Analysis</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center font-english max-w-3xl mx-auto">The radar chart shows thematic coverage across different domains. The bar chart displays shloka distribution across all 18 chapters.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Thematic Coverage</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Six domains of spiritual knowledge covered in the Gita.</p>
              </CardHeader>
              <CardContent className="pb-4 pt-6 px-2">
                <ChartContainer config={radarChartConfig} className="mx-auto aspect-square max-h-[280px] w-full">
                  <RadarChart data={thematicData} margin={{ top: 40, right: 60, bottom: 40, left: 60 }}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: 'hsl(var(--foreground))', fontWeight: 500 }} />
                    <PolarGrid radialLines={false} />
                    <Radar dataKey="value" fill="var(--color-value)" fillOpacity={0.3} stroke="var(--color-value)" strokeWidth={2} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Shloka Distribution</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Number of shlokas in each of the 18 chapters.</p>
              </CardHeader>
              <CardContent className="flex-1 pb-4 pt-6 px-2 overflow-hidden">
                {isLoading ? (<div className="h-[280px] flex items-center justify-center"><p className="text-muted-foreground font-english">Loading chart...</p></div>) : error ? (<div className="h-[280px] flex items-center justify-center"><p className="text-destructive font-english">Error loading data</p></div>) : (
                  <ChartContainer config={barChartConfig} className="mx-auto h-[260px] w-full">
                    <BarChart data={barChartData} margin={{ top: 10, right: 15, bottom: 25, left: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 8, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} interval={0} angle={-45} textAnchor="end" height={40} />
                      <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} width={30} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Bar dataKey="shlokas" fill="var(--color-shlokas)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16 animate-fade-up-delay-3">
          <h2 className="text-3xl font-english text-foreground mb-12 text-center">The Eighteen Chapters</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
            <div className="space-y-4 md:space-y-5">
              {chapters.map((chapter, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={chapter.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mb-2 md:mb-0"></div>
                    <div className={`w-full md:w-[calc(50%-1.5rem)] ${isEven ? 'md:pr-6' : 'md:pl-6'}`}>
                      <Card className="feature-card">
                        <CardContent className="p-3">
                          <div className={`flex flex-col gap-1.5 ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                            <div>
                              <span className="text-xs font-medium text-primary mb-1 block">Chapter {chapter.id}</span>
                              <h3 className="text-lg font-sanskrit text-foreground mb-0.5">{chapter.sanskrit}</h3>
                              <p className="text-sm font-english text-muted-foreground mb-0.5">{chapter.english}</p>
                            </div>
                            <p className="text-xs text-muted-foreground font-english leading-relaxed">{chapter.description}</p>
                            <Link href={`/shlokas/${chapter.link}`} className="btn-primary inline-block font-english text-sm px-4 py-2 mt-1">Begin Chapter</Link>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden md:block w-[calc(50%-1.5rem)]"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
