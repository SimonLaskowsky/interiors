export type Hotspot = {
  x: number; // 0-1 within the image
  y: number;
  title: string;
  detail: string;
  source?: string;
};

export type Tile = {
  id: string;
  span: "big" | "wide" | "tall" | "std";
  src: string;
  alt: string;
  caption?: string;
  hotspots: Hotspot[];
};

export type House = {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  photo: string;
  // 0-1 coordinates of the door / entry point on the hero photo
  door: { x: number; y: number };
  // CSS object-position — useful for portrait photos, so the interesting
  // part stays on screen when cropped to landscape.
  objectPosition?: string;
  tiles: Tile[];
};

// Curated Unsplash interior photography (brutalist / minimal / concrete).
// Using direct image URLs with Unsplash's on-the-fly resize so we don't
// need to ship the binaries in /public.
const u = (id: string, w = 1600, h = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&q=80&auto=format&fit=crop`;

// Shared set of photos used across the landing gallery, the carousel reel
// slide, and the single-post strip — keep these in sync so the brand
// reads as one system.
export const INTERIORS = {
  concreteLiving: "1616486338812-3dadae4b4ace",
  stairConcrete: "1522771739844-6a9f6d5f14af",
  bedroomLinen: "1540574163026-643ea20ade25",
  kitchenModern: "1600210492486-724fe5c67fb0",
  bathStone: "1552321554-5fefe8c9ef14",
  readingNook: "1600585154340-be6161a56a0c",
  gardenCourt: "1616046229478-9901c5536a45",
  diningMoody: "1617806118233-18e1de247200",
  libraryOak: "1583847268964-b28dc8f51f92",
  hallShadow: "1615529182904-14819c35db37",
  studyConcrete: "1567767292278-a4f21aa2d36e",
  terraceSun: "1618221118493-9cfa1a1c00da",
  kitchenGreen: "1600607687939-ce8a6c25118c",
} as const;

export const interiorUrl = (
  id: keyof typeof INTERIORS,
  w = 1600,
  h = 1200,
) => u(INTERIORS[id], w, h);

export const spanClass: Record<Tile["span"], string> = {
  big: "md:col-span-6 md:row-span-2",
  wide: "md:col-span-6 md:row-span-1",
  tall: "md:col-span-3 md:row-span-2",
  std: "md:col-span-3 md:row-span-1",
};

export const houses: House[] = [
  {
    id: "courtyard",
    name: "Residence 04",
    subtitle: "Courtyard",
    tagline: "A sunken planter, four walls, one opening.",
    photo: "/hero/mansion.jpg",
    door: { x: 0.542, y: 0.585 },
    objectPosition: "50% 50%",
    tiles: [
      {
        id: "living",
        span: "big",
        src: interiorUrl("concreteLiving", 1800, 1400),
        alt: "Living room — concrete walls, oak floor",
        caption: "Living Hall",
        hotspots: [
          {
            x: 0.32,
            y: 0.58,
            title: "Basalt coffee table",
            detail:
              "Hand-cut basalt on welded steel base. Commissioned locally.",
            source: "Studio Krei",
          },
          {
            x: 0.72,
            y: 0.45,
            title: "Wool boucle sofa",
            detail:
              "Custom 320cm sofa in undyed New Zealand wool boucle.",
            source: "Laskowski.studio × Maker",
          },
        ],
      },
      {
        id: "reading",
        span: "wide",
        src: interiorUrl("readingNook", 1800, 900),
        alt: "Reading nook — glass wall",
        caption: "Reading nook",
        hotspots: [
          {
            x: 0.25,
            y: 0.6,
            title: "Lounge chair",
            detail: "Bent plywood, charred oak finish.",
            source: "Private commission",
          },
          {
            x: 0.78,
            y: 0.42,
            title: "Ficus Lyrata",
            detail: "Mature specimen, 2.4m.",
            source: "Greenhouse No. 6",
          },
        ],
      },
      {
        id: "bath",
        span: "std",
        src: interiorUrl("bathStone", 1200, 1200),
        alt: "Bath — travertine",
        caption: "Bath",
        hotspots: [
          {
            x: 0.6,
            y: 0.55,
            title: "Travertine basin",
            detail: "Solid block, hand-finished.",
            source: "Cava Romano",
          },
        ],
      },
      {
        id: "garden",
        span: "std",
        src: interiorUrl("gardenCourt", 1200, 1200),
        alt: "Inner garden — courtyard",
        caption: "Courtyard",
        hotspots: [
          {
            x: 0.55,
            y: 0.5,
            title: "Sculpted hedge",
            detail: "Buxus, trained over 6 years.",
          },
        ],
      },
    ],
  },
  {
    id: "ascension",
    name: "Villa 07",
    subtitle: "Ascension",
    tagline: "A wall, a stair, a threshold at the top.",
    photo: "/hero/house-02.jpg",
    // Entry point at the top of the stairs
    door: { x: 0.53, y: 0.45 },
    objectPosition: "50% 50%",
    tiles: [
      {
        id: "stair",
        span: "tall",
        src: interiorUrl("stairConcrete", 1200, 1600),
        alt: "Concrete stair",
        caption: "Stair",
        hotspots: [
          {
            x: 0.5,
            y: 0.65,
            title: "Cantilevered treads",
            detail: "Poured in place, no visible fixings.",
          },
        ],
      },
      {
        id: "bedroom",
        span: "big",
        src: interiorUrl("bedroomLinen", 1800, 1400),
        alt: "Bedroom — linen and oak",
        caption: "Primary suite",
        hotspots: [
          {
            x: 0.42,
            y: 0.52,
            title: "Linen bedding",
            detail: "Stonewashed Belgian linen, custom dye.",
            source: "Libeco",
          },
          {
            x: 0.18,
            y: 0.7,
            title: "Sconce — Pillar",
            detail: "Alabaster pillar sconce, 1/8 edition.",
            source: "Laskowski.studio",
          },
        ],
      },
      {
        id: "dining",
        span: "wide",
        src: interiorUrl("diningMoody", 1800, 900),
        alt: "Dining — moody",
        caption: "Dining",
        hotspots: [
          {
            x: 0.5,
            y: 0.5,
            title: "Dining table",
            detail: "Single slab walnut, 3.2m.",
            source: "Studio Krei",
          },
        ],
      },
      {
        id: "library",
        span: "std",
        src: interiorUrl("libraryOak", 1200, 1200),
        alt: "Library",
        caption: "Library",
        hotspots: [
          {
            x: 0.4,
            y: 0.4,
            title: "Charred oak shelving",
            detail: "Shou-sugi-ban technique. 11m run.",
            source: "Laskowski.studio",
          },
        ],
      },
    ],
  },
  {
    id: "monolith",
    name: "Pavilion 02",
    subtitle: "Monolith Study",
    tagline: "Three volumes. No ornament. Only shadow.",
    photo: "/hero/house-03.jpg",
    // Entry at the base of the center volume
    door: { x: 0.62, y: 0.78 },
    objectPosition: "50% 50%",
    tiles: [
      {
        id: "kitchen",
        span: "big",
        src: interiorUrl("kitchenGreen", 1800, 1400),
        alt: "Kitchen — brushed steel and moss",
        caption: "Kitchen",
        hotspots: [
          {
            x: 0.5,
            y: 0.3,
            title: "Pendant — Form 03",
            detail: "Cast aluminum pendant in moss finish.",
            source: "Loev Lighting",
          },
        ],
      },
      {
        id: "hall",
        span: "wide",
        src: interiorUrl("hallShadow", 1800, 900),
        alt: "Entrance hall",
        caption: "Hall",
        hotspots: [
          {
            x: 0.5,
            y: 0.5,
            title: "Travertine slab",
            detail: "Single 4.8m slab, book-matched.",
            source: "Cava Romano",
          },
        ],
      },
      {
        id: "study",
        span: "tall",
        src: interiorUrl("studyConcrete", 1200, 1600),
        alt: "Study",
        caption: "Study",
        hotspots: [
          {
            x: 0.5,
            y: 0.4,
            title: "Desk — Plinth",
            detail: "Cast concrete with hidden cable channel.",
            source: "Laskowski.studio",
          },
        ],
      },
      {
        id: "terrace",
        span: "std",
        src: interiorUrl("terraceSun", 1200, 1200),
        alt: "Terrace",
        caption: "Terrace",
        hotspots: [
          {
            x: 0.5,
            y: 0.55,
            title: "Olive tree",
            detail: "Century-old, transplanted.",
          },
        ],
      },
    ],
  },
];
