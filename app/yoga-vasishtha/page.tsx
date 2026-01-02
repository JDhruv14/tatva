import { Metadata } from "next";
import YogaVasishthaPage from "./YogaVasishthaPage";

export const metadata: Metadata = {
  title: "योग वासिष्ठ (Yoga Vasishtha)",
  description:
    "Read Yoga Vasishtha - the philosophical dialogue between Prince Rama and Sage Vasishtha on Advaita Vedanta, consciousness, and the nature of reality.",
  keywords: [
    "Yoga Vasishtha",
    "योग वासिष्ठ",
    "Advaita Vedanta",
    "Vasishtha",
    "Rama",
    "Philosophy",
    "Sanskrit",
    "Consciousness",
    "Non-Dualism",
  ],
  openGraph: {
    title: "योग वासिष्ठ (Yoga Vasishtha) | तत्त्व (Tatva)",
    description:
      "Read Yoga Vasishtha - the philosophy of non-dualism through dialogue between Rama and Vasishtha.",
    url: "https://tatva.info/yoga-vasishtha",
    images: ["/yoga%20vasistha.png"],
  },
  alternates: {
    canonical: "https://tatva.info/yoga-vasishtha",
  },
};

export default function Page() {
  return <YogaVasishthaPage />;
}
