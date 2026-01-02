"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

interface TreeNode {
  name: string;
  sanskrit?: string;
  children?: TreeNode[];
  highlight?: boolean;
  hasData?: boolean;
}

export default function StructurePage() {
  const treeData: TreeNode[] = [
    {
      name: "Vedic Literature",
      sanskrit: "वैदिक साहित्य",
      children: [
        {
          name: "Samhitas",
          sanskrit: "संहिता",
          children: [
            { name: "Rigveda", sanskrit: "ऋग्वेद", hasData: true },
            { name: "Yajurveda", sanskrit: "यजुर्वेद" },
            { name: "Samaveda", sanskrit: "सामवेद" },
            { name: "Atharvaveda", sanskrit: "अथर्ववेद" }
          ]
        },
        {
          name: "Upanishads",
          sanskrit: "उपनिषद्",
          children: [
            { name: "Ishavasya", sanskrit: "ईशावास्योपनिषद्" },
            { name: "Kena", sanskrit: "केनोपनिषद्" },
            { name: "Katha", sanskrit: "कठोपनिषद्" },
            { name: "Prashna", sanskrit: "प्रश्नोपनिषद्" },
            { name: "Mundaka", sanskrit: "मुण्डकोपनिषद्" },
            { name: "Mandukya", sanskrit: "माण्डूक्योपनिषद्" },
            { name: "Taittiriya", sanskrit: "तैत्तिरीयोपनिषद्" },
            { name: "Aitareya", sanskrit: "ऐतरेयोपनिषद्" },
            { name: "Chandogya", sanskrit: "छान्दोग्योपनिषद्" },
            { name: "Brihadaranyaka", sanskrit: "बृहदारण्यकोपनिषद्" },
            { name: "Shvetashvatara", sanskrit: "श्वेताश्वतरोपनिषद्" }
          ]
        },
        {
          name: "Vedanga",
          sanskrit: "वेदाङ्ग",
          children: [
            { name: "Vyakarana", sanskrit: "व्याकरण" },
            {
              name: "Jyotisha", sanskrit: "ज्योतिष", children: [
                { name: "Parashara Hora Shastra", sanskrit: "पराशर होरा शास्त्र", hasData: true }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Itihasa",
      sanskrit: "इतिहास",
      children: [
        { name: "Ramayana", sanskrit: "रामायण", hasData: true },
        {
          name: "Mahabharata",
          sanskrit: "महाभारत",
          hasData: true,
          children: [
            { name: "Bhagavad Gita", sanskrit: "भगवद्गीता", hasData: true },
            { name: "Rāmopākhyāna", sanskrit: "रामोपाख्यान", hasData: true }
          ]
        }
      ]
    },
    {
      name: "Purana",
      sanskrit: "पुराण",
      children: [
        {
          name: "Maha Puranas",
          sanskrit: "महापुराण",
          children: [
            { name: "Srimad Bhagavatam", sanskrit: "श्रीमद्भागवत पुराण", highlight: true, hasData: true },
            { name: "Vishnu Purana", sanskrit: "विष्णु पुराण" },
            { name: "Shiva Purana", sanskrit: "शिव पुराण" },
            {
              name: "Markandeya Purana", sanskrit: "मार्कण्डेय पुराण", hasData: true, children: [
                { name: "Devi Mahatmyam", sanskrit: "देवी महात्म्यम्", hasData: true }
              ]
            },
            { name: "Skanda Purana", sanskrit: "स्कन्द पुराण" },
            { name: "Garuda Purana", sanskrit: "गरुड़ पुराण" },
            { name: "Padma Purana", sanskrit: "पद्म पुराण" },
            { name: "Agni Purana", sanskrit: "अग्नि पुराण" }
          ]
        },
        {
          name: "Upa Puranas",
          sanskrit: "उपपुराण",
          children: [
            { name: "Ganesha Purana", sanskrit: "गणेश पुराण" }
          ]
        }
      ]
    },
    {
      name: "Darshana",
      sanskrit: "दर्शन",
      children: [
        {
          name: "Vedanta",
          sanskrit: "वेदान्त",
          children: [
            {
              name: "Prasthanatrayi",
              sanskrit: "प्रस्थानत्रयी",
              children: [
                { name: "Upanishads", sanskrit: "उपनिषद्" },
                { name: "Brahma Sutras", sanskrit: "ब्रह्म सूत्र" },
                { name: "Bhagavad Gita", sanskrit: "भगवद्गीता" }
              ]
            },
            {
              name: "Advaita Vedanta",
              sanskrit: "अद्वैत वेदान्त",
              children: [
                { name: "Shankara Bhashyas", sanskrit: "शंकर भाष्य" },
                { name: "Vivekachudamani", sanskrit: "विवेकचूडामणि" },
                { name: "Atma Bodha", sanskrit: "आत्मबोध" },
                { name: "Upadesa Sahasri", sanskrit: "उपदेश साहस्री" },
                { name: "Panchadasi", sanskrit: "पञ्चदशी" }
              ]
            }
          ]
        },
        {
          name: "Yoga",
          sanskrit: "योग",
          children: [
            { name: "Patanjali Yoga Sutras", sanskrit: "पतञ्जलि योग सूत्र" },
            { name: "Yoga Vasistha", sanskrit: "योग वासिष्ठ", hasData: true }
          ]
        },
        {
          name: "Samkhya",
          sanskrit: "सांख्य",
          children: [
            { name: "Samkhya Karika", sanskrit: "सांख्य कारिका" }
          ]
        },
        {
          name: "Nyaya",
          sanskrit: "न्याय",
          children: [
            { name: "Nyaya Sutras", sanskrit: "न्याय सूत्र" }
          ]
        },
        {
          name: "Vaisheshika",
          sanskrit: "वैशेषिक",
          children: [
            { name: "Vaisheshika Sutras", sanskrit: "वैशेषिक सूत्र" }
          ]
        },
        {
          name: "Mimamsa",
          sanskrit: "मीमांसा",
          children: [
            { name: "Jaimini Sutras", sanskrit: "जैमिनि सूत्र" }
          ]
        }
      ]
    },
    {
      name: "Dharma Shastra",
      sanskrit: "धर्मशास्त्र",
      children: [
        { name: "Manusmriti", sanskrit: "मनु स्मृति", hasData: true },
        { name: "Yajnavalkya Smriti", sanskrit: "याज्ञवल्क्य स्मृति" },
        { name: "Parashara Smriti", sanskrit: "पराशर स्मृति" }
      ]
    },
    {
      name: "Sahitya",
      sanskrit: "साहित्य",
      children: [
        {
          name: "Mahakavya",
          sanskrit: "महाकाव्य",
          children: [
            {
              name: "Kalidasa",
              sanskrit: "कालिदास",
              children: [
                { name: "Raghuvamsham", sanskrit: "रघुवंशम्" },
                { name: "Kumarasambhavam", sanskrit: "कुमारसम्भवम्" }
              ]
            },
            {
              name: "Bharavi",
              sanskrit: "भारवि",
              children: [
                { name: "Kiratarjuniyam", sanskrit: "किरातार्जुनीयम्" }
              ]
            }
          ]
        },
        {
          name: "Nataka",
          sanskrit: "नाटक",
          children: [
            {
              name: "Kalidasa",
              sanskrit: "कालिदास",
              children: [
                { name: "Abhijnana Shakuntalam", sanskrit: "अभिज्ञानशाकुन्तलम्", highlight: true },
                { name: "Vikramorvasiyam", sanskrit: "विक्रमोर्वशीयम्" },
                { name: "Malavikagnimitram", sanskrit: "मालविकाग्निमित्रम्" }
              ]
            },
            {
              name: "Bhasa",
              sanskrit: "भास",
              children: [
                { name: "Svapnavasavadattam", sanskrit: "स्वप्नवासवदत्तम्" }
              ]
            }
          ]
        },
        {
          name: "Khandakavya",
          sanskrit: "खण्डकाव्य",
          children: [
            { name: "Meghadutam", sanskrit: "मेघदूतम्" },
            { name: "Ritusamhara", sanskrit: "ऋतुसंहार" }
          ]
        },
        {
          name: "Katha",
          sanskrit: "कथा",
          children: [
            { name: "Panchatantra", sanskrit: "पञ्चतन्त्र" },
            { name: "Hitopadesha", sanskrit: "हितोपदेश" },
            { name: "Kathasaritsagara", sanskrit: "कथासरित्सागर" }
          ]
        }
      ]
    },
    {
      name: "Stotra & Mantra",
      sanskrit: "स्तोत्र और मन्त्र",
      children: [
        { name: "Aditya Hridayam", sanskrit: "आदित्य हृदयम्" },
        { name: "Soundarya Lahari", sanskrit: "सौन्दर्य लहरी" },
        { name: "Shiva Tandava Stotram", sanskrit: "शिव ताण्डव स्तोत्रम्" },
        { name: "Hanuman Chalisa", sanskrit: "हनुमान चालीसा" },
        { name: "Gita Govinda", sanskrit: "गीत गोविन्द" }
      ]
    },
    {
      name: "Sastra",
      sanskrit: "शास्त्र",
      children: [
        { name: "Arthashastra", sanskrit: "अर्थशास्त्र" },
        { name: "Kamasutra", sanskrit: "कामसूत्र" },
        {
          name: "Ayurveda",
          sanskrit: "आयुर्वेद",
          children: [
            { name: "Charaka Samhita", sanskrit: "चरक संहिता" },
            { name: "Sushruta Samhita", sanskrit: "सुश्रुत संहिता" },
            { name: "Ashtanga Hridayam", sanskrit: "अष्टाङ्ग हृदयम्" }
          ]
        },
        { name: "Natyashastra", sanskrit: "नाट्यशास्त्र" },
        { name: "Amarakosha", sanskrit: "अमरकोश" }
      ]
    }
  ];

  const renderTreeNode = (node: TreeNode, level: number = 0, isLast: boolean = false, parentPath: string[] = [], siblings: TreeNode[] = [], index: number = 0) => {
    const currentPath = [...parentPath, node.name];
    const hasChildren = node.children && node.children.length > 0;
    const indent = level * 1.5;
    const connectorLeft = (level - 1) * 1.5 + 0.5;

    return (
      <div key={node.name} className="relative">
        <div
          className="flex items-start gap-2 py-0.5 relative group"
          style={{ paddingLeft: `${indent}rem` }}
        >
          {level > 0 && (
            <>
              {(!isLast || hasChildren) && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-px border-l border-border/30"
                  style={{ left: `${connectorLeft}rem` }}
                />
              )}
              <div
                className={`absolute left-0 top-3 h-px border-t border-border/30 ${isLast ? 'w-3' : 'w-3'
                  }`}
                style={{ left: `${connectorLeft}rem` }}
              />
            </>
          )}

          <div className="flex-shrink-0 mt-0.5 text-muted-foreground/40 font-mono text-xs w-6">
            {hasChildren ? (
              <span className="select-none">├──</span>
            ) : (
              <span className="select-none">{isLast ? '└──' : '├──'}</span>
            )}
          </div>

          <span
            className={`text-base font-english ${node.hasData === true
              ? level === 0
                ? 'text-primary font-semibold'
                : level === 1
                  ? 'text-primary font-medium'
                  : 'text-primary'
              : level === 0
                ? 'text-foreground font-semibold'
                : level === 1
                  ? 'text-foreground/80 font-medium italic'
                  : 'text-foreground/70 italic'
              } ${node.highlight ? 'text-primary font-semibold' : ''
              }`}
          >
            {node.sanskrit ? (
              <>
                <span className={`font-sanskrit ${node.hasData === true ? 'text-primary' : ''
                  }`}>{node.sanskrit}</span>
                <span className="mx-2">{node.name}</span>
              </>
            ) : (
              <span>{node.name}</span>
            )}
          </span>
        </div>

        {hasChildren && (
          <div className="relative">
            {node.children!.map((child, idx) =>
              renderTreeNode(
                child,
                level + 1,
                idx === node.children!.length - 1,
                currentPath,
                node.children!,
                idx
              )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="glow-ambient animate-pulse-slow" />
      <Header />

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 animate-fade-up"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-12 animate-fade-up-delay-1">
          <h1 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight text-foreground font-english">
            Structure & Organization
          </h1>
          <p className="text-muted-foreground text-lg font-english">
            The hierarchical organization of Sanskrit literature
          </p>
        </div>

        <div className="mb-8 animate-fade-up-delay-2">
          <p className="text-muted-foreground leading-relaxed font-english mb-4">
            Indian literature is incredibly vast and deep. There are many scriptures and texts that exist today which we barely understand, and many others that have been lost over time. Because of this scale and complexity, approaching Sanskrit literature without structure can feel overwhelming.
          </p>
          <p className="text-muted-foreground leading-relaxed font-english mb-4">
            Here, I am trying to organize the Sanskrit texts that are currently available and present them in a tree-like structure. This structure spans a wide range of works from philosophical and spiritual texts to religious and knowledge-based literature.
          </p>
          <p className="text-muted-foreground leading-relaxed font-english">
            The texts that are highlighted in this structure are the ones I have added so far, and they are available for you to read. My long-term goal is to gradually identify, collect, and add more works from this structure to the website. Until then, this overview can also serve as a guide for those who wish to explore and learn more about these texts on their own.
          </p>
        </div>

        <div className="animate-fade-up-delay-3">
          <Card className="bg-card border border-border overflow-hidden">
            <CardContent className="p-8 overflow-x-auto">
              <div className="space-y-0 text-lg min-w-max font-mono">
                {treeData.map((node, index) =>
                  renderTreeNode(node, 0, index === treeData.length - 1, [], treeData, index)
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 animate-fade-up-delay-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-english">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500"></div>
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-muted-foreground/50"></div>
              <span className="text-muted-foreground">Not Available Yet</span>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}

