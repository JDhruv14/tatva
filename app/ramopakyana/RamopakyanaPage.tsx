"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, Swords, Heart, Crown, Shield, Sparkles } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Pie, PieChart } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const sections = [
  { id: 1, english: "Birth & Childhood", sanskrit: "जन्म बाल्य", theme: "Divine Advent", description: "The divine birth of Rama, his education under Vishvamitra, and the breaking of Shiva's bow to win Sita.", link: "ro-1-1-1" },
  { id: 2, english: "Exile & Forest", sanskrit: "वनवास", theme: "Dharmic Test", description: "Rama's exile to the forest for fourteen years, accompanied by Sita and Lakshmana.", link: "ro-1-2-1" },
  { id: 3, english: "Sita's Abduction", sanskrit: "सीताहरण", theme: "Crisis", description: "The golden deer, Ravana's deception, and Sita's abduction to Lanka.", link: "ro-1-3-1" },
  { id: 4, english: "Alliance & Search", sanskrit: "मित्रता", theme: "Building Forces", description: "Rama's alliance with Sugriva and Hanuman, the search for Sita across the land.", link: "ro-1-4-1" },
  { id: 5, english: "Lanka War", sanskrit: "लंका युद्ध", theme: "Dharma Yuddha", description: "The great battle at Lanka, the defeat of Ravana, and the rescue of Sita.", link: "ro-1-5-1" },
  { id: 6, english: "Return & Coronation", sanskrit: "राज्याभिषेक", theme: "Victory", description: "The triumphant return to Ayodhya and Rama's coronation as the ideal king.", link: "ro-1-6-1" },
];

const themeCategories = [
  { name: "Dharma", icon: BookOpen, color: "#f49d25", description: "Righteous duty and moral conduct" },
  { name: "Valor", icon: Swords, color: "#ef4444", description: "Courage and martial prowess" },
  { name: "Devotion", icon: Heart, color: "#ec4899", description: "Love, loyalty, and sacrifice" },
  { name: "Kingship", icon: Crown, color: "#8b5cf6", description: "Ideal rulership and governance" },
  { name: "Protection", icon: Shield, color: "#3b82f6", description: "Safeguarding the innocent" },
  { name: "Divine Grace", icon: Sparkles, color: "#10b981", description: "Divine intervention and blessings" },
];

const narrativePhaseData = [
  { subject: "Drama", BIRTH: 72, EXILE: 88, ABDUCTION: 95, ALLIANCE: 78, WAR: 98, RETURN: 85, fullMark: 100 },
  { subject: "Action", BIRTH: 65, EXILE: 55, ABDUCTION: 72, ALLIANCE: 78, WAR: 100, RETURN: 45, fullMark: 100 },
  { subject: "Emotion", BIRTH: 82, EXILE: 95, ABDUCTION: 98, ALLIANCE: 75, WAR: 88, RETURN: 92, fullMark: 100 },
  { subject: "Philosophy", BIRTH: 78, EXILE: 92, ABDUCTION: 70, ALLIANCE: 68, WAR: 75, RETURN: 88, fullMark: 100 },
  { subject: "Heroism", BIRTH: 70, EXILE: 75, ABDUCTION: 65, ALLIANCE: 85, WAR: 100, RETURN: 78, fullMark: 100 },
];

const chartConfig = {
  BIRTH: { label: "Birth", color: "#f49d25" },
  EXILE: { label: "Exile", color: "#10b981" },
  ABDUCTION: { label: "Abduction", color: "#ef4444" },
  ALLIANCE: { label: "Alliance", color: "#8b5cf6" },
  WAR: { label: "War", color: "#3b82f6" },
  RETURN: { label: "Return", color: "#fbbf24" },
} satisfies ChartConfig;

const sectionColors = ["hsl(35, 85%, 45%)", "hsl(140, 60%, 40%)", "hsl(0, 70%, 50%)", "hsl(270, 60%, 55%)", "hsl(210, 70%, 50%)", "hsl(45, 90%, 50%)"];

const pieChartConfig: ChartConfig = {
  verses: { label: "Verses" },
  ...sections.reduce((acc, section, idx) => {
    acc[`section-${section.id}`] = { label: section.english, color: sectionColors[idx] || sectionColors[0] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>),
} satisfies ChartConfig;

export default function RamopakyanaPage() {
  const { data: verseData, isLoading, error } = useQuery({
    queryKey: ["ramopakyana-stats"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "ro").single();
      if (!book) return [];
      const { data: chapters } = await supabase.from("chapters").select("id, chapter_number, name_english").eq("book_id", book.id).order("chapter_number", { ascending: true });
      if (!chapters) return [];
      const stats = await Promise.all(
        chapters.map(async (chapter: any) => {
          const { count } = await supabase.from("shlokas").select("*", { count: "exact", head: true }).eq("chapter_id", chapter.id);
          return { name: chapter.name_english, verses: count || 0, section: chapter.chapter_number };
        })
      );
      return stats;
    },
  });

  const pieChartData = useMemo(() => {
    if (verseData && verseData.length > 0) {
      return verseData.map((item, idx) => ({
        section: `section-${item.section}`,
        verses: item.verses,
        fill: sectionColors[idx] || sectionColors[0],
      }));
    }
    // Default data
    return sections.map((s, idx) => ({
      section: `section-${s.id}`,
      verses: 150 + idx * 30,
      fill: sectionColors[idx] || sectionColors[0],
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
          <h1 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-[#c65c39] dark:text-[#f49d25] hover:opacity-80 transition-opacity"><span className="font-sanskrit">रामोपाख्यान</span></h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Ramopakhyana</h2>
          <p className="text-lg text-muted-foreground mb-4 font-english">महाभारते रामकथा - The Rama Story in Mahabharata</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 font-english leading-relaxed">The Ramopakhyana is the story of Lord Rama as narrated within the Mahabharata (Vana Parva). It presents a condensed yet powerful version of the Ramayana, told by Sage Markandeya to the Pandavas during their exile, emphasizing dharma and the triumph of good.</p>
        </div>
        <section className="mb-16 animate-fade-up-delay-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"><img src="/Rāmopākhyāna.png" alt="Ramopakyana" className="w-full h-auto object-cover" /></div>
            <Link href="/shlokas/ro-1-1-1" className="btn-primary inline-block font-english text-sm px-6 py-2">Begin Journey</Link>
          </div>
        </section>

        {/* Thematic Categories */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Core Themes</h2>
          <p className="text-sm text-muted-foreground mb-8 text-center font-english max-w-3xl mx-auto">The eternal values enshrined in the Rama narrative.</p>
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
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Narrative Analysis</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center font-english max-w-3xl mx-auto">The radar chart shows narrative phases across five dimensions. The pie chart displays verse distribution.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Phase Analysis</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Six phases: Drama, Action, Emotion, Philosophy, Heroism.</p>
              </CardHeader>
              <CardContent className="pb-4 pt-6 px-2">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px] w-full">
                  <RadarChart data={narrativePhaseData} margin={{ top: 35, right: 50, bottom: 35, left: 50 }}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'hsl(var(--foreground))', fontWeight: 500 }} />
                    <PolarGrid radialLines={false} />
                    <Radar dataKey="BIRTH" fill="var(--color-BIRTH)" fillOpacity={0} stroke="var(--color-BIRTH)" strokeWidth={2} />
                    <Radar dataKey="EXILE" fill="var(--color-EXILE)" fillOpacity={0} stroke="var(--color-EXILE)" strokeWidth={2} />
                    <Radar dataKey="WAR" fill="var(--color-WAR)" fillOpacity={0} stroke="var(--color-WAR)" strokeWidth={2} />
                    <Radar dataKey="RETURN" fill="var(--color-RETURN)" fillOpacity={0} stroke="var(--color-RETURN)" strokeWidth={2} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Verse Distribution</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Distribution across the six narrative sections.</p>
              </CardHeader>
              <CardContent className="flex-1 pb-4 pt-6">
                {isLoading ? (<div className="h-[280px] flex items-center justify-center"><p className="text-muted-foreground font-english">Loading...</p></div>) : error ? (<div className="h-[280px] flex items-center justify-center"><p className="text-destructive font-english">Error</p></div>) : (
                  <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[280px]">
                    <PieChart>
                      <ChartTooltip cursor={false} content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0];
                          const nameStr = String(data.name || '');
                          const id = nameStr.replace('section-', '');
                          const section = sections.find(s => s.id === parseInt(id));
                          return (<div className="rounded-lg border bg-background p-2 shadow-sm"><span className="text-sm font-medium text-foreground">{section?.english || 'Unknown'} : {data.value} Verses</span></div>);
                        }
                        return null;
                      }} />
                      <Pie data={pieChartData} dataKey="verses" nameKey="section" />
                    </PieChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sections Timeline */}
        <section className="mb-16 animate-fade-up-delay-3">
          <h2 className="text-3xl font-english text-foreground mb-12 text-center">The Six Episodes</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
            <div className="space-y-4 md:space-y-5">
              {sections.map((section, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={section.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mb-2 md:mb-0"></div>
                    <div className={`w-full md:w-[calc(50%-1.5rem)] ${isEven ? 'md:pr-6' : 'md:pl-6'}`}>
                      <Card className="feature-card">
                        <CardContent className="p-3">
                          <div className={`flex flex-col gap-1.5 ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                            <span className="text-xs font-medium text-primary mb-1 block">{section.theme}</span>
                            <h3 className="text-lg font-sanskrit text-foreground mb-0.5">{section.sanskrit}</h3>
                            <p className="text-sm font-english text-muted-foreground mb-0.5">{section.english}</p>
                            <p className="text-xs text-muted-foreground font-english leading-relaxed">{section.description}</p>
                            <Link href={`/shlokas/${section.link}`} className="btn-primary inline-block font-english text-sm px-4 py-2 mt-1">Read</Link>
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
