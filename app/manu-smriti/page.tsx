import { Metadata } from "next";
import ManuSmritiPage from "./ManuSmritiPage";

export const metadata: Metadata = {
  title: "मनु स्मृति (Manu Smriti)",
  description:
    "Read Manu Smriti - the ancient text of Hindu law and social order. Contains guidelines for righteous living, social conduct, and dharma.",
  keywords: [
    "Manu Smriti",
    "मनु स्मृति",
    "Laws of Manu",
    "Dharma Shastra",
    "Hindu Law",
    "Sanskrit",
    "Social Order",
  ],
  openGraph: {
    title: "मनु स्मृति (Manu Smriti) | तत्त्व (Tatva)",
    description:
      "Read Manu Smriti - the Laws of Manu, an ancient text on dharma and social conduct.",
    url: "https://tatva.info/manu-smriti",
    images: ["/manu%20smriti.png"],
  },
  alternates: {
    canonical: "https://tatva.info/manu-smriti",
  },
};

export default function Page() {
  return <ManuSmritiPage />;
}
