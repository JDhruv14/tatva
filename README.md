# तत्त्व (Tatva)

**Digital Museum of Ancient Indian Scriptures**

A modern digital library engineered to preserve and prevent the loss of ancient Indian wisdom. *Tatva* provides a distraction-free, interconnected reading experience for the Vedas, Epics, and Puranas, bridging the gap between ancient Sanskrit texts and the modern digital reader.

![Tatva Preview](https://github.com/JDhruv14/tatva/blob/main/public/og_home.png)

## Distinctive Features

### 📚 curated Digital Library
Unlike generic repositories, Tatva offers a structured collection of diverse texts:
- **The Vedas**: *Rigveda* (The oldest known Vedic Sanskrit text).
- **The Epics**: *Ramayana* & *Mahabharata* (including the *Bhagavad Gita*).
- **The Puranas**: *Srimad Bhagavatam*, *Markandeya Purana*, *Devi Mahatmyam*.
- **Dharma Shastras**: *Manu Smriti*, *Parashara Smriti*.
- **Philosophy**: *Yoga Vasishtha*.

### 🧠 Knowledge Architecture
- **Structure Visualization**: A dedicated interactive module (`/structure`) that maps the hierarchy of Sanatan Dharma literature (Shruti vs. Smriti, Vedas -> Upanishads).
- **Preface & Context**: Curated introductions (`/preface`) to help new readers understand the significance of each text before diving in.
- **Interconnected Context**: Designed to show relationships between texts (e.g., Ramopakyana within Mahabharata).



## Tech Stack

- **Core**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State & Animation**: [Motion](https://motion.dev/) & React Hooks
- **Backend Architecture**: [Supabase](https://supabase.com/) (Database & Auth)

## Project Structure

```
app/
  ├── rigveda/           # The Rigveda
  ├── mahabharata/       # Mahabharata & Gita
  ├── ramayana/          # Valmiki Ramayana
  ├── srimad-bhagavatam/ # Bhagavatam Purana
  ├── yoga-vasishtha/    # Philosophical texts
  ├── ...                # (Other scriptures)
  ├── contents/          # Table of Contents
  └── structure/         # Hierarchy Visualizer
src/
  ├── components/        # UI Components
  ├── lib/               # Utilities
  └── integrations/      # Supabase Client
public/                  # Static Assets
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/JDhruv14/dhruv-gnan.git
   cd dhruv-gnan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file with your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Support

If you find value in this project, you can support its development:

[![GitHub Sponsors](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=github-sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/JDhruv14)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/jdhruv14)

---

## Creator

Built by [@dhruvtwt_](https://x.com/dhruvtwt_)


