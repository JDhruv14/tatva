"use client";

import { ArrowLeft, ExternalLink, Coffee } from "lucide-react";
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
            The story behind Project Tatva
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none animate-fade-up-delay-2">
          <section className="mb-12">
            <h2 className="text-xl font-medium text-foreground mb-4">What is Project Tatva?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Project Tatva (<span className="font-sanskrit">तत्त्व</span>) is an ambitious attempt to build a modern digital library of ancient Indian texts.
              The name 'Tatva' means the underlying truth beneath forms that is the true essence distinct from illusion in Sanskrit reflecting my mission to make these eternal texts accessible and meaningful to contemporary readers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This library is managed by AI and designed to help you explore, understand, and appreciate the rich philosophical and spiritual heritage contained within these ancient works.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-medium text-foreground mb-4">Why This Project?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Ancient Indian literature contains some of humanity's most profound philosophical and spiritual insights. Yet, much of this knowledge remains inaccessible today due to lack of awareness, scattered sources, absence of clear and understandable translations, and the lack of modern presentation suited to contemporary readers.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I have always been deeply connected to my Indian roots and curious about understanding our culture beyond rituals at the level of meaning and practice. At the same time, I have been a technology enthusiast. When I began exploring modern AI applications, a thought kept returning: <em>what if Sanatana Gnan could be blended with modern technology in a way that makes it accessible to ordinary people, without diluting its essence?</em>
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This journey truly began when I created a dataset based on the <strong>Bhagavad Gita</strong>. The response was overwhelming, people loved it, engaged with it, and found value in it. That moment became a turning point for me. I decided that I wanted to contribute, in my own way, to bringing this knowledge into the light again.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              My initial aim was to build a chatbot that could understand ideas directly from our ancient texts and respond to people's questions using the context of the scriptures themselves. From there, the vision expanded into something larger: a centralized digital space where people could read original texts and also receive contextual assistance through AI. I had the intention, but not a clear path forward.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              While researching, I came across <strong>Project Artha</strong> by <strong>Yash Bonde</strong>. Seeing that work gave me clarity both in structure and direction. Inspired by that foundation, I began shaping my own approach, designing and building this project with the help of AI.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-medium text-foreground mb-4">Why this logo?</h2>
            <div className="flex justify-center my-8">
              <img src="/favicon.ico" alt="Tatva Logo" className="w-16 h-16 opacity-90" />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              From the beginning, I wanted a symbol that truly aligned with the nature of this project: <strong>timeless, and spiritual</strong>. I spent nearly half a day researching and experimenting, trying to translate an idea that existed only in my mind. I tested multiple prompts with tools like Gemini and ChatGPT, and went through multiple iterations.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I knew what I <em>felt</em> the logo should convey, but I struggled to describe it in words. After many attempts, the idea finally took form and when it did, it felt right. This logo resonated deeply with me, and I knew it belonged to the project.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Let me explain the depth behind its design.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At first glance, the form resembles a <strong>flower</strong>, while also evoking the <strong>Sun</strong>. The Sun, or <em>Sūrya</em>, represents light, the force that illuminates ignorance and brings one closer to truth and understanding. In Indian thought, light is closely associated with wisdom and realization.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The floral form signifies <strong>purity</strong>, a recurring symbol in Sanskrit and spiritual traditions, representing clarity, openness, and growth. Together, the sun-like radiance and floral symmetry express a balance between illumination and purity.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At the center lies a circular sphere, representing <strong>Tatva</strong> itself, the fundamental principle, the building block of existence. This central focus reflects the core philosophy of the project that is moving beyond surface knowledge toward essential understanding.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The color was chosen with equal care. It closely resembles <strong>Bhagva</strong>, a color deeply associated with <strong>Sanatana Dharma</strong>, symbolizing pursuit of truth, and spiritual continuity.
            </p>
          </section>

          <section className="mb-12" id="sources">
            <h2 className="text-xl font-medium text-foreground mb-4">Sources</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This was the most challenging part of the project.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Most ancient texts already exist, but mainly as scanned PDFs or images often blurred, aged, and printed using older techniques. These formats are difficult to work with digitally and unsuitable for meaningful exploration.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              To address this, I researched and collected reliable digital text sources, carefully web-scraping select websites and bringing scattered material into one structured place. So far, I have organized over <strong>ten texts</strong>, many of which are not available elsewhere in this form, and I provide proper references to all original sources.
            </p>
            <div className="space-y-4">
              <a
                href="https://www.sacred-texts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#8B4513] dark:text-orange-400 hover:text-[#A0522D] dark:hover:text-orange-300 transition-colors font-medium border-b border-transparent hover:border-[#A0522D] dark:hover:border-orange-300 w-fit"
              >
                Sacred Texts Archive
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.wisdomlib.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#8B4513] dark:text-orange-400 hover:text-[#A0522D] dark:hover:text-orange-300 transition-colors font-medium border-b border-transparent hover:border-[#A0522D] dark:hover:border-orange-300 w-fit"
              >
                Wisdom Library
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://sanskritdocuments.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#8B4513] dark:text-orange-400 hover:text-[#A0522D] dark:hover:text-orange-300 transition-colors font-medium border-b border-transparent hover:border-[#A0522D] dark:hover:border-orange-300 w-fit"
              >
                Sanskrit Documents
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-medium text-foreground mb-4">About the Creator</h2>
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/dhruv-pfp.jpg"
                alt="Dhruv"
                className="w-16 h-16 rounded-full border-2 border-primary/20"
              />
              <p className="text-muted-foreground leading-relaxed">
                Project Tatva is created and maintained by{" "}
                <a href="https://x.com/dhruvtwt_" target="_blank" rel="noopener noreferrer" className="link-modern text-primary">@dhruvtwt_</a>.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have suggestions or corrections, feel free to reach out.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              If you find value in this work and wish to support its continued development, your support would be greatly appreciated. Maintaining the project including domain costs and the time invested over many days and nights requires sustained effort. Sponsorships help ensure that Project Tatva remains accessible and continues to improve for everyone.
            </p>

            {/* Support Button */}
            <div className="flex justify-center mb-12">
              <a
                href="https://buymeacoffee.com/jdhruv14"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-full font-medium transition-transform hover:scale-105"
              >
                <Coffee className="w-5 h-5" />
                <span>Support Project</span>
              </a>
            </div>


            {/* Creator Image */}
            <div className="flex justify-center mb-10">
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg border border-border/50">
                <img
                  src="/dj-preface.png"
                  alt="Dhruv at work"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </section>
        </article>

        <Footer />
      </main>
    </div>
  );
}

