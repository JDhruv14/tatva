import { Metadata } from "next";
import ContentsPage from "./ContentsPage";

export const metadata: Metadata = {
  title: "Sacred Texts Collection",
  description:
    "Browse our complete collection of ancient Indian scriptures including Rigveda, Ramayana, Mahabharata, Bhagavad Gita, Srimad Bhagavatam, and more.",
  openGraph: {
    title: "Sacred Texts Collection | तत्त्व (Tatva)",
    description:
      "Browse our complete collection of ancient Indian scriptures including Rigveda, Ramayana, Mahabharata, and more.",
    url: "https://tatva.info/contents",
  },
  alternates: {
    canonical: "https://tatva.info/contents",
  },
};

export default function Page() {
  return <ContentsPage />;
}
