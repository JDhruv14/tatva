import { Metadata } from "next";
import StructurePage from "./StructurePage";

export const metadata: Metadata = {
  title: "Structure & Organization",
  description:
    "Explore the hierarchical organization of Sanskrit literature - from Vedic texts to classical poetry, philosophy, and sciences. Understand how ancient Indian literature is categorized and organized.",
  keywords: [
    "Sanskrit Literature",
    "Vedic Literature",
    "Hindu Scriptures Structure",
    "Puranas",
    "Itihasa",
    "Darshana",
    "Indian Philosophy",
    "Ancient Texts Organization",
  ],
  openGraph: {
    title: "Structure & Organization | तत्त्व (Tatva)",
    description:
      "The hierarchical organization of Sanskrit literature - Vedas, Puranas, Epics, and more.",
    url: "https://tatva.info/structure",
  },
  alternates: {
    canonical: "https://tatva.info/structure",
  },
};

export default function Page() {
  return <StructurePage />;
}
