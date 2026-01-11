"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Flame, Shield, Sword, Crown, Heart, Sparkles } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Pie, PieChart } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const charitas = [
  { id: 1, english: "Prathama Charita", sanskrit: "प्रथम चरित", theme: "Madhu-Kaitabha Vadha", description: "The first episode describing Mahakali's manifestation from Vishnu's yoga-nidra and the slaying of demons Madhu and Kaitabha.", verses: 87, deities: ["Mahakali", "Vishnu", "Brahma"], link: "dm-1-1-1" },
  { id: 2, english: "Madhyama Charita", sanskrit: "मध्यम चरित", theme: "Mahishasura Mardini", description: "The middle episode narrating the birth of Durga from the combined energies of the gods and her destruction of buffalo demon Mahishasura.", verses: 231, deities: ["Mahalakshmi", "Durga", "Mahishasura"], link: "dm-1-2-1" },
  { id: 3, english: "Uttama Charita", sanskrit: "उत्तम चरित", theme: "Shumbha-Nishumbha Vadha", description: "The final and longest episode depicting Mahasaraswati's battle against demons Shumbha and Nishumbha, featuring Kali and the Matrikas.", verses: 382, deities: ["Mahasaraswati", "Kali", "Chamunda"], link: "dm-1-3-1" },
];

const themeCategories = [
  { name: "Shakti Worship", icon: Flame, color: "#ef4444", chapters: [1, 2, 3], description: "Divine feminine power as supreme reality" },
  { name: "Protection", icon: Shield, color: "#3b82f6", chapters: [1, 2, 3], description: "The Goddess as protector of devotees" },
  { name: "Victory over Evil", icon: Sword, color: "#f49d25", chapters: [1, 2, 3], description: "Triumph of good over demonic forces" },
  { name: "Divine Forms", icon: Crown, color: "#8b5cf6", chapters: [1, 2, 3], description: "Mahakali, Mahalakshmi, Mahasaraswati" },
  { name: "Devotion", icon: Heart, color: "#ec4899", chapters: [1, 2, 3], description: "Surrender and worship of the Divine Mother" },
  { name: "Blessings", icon: Sparkles, color: "#10b981", chapters: [3], description: "Boons granted to sincere devotees" },
];

const narrativePhaseData = [
  { subject: "Power", PRATHAMA: 85, MADHYAMA: 95, UTTAMA: 98, fullMark: 100 },
  { subject: "Devotion", PRATHAMA: 78, MADHYAMA: 88, UTTAMA: 92, fullMark: 100 },
  { subject: "Narrative", PRATHAMA: 72, MADHYAMA: 95, UTTAMA: 98, fullMark: 100 },
  { subject: "Philosophy", PRATHAMA: 82, MADHYAMA: 75, UTTAMA: 85, fullMark: 100 },
  { subject: "Ritual", PRATHAMA: 70, MADHYAMA: 80, UTTAMA: 95, fullMark: 100 },
];

const chartConfig = {
  PRATHAMA: { label: "Prathama", color: "#8b5cf6" },
  MADHYAMA: { label: "Madhyama", color: "#ef4444" },
  UTTAMA: { label: "Uttama", color: "#f49d25" },
} satisfies ChartConfig;

const charitaColors = ["hsl(15, 75%, 40%)", "hsl(0, 70%, 50%)", "hsl(35, 85%, 50%)"];

const pieChartConfig: ChartConfig = {
  verses: { label: "Verses" },
  ...charitas.reduce((acc, charita, idx) => {
    acc[`charita-${charita.id}`] = { label: charita.english, color: charitaColors[idx] || charitaColors[0] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>),
} satisfies ChartConfig;

export default function DeviMahatmyamPage() {
  const { data: verseData, isLoading, error } = useQuery({
    queryKey: ["devi-mahatmyam-stats"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "dm").single();
      if (!book) return [];
      const { data: chapters } = await supabase.from("chapters").select("id, chapter_number, name_english").eq("book_id", book.id).order("chapter_number", { ascending: true });
      if (!chapters) return [];
      const stats = await Promise.all(
        chapters.map(async (chapter: any) => {
          const { count } = await supabase.from("shlokas").select("*", { count: "exact", head: true }).eq("chapter_id", chapter.id);
          return { name: chapter.name_english, verses: count || 0, chapter: chapter.chapter_number };
        })
      );
      return stats;
    },
  });

  const pieChartData = useMemo(() => {
    if (verseData && verseData.length > 0) {
      return verseData.map((item, idx) => ({
        charita: `charita-${item.chapter}`,
        verses: item.verses,
        fill: charitaColors[idx] || charitaColors[0],
      }));
    }
    return charitas.map((c, idx) => ({
      charita: `charita-${c.id}`,
      verses: c.verses,
      fill: charitaColors[idx] || charitaColors[0],
    }));
  }, [verseData]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="glow-ambient animate-pulse-slow" />
      <Header />
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32">
        <Link href="/contents" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 animate-fade-up">
          <ArrowLeft className="w-4 h-4" />Return
        </Link>
        <div className="text-center mb-12 animate-fade-up-delay-1">
          <h1 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-[#c65c39] dark:text-[#f49d25] hover:opacity-80 transition-opacity"><span className="font-sanskrit">देवी माहात्म्यम्</span></h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Devi Mahatmyam</h2>
          <p className="text-lg text-muted-foreground mb-4 font-english">दुर्गा सप्तशती - The Glory of the Divine Mother</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 font-english leading-relaxed">The Devi Mahatmyam (Durga Saptashati) is a 700-verse hymn to the Divine Mother, part of the Markandeya Purana. It describes the goddess Durga's battles against demons and is the primary text of Shaktism, recited during Navaratri.</p>
        </div>
        <section className="mb-16 animate-fade-up-delay-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"><Image src="/devi.png" alt="Devi Mahatmyam" width={512} height={512} className="w-full h-auto object-cover" priority /></div>
            <Link href="/shlokas/dm-1-1-1" className="btn-primary inline-block font-english text-sm px-6 py-2">Begin Journey</Link>
          </div>
        </section>

        {/* Thematic Categories */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Sacred Themes</h2>
          <p className="text-sm text-muted-foreground mb-8 text-center font-english max-w-3xl mx-auto">The Devi Mahatmyam embodies the essence of Shakti worship through six fundamental aspects.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {themeCategories.map((theme) => (
              <Card key={theme.name} className="bg-card border border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4 text-center">
                  <theme.icon className="w-8 h-8 mx-auto mb-2" style={{ color: theme.color }} />
                  <h3 className="font-medium text-foreground text-sm mb-1">{theme.name}</h3>
                  <p className="text-xs text-muted-foreground">{theme.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Charita Analysis & Verse Distribution</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center font-english max-w-3xl mx-auto">The radar chart shows the three Charitas across five dimensions. The pie chart displays verse distribution.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Charita Analysis</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Three episodes: Power, Devotion, Narrative, Philosophy, Ritual.</p>
              </CardHeader>
              <CardContent className="pb-4 pt-6 px-2">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px] w-full">
                  <RadarChart data={narrativePhaseData} margin={{ top: 35, right: 50, bottom: 35, left: 50 }}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'hsl(var(--foreground))', fontWeight: 500 }} />
                    <PolarGrid radialLines={false} />
                    <Radar dataKey="PRATHAMA" fill="var(--color-PRATHAMA)" fillOpacity={0} stroke="var(--color-PRATHAMA)" strokeWidth={2} />
                    <Radar dataKey="MADHYAMA" fill="var(--color-MADHYAMA)" fillOpacity={0} stroke="var(--color-MADHYAMA)" strokeWidth={2} />
                    <Radar dataKey="UTTAMA" fill="var(--color-UTTAMA)" fillOpacity={0} stroke="var(--color-UTTAMA)" strokeWidth={2} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Verse Distribution</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Distribution of 700 verses across three Charitas.</p>
              </CardHeader>
              <CardContent className="flex-1 pb-4 pt-6">
                {isLoading ? (<div className="h-[280px] flex items-center justify-center"><p className="text-muted-foreground font-english">Loading...</p></div>) : error ? (<div className="h-[280px] flex items-center justify-center"><p className="text-destructive font-english">Error</p></div>) : (
                  <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[280px]">
                    <PieChart>
                      <ChartTooltip cursor={false} content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0];
                          const nameStr = String(data.name || '');
                          const id = nameStr.replace('charita-', '');
                          const charita = charitas.find(c => c.id === parseInt(id));
                          return (<div className="rounded-lg border bg-background p-2 shadow-sm"><span className="text-sm font-medium text-foreground">{charita?.english || 'Unknown'} : {data.value} Verses</span></div>);
                        }
                        return null;
                      }} />
                      <Pie data={pieChartData} dataKey="verses" nameKey="charita" />
                    </PieChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16 animate-fade-up-delay-3">
          <h2 className="text-3xl font-english text-foreground mb-12 text-center">The Three Charitas</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
            <div className="space-y-4 md:space-y-5">
              {charitas.map((charita, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={charita.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mb-2 md:mb-0"></div>
                    <div className={`w-full md:w-[calc(50%-1.5rem)] ${isEven ? 'md:pr-6' : 'md:pl-6'}`}>
                      <Card className="feature-card">
                        <CardContent className="p-3">
                          <div className={`flex flex-col gap-1.5 ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                            <span className="text-xs font-medium text-primary mb-1 block">{charita.theme}</span>
                            <h3 className="text-lg font-sanskrit text-foreground mb-0.5">{charita.sanskrit}</h3>
                            <p className="text-sm font-english text-muted-foreground mb-0.5">{charita.english}</p>
                            <p className="text-xs text-muted-foreground font-english leading-relaxed">{charita.description}</p>
                            <p className="text-xs text-muted-foreground font-english">{charita.verses} Verses</p>
                            <Link href={`/shlokas/${charita.link}`} className="btn-primary inline-block font-english text-sm px-4 py-2 mt-1">Begin Charita</Link>
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
