import { Metadata } from "next";
import ParasharaPage from "./ParasharaPage";

export const metadata: Metadata = {
  title: "पराशर होरा शास्त्र (Parashara Hora Shastra)",
  description:
    "Read Parashara Hora Shastra - the foundational text of Vedic astrology by Sage Parashara. Comprehensive teachings on horoscopy, planetary influences, and predictive astrology.",
  keywords: [
    "Parashara Hora Shastra",
    "पराशर होरा शास्त्र",
    "Vedic Astrology",
    "Jyotish",
    "Horoscopy",
    "Sanskrit",
    "Sage Parashara",
    "Planets",
  ],
  openGraph: {
    title: "पराशर होरा शास्त्र (Parashara Hora Shastra) | तत्त्व (Tatva)",
    description:
      "Read Parashara Hora Shastra - the science of Vedic astrology and horoscopy.",
    url: "https://tatva.info/parashara",
    images: ["/parahar%20sastra.png"],
  },
  alternates: {
    canonical: "https://tatva.info/parashara",
  },
};

export default function Page() {
  return <ParasharaPage />;
}
