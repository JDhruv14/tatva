"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Flame, Users, Globe, Sparkles, Crown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  { id: 1, english: "Creation Narratives", sanskrit: "सृष्टि कथा", description: "Stories of cosmic creation, the origin of beings, and the structure of the universe as narrated by Sage Markandeya.", link: "mp-1-1-1" },
  { id: 2, english: "Devi Mahatmyam", sanskrit: "देवी माहात्म्यम्", description: "The famous 700 verses glorifying the Divine Mother - the most celebrated portion of this Purana.", link: "mp-2-1-1" },
  { id: 3, english: "Markandeya's Stories", sanskrit: "मार्कण्डेय कथा", description: "Various stories and teachings narrated by the immortal sage Markandeya to other sages.", link: "mp-3-1-1" },
  { id: 4, english: "Genealogies", sanskrit: "वंशावली", description: "Royal lineages, genealogies of kings and sages, connecting mythological history.", link: "mp-4-1-1" },
];

const themeCategories = [
  { name: "Shakti Worship", icon: Flame, color: "#ef4444", description: "Divine Mother as supreme power (Devi Mahatmyam)" },
  { name: "Cosmology", icon: Globe, color: "#3b82f6", description: "Creation, dissolution, and cosmic cycles" },
  { name: "Mythology", icon: Crown, color: "#f49d25", description: "Stories of gods, sages, and kings" },
  { name: "Genealogies", icon: Users, color: "#10b981", description: "Royal and sage lineages" },
  { name: "Philosophy", icon: BookOpen, color: "#8b5cf6", description: "Vedantic teachings and wisdom" },
  { name: "Rituals", icon: Sparkles, color: "#fbbf24", description: "Worship practices and ceremonies" },
];

const highlights = [
  { title: "Devi Mahatmyam", subtitle: "The Glory of the Goddess", description: "700 verses describing Durga's battles - the most famous section, recited during Navaratri." },
  { title: "Markandeya's Immortality", subtitle: "Blessed by Shiva", description: "The story of how Sage Markandeya conquered death through devotion to Lord Shiva." },
  { title: "Cosmic Vision", subtitle: "Universe in Baby Krishna", description: "Markandeya's vision of the entire universe within the infant Krishna during pralaya." },
];

export default function MarkandeyaPuranaPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="glow-ambient animate-pulse-slow" />
      <Header />
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32">
        <Link href="/contents" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 animate-fade-up">
          <ArrowLeft className="w-4 h-4" />Return
        </Link>
        <div className="text-center mb-12 animate-fade-up-delay-1">
          <h1 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-[#c65c39] dark:text-[#f49d25] hover:opacity-80 transition-opacity"><span className="font-sanskrit">मार्कण्डेय पुराण</span></h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 tracking-tight text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Markandeya Purana</h2>
          <p className="text-lg text-muted-foreground mb-4 font-english">मार्कण्डेयप्रोक्तम् - Narrated by Sage Markandeya</p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 font-english leading-relaxed">One of the eighteen Mahapuranas, the Markandeya Purana is named after the immortal sage Markandeya. It contains approximately 9,000 verses and is most famous for containing the Devi Mahatmyam - the primary scripture of Shakti worship.</p>
        </div>
        <section className="mb-16 animate-fade-up-delay-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"><img src="/markandaye%20puran.png" alt="Markandeya Purana" className="w-full h-auto object-cover" /></div>
            <Link href="/shlokas/mp-1-1-1" className="btn-primary inline-block font-english text-sm px-6 py-2">Begin Journey</Link>
          </div>
        </section>

        {/* Thematic Categories */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Sacred Themes</h2>
          <p className="text-sm text-muted-foreground mb-8 text-center font-english max-w-3xl mx-auto">The Markandeya Purana encompasses six major themes of Puranic literature.</p>
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

        {/* Famous Highlights */}
        <section className="mb-16 animate-fade-up-delay-2">
          <h2 className="text-3xl font-english text-foreground mb-4 text-center">Famous Highlights</h2>
          <p className="text-sm text-muted-foreground mb-8 text-center font-english max-w-3xl mx-auto">Notable stories and teachings from this Purana.</p>
          <div className="space-y-4">
            {highlights.map((item, idx) => (
              <Card key={idx} className="bg-card border border-border">
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-primary mb-2">{item.subtitle}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sections */}
        <section className="mb-16 animate-fade-up-delay-3">
          <h2 className="text-3xl font-english text-foreground mb-12 text-center">Major Sections</h2>
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
                            <h3 className="text-lg font-sanskrit text-foreground mb-0.5">{section.sanskrit}</h3>
                            <p className="text-sm font-english text-muted-foreground mb-0.5">{section.english}</p>
                            <p className="text-xs text-muted-foreground font-english leading-relaxed">{section.description}</p>
                            <Link href={`/shlokas/${section.link}`} className="btn-primary inline-block font-english text-sm px-4 py-2 mt-1">Explore</Link>
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
