import { Metadata } from "next";
import PrefacePage from "./PrefacePage";

export const metadata: Metadata = {
  title: "Preface",
  description:
    "Learn about Project Tatva (तत्त्व) - a modern digital museum of ancient Indian texts. Discover our mission to make timeless Sanskrit texts accessible and meaningful to contemporary readers.",
  openGraph: {
    title: "Preface | तत्त्व (Tatva)",
    description:
      "Learn about Project Tatva - our mission to preserve and share ancient Indian wisdom.",
    url: "https://tatva.info/preface",
  },
  alternates: {
    canonical: "https://tatva.info/preface",
  },
};

export default function Page() {
  return <PrefacePage />;
}
