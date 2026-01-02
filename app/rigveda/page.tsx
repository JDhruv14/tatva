import { Metadata } from "next";
import RigvedaPage from "./RigvedaPage";

export const metadata: Metadata = {
  title: "ऋग्वेद (Rigveda)",
  description:
    "Read the Rigveda - the oldest of the four Vedas containing 1,028 hymns (sūktas) organized into 10 mandalas. Sacred hymns dedicated to various deities with profound philosophical insights.",
  keywords: [
    "Rigveda",
    "ऋग्वेद",
    "Vedas",
    "Mandala",
    "Sanskrit",
    "Ancient Indian Texts",
    "Hindu Scriptures",
    "Hymns",
    "Suktas",
  ],
  openGraph: {
    title: "ऋग्वेद (Rigveda) | तत्त्व (Tatva)",
    description:
      "Read the Rigveda - the oldest of the four Vedas containing 1,028 hymns organized into 10 mandalas.",
    url: "https://tatva.info/rigveda",
    images: ["/rigveda.png"],
  },
  alternates: {
    canonical: "https://tatva.info/rigveda",
  },
};

export default function Page() {
  return <RigvedaPage />;
}
