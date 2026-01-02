import { Metadata } from "next";
import RamopakyanaPage from "./RamopakyanaPage";

export const metadata: Metadata = {
  title: "रामोपाख्यान (Ramopakyana)",
  description:
    "Read Ramopakyana - the story of Lord Rama as narrated in the Mahabharata. A condensed version of the Ramayana highlighting key events and teachings.",
  keywords: [
    "Ramopakyana",
    "रामोपाख्यान",
    "Mahabharata",
    "Rama",
    "Sanskrit",
    "Epic",
    "Hindu Scriptures",
  ],
  openGraph: {
    title: "रामोपाख्यान (Ramopakyana) | तत्त्व (Tatva)",
    description:
      "Read Ramopakyana - the story of Rama from the Mahabharata.",
    url: "https://tatva.info/ramopakyana",
    images: ["/Rāmopākhyāna.png"],
  },
  alternates: {
    canonical: "https://tatva.info/ramopakyana",
  },
};

export default function Page() {
  return <RamopakyanaPage />;
}
