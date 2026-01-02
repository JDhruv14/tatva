import { Metadata } from "next";
import DeviMahatmyamPage from "./DeviMahatmyamPage";

export const metadata: Metadata = {
  title: "देवी महात्म्यम् (Devi Mahatmyam)",
  description:
    "Read Devi Mahatmyam (Durga Saptashati) - the sacred text glorifying the Divine Mother. Describes the goddess's victories over demons and her role as the supreme cosmic power.",
  keywords: [
    "Devi Mahatmyam",
    "Durga Saptashati",
    "देवी महात्म्यम्",
    "Divine Mother",
    "Durga",
    "Goddess",
    "Sanskrit",
    "Hindu Scriptures",
  ],
  openGraph: {
    title: "देवी महात्म्यम् (Devi Mahatmyam) | तत्त्व (Tatva)",
    description:
      "Read Devi Mahatmyam - the Glory of the Divine Mother, also known as Durga Saptashati.",
    url: "https://tatva.info/devi-mahatmyam",
    images: ["/devi.png"],
  },
  alternates: {
    canonical: "https://tatva.info/devi-mahatmyam",
  },
};

export default function Page() {
  return <DeviMahatmyamPage />;
}
