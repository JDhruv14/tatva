import { Metadata } from "next";
import BhagavadGitaPage from "./BhagavadGitaPage";

export const metadata: Metadata = {
  title: "भगवद्गीता (Bhagavad Gita)",
  description:
    "Read the Bhagavad Gita - the 700-verse Song of God. A timeless dialogue between Lord Krishna and Arjuna covering philosophy, ethics, and spirituality across 18 chapters.",
  keywords: [
    "Bhagavad Gita",
    "भगवद्गीता",
    "Krishna",
    "Arjuna",
    "Yoga",
    "Karma",
    "Dharma",
    "Sanskrit",
    "Philosophy",
    "Hindu Scriptures",
    "Song of God",
  ],
  openGraph: {
    title: "भगवद्गीता (Bhagavad Gita) | तत्त्व (Tatva)",
    description:
      "Read the Bhagavad Gita - the timeless guide to life with Krishna's teachings on philosophy, ethics, and spirituality.",
    url: "https://tatva.info/bhagavad-gita",
    images: ["/gita.png"],
  },
  alternates: {
    canonical: "https://tatva.info/bhagavad-gita",
  },
};

export default function Page() {
  return <BhagavadGitaPage />;
}
