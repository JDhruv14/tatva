import { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "तत्त्व (Tatva) - Digital Museum of Ancient Indian Scriptures",
  description:
    "Discover ancient Indian texts through a modern digital library designed to make reading, exploration, and understanding more approachable and interconnected.",
  openGraph: {
    title: "तत्त्व (Tatva) - Digital Museum of Ancient Indian Scriptures",
    description:
      "Discover ancient Indian texts through a modern digital library designed to make reading, exploration, and understanding more approachable and interconnected",
    url: "https://tatva.info",
  },
};

export default function Page() {
  return <HomePage />;
}

