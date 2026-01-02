"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Pie, PieChart } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const prakaranas = [
  { id: 1, english: "Vairagya Prakarana", sanskrit: "वैराग्य प्रकरण", theme: "Dispassion", description: "The section on dispassion, describing Rama's existential crisis and his questioning of the nature of worldly existence.", keyEvents: ["Rama's Disillusion", "Questioning Reality", "Seeking Truth", "Approach to Vasishtha"], link: "yv-1-1-1" },
  { id: 2, english: "Mumukshu Prakarana", sanskrit: "मुमुक्षु प्रकरण", theme: "The Seeker", description: "The section on the seeker of liberation, outlining the qualities needed for spiritual inquiry and self-realization.", keyEvents: ["Qualifications of Seeker", "Four Prerequisites", "Mind Purification", "Path to Knowledge"], link: "yv-2-1-1" },
  { id: 3, english: "Utpatti Prakarana", sanskrit: "उत्पत्ति प्रकरण", theme: "Creation", description: "The section on creation, exploring the origin of the universe, consciousness, and the illusory nature of the world.", keyEvents: ["Origin of Creation", "Nature of Maya", "Stories of Creation", "Consciousness as Source"], link: "yv-3-1-1" },
  { id: 4, english: "Sthiti Prakarana", sanskrit: "स्थिति प्रकरण", theme: "Existence", description: "The section on existence and preservation, describing the maintenance of the apparent world and the nature of perception.", keyEvents: ["Nature of Existence", "Perception and Reality", "Mind's Role", "Sustaining Illusion"], link: "yv-4-1-1" },
  { id: 5, english: "Upashama Prakarana", sanskrit: "उपशम प्रकरण", theme: "Dissolution", description: "The section on dissolution and quietude, teaching methods to dissolve mental modifications and achieve inner peace.", keyEvents: ["Quieting the Mind", "Dissolution of Ego", "Inner Stillness", "Beyond Thoughts"], link: "yv-5-1-1" },
  { id: 6, english: "Nirvana Prakarana", sanskrit: "निर्वाण प्रकरण", theme: "Liberation", description: "The largest and final section on liberation, containing profound teachings on self-realization and the state of jivanmukti.", keyEvents: ["Ultimate Liberation", "Jivanmukti", "Brahman Realization", "Stories of the Liberated"], link: "yv-6-1-1" },
];

const narrativePhaseData = [
  { subject: "Intensity", VAIRAGYA: 85, MUMUKSHU: 72, UTPATTI: 78, STHITI: 68, UPASHAMA: 75, NIRVANA: 95, fullMark: 100 },
  { subject: "Philosophy", VAIRAGYA: 88, MUMUKSHU: 92, UTPATTI: 95, STHITI: 90, UPASHAMA: 88, NIRVANA: 98, fullMark: 100 },
  { subject: "Narrative", VAIRAGYA: 65, MUMUKSHU: 58, UTPATTI: 82, STHITI: 78, UPASHAMA: 72, NIRVANA: 88, fullMark: 100 },
  { subject: "Practical", VAIRAGYA: 75, MUMUKSHU: 95, UTPATTI: 62, STHITI: 68, UPASHAMA: 92, NIRVANA: 85, fullMark: 100 },
  { subject: "Depth", VAIRAGYA: 82, MUMUKSHU: 78, UTPATTI: 92, STHITI: 88, UPASHAMA: 85, NIRVANA: 98, fullMark: 100 },
];

const chartConfig = {
  VAIRAGYA: { label: "Vairagya", color: "#8b5cf6" },
  MUMUKSHU: { label: "Mumukshu", color: "#10b981" },
  UTPATTI: { label: "Utpatti", color: "#f49d25" },
  STHITI: { label: "Sthiti", color: "#3b82f6" },
  UPASHAMA: { label: "Upashama", color: "#ef4444" },
  NIRVANA: { label: "Nirvana", color: "#fbbf24" },
} satisfies ChartConfig;

const prakaranaColors = [
  "hsl(15, 75%, 32%)", "hsl(20, 70%, 52%)", "hsl(25, 55%, 42%)",
  "hsl(30, 80%, 48%)", "hsl(35, 85%, 58%)", "hsl(18, 60%, 38%)",
];

const pieChartConfig: ChartConfig = {
  shlokas: { label: "Shlokas" },
  ...prakaranas.reduce((acc, prakarana, idx) => {
    acc[`prakarana-${prakarana.id}`] = { label: prakarana.english, color: prakaranaColors[idx] || prakaranaColors[0] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>),
} satisfies ChartConfig;

export default function YogaVasishthaPage() {
  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ["yoga-vasishtha-stats"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "yv").single();
      if (!book) return [];
      const { data: sections, error: sectionsError } = await supabase.from("sections").select("id, section_number, name_english, name_hindi").eq("book_id", book.id).order("section_number", { ascending: true });
      if (sectionsError || !sections || sections.length === 0) return [];
      const stats = await Promise.all(
        sections.map(async (section: any) => {
          const { data: chapters, error: chaptersError } = await supabase.from("chapters").select("id").eq("section_id", section.id);
          if (chaptersError || !chapters || chapters.length === 0) return { name: section.name_english, shlokas: 0 };
          const { count, error: countError } = await supabase.from("shlokas").select("*", { count: "exact", head: true }).in("chapter_id", chapters.map((c) => c.id));
          if (countError) return { name: section.name_english, shlokas: 0 };
          return { name: section.name_english, shlokas: count || 0 };
        })
      );
      return stats;
    },
  });

  const { data: chapterCounts } = useQuery({
    queryKey: ["yoga-vasishtha-chapter-counts"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "yv").single();
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
    return chartData.map((item, idx) => {
      const prakarana = prakaranas.find(p => p.english === item.name);
      const prakaranaId = prakarana?.id || idx + 1;
      const color = prakaranaColors[prakaranaId - 1] || prakaranaColors[0];
      return { prakarana: `prakarana-${prakaranaId}`, shlokas: item.shlokas, fill: color };
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
          <h1 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-[#c65c39] dark:text-[#f49d25] hover:opacity-80 transition-opacity"><span className="font-sanskrit">योग वासिष्ठ</span></h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Yoga Vasishtha</h2>
          <p className="text-lg text-muted-foreground mb-4 font-english">महारामायण - The Great Ramayana of Advaita</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 font-english leading-relaxed">Yoga Vasishtha is a profound philosophical text attributed to Sage Valmiki. Containing over 32,000 verses, it presents a dialogue between young Prince Rama and Sage Vasishtha on the nature of consciousness, reality, and liberation through Advaita Vedanta.</p>
        </div>
        <section className="mb-16 animate-fade-up-delay-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"><img src="/yoga%20vasistha.png" alt="Yoga Vasishtha" className="w-full h-auto object-cover" /></div>
            <Link href="/shlokas/yv-1-1-1" className="btn-primary inline-block font-english text-sm px-6 py-2">Begin Journey</Link>
          </div>
        </section>
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Prakarana Analysis & Shloka Distribution</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center font-english max-w-3xl mx-auto">The radar chart visualizes the six Prakaranas of Yoga Vasishtha across five key dimensions. The pie chart shows the distribution of shlokas across all sections.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Prakarana Analysis</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Six Prakaranas across five dimensions: Intensity, Philosophy, Narrative, Practical, and Depth.</p>
              </CardHeader>
              <CardContent className="pb-0 pt-6 px-4">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
                  <RadarChart data={narrativePhaseData} margin={{ top: 30, right: 40, bottom: 30, left: 40 }}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: 'hsl(var(--foreground))', fontWeight: 500 }} />
                    <PolarGrid radialLines={false} />
                    <Radar dataKey="VAIRAGYA" fill="var(--color-VAIRAGYA)" fillOpacity={0} stroke="var(--color-VAIRAGYA)" strokeWidth={2} />
                    <Radar dataKey="MUMUKSHU" fill="var(--color-MUMUKSHU)" fillOpacity={0} stroke="var(--color-MUMUKSHU)" strokeWidth={2} />
                    <Radar dataKey="UTPATTI" fill="var(--color-UTPATTI)" fillOpacity={0} stroke="var(--color-UTPATTI)" strokeWidth={2} />
                    <Radar dataKey="STHITI" fill="var(--color-STHITI)" fillOpacity={0} stroke="var(--color-STHITI)" strokeWidth={2} />
                    <Radar dataKey="UPASHAMA" fill="var(--color-UPASHAMA)" fillOpacity={0} stroke="var(--color-UPASHAMA)" strokeWidth={2} />
                    <Radar dataKey="NIRVANA" fill="var(--color-NIRVANA)" fillOpacity={0} stroke="var(--color-NIRVANA)" strokeWidth={2} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Shloka Distribution</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Distribution of shlokas across the six Prakaranas. Larger slices indicate more verses.</p>
              </CardHeader>
              <CardContent className="flex-1 pb-0 pt-6">
                {isLoading ? (<div className="h-[300px] flex items-center justify-center"><p className="text-muted-foreground font-english">Loading chart...</p></div>) : error ? (<div className="h-[300px] flex items-center justify-center"><p className="text-destructive font-english">Error loading data</p></div>) : pieChartData && pieChartData.length > 0 ? (
                  <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <PieChart>
                      <ChartTooltip cursor={false} content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0];
                          const nameStr = String(data.name || '');
                          const prakaranaId = nameStr.replace('prakarana-', '');
                          const prakarana = prakaranas.find(p => p.id === parseInt(prakaranaId));
                          const prakaranaName = prakarana?.english || nameStr || 'Unknown';
                          const shlokas = data.value || 0;
                          return (<div className="rounded-lg border bg-background p-2 shadow-sm"><div className="grid gap-2"><div className="flex items-center gap-2"><span className="text-sm font-medium text-foreground">{prakaranaName} : {shlokas}</span></div></div></div>);
                        }
                        return null;
                      }} />
                      <Pie data={pieChartData} dataKey="shlokas" nameKey="prakarana" />
                    </PieChart>
                  </ChartContainer>
                ) : (<div className="h-[300px] flex items-center justify-center"><p className="text-muted-foreground font-english">No data available</p></div>)}
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mb-16 animate-fade-up-delay-3">
          <h2 className="text-3xl font-english text-foreground mb-12 text-center">The Six Prakaranas</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
            <div className="space-y-4 md:space-y-5">
              {prakaranas.map((prakarana, index) => {
                const isEven = index % 2 === 0;
                const actualChapters = chapterCounts?.[prakarana.id] || 0;
                return (
                  <div key={prakarana.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mb-2 md:mb-0"></div>
                    <div className={`w-full md:w-[calc(50%-1.5rem)] ${isEven ? 'md:pr-6' : 'md:pl-6'}`}>
                      <Card className="feature-card">
                        <CardContent className="p-3">
                          <div className={`flex flex-col gap-1.5 ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                            <div>
                              <h3 className="text-lg font-sanskrit text-foreground mb-0.5">{prakarana.sanskrit}</h3>
                              <p className="text-sm font-english text-muted-foreground mb-0.5">{prakarana.english}</p>
                            </div>
                            <p className="text-xs text-muted-foreground font-english leading-relaxed">{prakarana.description}</p>
                            {actualChapters > 0 && <p className="text-xs text-muted-foreground font-english">{actualChapters} Sargas</p>}
                            <Link href={`/shlokas/${prakarana.link}`} className="btn-primary inline-block font-english text-sm px-4 py-2 mt-1">Begin Prakarana</Link>
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
