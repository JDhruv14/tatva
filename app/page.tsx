import { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "तत्त्व (Tatva) - Digital Museum of Ancient Indian Scriptures",
  description:
    "Explore the timeless wisdom of ancient India. Read Rigveda, Mahabharata, Ramayana, Bhagavad Gita, and more sacred texts in a beautiful, modern digital interface.",
  openGraph: {
    title: "तत्त्व (Tatva) - Digital Museum of Ancient Indian Scriptures",
    description:
      "Explore the timeless wisdom of ancient India. Read Rigveda, Mahabharata, Ramayana, Bhagavad Gita, and more sacred texts.",
    url: "https://tatva.info",
  },
};

export default function Page() {
  return <HomePage />;
}
