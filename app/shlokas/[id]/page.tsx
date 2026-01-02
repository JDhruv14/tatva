import { Metadata } from "next";
import ShlokaPage from "./ShlokaPage";

type Props = {
  params: Promise<{ id: string }>;
};

// Book code to name mapping
const bookNames: Record<string, { english: string; hindi: string }> = {
  rv: { english: "Rigveda", hindi: "ऋग्वेद" },
  rm: { english: "Ramayana", hindi: "रामायण" },
  mb: { english: "Mahabharata", hindi: "महाभारत" },
  bg: { english: "Bhagavad Gita", hindi: "भगवद्गीता" },
  sbp: { english: "Srimad Bhagavatam", hindi: "श्रीमद् भागवतम्" },
  ms: { english: "Manu Smriti", hindi: "मनु स्मृति" },
  mp: { english: "Markandeya Purana", hindi: "मार्कण्डेय पुराण" },
  dm: { english: "Devi Mahatmyam", hindi: "देवी महात्म्यम्" },
  ph: { english: "Parashara Hora Shastra", hindi: "पराशर होरा शास्त्र" },
  ro: { english: "Ramopakyana", hindi: "रामोपाख्यान" },
  yv: { english: "Yoga Vasishtha", hindi: "योग वासिष्ठ" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  // Parse book code from id (e.g., "rm-1-1-1" -> "rm")
  const bookCode = id?.split("-")[0] || "";
  const sectionNum = id?.split("-")[1] || "";
  const chapterNum = id?.split("-")[2] || "";
  
  const book = bookNames[bookCode] || { english: "Sacred Text", hindi: "पवित्र ग्रंथ" };
  
  return {
    title: `${book.hindi} - Section ${sectionNum}, Chapter ${chapterNum}`,
    description: `Read shlokas from ${book.english} (${book.hindi}). Section ${sectionNum}, Chapter ${chapterNum}. Explore the sacred verses with Sanskrit text, transliteration, and English translation.`,
    openGraph: {
      title: `${book.hindi} (${book.english}) | तत्त्व (Tatva)`,
      description: `Read shlokas from ${book.english}. Section ${sectionNum}, Chapter ${chapterNum}.`,
      url: `https://tatva.info/shlokas/${id}`,
    },
    alternates: {
      canonical: `https://tatva.info/shlokas/${id}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ShlokaPage id={id} />;
}
