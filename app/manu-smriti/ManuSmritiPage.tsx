"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Scale, Crown, Users, Sparkles, BookOpen, Heart } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Pie, PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const adhyayas = [
  { id: 1, english: "Creation & Origin", sanskrit: "सृष्टि प्रकरण", verses: 119, theme: "Cosmology", description: "The creation of the universe, origin of Manu, and the cosmic order establishing the foundation of dharma.", topics: ["Origin of Universe", "Four Yugas", "Creation of Beings", "Manu's Authority"], link: "ms-1-1-1" },
  { id: 2, english: "Sacraments & Education", sanskrit: "संस्कार प्रकरण", verses: 249, theme: "Rituals", description: "The sacred ceremonies from conception to initiation, student life, and duties towards teachers.", topics: ["Upanayana", "Brahmacharya", "Guru Seva", "Vedic Study"], link: "ms-1-2-1" },
  { id: 3, english: "Householder's Duties", sanskrit: "गृहस्थ धर्म", verses: 286, theme: "Family", description: "Marriage rites, selection of spouse, duties of householders, and hospitality towards guests.", topics: ["Eight Forms of Marriage", "Householder Duties", "Guest Reception", "Daily Rituals"], link: "ms-1-3-1" },
  { id: 4, english: "Livelihood & Conduct", sanskrit: "वृत्ति प्रकरण", verses: 260, theme: "Ethics", description: "Righteous means of livelihood, daily conduct, self-discipline, and moral guidelines for life.", topics: ["Righteous Living", "Self-Control", "Food Regulations", "Moral Conduct"], link: "ms-1-4-1" },
  { id: 5, english: "Dietary Rules", sanskrit: "आहार नियम", verses: 169, theme: "Purity", description: "Rules regarding food, purification rituals, pollution and cleansing, and women's duties.", topics: ["Permitted Foods", "Purification Rites", "Impurity Rules", "Women's Dharma"], link: "ms-1-5-1" },
  { id: 6, english: "Forest Dweller & Ascetic", sanskrit: "वानप्रस्थ संन्यास", verses: 97, theme: "Renunciation", description: "The third and fourth stages of life - retirement to forest and complete renunciation.", topics: ["Vanaprastha", "Sannyasa", "Spiritual Practices", "Liberation Path"], link: "ms-1-6-1" },
  { id: 7, english: "King's Duties", sanskrit: "राज धर्म", verses: 226, theme: "Governance", description: "The sacred duties of kings, administration of justice, warfare, and protection of subjects.", topics: ["Royal Duties", "Council of Ministers", "Warfare Ethics", "Taxation"], link: "ms-1-7-1" },
  { id: 8, english: "Judicial Procedure", sanskrit: "व्यवहार प्रकरण", verses: 420, theme: "Law", description: "The eighteen titles of law, judicial procedure, evidence, witnesses, and civil matters.", topics: ["Eighteen Titles of Law", "Court Procedure", "Witness Rules", "Debt & Contract"], link: "ms-1-8-1" },
  { id: 9, english: "Women & Inheritance", sanskrit: "स्त्री धर्म", verses: 336, theme: "Family Law", description: "Laws concerning women, marriage, inheritance, partition of property, and family disputes.", topics: ["Women's Rights", "Inheritance Laws", "Property Division", "Marital Duties"], link: "ms-1-9-1" },
  { id: 10, english: "Mixed Classes", sanskrit: "वर्ण संकर", verses: 131, theme: "Social Order", description: "Rules regarding mixed castes, occupations in times of distress, and social interactions.", topics: ["Varna Mixing", "Emergency Occupations", "Social Hierarchy", "Class Duties"], link: "ms-1-10-1" },
  { id: 11, english: "Penance & Expiation", sanskrit: "प्रायश्चित्त प्रकरण", verses: 266, theme: "Atonement", description: "Various forms of penance for sins, purification through austerity, and restoration of purity.", topics: ["Types of Sins", "Penance Methods", "Purification Rites", "Absolution"], link: "ms-1-11-1" },
  { id: 12, english: "Karma & Liberation", sanskrit: "मोक्ष प्रकरण", verses: 126, theme: "Philosophy", description: "The doctrine of karma, transmigration of souls, supreme knowledge, and path to liberation.", topics: ["Law of Karma", "Rebirth Theory", "Three Gunas", "Path to Moksha"], link: "ms-1-12-1" },
];

const thematicData = [
  { subject: "Philosophy", value: 85, fullMark: 100 },
  { subject: "Social Order", value: 95, fullMark: 100 },
  { subject: "Personal Ethics", value: 90, fullMark: 100 },
  { subject: "Governance", value: 78, fullMark: 100 },
  { subject: "Rituals", value: 82, fullMark: 100 },
  { subject: "Law & Justice", value: 92, fullMark: 100 },
];

const themeCategories = [
  { name: "Dharma & Ethics", icon: Scale, color: "#f49d25", chapters: [1, 2, 4], description: "Foundation of righteous living and moral conduct" },
  { name: "Social Structure", icon: Users, color: "#10b981", chapters: [3, 9, 10], description: "Family, marriage, and social organization" },
  { name: "Governance & Law", icon: Crown, color: "#8b5cf6", chapters: [7, 8], description: "Royal duties and judicial procedures" },
  { name: "Rituals & Purity", icon: Sparkles, color: "#3b82f6", chapters: [2, 5], description: "Sacred ceremonies and purification" },
  { name: "Spiritual Path", icon: Heart, color: "#ef4444", chapters: [6, 12], description: "Renunciation and liberation" },
  { name: "Penance", icon: BookOpen, color: "#fbbf24", chapters: [11], description: "Atonement and expiation" },
];

const radarChartConfig = {
  value: { label: "Coverage", color: "#f49d25" },
} satisfies ChartConfig;

const adhyayaColors = [
  "hsl(15, 75%, 32%)", "hsl(20, 70%, 42%)", "hsl(25, 55%, 52%)",
  "hsl(30, 80%, 38%)", "hsl(35, 85%, 48%)", "hsl(18, 60%, 58%)",
  "hsl(22, 70%, 35%)", "hsl(28, 75%, 45%)", "hsl(32, 65%, 55%)",
  "hsl(16, 80%, 40%)", "hsl(24, 60%, 50%)", "hsl(29, 85%, 42%)",
];

const pieChartConfig: ChartConfig = {
  verses: { label: "Verses" },
  ...adhyayas.reduce((acc, adhyaya, idx) => {
    acc[`adhyaya-${adhyaya.id}`] = { label: `Ch. ${adhyaya.id}`, color: adhyayaColors[idx] || adhyayaColors[0] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>),
} satisfies ChartConfig;

const barChartConfig = {
  verses: { label: "Verses", color: "#f49d25" },
} satisfies ChartConfig;

export default function ManuSmritiPage() {
  const { data: verseData, isLoading, error } = useQuery({
    queryKey: ["manu-smriti-stats"],
    queryFn: async () => {
      const { data: book } = await supabase.from("books").select("id").eq("code", "ms").single();
      if (!book) return [];
      const { data: chapters, error: chaptersError } = await supabase.from("chapters").select("id, chapter_number, name_english").eq("book_id", book.id).order("chapter_number", { ascending: true });
      if (chaptersError || !chapters || chapters.length === 0) return [];
      const stats = await Promise.all(
        chapters.map(async (chapter: any) => {
          const { count, error: countError } = await supabase.from("shlokas").select("*", { count: "exact", head: true }).eq("chapter_id", chapter.id);
          if (countError) return { name: chapter.name_english || `Chapter ${chapter.chapter_number}`, verses: 0, chapter: chapter.chapter_number };
          return { name: chapter.name_english || `Chapter ${chapter.chapter_number}`, verses: count || 0, chapter: chapter.chapter_number };
        })
      );
      return stats;
    },
  });

  const pieChartData = useMemo(() => {
    if (!verseData || verseData.length === 0) {
      // Use default data from adhyayas
      return adhyayas.map((adhyaya, idx) => ({
        adhyaya: `adhyaya-${adhyaya.id}`,
        verses: adhyaya.verses,
        fill: adhyayaColors[idx] || adhyayaColors[0],
      }));
    }
    return verseData.map((item, idx) => ({
      adhyaya: `adhyaya-${item.chapter}`,
      verses: item.verses,
      fill: adhyayaColors[idx] || adhyayaColors[0],
    }));
  }, [verseData]);

  const barChartData = useMemo(() => {
    if (!verseData || verseData.length === 0) {
      return adhyayas.map(a => ({ name: `Ch.${a.id}`, verses: a.verses }));
    }
    return verseData.map(item => ({ name: `Ch.${item.chapter}`, verses: item.verses }));
  }, [verseData]);

  const totalVerses = useMemo(() => {
    if (verseData && verseData.length > 0) {
      return verseData.reduce((sum, item) => sum + item.verses, 0);
    }
    return adhyayas.reduce((sum, a) => sum + a.verses, 0);
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
          <h1 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-[#c65c39] dark:text-[#f49d25] hover:opacity-80 transition-opacity"><span className="font-sanskrit">मनुस्मृति</span></h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Manu Smriti</h2>
          <p className="text-lg text-muted-foreground mb-4 font-english">धर्मशास्त्र - The Laws of Manu</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 font-english leading-relaxed">Manu Smriti is the most authoritative ancient Indian legal text, attributed to the progenitor of mankind, Manu. Containing approximately {totalVerses.toLocaleString()} verses across 12 chapters, it provides a comprehensive guide to dharma, social conduct, governance, and spiritual liberation.</p>
        </div>
        <section className="mb-16 animate-fade-up-delay-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"><img src="/manu%20smriti.png" alt="Manu Smriti" className="w-full h-auto object-cover" /></div>
            <Link href="/shlokas/ms-1-1-1" className="btn-primary inline-block font-english text-sm px-6 py-2">Begin Journey</Link>
          </div>
        </section>

        {/* Thematic Categories */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Thematic Overview</h2>
          <p className="text-sm text-muted-foreground mb-8 text-center font-english max-w-3xl mx-auto">The Manu Smriti covers six major themes that encompass all aspects of dharmic life.</p>
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
          <p className="text-sm text-muted-foreground mb-6 text-center font-english max-w-3xl mx-auto">The radar chart shows thematic coverage across different domains. The bar chart displays verse distribution across all 12 chapters.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-english">Thematic Coverage</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Six domains of dharmic knowledge covered in the text.</p>
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
                <CardTitle className="text-xl font-english">Verse Distribution</CardTitle>
                <p className="text-xs text-muted-foreground font-english mt-2 text-center max-w-md mx-auto leading-relaxed">Number of verses in each of the 12 chapters.</p>
              </CardHeader>
              <CardContent className="flex-1 pb-4 pt-6 px-2 overflow-hidden">
                {isLoading ? (<div className="h-[280px] flex items-center justify-center"><p className="text-muted-foreground font-english">Loading chart...</p></div>) : error ? (<div className="h-[280px] flex items-center justify-center"><p className="text-destructive font-english">Error loading data</p></div>) : (
                  <ChartContainer config={barChartConfig} className="mx-auto h-[260px] w-full">
                    <BarChart data={barChartData} margin={{ top: 10, right: 15, bottom: 25, left: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 8, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} interval={0} angle={-45} textAnchor="end" height={40} />
                      <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} width={30} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Bar dataKey="verses" fill="var(--color-verses)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The 12 Adhyayas */}
        <section className="mb-16 animate-fade-up-delay-3">
          <h2 className="text-3xl font-english text-foreground mb-12 text-center">The Twelve Adhyayas</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
            <div className="space-y-4 md:space-y-5">
              {adhyayas.map((adhyaya, index) => {
                const isEven = index % 2 === 0;
                const actualVerses = verseData?.find(v => v.chapter === adhyaya.id)?.verses || adhyaya.verses;
                return (
                  <div key={adhyaya.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mb-2 md:mb-0"></div>
                    <div className={`w-full md:w-[calc(50%-1.5rem)] ${isEven ? 'md:pr-6' : 'md:pl-6'}`}>
                      <Card className="feature-card">
                        <CardContent className="p-3">
                          <div className={`flex flex-col gap-1.5 ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                            <div>
                              <span className="text-xs font-medium text-primary mb-1 block">Chapter {adhyaya.id} • {adhyaya.theme}</span>
                              <h3 className="text-lg font-sanskrit text-foreground mb-0.5">{adhyaya.sanskrit}</h3>
                              <p className="text-sm font-english text-muted-foreground mb-0.5">{adhyaya.english}</p>
                            </div>
                            <p className="text-xs text-muted-foreground font-english leading-relaxed">{adhyaya.description}</p>
                            <p className="text-xs text-muted-foreground font-english">{actualVerses} Verses</p>
                            <Link href={`/shlokas/${adhyaya.link}`} className="btn-primary inline-block font-english text-sm px-4 py-2 mt-1">Read Chapter</Link>
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
