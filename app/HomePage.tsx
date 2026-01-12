"use client";

import { Sparkles, BookOpen, Languages, Search, Globe, Scroll, Compass } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Safari } from "@/components/ui/safari";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: BookOpen,
    name: "Sacred Texts",
    description: "Access Vedas, Puranas, Itihasas, and philosophical treatises in their original form.",
    href: "/contents",
    cta: "Explore Texts",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />,
  },
  {
    Icon: Languages,
    name: "Sanskrit & Translations",
    description: "Original Sanskrit shlokas with English translations and transliterations.",
    href: "/contents",
    cta: "View Shlokas",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />,
  },
  {
    Icon: Search,
    name: "Smart Search",
    description: "Instantly search through thousands of verses across all ancient texts.",
    href: "#",
    cta: "Start Searching",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />,
    onCtaClick: () => window.dispatchEvent(new CustomEvent("open-tatva-search")),
  },
  {
    Icon: Scroll,
    name: "Verse Navigation",
    description: "Seamless navigation between chapters, sections, and individual shlokas.",
    href: "/contents",
    cta: "Navigate",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />,
  },
  {
    Icon: Compass,
    name: "Guided Reading",
    description: "Structured paths through texts with context and commentary.",
    href: "/structure",
    cta: "View Structure",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />,
  },
  {
    Icon: Globe,
    name: "Free",
    description: "Completely free access to ancient Indian wisdom, available all at one place.",
    href: "/preface",
    cta: "Learn More",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-ambient animate-pulse-slow" />

      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-28 mt-8">
        {/* Badge */}
        <div className="flex justify-center mb-12 animate-fade-up-delay-1">
          <div className="pill-badge">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <AnimatedShinyText className="font-english">Digital Museum of Timeless Wisdom</AnimatedShinyText>
          </div>
        </div>
        <div className="flex justify-center mb-12 animate-fade-up-delay-1">
          <a href="https://peerlist.io/jdhruv14/project/tatva" target="_blank" rel="noreferrer">
            <img
              src="https://dqy38fnwh4fqs.cloudfront.net/website/project-spotlight/project-week-rank-one-light.svg"
              alt="तत्त्व (Tatva)"
            />
          </a>
        </div>



        {/* Title */}
        <h1 className="text-4xl md:text-6xl text-center font-medium mb-10 animate-fade-up-delay-1 tracking-tight">
          <span className="text-foreground font-english">From knowledge to<br /> understanding the</span>
          <span className="text-gradient-accent font-sanskrit font-bold"> तत्त्व </span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-muted-foreground text-base md:text-xl max-w-xl mx-auto mb-8 animate-fade-up-delay-2 font-english">
          Dedicated to preserving and connecting ancient <br />Indian culture rooted in <span className="text-gradient-accent font-sanskrit font-semibold">सनातन धर्म</span>
        </p>

        {/* Pill Button - Same color as tatva */}
        <div className="flex justify-center mb-10 animate-fade-up-delay-2">
          <Link
            href="/contents"
            className="btn-tatva inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full text-white dark:text-black mt-2 transition-transform hover:scale-105"
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
                imageSrcLight="/home-light.png"
                imageSrcDark="/home-dark.png"
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
              Your Gateway to <span className="text-gradient-accent font-sanskrit">शाश्वत</span> Wisdom
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-english text-sm md:text-base">
              Tatva is a digital museum preserving India's ancient scriptures. We bring timeless texts to life with modern technology, making sacred knowledge accessible to seekers everywhere.
            </p>
          </div>

          {/* Features Bento Grid */}
          <BentoGrid className="auto-rows-[12rem] grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto mb-16 animate-fade-up-delay-4">
          <Link href="/" className="text-center group">
            <span className="block text-3xl font-medium text-foreground group-hover:text-primary transition-colors font-english">10+</span>
            <span className="text-sm text-muted-foreground font-english">Books</span>
          </Link>
          <Link href="/" className="text-center group">
            <span className="block text-3xl font-medium text-foreground group-hover:text-primary transition-colors font-english">150K+</span>
            <span className="text-sm text-muted-foreground font-english">Shlokas</span>
          </Link>
        </div>

        {/* Sanskrit Quote */}
        <div className="text-center mb-10 animate-fade-up-delay-4">
          <p className="font-sanskrit text-gradient-accent text-xl md:text-2xl pt-4 mb-3 tracking-wide">
            अन्तःस्थितं तत्त्वं प्रति
          </p>
          <p className="text-muted-foreground text-sm font-english italic">
            Towards the Tatva that dwells within
          </p>
        </div>

        <Footer />
      </main>
    </div>
  );
}

