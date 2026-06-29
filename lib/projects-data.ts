export interface ProjectDeliverable {
  label: string;
}

export interface ProjectMetadata {
  client: string;
  role: string;
  year: string;
  services: string;
  duration?: string;
  industry?: string;
}

export interface CaseStudySection {
  title: string;
  intro: string;
  body: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  heroImage: string;
  showcaseImage: string;
  galleryImages: string[];
  deliverables: ProjectDeliverable[];
  metadata: ProjectMetadata;
  caseStudySections?: CaseStudySection[];
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "01",
    slug: "wemake",
    title: "We Make",
    subtitle: "Design & Manufacturing Studio",
    category: "UX & UI Design",
    description:
      "At We Make, we manufacture products that inspire creation, organization, and learning.",
    longDescription:
      "We Make is a design and manufacturing studio structurally built into two specialized branches to serve your creative and professional workflow. We Make Covers houses our expert print and DTP design hub, crafting striking notebook covers, sketchbooks, drawing blocks, and presentation folders. We Make Stationeries delivers a curated, professional range of school stationery and essential office supplies.",
    image: "/wemake.png",
    heroImage: "/wemake2.jpg",
    showcaseImage: "/wemake1.png",
    galleryImages: [
      "/wemake.png",
      "/wemake1.png",
    ],
    deliverables: [
      { label: "Brand Identity" },
      { label: "Logo System" },
      { label: "CMYK Process Design" },
      { label: "Sub-Brand Architecture" },
      { label: "Print Production" },
      { label: "DTP Design" },
    ],
    metadata: {
      client: "We Make Studio",
      role: "Lead Brand Designer",
      year: "2025",
      services: "Branding & Identity",
      duration: "3 months",
      industry: "Manufacturing · Stationery",
    },
    caseStudySections: [
      {
        title: "The Concept",
        intro:
          "Designing the process of making — an identity built directly upon the philosophy of the factory: production, precision, and physical creation.",
        body:
          "The central icon features an open, dynamic structure representing a folded paper asset, a notebook spine, or stacked desk supplies. It utilizes the foundational four-color printing spectrum — Cyan, Magenta, Yellow, and Black (CMYK) — arranged as overlapping layers. This visualizes the literal 'process of making,' in which individual layers come together to form a completed physical product. Instead of relying on passive imagery, the logo mark actively visualizes the raw mechanics of print and desktop publishing (DTP).",
      },
      {
        title: "Brand Architecture",
        intro:
          "One parent brand, two specialized branches — a cohesive, responsive branding system that maintains absolute clarity across the factory's diverse offerings.",
        body:
          "The Parent Brand 'We Make' uses a clean, geometric sans-serif typeface balanced by the CMYK process icon, establishing a minimalist, modern foundation. The Print Division 'We Make Covers' carries the same iconic CMYK layers shifted to focus on school subject notebooks, drawing blocks, sketchbooks, and paper folders. The Supply Division 'We Make Stationeries' is tailored for classrooms and workspaces, adapting the system to represent school and office stationery supplies through a stacked design that highlights premium paper stocks and essential desk tools.",
      },
      {
        title: "The Result",
        intro:
          "A manufacturing identity that speaks the language of production — where the process itself becomes the brand.",
        body:
          "The layered CMYK icon naturally doubles as an open folder or notebook cover being assembled on an offset press. Every visual touchpoint — from the outer cover to the tools on the desk — is designed with production perfection in mind. The result is a brand family that scales seamlessly, from factory signage to product packaging, while maintaining a strong, recognizable visual DNA across all branches.",
      },
    ],
  },
  {
    id: "02",
    slug: "aarogyamroots",
    title: "Aarogyam Roots",
    subtitle: "Premium Wellness & Beauty Brand",
    category: "Design & Development",
    description:
      "Aarogyam Roots positions itself in the premium, eco-conscious wellness and beauty market.",
    longDescription:
      "The name 'Aarogyam' (derived from Sanskrit, meaning 'overall well-being') combined with 'Roots' instantly communicates a philosophy grounded in traditional wisdom, natural ingredients, and holistic health. The visual identity reinforces this by using organic imagery, an earthy color palette, and elegant typography to build trust and convey the meticulous nature of handmade products.",
    image: "/aarogyam.jpg",
    heroImage: "/aarogyam2.jpg",
    showcaseImage: "/aarogyam1.jpg",
    galleryImages: [
      "/aarogyam.jpg",
      "/aarogyam1.jpg",
    ],
    deliverables: [
      { label: "Brand Identity" },
      { label: "Logo & Monogram" },
      { label: "Color System" },
      { label: "Typography" },
      { label: "Packaging Design" },
      { label: "Brand Guidelines" },
    ],
    metadata: {
      client: "Aarogyam Roots",
      role: "Brand Designer",
      year: "2025",
      services: "Brand Identity",
      duration: "2 months",
      industry: "Wellness · Beauty",
    },
    caseStudySections: [
      {
        title: "Logo Mark & Monogram",
        intro:
          "The interlocking 'AR' monogram uses a classic, high-contrast serif typeface introducing timeless sophistication — crucial for a cosmetics brand where consumers seek safety and quality.",
        body:
          "The monogram is enclosed by a delicate, hand-drawn botanical wreath. The flowing lines and leaf motifs directly represent nature, plant-based ingredients, and the organic, raw origin of the products. The asymmetry and fluidity of the circular framing is imperfect and fluid, subtly echoing the unique, non-industrial quality of handmade items. The logotype 'Aarogyam Roots' is set in an elegant, flowing italic serif font — the soft curves and high legibility evoke a sense of grace, self-care, and luxury.",
      },
      {
        title: "Color Philosophy",
        intro:
          "A palette rooted in earth, nature, and purity — each color chosen for its deep psychological resonance with the brand's core values.",
        body:
          "Earth Brown (#653817) represents the 'Roots' — the earth, raw ingredients, stability, and wholesomeness, anchoring the brand as authentic and unadulterated. Cream/Warm Almond (#F4E5C3) evokes gentleness, purity, and skin-like tones, providing a clean, soothing background canvas that feels softer and more premium than stark white. Sage/Olive Green (#777D5C) symbolizes botanicals, healing, freshness, and organic chemistry, directly tying the cosmetics to plant life and natural vitality.",
      },
      {
        title: "Target & Values",
        intro:
          "Designed for value-driven shoppers who read ingredient labels, appreciate craftsmanship, and prefer small-batch artisan products over mass-market items.",
        body:
          "The primary audience encompasses consumers aged 25–55 who prioritize clean beauty, sustainability, and self-care rituals. They associate natural living with holistic health and are willing to invest in brands that demonstrate genuine commitment to quality. The brand values of Purity (using close-to-nature, uncompromised ingredients), Craftsmanship (honoring the deliberate, slow process of creating handmade cosmetics), and Heritage & Science (blending traditional wellness roots with modern cosmetic safety) form the foundation of every design decision.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | null {
  return PROJECTS_DATA.find((p) => p.slug === slug) ?? null;
}

export function getOtherProjects(currentSlug: string): Project[] {
  return PROJECTS_DATA.filter((p) => p.slug !== currentSlug);
}
