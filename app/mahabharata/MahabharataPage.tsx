"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Pie, PieChart } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const parvas = [
  { id: 1, english: "Adi Parva", sanskrit: "आदि पर्व", theme: "The Beginning", description: "The origins of the Kuru dynasty, birth of the main characters, and the foundation of the epic tale.", keyEvents: ["Birth of Pandavas", "Birth of Kauravas", "Education at Hastinapura", "Marriage of Pandavas"], link: "mb-1-1-1" },
  { id: 2, english: "Sabhā Parva", sanskrit: "सभा पर्व", theme: "The Dice Game", description: "The fateful dice game that leads to the exile of the Pandavas and Draupadi's humiliation.", keyEvents: ["Dice Game", "Draupadi's Vastraharan", "Exile Decree", "Vow of Revenge"], link: "mb-2-1-1" },
  { id: 3, english: "Vana Parva", sanskrit: "वन पर्व", theme: "Forest Exile", description: "The twelve years of exile in the forest, filled with adventures, teachings, and spiritual growth.", keyEvents: ["Forest Life", "Yaksha Prashna", "Meeting with Sages", "Divine Encounters"], link: "mb-3-1-1" },
  { id: 4, english: "Virāṭa Parva", sanskrit: "विराट पर्व", theme: "Year of Disguise", description: "The thirteenth year of exile spent in disguise at King Virata's court.", keyEvents: ["Disguise at Court", "Kichaka's Death", "Cattle Raid", "Revelation of Identity"], link: "mb-4-1-1" },
  { id: 5, english: "Udyoga Parva", sanskrit: "उद्योग पर्व", theme: "Preparations for War", description: "Diplomatic efforts to avoid war, Krishna's peace mission, and preparations for the great battle.", keyEvents: ["Peace Negotiations", "Krishna's Mission", "War Preparations", "Alliance Building"], link: "mb-5-1-1" },
  { id: 6, english: "Bhīṣma Parva", sanskrit: "भीष्म पर्व", theme: "Bhishma's Command", description: "The first ten days of war with Bhishma as commander, containing the Bhagavad Gita.", keyEvents: ["War Begins", "Bhagavad Gita", "Bhishma's Fall", "First Ten Days"], link: "mb-6-1-1" },
  { id: 7, english: "Droṇa Parva", sanskrit: "द्रोण पर्व", theme: "Drona's Command", description: "Drona takes command after Bhishma's fall, featuring Abhimanyu's heroic sacrifice.", keyEvents: ["Drona as Commander", "Abhimanyu's Death", "Chakravyuh", "Jayadratha's Death"], link: "mb-7-1-1" },
  { id: 8, english: "Karṇa Parva", sanskrit: "कर्ण पर्व", theme: "Karna's Command", description: "Karna takes command and faces Arjuna in the epic battle, leading to his death.", keyEvents: ["Karna as Commander", "Karna-Arjuna Duel", "Karna's Death", "Krishna's Strategy"], link: "mb-8-1-1" },
  { id: 9, english: "Śalya Parva", sanskrit: "शल्य पर्व", theme: "Shalya's Command", description: "Shalya becomes commander and Yudhishthira faces him, leading to the final phase of war.", keyEvents: ["Shalya as Commander", "Yudhishthira's Victory", "Duryodhana's Flight", "War's End"], link: "mb-9-1-1" },
  { id: 10, english: "Sauptika Parva", sanskrit: "सौप्तिक पर्व", theme: "The Night Attack", description: "Ashwatthama's night attack on the sleeping Pandava camp, killing all remaining warriors.", keyEvents: ["Night Attack", "Ashwatthama's Revenge", "Draupadi's Sons", "Krishna's Intervention"], link: "mb-10-1-1" },
  { id: 11, english: "Strī Parva", sanskrit: "स्त्री पर्व", theme: "The Women", description: "The lamentations of the women who lost their husbands, sons, and brothers in the war.", keyEvents: ["Women's Lament", "Gandhari's Curse", "Dhritarashtra's Grief", "Yudhishthira's Remorse"], link: "mb-11-1-1" },
  { id: 12, english: "Śānti Parva", sanskrit: "शान्ति पर्व", theme: "The Peace", description: "Bhishma's teachings to Yudhishthira on dharma, governance, and philosophy from his deathbed.", keyEvents: ["Bhishma's Teachings", "Rajadharma", "Mokshadharma", "Philosophical Discourses"], link: "mb-12-1-1" },
  { id: 13, english: "Anuśāsana Parva", sanskrit: "अनुशासन पर्व", theme: "The Instructions", description: "Continuation of Bhishma's teachings on dharma, charity, and righteous conduct.", keyEvents: ["Further Teachings", "Dana Dharma", "Vrata Dharma", "Final Instructions"], link: "mb-13-1-1" },
  { id: 14, english: "Aśvamedhika Parva", sanskrit: "अश्वमेधिक पर्व", theme: "The Horse Sacrifice", description: "Yudhishthira performs the Ashvamedha Yajna to establish his sovereignty and atone for war.", keyEvents: ["Horse Sacrifice", "Arjuna's Journey", "Conquests", "Yajna Completion"], link: "mb-14-1-1" },
  { id: 15, english: "Āśramavāsika Parva", sanskrit: "आश्रमवासिक पर्व", theme: "The Hermitage", description: "Dhritarashtra, Gandhari, and Kunti retire to the forest and eventually die in a forest fire.", keyEvents: ["Retirement to Forest", "Forest Life", "Forest Fire", "Death of Elders"], link: "mb-15-1-1" },
  { id: 16, english: "Mausala Parva", sanskrit: "मौसल पर्व", theme: "The Maces", description: "The destruction of the Yadava clan through internal conflict, leading to Krishna's departure.", keyEvents: ["Yadava Conflict", "Krishna's Departure", "End of Yadava Dynasty", "Balarama's Death"], link: "mb-16-1-1" },
  { id: 17, english: "Mahāprasthānika Parva", sanskrit: "महाप्रस्थानिक पर्व", theme: "The Great Journey", description: "The Pandavas and Draupadi begin their final journey towards the Himalayas and heaven.", keyEvents: ["Final Journey", "Draupadi's Fall", "Sahadeva's Fall", "Nakula's Fall"], link: "mb-17-1-1" },
  { id: 18, english: "Svargārohaṇa Parva", sanskrit: "स्वर्गारोहण पर्व", theme: "The Ascent to Heaven", description: "Yudhishthira's final test and ascent to heaven, where he reunites with his family.", keyEvents: ["Yudhishthira's Test", "Dog's Identity", "Ascent to Heaven", "Reunion in Heaven"], link: "mb-18-1-1" },
];

const narrativePhaseData = [
  { subject: "Intensity", BEGINNING: 73, WANDERING: 58, BUILDUP: 87, BATTLE: 98, REFLECTION: 52, fullMark: 100 },
  { subject: "Combat", BEGINNING: 28, WANDERING: 17, BUILDUP: 43, BATTLE: 97, REFLECTION: 12, fullMark: 100 },
  { subject: "Philosophy", BEGINNING: 47, WANDERING: 72, BUILDUP: 63, BATTLE: 91, REFLECTION: 88, fullMark: 100 },
  { subject: "Emotion", BEGINNING: 64, WANDERING: 89, BUILDUP: 76, BATTLE: 95, REFLECTION: 82, fullMark: 100 },
  { subject: "Character", BEGINNING: 92, WANDERING: 81, BUILDUP: 68, BATTLE: 84, REFLECTION: 59, fullMark: 100 },
];

const chartConfig = {
  BEGINNING: { label: "BEGINNING", color: "#8b5cf6" },
  WANDERING: { label: "WANDERING", color: "#10b981" },
  BUILDUP: { label: "BUILDUP", color: "#f49d25" },
  BATTLE: { label: "BATTLE", color: "#ef4444" },
  REFLECTION: { label: "REFLECTION", color: "#fbbf24" },
} satisfies ChartConfig;

const parvaColors = [
  "hsl(15, 75%, 32%)", "hsl(20, 70%, 62%)", "hsl(25, 55%, 42%)", "hsl(30, 80%, 48%)",
  "hsl(35, 85%, 58%)", "hsl(18, 60%, 28%)", "hsl(22, 65%, 68%)", "hsl(28, 50%, 45%)",
  "hsl(32, 90%, 52%)", "hsl(16, 75%, 35%)", "hsl(24, 45%, 55%)", "hsl(26, 85%, 65%)",
  "hsl(33, 65%, 38%)", "hsl(19, 70%, 48%)", "hsl(27, 50%, 60%)", "hsl(31, 95%, 64%)",
  "hsl(21, 55%, 30%)", "hsl(29, 60%, 50%)",
];

const pieChartConfig: ChartConfig = {
  shlokas: { label: "Shlokas" },
  ...parvas.reduce((acc, parva, idx) => {
    acc[`parva-${parva.id}`] = { label: parva.english, color: parvaColors[idx] || parvaColors[0] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>),
} satisfies ChartConfig;

export default function MahabharataPage() {
  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ["mahabharata-stats"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "mb").single();
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
    queryKey: ["mahabharata-chapter-counts"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "mb").single();
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
      const parva = parvas.find(p => p.english === item.name);
      const parvaId = parva?.id || idx + 1;
      const color = parvaColors[parvaId - 1] || parvaColors[0];
      return { parva: `parva-${parvaId}`, shlokas: item.shlokas, fill: color };
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
          <h1 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-[#c65c39] dark:text-[#f49d25] hover:opacity-80 transition-opacity"><span className="font-sanskrit">महाभारत</span></h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Mahābhārata</h2>
          <p className="text-lg text-muted-foreground mb-4 font-english">धर्मक्षेत्रे कुरुक्षेत्रे - The Great Epic of India</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 font-english leading-relaxed">Composed by Maharshi Vyāsa, the Mahābhārata is the longest epic poem ever written, containing over 100,000 verses. It narrates the great war between the Pandavas and Kauravas, interwoven with profound philosophical teachings, including the Bhagavad Gita.</p>
        </div>
        <section className="mb-16 animate-fade-up-delay-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"><Image src="/mahabharata.png" alt="Mahabharata" width={512} height={512} className="w-full h-auto object-cover" priority /></div>
            <Link href="/shlokas/mb-1-1-1" className="btn-primary inline-block font-english text-sm px-6 py-2">Begin Journey</Link>
          </div>
        </section>
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Narrative Structure & Shloka Distribution</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center font-english max-w-3xl mx-auto">The radar chart visualizes the five major narrative phases of the Mahabharata across five key dimensions. The pie chart shows the distribution of shlokas across the eighteen Parvas.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Narrative Phases Analysis</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Five major phases across five dimensions: Intensity, Combat, Philosophy, Emotion, and Character.</p>
              </CardHeader>
              <CardContent className="pb-0 pt-6 px-4">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
                  <RadarChart data={narrativePhaseData} margin={{ top: 30, right: 40, bottom: 30, left: 40 }}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: 'hsl(var(--foreground))', fontWeight: 500 }} />
                    <PolarGrid radialLines={false} />
                    <Radar dataKey="BEGINNING" fill="var(--color-BEGINNING)" fillOpacity={0} stroke="var(--color-BEGINNING)" strokeWidth={2} />
                    <Radar dataKey="WANDERING" fill="var(--color-WANDERING)" fillOpacity={0} stroke="var(--color-WANDERING)" strokeWidth={2} />
                    <Radar dataKey="BUILDUP" fill="var(--color-BUILDUP)" fillOpacity={0} stroke="var(--color-BUILDUP)" strokeWidth={2} />
                    <Radar dataKey="BATTLE" fill="var(--color-BATTLE)" fillOpacity={0} stroke="var(--color-BATTLE)" strokeWidth={2} />
                    <Radar dataKey="REFLECTION" fill="var(--color-REFLECTION)" fillOpacity={0} stroke="var(--color-REFLECTION)" strokeWidth={2} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Shloka Distribution</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Distribution of shlokas across the eighteen Parvas. Larger slices indicate more verses.</p>
              </CardHeader>
              <CardContent className="flex-1 pb-0 pt-6">
                {isLoading ? (<div className="h-[300px] flex items-center justify-center"><p className="text-muted-foreground font-english">Loading chart...</p></div>) : error ? (<div className="h-[300px] flex items-center justify-center"><p className="text-destructive font-english">Error loading data</p></div>) : pieChartData && pieChartData.length > 0 ? (
                  <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <PieChart>
                      <ChartTooltip cursor={false} content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0];
                          const nameStr = String(data.name || '');
                          const parvaId = nameStr.replace('parva-', '');
                          const parva = parvas.find(p => p.id === parseInt(parvaId));
                          const parvaName = parva?.english || nameStr || 'Unknown';
                          const shlokas = data.value || 0;
                          return (<div className="rounded-lg border bg-background p-2 shadow-sm"><div className="grid gap-2"><div className="flex items-center gap-2"><span className="text-sm font-medium text-foreground">{parvaName} : {shlokas}</span></div></div></div>);
                        }
                        return null;
                      }} />
                      <Pie data={pieChartData} dataKey="shlokas" nameKey="parva" />
                    </PieChart>
                  </ChartContainer>
                ) : (<div className="h-[300px] flex items-center justify-center"><p className="text-muted-foreground font-english">No data available</p></div>)}
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mb-16 animate-fade-up-delay-3">
          <h2 className="text-3xl font-english text-foreground mb-12 text-center">The Eighteen Parvas</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
            <div className="space-y-4 md:space-y-5">
              {parvas.map((parva, index) => {
                const isEven = index % 2 === 0;
                const actualChapters = chapterCounts?.[parva.id] || 0;
                return (
                  <div key={parva.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mb-2 md:mb-0"></div>
                    <div className={`w-full md:w-[calc(50%-1.5rem)] ${isEven ? 'md:pr-6' : 'md:pl-6'}`}>
                      <Card className="feature-card">
                        <CardContent className="p-3">
                          <div className={`flex flex-col gap-1.5 ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                            <div>
                              <h3 className="text-lg font-sanskrit text-foreground mb-0.5">{parva.sanskrit}</h3>
                              <p className="text-sm font-english text-muted-foreground mb-0.5">{parva.english}</p>
                            </div>
                            <p className="text-xs text-muted-foreground font-english leading-relaxed">{parva.description}</p>
                            {actualChapters > 0 && <p className="text-xs text-muted-foreground font-english">{actualChapters} Chapters</p>}
                            <Link href={`/shlokas/${parva.link}`} className="btn-primary inline-block font-english text-sm px-4 py-2 mt-1">Begin Parva</Link>
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

