import { Metadata } from "next";
import SrimadBhagavatamPage from "./SrimadBhagavatamPage";

export const metadata: Metadata = {
  title: "श्रीमद् भागवतम् (Srimad Bhagavatam)",
  description:
    "Read Srimad Bhagavatam (Bhagavata Purana) - the story of Lord Krishna and his divine pastimes across 12 Skandas. One of the eighteen major Puranas with profound philosophical teachings.",
  keywords: [
    "Srimad Bhagavatam",
    "Bhagavata Purana",
    "श्रीमद् भागवतम्",
    "Krishna",
    "Puranas",
    "Sanskrit",
    "Skandas",
    "Hindu Scriptures",
  ],
  openGraph: {
    title: "श्रीमद् भागवतम् (Srimad Bhagavatam) | तत्त्व (Tatva)",
    description:
      "Read Srimad Bhagavatam - the story of Lord Krishna across 12 Skandas with profound philosophical teachings.",
    url: "https://tatva.info/srimad-bhagavatam",
    images: ["/srimad%20bhagvatam.png"],
  },
  alternates: {
    canonical: "https://tatva.info/srimad-bhagavatam",
  },
};

export default function Page() {
  return <SrimadBhagavatamPage />;
}
