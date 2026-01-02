import { Metadata } from "next";
import MarkandeyaPuranaPage from "./MarkandeyaPuranaPage";

export const metadata: Metadata = {
  title: "मार्कण्डेय पुराण (Markandeya Purana)",
  description:
    "Read Markandeya Purana - one of the eighteen major Puranas containing stories of creation, mythology, and spiritual teachings including the Devi Mahatmyam.",
  keywords: [
    "Markandeya Purana",
    "मार्कण्डेय पुराण",
    "Puranas",
    "Devi Mahatmyam",
    "Hindu Mythology",
    "Sanskrit",
    "Creation Stories",
  ],
  openGraph: {
    title: "मार्कण्डेय पुराण (Markandeya Purana) | तत्त्व (Tatva)",
    description:
      "Read Markandeya Purana - ancient legends containing stories of creation and spiritual teachings.",
    url: "https://tatva.info/markandeya-purana",
    images: ["/markandaye%20puran.png"],
  },
  alternates: {
    canonical: "https://tatva.info/markandeya-purana",
  },
};

export default function Page() {
  return <MarkandeyaPuranaPage />;
}
