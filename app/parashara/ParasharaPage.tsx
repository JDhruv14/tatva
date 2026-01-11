"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sun, Moon, Star, Orbit, Clock, Compass } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const adhyayas = [
  { id: 1, english: "Planetary Characters", sanskrit: "ग्रह स्वभाव", description: "The nature, characteristics, and significations of the nine planets (Navagraha) and their effects.", link: "ph-1-1-1" },
  { id: 2, english: "Rashi & Bhava", sanskrit: "राशि भाव", description: "The twelve zodiac signs (Rashis), their qualities, and the twelve houses (Bhavas) of the horoscope.", link: "ph-1-2-1" },
  { id: 3, english: "Dasha Systems", sanskrit: "दशा पद्धति", description: "Planetary period systems including Vimshottari Dasha for timing predictions and life events.", link: "ph-1-3-1" },
  { id: 4, english: "Yogas", sanskrit: "योग", description: "Planetary combinations (Yogas) that indicate specific life patterns, fortunes, and challenges.", link: "ph-1-4-1" },
  { id: 5, english: "Divisional Charts", sanskrit: "वर्ग कुण्डली", description: "The sixteen Vargas (divisional charts) for detailed analysis of specific life areas.", link: "ph-1-5-1" },
  { id: 6, english: "Remedial Measures", sanskrit: "उपाय", description: "Astrological remedies including mantras, gemstones, and rituals to mitigate planetary afflictions.", link: "ph-1-6-1" },
];

const themeCategories = [
  { name: "Grahas (Planets)", icon: Orbit, color: "#f49d25", description: "Nine celestial bodies and their influences" },
  { name: "Rashis (Signs)", icon: Compass, color: "#3b82f6", description: "Twelve zodiac signs and their qualities" },
  { name: "Bhavas (Houses)", icon: Star, color: "#8b5cf6", description: "Twelve houses representing life areas" },
  { name: "Dashas (Periods)", icon: Clock, color: "#ef4444", description: "Planetary periods for timing events" },
  { name: "Solar Astrology", icon: Sun, color: "#fbbf24", description: "Sun-based calculations and predictions" },
  { name: "Lunar Astrology", icon: Moon, color: "#10b981", description: "Moon-based nakshatras and muhurtas" },
];

const navagrahas = [
  { name: "Surya", sanskrit: "सूर्य", english: "Sun", color: "#f97316" },
  { name: "Chandra", sanskrit: "चन्द्र", english: "Moon", color: "#9ca3af" },
  { name: "Mangala", sanskrit: "मंगल", english: "Mars", color: "#ef4444" },
  { name: "Budha", sanskrit: "बुध", english: "Mercury", color: "#22c55e" },
  { name: "Guru", sanskrit: "गुरु", english: "Jupiter", color: "#eab308" },
  { name: "Shukra", sanskrit: "शुक्र", english: "Venus", color: "#ec4899" },
  { name: "Shani", sanskrit: "शनि", english: "Saturn", color: "#3b82f6" },
  { name: "Rahu", sanskrit: "राहु", english: "North Node", color: "#6366f1" },
  { name: "Ketu", sanskrit: "केतु", english: "South Node", color: "#8b5cf6" },
];

export default function ParasharaPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="glow-ambient animate-pulse-slow" />
      <Header />
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32">
        <Link href="/contents" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 animate-fade-up">
          <ArrowLeft className="w-4 h-4" />Return
        </Link>
        <div className="text-center mb-12 animate-fade-up-delay-1">
          <h1 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-[#c65c39] dark:text-[#f49d25] hover:opacity-80 transition-opacity"><span className="font-sanskrit">बृहत् पाराशर होरा शास्त्रम्</span></h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Brihat Parashara Hora Shastra</h2>
          <p className="text-lg text-muted-foreground mb-4 font-english">ज्योतिषशास्त्रम् - The Science of Light</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 font-english leading-relaxed">The foundational text of Vedic Astrology (Jyotish), attributed to Maharshi Parashara. This encyclopedic work contains the principles of horoscopy, planetary influences, predictive techniques, and remedial measures that form the basis of Hindu astrology.</p>
        </div>
        <section className="mb-16 animate-fade-up-delay-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"><Image src="/parahar%20sastra.png" alt="Parashara Hora Shastra" width={512} height={512} className="w-full h-auto object-cover" priority /></div>
            <Link href="/shlokas/ph-1-1-1" className="btn-primary inline-block font-english text-sm px-6 py-2">Begin Journey</Link>
          </div>
        </section>

        {/* Thematic Categories */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Core Concepts</h2>
          <p className="text-sm text-muted-foreground mb-8 text-center font-english max-w-3xl mx-auto">The fundamental pillars of Vedic Astrology as taught by Parashara.</p>
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

        {/* Navagrahas */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">The Navagrahas</h2>
          <p className="text-sm text-muted-foreground mb-8 text-center font-english max-w-3xl mx-auto">The nine celestial influences that govern human destiny.</p>
          <div className="grid grid-cols-3 gap-3">
            {navagrahas.map((graha) => (
              <Card key={graha.name} className="bg-card border border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-3 text-center">
                  <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: graha.color + '20', border: `2px solid ${graha.color}` }}>
                    <span className="text-xs" style={{ color: graha.color }}>●</span>
                  </div>
                  <h3 className="font-sanskrit text-foreground text-sm">{graha.sanskrit}</h3>
                  <p className="text-xs text-muted-foreground">{graha.english}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Major Sections */}
        <section className="mb-16 animate-fade-up-delay-3">
          <h2 className="text-3xl font-english text-foreground mb-12 text-center">Key Adhyayas</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
            <div className="space-y-4 md:space-y-5">
              {adhyayas.map((adhyaya, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={adhyaya.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mb-2 md:mb-0"></div>
                    <div className={`w-full md:w-[calc(50%-1.5rem)] ${isEven ? 'md:pr-6' : 'md:pl-6'}`}>
                      <Card className="feature-card">
                        <CardContent className="p-3">
                          <div className={`flex flex-col gap-1.5 ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                            <h3 className="text-lg font-sanskrit text-foreground mb-0.5">{adhyaya.sanskrit}</h3>
                            <p className="text-sm font-english text-muted-foreground mb-0.5">{adhyaya.english}</p>
                            <p className="text-xs text-muted-foreground font-english leading-relaxed">{adhyaya.description}</p>
                            <Link href={`/shlokas/${adhyaya.link}`} className="btn-primary inline-block font-english text-sm px-4 py-2 mt-1">Study</Link>
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
