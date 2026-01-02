"use client";

import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrefacePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-ambient animate-pulse-slow" />

      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 animate-fade-up"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Title */}
        <div className="mb-12 animate-fade-up-delay-1">
          <h1 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight text-foreground">
            Preface
          </h1>
          <p className="text-muted-foreground text-lg">
            The story behind Project Gyan
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none animate-fade-up-delay-2">
          <section className="mb-12">
            <h2 className="text-xl font-medium text-foreground mb-4">What is Project Gyan?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Project Gyan (ज्ञान) is an ambitious attempt to build a modern digital museum of ancient Indian texts.
              The name "Gyan" means "wisdom" or "knowledge" in Sanskrit—reflecting our mission to make these
              timeless texts accessible and meaningful to contemporary readers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This museum is managed by AI, designed to help you explore, understand, and appreciate the rich
              philosophical and spiritual heritage contained within these ancient works.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-medium text-foreground mb-4">Why This Project?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Ancient Indian literature contains some of humanity's most profound philosophical insights.
              Yet, these texts often remain inaccessible due to language barriers, scattered sources,
              and lack of modern presentation.
            </p>
            <div className="font-serif italic text-foreground/80 text-xl text-center py-8 border-l-2 border-primary/30 pl-6 my-8">
              "असतो मा सद्गमय"
              <span className="block text-sm text-muted-foreground mt-2 not-italic font-sans">
                From unreality, lead me to reality
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We believe that by making these texts searchable, interconnected, and beautifully presented,
              we can help preserve and propagate this ancient wisdom for future generations.
            </p>
          </section>

          <section className="mb-12" id="sources">
            <h2 className="text-xl font-medium text-foreground mb-4">Sources</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our content is carefully curated from authoritative sources and scholarly translations.
              We strive for accuracy while making the material approachable.
            </p>
            <div className="space-y-3">
              <a
                href="https://www.sacred-texts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-link hover:text-link-hover transition-colors"
              >
                Sacred Texts Archive
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.wisdomlib.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-link hover:text-link-hover transition-colors"
              >
                Wisdom Library
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-medium text-foreground mb-4">About the Creator</h2>
            <p className="text-muted-foreground leading-relaxed">
              Project Gyan is created and maintained by{" "}
              <a href="https://x.com/dhruvtwt_" target="_blank" rel="noopener noreferrer" className="link-modern">@dhruvtwt_</a>.
              Feel free to reach out with suggestions, corrections, or collaborations.
            </p>
          </section>
        </article>

        <Footer />
      </main>
    </div>
  );
}

