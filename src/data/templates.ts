export interface TemplateOption {
  id: string;
  name: string;
  category: string;
  description: string;
  badge?: string;
  fontFamily: string;
}

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: "classic",
    name: "Classic Executive",
    category: "Academic & Corporate",
    description: "The primary design: Harvard-style academic serif, centered header, elegant gradient divider rules.",
    badge: "Primary",
    fontFamily: "'Crimson Pro', 'Georgia', serif",
  },
  {
    id: "modern",
    name: "Silicon Valley Tech",
    category: "Modern Tech",
    description: "Left-aligned clean sans-serif with pill-badge technology tags and modern status bar.",
    badge: "Popular",
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
  },
  {
    id: "sidebar",
    name: "Executive Sidebar",
    category: "2-Column Split",
    description: "Asymmetric 2-column layout with left sidebar for skills, contact, education, and main area for experience.",
    badge: "Pro",
    fontFamily: "'Inter', sans-serif",
  },
  {
    id: "minimal",
    name: "Minimalist Swiss",
    category: "Grid & Editorial",
    description: "Bauhaus Swiss typography with dates on the left and content aligned in an editorial grid.",
    fontFamily: "'Outfit', 'Inter', sans-serif",
  },
  {
    id: "bordered",
    name: "Bordered Monogram",
    category: "Luxury Formal",
    description: "Framed page borders with 'NA' monogram crest, classical typography, and formal dividers.",
    fontFamily: "'Crimson Pro', 'Georgia', serif",
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    category: "Product & Design",
    description: "Vibrant gradient header banner, card-like project modules, and modern badge typography.",
    badge: "Featured",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  {
    id: "compact",
    name: "High-Density ATS Pro",
    category: "ATS Optimized",
    description: "Engineered for maximum content density and 100% automated ATS scanner accuracy.",
    fontFamily: "'Inter', sans-serif",
  },
  {
    id: "nordic",
    name: "Nordic Minimal",
    category: "Scandinavian",
    description: "Understated luxury, delicate bullet dots, soft contrast, and generous spatial rhythm.",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
];
