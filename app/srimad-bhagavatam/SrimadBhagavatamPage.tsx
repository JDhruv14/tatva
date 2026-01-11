"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, Sparkles, Globe, BookOpen, Crown, Flame } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Pie, PieChart } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const skandhas = [
  { id: 1, english: "Canto 1", sanskrit: "स्कन्ध १", theme: "Creation", description: "Introduction to the Bhagavatam, King Parikshit's curse, and the setting for the narration by Sukadeva Gosvami.", keyEvents: ["Parikshit's Curse", "Questions to Sukadeva", "Bhishma's Instructions"], link: "sbp-1-1-1" },
  { id: 2, english: "Canto 2", sanskrit: "स्कन्ध २", theme: "Cosmic Manifestation", description: "The cosmic manifestation, process of creation, and the universal form of the Lord described.", keyEvents: ["Virat Rupa", "Creation Process", "Brahma's Position"], link: "sbp-2-1-1" },
  { id: 3, english: "Canto 3", sanskrit: "स्कन्ध ३", theme: "Status Quo", description: "Vidura's inquiries, the story of Kapila, and philosophical teachings on Sankhya.", keyEvents: ["Vidura-Maitreya Dialogue", "Kapila's Teachings", "Devahuti's Liberation"], link: "sbp-3-1-1" },
  { id: 4, english: "Canto 4", sanskrit: "स्कन्ध ४", theme: "Fourth Order", description: "The story of Dhruva Maharaja, Prithu Maharaja, and the Pracetas.", keyEvents: ["Dhruva's Tapasya", "Prithu's Advent", "Pracetas' Penance"], link: "sbp-4-1-1" },
  { id: 5, english: "Canto 5", sanskrit: "स्कन्ध ५", theme: "Creative Impetus", description: "The story of King Priyavrata, Rishabhadeva, and the structure of the universe.", keyEvents: ["Rishabhadeva's Life", "Bharata's Story", "Cosmic Geography"], link: "sbp-5-1-1" },
  { id: 6, english: "Canto 6", sanskrit: "स्कन्ध ६", theme: "Prescribed Duties", description: "The story of Ajamila, Daksha's sacrifice, and the Vritrasura war.", keyEvents: ["Ajamila's Deliverance", "Daksha Yajna", "Indra vs Vritrasura"], link: "sbp-6-1-1" },
  { id: 7, english: "Canto 7", sanskrit: "स्कन्ध ७", theme: "Science of God", description: "The story of Prahlada Maharaja, Narasimha's appearance, and teachings on devotion.", keyEvents: ["Prahlada's Devotion", "Narasimha Lila", "Varaha's Story"], link: "sbp-7-1-1" },
  { id: 8, english: "Canto 8", sanskrit: "स्कन्ध ८", theme: "Withdrawal", description: "The story of Gajendra, the churning of the ocean, and Lord Vamana's appearance.", keyEvents: ["Gajendra Moksha", "Samudra Manthan", "Vamana Avatar"], link: "sbp-8-1-1" },
  { id: 9, english: "Canto 9", sanskrit: "स्कन्ध ९", theme: "Liberation", description: "The dynasties of the sun and moon, including the stories of Rama and other kings.", keyEvents: ["Solar Dynasty", "Lunar Dynasty", "Lord Rama's Story"], link: "sbp-9-1-1" },
  { id: 10, english: "Canto 10", sanskrit: "स्कन्ध १०", theme: "Summum Bonum", description: "The pastimes of Lord Krishna from birth to return to Vaikuntha - the heart of the Bhagavatam.", keyEvents: ["Krishna's Birth", "Vrindavan Lilas", "Mathura & Dwaraka"], link: "sbp-10-1-1" },
  { id: 11, english: "Canto 11", sanskrit: "स्कन्ध ११", theme: "General History", description: "The Uddhava Gita, destruction of Yadava dynasty, and Krishna's departure.", keyEvents: ["Uddhava Gita", "Yadava Destruction", "Krishna's Departure"], link: "sbp-11-1-1" },
  { id: 12, english: "Canto 12", sanskrit: "स्कन्ध १२", theme: "Age of Deterioration", description: "Kali Yuga's symptoms, future kings, and the glory of the Bhagavatam.", keyEvents: ["Kali Yuga Signs", "Markandeya's Vision", "Bhagavatam's Glory"], link: "sbp-12-1-1" },
];

const themeCategories = [
  { name: "Bhakti Yoga", icon: Heart, color: "#ef4444", skandhas: [1, 7, 10, 11], description: "The path of pure devotional service to the Supreme Lord" },
  { name: "Avatar Lilas", icon: Sparkles, color: "#f49d25", skandhas: [7, 8, 9, 10], description: "Divine incarnations and their transcendental pastimes" },
  { name: "Cosmology", icon: Globe, color: "#3b82f6", skandhas: [2, 3, 5], description: "Structure of the universe and creation process" },
  { name: "Vedanta Philosophy", icon: BookOpen, color: "#8b5cf6", skandhas: [3, 11, 12], description: "Sankhya, Yoga, and transcendental knowledge" },
  { name: "Dharma & Karma", icon: Crown, color: "#10b981", skandhas: [4, 6, 9], description: "Righteous duties and the law of action" },
  { name: "Moksha", icon: Flame, color: "#fbbf24", skandhas: [11, 12], description: "Liberation and return to the spiritual realm" },
];

const narrativePhaseData = [
  { subject: "Devotion", overall: 100, fullMark: 100 },
  { subject: "Philosophy", overall: 95, fullMark: 100 },
  { subject: "Narrative", overall: 90, fullMark: 100 },
  { subject: "Cosmology", overall: 85, fullMark: 100 },
  { subject: "Lila", overall: 98, fullMark: 100 },
];

const chartConfig = {
  overall: { label: "Overall", color: "#f49d25" },
} satisfies ChartConfig;

const skandhaColors = [
  "hsl(15, 75%, 32%)", "hsl(20, 70%, 42%)", "hsl(25, 55%, 52%)",
  "hsl(30, 80%, 38%)", "hsl(35, 85%, 48%)", "hsl(18, 60%, 45%)",
  "hsl(22, 70%, 35%)", "hsl(28, 75%, 55%)", "hsl(32, 65%, 42%)",
  "hsl(16, 80%, 50%)", "hsl(24, 60%, 38%)", "hsl(29, 85%, 45%)",
];

const pieChartConfig: ChartConfig = {
  chapters: { label: "Chapters" },
  ...skandhas.reduce((acc, skandha, idx) => {
    acc[`skandha-${skandha.id}`] = { label: skandha.english, color: skandhaColors[idx] || skandhaColors[0] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>),
} satisfies ChartConfig;

export default function SrimadBhagavatamPage() {
  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ["srimad-bhagavatam-stats"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "sbp").single();
      if (!book) return [];
      const { data: sections, error: sectionsError } = await supabase.from("sections").select("id, section_number, name_english, name_hindi").eq("book_id", book.id).order("section_number", { ascending: true });
      if (sectionsError || !sections || sections.length === 0) return [];
      const stats = await Promise.all(
        sections.map(async (section: any) => {
          const { count, error: countError } = await supabase.from("chapters").select("*", { count: "exact", head: true }).eq("section_id", section.id);
          if (countError) return { name: section.name_english, chapters: 0, skandha: section.section_number };
          return { name: section.name_english, chapters: count || 0, skandha: section.section_number };
        })
      );
      return stats;
    },
  });

  const { data: chapterCounts } = useQuery({
    queryKey: ["srimad-bhagavatam-chapter-counts"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "sbp").single();
      if (!book) return {};
      const { data: sections, error: sectionsError } = await supabase.from("sections").select("id, section_number").eq("book_id", book.id).order("section_number", { ascending: true });
      if (sectionsError || !sections) return {};
      const counts: Record<number, number> = {};
      for (const section of sections as any[]) {
        const { count, error } = await supabase.from("chapters").select("*", { count: "exact", head: true }).eq("section_id", section.id);
        if (!error) counts[section.section_number] = count || 0;
      }
      return counts;
    },
  });

  const pieChartData = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];
    return chartData.map((item) => {
      const color = skandhaColors[item.skandha - 1] || skandhaColors[0];
      return { skandha: `skandha-${item.skandha}`, chapters: item.chapters, fill: color };
    });
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
          <h1 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-[#c65c39] dark:text-[#f49d25] hover:opacity-80 transition-opacity"><span className="font-sanskrit">श्रीमद्भागवतम्</span></h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Srimad Bhagavatam</h2>
          <p className="text-lg text-muted-foreground mb-4 font-english">निगमकल्पतरोर्गलितं फलम् - The Ripened Fruit of Vedic Knowledge</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 font-english leading-relaxed">The Srimad Bhagavatam (Bhagavata Purana) is the crown jewel of Puranic literature, composed by Vyasadeva. Containing 18,000 verses across 12 cantos, it presents the science of God, the pastimes of Lord Krishna, and the path of pure devotion (bhakti).</p>
        </div>
        <section className="mb-16 animate-fade-up-delay-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"><Image src="/srimad%20bhagvatam.png" alt="Srimad Bhagavatam" width={512} height={512} className="w-full h-auto object-cover" priority /></div>
            <Link href="/shlokas/sbp-1-1-1" className="btn-primary inline-block font-english text-sm px-6 py-2">Begin Journey</Link>
          </div>
        </section>

        {/* Thematic Categories */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Thematic Pillars</h2>
          <p className="text-sm text-muted-foreground mb-8 text-center font-english max-w-3xl mx-auto">The Srimad Bhagavatam weaves together six fundamental themes that guide the soul towards ultimate liberation.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {themeCategories.map((theme) => (
              <Card key={theme.name} className="bg-card border border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4 text-center">
                  <theme.icon className="w-8 h-8 mx-auto mb-2" style={{ color: theme.color }} />
                  <h3 className="font-medium text-foreground text-sm mb-1">{theme.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{theme.description}</p>
                  <p className="text-xs text-primary">Skandhas: {theme.skandhas.join(", ")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Skandha Analysis & Chapter Distribution</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center font-english max-w-3xl mx-auto">The radar chart highlights key cantos across five dimensions. The pie chart shows chapter distribution across all twelve Skandhas.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Key Skandha Analysis</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Overall analysis across: Devotion, Philosophy, Narrative, Cosmology, and Lila.</p>
              </CardHeader>
              <CardContent className="pb-4 pt-6 px-2">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[320px] w-full">
                  <RadarChart data={narrativePhaseData} margin={{ top: 35, right: 50, bottom: 35, left: 50 }}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'hsl(var(--foreground))', fontWeight: 500 }} />
                    <PolarGrid radialLines={false} />
                    <Radar dataKey="overall" fill="var(--color-overall)" fillOpacity={0.5} stroke="var(--color-overall)" strokeWidth={2} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Chapter Distribution</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Distribution of chapters across the twelve Skandhas.</p>
              </CardHeader>
              <CardContent className="flex-1 pb-4 pt-6">
                {isLoading ? (<div className="h-[300px] flex items-center justify-center"><p className="text-muted-foreground font-english">Loading chart...</p></div>) : error ? (<div className="h-[300px] flex items-center justify-center"><p className="text-destructive font-english">Error loading data</p></div>) : pieChartData && pieChartData.length > 0 ? (
                  <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <PieChart>
                      <ChartTooltip cursor={false} content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0];
                          const nameStr = String(data.name || '');
                          const skandhaId = nameStr.replace('skandha-', '');
                          const skandha = skandhas.find(s => s.id === parseInt(skandhaId));
                          const skandhaName = skandha?.english || nameStr || 'Unknown';
                          const chapters = data.value || 0;
                          return (<div className="rounded-lg border bg-background p-2 shadow-sm"><div className="grid gap-2"><div className="flex items-center gap-2"><span className="text-sm font-medium text-foreground">{skandhaName} : {chapters} Chapters</span></div></div></div>);
                        }
                        return null;
                      }} />
                      <Pie data={pieChartData} dataKey="chapters" nameKey="skandha" />
                    </PieChart>
                  </ChartContainer>
                ) : (<div className="h-[300px] flex items-center justify-center"><p className="text-muted-foreground font-english">No data available</p></div>)}
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mb-16 animate-fade-up-delay-3">
          <h2 className="text-3xl font-english text-foreground mb-12 text-center">The Twelve Skandhas</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
            <div className="space-y-4 md:space-y-5">
              {skandhas.map((skandha, index) => {
                const isEven = index % 2 === 0;
                const actualChapters = chapterCounts?.[skandha.id] || 0;
                return (
                  <div key={skandha.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mb-2 md:mb-0"></div>
                    <div className={`w-full md:w-[calc(50%-1.5rem)] ${isEven ? 'md:pr-6' : 'md:pl-6'}`}>
                      <Card className="feature-card">
                        <CardContent className="p-3">
                          <div className={`flex flex-col gap-1.5 ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                            <div>
                              <span className="text-xs font-medium text-primary mb-1 block">{skandha.theme}</span>
                              <h3 className="text-lg font-sanskrit text-foreground mb-0.5">{skandha.sanskrit}</h3>
                              <p className="text-sm font-english text-muted-foreground mb-0.5">{skandha.english}</p>
                            </div>
                            <p className="text-xs text-muted-foreground font-english leading-relaxed">{skandha.description}</p>
                            {actualChapters > 0 && <p className="text-xs text-muted-foreground font-english">{actualChapters} Chapters</p>}
                            <Link href={`/shlokas/${skandha.link}`} className="btn-primary inline-block font-english text-sm px-4 py-2 mt-1">Begin Skandha</Link>
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
