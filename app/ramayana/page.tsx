import { Metadata } from "next";
import RamayanaPage from "./RamayanaPage";

export const metadata: Metadata = {
  title: "रामायण (Ramayana)",
  description:
    "Read the Ramayana - the eternal story of Lord Rama composed by Maharshi Valmiki. Through 24,000 verses across 7 Kandas, discover love, duty, sacrifice, and the triumph of good over evil.",
  keywords: [
    "Ramayana",
    "रामायण",
    "Valmiki",
    "Lord Rama",
    "Sita",
    "Hanuman",
    "Epic",
    "Sanskrit",
    "Kanda",
    "Hindu Scriptures",
  ],
  openGraph: {
    title: "रामायण (Ramayana) | तत्त्व (Tatva)",
    description:
      "Read the Ramayana - the eternal story of Lord Rama. The ideal of human conduct and divine grace through 24,000 verses.",
    url: "https://tatva.info/ramayana",
    images: ["/ramayana.png"],
  },
  alternates: {
    canonical: "https://tatva.info/ramayana",
  },
};

export default function Page() {
  return <RamayanaPage />;
}
