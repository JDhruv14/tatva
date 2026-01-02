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

const kandas = [
  { id: 1, english: "Bala Kanda", sanskrit: "बालकाण्ड", theme: "Dawn of Dharma", description: "The childhood section narrating the birth of Rama, his early life, marriage to Sita, and the breaking of Shiva's bow.", keyEvents: ["Birth of Rama", "Vishvamitra's Visit", "Breaking Shiva's Bow", "Marriage to Sita"], link: "rm-1-1-1" },
  { id: 2, english: "Ayodhya Kanda", sanskrit: "अयोध्याकाण्ड", theme: "Sacrifice & Duty", description: "The Ayodhya section covering Rama's exile, Dasharatha's death, and Bharata's exemplary devotion.", keyEvents: ["Rama's Exile", "Dasharatha's Death", "Bharata's Devotion", "Chitrakuta"], link: "rm-2-1-1" },
  { id: 3, english: "Aranya Kanda", sanskrit: "अरण्यकाण्ड", theme: "Trials in Exile", description: "The forest section describing life in exile, encounters with sages, and Sita's abduction by Ravana.", keyEvents: ["Forest Life", "Surpanakha Episode", "Sita's Abduction", "Jatayu's Sacrifice"], link: "rm-3-1-1" },
  { id: 4, english: "Kishkindha Kanda", sanskrit: "किष्किन्धाकाण्ड", theme: "Divine Alliance", description: "The Kishkindha section featuring Rama's alliance with Sugriva and Hanuman, and the search for Sita.", keyEvents: ["Meeting Hanuman", "Alliance with Sugriva", "Vali's Death", "Search for Sita"], link: "rm-4-1-1" },
  { id: 5, english: "Sundara Kanda", sanskrit: "सुन्दरकाण्ड", theme: "Heroic Devotion", description: "The beautiful section dedicated to Hanuman's heroic journey to Lanka and meeting with Sita.", keyEvents: ["Hanuman's Leap", "Meeting Sita", "Lanka Darshan", "Burning Lanka"], link: "rm-5-1-1" },
  { id: 6, english: "Yuddha Kanda", sanskrit: "युद्धकाण्ड", theme: "Victory of Good", description: "The war section narrating the great battle in Lanka, Ravana's defeat, and Sita's rescue.", keyEvents: ["Battle of Lanka", "Ravana's Death", "Sita's Rescue", "Return to Ayodhya"], link: "rm-6-1-1" },
  { id: 7, english: "Uttara Kanda", sanskrit: "उत्तरकाण्ड", theme: "Eternal Glory", description: "The final section covering Rama's reign, later events, and the ultimate journey to Vaikuntha.", keyEvents: ["Rama Rajya", "Sita's Trial", "Final Journey", "Return to Vishnu"], link: "rm-7-1-1" },
];

const narrativePhaseData = [
  { subject: "Intensity", BALA: 58, AYODHYA: 85, ARANYA: 88, KISHKINDHA: 72, SUNDARA: 92, YUDDHA: 98, UTTARA: 62, fullMark: 100 },
  { subject: "Combat", BALA: 45, AYODHYA: 15, ARANYA: 48, KISHKINDHA: 65, SUNDARA: 75, YUDDHA: 98, UTTARA: 25, fullMark: 100 },
  { subject: "Philosophy", BALA: 72, AYODHYA: 92, ARANYA: 78, KISHKINDHA: 55, SUNDARA: 68, YUDDHA: 65, UTTARA: 88, fullMark: 100 },
  { subject: "Emotion", BALA: 75, AYODHYA: 98, ARANYA: 92, KISHKINDHA: 78, SUNDARA: 95, YUDDHA: 85, UTTARA: 90, fullMark: 100 },
  { subject: "Character", BALA: 88, AYODHYA: 95, ARANYA: 82, KISHKINDHA: 78, SUNDARA: 92, YUDDHA: 88, UTTARA: 75, fullMark: 100 },
];

const chartConfig = {
  BALA: { label: "Bala", color: "#f49d25" },
  AYODHYA: { label: "Ayodhya", color: "#c65c39" },
  ARANYA: { label: "Aranya", color: "#10b981" },
  KISHKINDHA: { label: "Kishkindha", color: "#8b5cf6" },
  SUNDARA: { label: "Sundara", color: "#ef4444" },
  YUDDHA: { label: "Yuddha", color: "#3b82f6" },
  UTTARA: { label: "Uttara", color: "#fbbf24" },
} satisfies ChartConfig;

const kandaColors = [
  "hsl(15, 75%, 32%)", "hsl(20, 70%, 52%)", "hsl(25, 55%, 42%)",
  "hsl(30, 80%, 48%)", "hsl(35, 85%, 58%)", "hsl(18, 60%, 38%)",
  "hsl(28, 70%, 55%)",
];

const pieChartConfig: ChartConfig = {
  shlokas: { label: "Shlokas" },
  ...kandas.reduce((acc, kanda, idx) => {
    acc[`kanda-${kanda.id}`] = { label: kanda.english, color: kandaColors[idx] || kandaColors[0] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>),
} satisfies ChartConfig;

export default function RamayanaPage() {
  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ["ramayana-stats"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "rm").single();
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

  const { data: sargaCounts } = useQuery({
    queryKey: ["ramayana-sarga-counts"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "rm").single();
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
      const kanda = kandas.find(k => k.english === item.name);
      const kandaId = kanda?.id || idx + 1;
      const color = kandaColors[kandaId - 1] || kandaColors[0];
      return { kanda: `kanda-${kandaId}`, shlokas: item.shlokas, fill: color };
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
          <h1 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-[#c65c39] dark:text-[#f49d25] hover:opacity-80 transition-opacity"><span className="font-sanskrit">रामायण</span></h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Ramayana</h2>
          <p className="text-lg text-muted-foreground mb-4 font-english">आदिकाव्य - The First Poetry</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 font-english leading-relaxed">Composed by Maharshi Valmiki, the Ramayana is the eternal story of love, duty, sacrifice, and the triumph of good over evil. Through 24,000 verses, it presents the ideal of human conduct and divine grace.</p>
        </div>
        <section className="mb-16 animate-fade-up-delay-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"><img src="/ramayana.png" alt="Ramayana" className="w-full h-auto object-cover" /></div>
            <Link href="/shlokas/rm-1-1-1" className="btn-primary inline-block font-english text-sm px-6 py-2">Begin Journey</Link>
          </div>
        </section>
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Narrative Structure & Shloka Distribution</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center font-english max-w-3xl mx-auto">The radar chart visualizes the seven Kandas of the Ramayana across five key dimensions. The pie chart shows the distribution of shlokas across the seven Kandas.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Kanda Analysis</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Seven Kandas across five dimensions: Intensity, Combat, Philosophy, Emotion, and Character.</p>
              </CardHeader>
              <CardContent className="pb-0 pt-6 px-4">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
                  <RadarChart data={narrativePhaseData} margin={{ top: 30, right: 40, bottom: 30, left: 40 }}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: 'hsl(var(--foreground))', fontWeight: 500 }} />
                    <PolarGrid radialLines={false} />
                    <Radar dataKey="BALA" fill="var(--color-BALA)" fillOpacity={0} stroke="var(--color-BALA)" strokeWidth={2} />
                    <Radar dataKey="AYODHYA" fill="var(--color-AYODHYA)" fillOpacity={0} stroke="var(--color-AYODHYA)" strokeWidth={2} />
                    <Radar dataKey="ARANYA" fill="var(--color-ARANYA)" fillOpacity={0} stroke="var(--color-ARANYA)" strokeWidth={2} />
                    <Radar dataKey="KISHKINDHA" fill="var(--color-KISHKINDHA)" fillOpacity={0} stroke="var(--color-KISHKINDHA)" strokeWidth={2} />
                    <Radar dataKey="SUNDARA" fill="var(--color-SUNDARA)" fillOpacity={0} stroke="var(--color-SUNDARA)" strokeWidth={2} />
                    <Radar dataKey="YUDDHA" fill="var(--color-YUDDHA)" fillOpacity={0} stroke="var(--color-YUDDHA)" strokeWidth={2} />
                    <Radar dataKey="UTTARA" fill="var(--color-UTTARA)" fillOpacity={0} stroke="var(--color-UTTARA)" strokeWidth={2} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Shloka Distribution</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Distribution of shlokas across the seven Kandas. Larger slices indicate more verses.</p>
              </CardHeader>
              <CardContent className="flex-1 pb-0 pt-6">
                {isLoading ? (<div className="h-[300px] flex items-center justify-center"><p className="text-muted-foreground font-english">Loading chart...</p></div>) : error ? (<div className="h-[300px] flex items-center justify-center"><p className="text-destructive font-english">Error loading data</p></div>) : pieChartData && pieChartData.length > 0 ? (
                  <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <PieChart>
                      <ChartTooltip cursor={false} content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0];
                          const nameStr = String(data.name || '');
                          const kandaId = nameStr.replace('kanda-', '');
                          const kanda = kandas.find(k => k.id === parseInt(kandaId));
                          const kandaName = kanda?.english || nameStr || 'Unknown';
                          const shlokas = data.value || 0;
                          return (<div className="rounded-lg border bg-background p-2 shadow-sm"><div className="grid gap-2"><div className="flex items-center gap-2"><span className="text-sm font-medium text-foreground">{kandaName} : {shlokas}</span></div></div></div>);
                        }
                        return null;
                      }} />
                      <Pie data={pieChartData} dataKey="shlokas" nameKey="kanda" />
                    </PieChart>
                  </ChartContainer>
                ) : (<div className="h-[300px] flex items-center justify-center"><p className="text-muted-foreground font-english">No data available</p></div>)}
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mb-16 animate-fade-up-delay-3">
          <h2 className="text-3xl font-english text-foreground mb-12 text-center">The Seven Kandas</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
            <div className="space-y-4 md:space-y-5">
              {kandas.map((kanda, index) => {
                const isEven = index % 2 === 0;
                const actualSargas = sargaCounts?.[kanda.id] || 0;
                return (
                  <div key={kanda.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mb-2 md:mb-0"></div>
                    <div className={`w-full md:w-[calc(50%-1.5rem)] ${isEven ? 'md:pr-6' : 'md:pl-6'}`}>
                      <Card className="feature-card">
                        <CardContent className="p-3">
                          <div className={`flex flex-col gap-1.5 ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                            <div>
                              <h3 className="text-lg font-sanskrit text-foreground mb-0.5">{kanda.sanskrit}</h3>
                              <p className="text-sm font-english text-muted-foreground mb-0.5">{kanda.english}</p>
                            </div>
                            <p className="text-xs text-muted-foreground font-english leading-relaxed">{kanda.description}</p>
                            {actualSargas > 0 && <p className="text-xs text-muted-foreground font-english">{actualSargas} Sargas</p>}
                            <Link href={`/shlokas/${kanda.link}`} className="btn-primary inline-block font-english text-sm px-4 py-2 mt-1">Begin Kanda</Link>
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
