"use client";

import { Sparkles, BookOpen, Languages, Search, Globe, Scroll, Shield, Compass, Library } from "lucide-react";
import Link from "next/link";
// In Next.js, imported images are objects, so we use the .src property
import landingImageObj from "@/assets/landing.jpg";
const landingImage = typeof landingImageObj === 'string' ? landingImageObj : landingImageObj.src;
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Safari } from "@/components/ui/safari";

const features = [
  { icon: BookOpen, title: "Sacred Texts", description: "Access Vedas, Puranas, Itihasas, and philosophical treatises in their original form." },
  { icon: Languages, title: "Sanskrit & Translations", description: "Original Sanskrit shlokas with English translations and transliterations." },
  { icon: Search, title: "Smart Search", description: "Instantly search through thousands of verses across all ancient texts." },
  { icon: Scroll, title: "Verse Navigation", description: "Seamless navigation between chapters, sections, and individual shlokas." },
  { icon: Compass, title: "Guided Reading", description: "Structured paths through texts with context and commentary." },
  { icon: Globe, title: "Free & Open", description: "Completely free access to ancient wisdom, available worldwide." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-ambient animate-pulse-slow" />

      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-10 mt-8">
        {/* Badge */}
        <div className="flex justify-center mb-12 animate-fade-up-delay-1">
          <div className="pill-badge">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <AnimatedShinyText className="font-english">Digital Museum of Timeless Wisdom</AnimatedShinyText>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl text-center font-medium mb-10 animate-fade-up-delay-1 tracking-tight">
          <span className="text-foreground font-english">From knowledge to<br /> understanding the</span>
          <span className="text-gradient-accent font-sanskrit font-bold"> तत्त्व </span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-muted-foreground text-base md:text-xl max-w-xl mx-auto mb-8 animate-fade-up-delay-2 font-english">
        Dedicated to preserving and connecting ancient <br />Indian culture rooted in सनातन धर्म
        </p>

        {/* Pill Button - Same color as tatva */}
        <div className="flex justify-center mb-10">
          <Link 
            href="/contents"
            className="btn-tatva inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full text-white mt-2 animate-fade-up-delay-2"
          >
            <span className="font-english">Start Reading</span>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center mb-16 animate-fade-up-delay-3">
          <div className="max-w-4xl w-full relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 dark:from-primary/30 dark:via-accent/30 dark:to-primary/30 blur-xl animate-pulse"></div>
            <div className="relative rounded-lg overflow-hidden">
              <Safari 
                imageSrc={landingImage}
                url="tatva.info"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="mb-20 animate-fade-up-delay-3">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-3 font-english">
              Your Gateway to <span className="text-gradient-accent font-sanskrit">सनातन</span> Wisdom
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-english text-sm md:text-base">
              Tatva is a digital museum preserving India's ancient scriptures. We bring timeless texts to life with modern technology, making sacred knowledge accessible to seekers everywhere.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2 font-english">{feature.title}</h3>
                <p className="text-sm text-muted-foreground font-english leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto mb-16 animate-fade-up-delay-4">
          <Link href="/contents" className="text-center group">
            <span className="block text-3xl font-medium text-foreground group-hover:text-primary transition-colors font-english">10+</span>
            <span className="text-sm text-muted-foreground font-english">Books</span>
          </Link>
          <Link href="/shlokas/rv-2-1-1" className="text-center group">
            <span className="block text-3xl font-medium text-foreground group-hover:text-primary transition-colors font-english">150K+</span>
            <span className="text-sm text-muted-foreground font-english">Shlokas</span>
          </Link>
        </div>

        {/* Sanskrit Quote */}
        <div className="text-center mb-16 animate-fade-up-delay-4">
          <p className="font-sanskrit text-foreground/80 text-xl md:text-2xl mb-3 tracking-wide">
            असतो मा सद्गमय
          </p>
          <p className="text-muted-foreground text-sm font-english italic">
            From unreality, lead me to reality
          </p>
        </div>

        <Footer />
      </main>
    </div>
  );
}

