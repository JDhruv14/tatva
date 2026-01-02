"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { Linkedin, Coffee } from "lucide-react";
import { AvatarCircles } from "@/components/ui/avatar-circles";

const Footer = forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer
      ref={ref}
      className="relative mt-20 border-t"
      style={{
        borderColor: 'hsl(var(--accent) / 0.5)'
      }}
      {...props}
    >
      {/* Upper Footer Section */}
      <div className="max-w-3xl mx-auto px-4 pt-12">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Branding Column */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
              <img
                src="/favicon.ico"
                alt="Tatva"
                className="h-8 w-8 object-contain cursor-pointer"
              />
              <span
                className="text-xl md:text-2xl font-bold font-sanskrit text-foreground transition-colors duration-300 cursor-pointer hover:text-primary dark:hover:text-accent"
              >
                तत्त्व
              </span>
            </Link>
            <p className="text-sm text-muted-foreground font-english">
              Digital Museum of Timeless Wisdom
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground font-english">Developed by</span>
              <AvatarCircles
                className="scale-75 origin-left"
                avatarUrls={[
                  {
                    imageUrl: "/dhruv-pfp.jpg",
                    profileUrl: "https://x.com/dhruvtwt_"
                  }
                ]}
              />
            </div>

          </div>

          {/* Right Side Columns */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-8 md:mt-0">
            {/* Socials Column */}
            <div className="flex-shrink-0">
              <h3 className="text-sm font-semibold text-foreground mb-4 font-english">Socials</h3>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="https://x.com/dhruvtwt_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors font-english"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="shrink-0">
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                    <span>X</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/jdhruv14"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors font-english"
                  >
                    <Linkedin className="h-[14px] w-[14px] shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="flex-shrink-0">
              <h3 className="text-sm font-semibold text-foreground mb-4 font-english">Resources</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/preface" className="text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors font-english">
                    Preface
                  </Link>
                </li>
                <li>
                  <Link href="/structure" className="text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors font-english">
                    Structure
                  </Link>
                </li>
              </ul>
            </div>

            {/* Buy me a coffee Column */}
            <div className="flex-shrink-0">
              <h3 className="text-sm font-semibold text-foreground mb-4 font-english">Support</h3>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="https://buymeacoffee.com/jdhruv14"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors font-english"
                  >
                    <Coffee className="h-[14px] w-[14px] shrink-0" />
                    <span>Buy me a coffee</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full mt-12 mb-8 text-center">
          <p className="text-xs text-muted-foreground font-english opacity-70">
            © 2026 Tatva
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
