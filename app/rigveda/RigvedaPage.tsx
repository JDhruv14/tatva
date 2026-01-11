"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Flame, Zap, Wind, Droplet, Sun, Moon } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const mandalas = [
  { id: 1, english: "Mandala 1", sanskrit: "मण्डल १", theme: "Various Sages", description: "The largest mandala with 191 suktas by various sages including Madhucchanda, Gotama, and Medhatithi. Contains hymns to Agni, Indra, and other deities.", deities: ["Agni", "Indra", "Varuna", "Maruts"], link: "rv-1-1-1" },
  { id: 2, english: "Mandala 2", sanskrit: "मण्डल २", theme: "Gritsamada", description: "Composed primarily by Gritsamada and his family. Contains 43 suktas with hymns focused on Indra, Agni, and the Maruts.", deities: ["Indra", "Agni", "Brihaspati"], link: "rv-2-1-1" },
  { id: 3, english: "Mandala 3", sanskrit: "मण्डल ३", theme: "Vishvamitra", description: "Attributed to Vishvamitra and his family. Contains 62 suktas including the famous Gayatri Mantra (3.62.10).", deities: ["Agni", "Indra", "Savitar"], link: "rv-3-1-1" },
  { id: 4, english: "Mandala 4", sanskrit: "मण्डल ४", theme: "Vamadeva", description: "Composed by Vamadeva and his family. Contains 58 suktas with deep philosophical hymns to Agni and Indra.", deities: ["Agni", "Indra", "Ribhus"], link: "rv-4-1-1" },
  { id: 5, english: "Mandala 5", sanskrit: "मण्डल ५", theme: "Atri Family", description: "Attributed to the Atri family. Contains 87 suktas with hymns to the Vishvedevas, Maruts, and Mitra-Varuna.", deities: ["Vishvedevas", "Maruts", "Mitra-Varuna"], link: "rv-5-1-1" },
  { id: 6, english: "Mandala 6", sanskrit: "मण्डल ६", theme: "Bharadvaja", description: "Composed by Bharadvaja and his family. Contains 75 suktas with emphasis on Agni, Indra, and the Ashvins.", deities: ["Agni", "Indra", "Ashvins", "Pushan"], link: "rv-6-1-1" },
  { id: 7, english: "Mandala 7", sanskrit: "मण्डल ७", theme: "Vasishtha", description: "Attributed to Vasishtha and his family. Contains 104 suktas including hymns to Indra, Varuna, and the famous Battle of Ten Kings.", deities: ["Indra", "Varuna", "Agni", "Dawn"], link: "rv-7-1-1" },
  { id: 8, english: "Mandala 8", sanskrit: "मण्डल ८", theme: "Kanva & Angiras", description: "Composed by Kanvas and Angirases. Contains 103 suktas with unique metrical patterns and hymns to Indra.", deities: ["Indra", "Agni", "Soma", "Ashvins"], link: "rv-8-1-1" },
  { id: 9, english: "Mandala 9", sanskrit: "मण्डल ९", theme: "Soma Pavamana", description: "Entirely devoted to Soma Pavamana (purified Soma). Contains 114 suktas celebrating the sacred drink and its mystical powers.", deities: ["Soma"], link: "rv-9-1-1" },
  { id: 10, english: "Mandala 10", sanskrit: "मण्डल १०", theme: "Later Hymns", description: "The latest mandala with 191 suktas by various sages. Contains the Purusha Sukta, Nasadiya Sukta, and other profound philosophical hymns.", deities: ["Various", "Purusha", "Creation"], link: "rv-10-1-1" },
];

const thematicData = [
  { subject: "Devotion", value: 92, fullMark: 100 },
  { subject: "Philosophy", value: 78, fullMark: 100 },
  { subject: "Ritual", value: 88, fullMark: 100 },
  { subject: "Mythology", value: 85, fullMark: 100 },
  { subject: "Nature", value: 82, fullMark: 100 },
  { subject: "Cosmology", value: 75, fullMark: 100 },
];

const themeCategories = [
  { name: "Fire & Sacrifice", icon: Flame, color: "#f49d25", mandalas: [1, 2, 3, 4, 6], description: "Hymns to Agni and ritual fire ceremonies" },
  { name: "Thunder & War", icon: Zap, color: "#ef4444", mandalas: [1, 2, 4, 7, 8], description: "Prayers to Indra, the king of gods" },
  { name: "Wind & Storm", icon: Wind, color: "#10b981", mandalas: [1, 5, 7], description: "Invocations to Maruts and Vayu" },
  { name: "Sacred Soma", icon: Droplet, color: "#8b5cf6", mandalas: [9], description: "Entire mandala devoted to Soma Pavamana" },
  { name: "Sun & Dawn", icon: Sun, color: "#fbbf24", mandalas: [3, 5, 7], description: "Hymns to Surya, Savitar, and Ushas" },
  { name: "Cosmic Order", icon: Moon, color: "#3b82f6", mandalas: [10], description: "Philosophical hymns on creation and existence" },
];

const radarChartConfig = {
  value: { label: "Coverage", color: "#f49d25" },
} satisfies ChartConfig;

const barChartConfig = {
  suktas: { label: "Suktas", color: "#f49d25" },
} satisfies ChartConfig;

export default function RigvedaPage() {
  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ["rigveda-stats"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "rv").single();
      if (!book) return [];
      const { data: sections, error: sectionsError } = await supabase.from("sections").select("id, section_number, name_english, name_hindi").eq("book_id", book.id).order("section_number", { ascending: true });
      if (sectionsError || !sections || sections.length === 0) return [];
      const stats = await Promise.all(
        sections.map(async (section: any) => {
          const { count, error: countError } = await supabase.from("chapters").select("*", { count: "exact", head: true }).eq("section_id", section.id);
          if (countError) return { name: `M.${section.section_number}`, suktas: 0, mandala: section.section_number };
          return { name: `M.${section.section_number}`, suktas: count || 0, mandala: section.section_number };
        })
      );
      return stats;
    },
  });

  const { data: chapterCounts } = useQuery({
    queryKey: ["rigveda-chapter-counts"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "rv").single();
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

  const barChartData = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];
    return chartData;
  }, [chartData]);

  const totalSuktas = useMemo(() => {
    if (chartData && chartData.length > 0) {
      return chartData.reduce((sum, item) => sum + item.suktas, 0);
    }
    return 1028;
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
          <h1 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-[#c65c39] dark:text-[#f49d25] hover:opacity-80 transition-opacity"><span className="font-sanskrit">ऋग्वेद</span></h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Rigveda</h2>
          <p className="text-lg text-muted-foreground mb-4 font-english">वेदानां सामवेदोऽस्मि - The Oldest Scripture of Humanity</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 font-english leading-relaxed">The Rigveda is the oldest of the four Vedas and among humanity's earliest religious texts. Composed between 1500-1200 BCE, it contains {totalSuktas.toLocaleString()} hymns (suktas) organized into 10 mandalas, dedicated to various deities including Agni, Indra, Varuna, and Soma.</p>
        </div>
        <section className="mb-16 animate-fade-up-delay-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"><Image src="/rigveda.png" alt="Rigveda" width={512} height={512} className="w-full h-auto object-cover" priority /></div>
            <Link href="/shlokas/rv-1-1-1" className="btn-primary inline-block font-english text-sm px-6 py-2">Begin Journey</Link>
          </div>
        </section>

        {/* Thematic Categories */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Thematic Overview</h2>
          <p className="text-sm text-muted-foreground mb-8 text-center font-english max-w-3xl mx-auto">The Rigveda covers six major themes centered around natural forces, deities, and cosmic principles.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {themeCategories.map((theme) => (
              <Card key={theme.name} className="bg-card border border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4 text-center">
                  <theme.icon className="w-8 h-8 mx-auto mb-2" style={{ color: theme.color }} />
                  <h3 className="font-medium text-foreground text-sm mb-1">{theme.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{theme.description}</p>
                  <p className="text-xs text-primary">Mandalas: {theme.mandalas.join(", ")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Content Analysis</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center font-english max-w-3xl mx-auto">The radar chart shows thematic coverage across different domains. The bar chart displays sukta distribution across all 10 mandalas.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Thematic Coverage</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Six domains of Vedic knowledge covered in the Rigveda.</p>
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
                <CardTitle className="text-xl font-english">Sukta Distribution</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Number of suktas (hymns) in each of the 10 mandalas.</p>
              </CardHeader>
              <CardContent className="flex-1 pb-4 pt-6 px-2 overflow-hidden">
                {isLoading ? (<div className="h-[280px] flex items-center justify-center"><p className="text-muted-foreground font-english">Loading chart...</p></div>) : error ? (<div className="h-[280px] flex items-center justify-center"><p className="text-destructive font-english">Error loading data</p></div>) : (
                  <ChartContainer config={barChartConfig} className="mx-auto h-[260px] w-full">
                    <BarChart data={barChartData} margin={{ top: 10, right: 15, bottom: 25, left: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 8, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} interval={0} angle={-45} textAnchor="end" height={40} />
                      <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} width={30} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Bar dataKey="suktas" fill="var(--color-suktas)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16 animate-fade-up-delay-3">
          <h2 className="text-3xl font-english text-foreground mb-12 text-center">The Ten Mandalas</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
            <div className="space-y-4 md:space-y-5">
              {mandalas.map((mandala, index) => {
                const isEven = index % 2 === 0;
                const actualSuktas = chapterCounts?.[mandala.id] || 0;
                return (
                  <div key={mandala.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mb-2 md:mb-0"></div>
                    <div className={`w-full md:w-[calc(50%-1.5rem)] ${isEven ? 'md:pr-6' : 'md:pl-6'}`}>
                      <Card className="feature-card">
                        <CardContent className="p-3">
                          <div className={`flex flex-col gap-1.5 ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                            <div>
                              <span className="text-xs font-medium text-primary mb-1 block">{mandala.theme}</span>
                              <h3 className="text-lg font-sanskrit text-foreground mb-0.5">{mandala.sanskrit}</h3>
                              <p className="text-sm font-english text-muted-foreground mb-0.5">{mandala.english}</p>
                            </div>
                            <p className="text-xs text-muted-foreground font-english leading-relaxed">{mandala.description}</p>
                            {actualSuktas > 0 && <p className="text-xs text-muted-foreground font-english">{actualSuktas} Suktas</p>}
                            <Link href={`/shlokas/${mandala.link}`} className="btn-primary inline-block font-english text-sm px-4 py-2 mt-1">Begin Mandala</Link>
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
