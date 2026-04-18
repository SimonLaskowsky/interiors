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

const img = (seed: string, w = 1600, h = 1200) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

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
        src: img("concrete-living", 1800, 1400),
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
            source: "Atelier 09 × Maker",
          },
        ],
      },
      {
        id: "reading",
        span: "wide",
        src: img("reading-nook", 1800, 900),
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
        src: img("bath-stone", 1200, 1200),
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
        src: img("garden-court", 1200, 1200),
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
        src: img("stair-concrete", 1200, 1600),
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
        src: img("bedroom-linen", 1800, 1400),
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
            source: "Atelier 09",
          },
        ],
      },
      {
        id: "dining",
        span: "wide",
        src: img("dining-moody", 1800, 900),
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
        src: img("library-oak", 1200, 1200),
        alt: "Library",
        caption: "Library",
        hotspots: [
          {
            x: 0.4,
            y: 0.4,
            title: "Charred oak shelving",
            detail: "Shou-sugi-ban technique. 11m run.",
            source: "Atelier 09",
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
        src: img("kitchen-green", 1800, 1400),
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
        src: img("hall-shadow", 1800, 900),
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
        src: img("study-concrete", 1200, 1600),
        alt: "Study",
        caption: "Study",
        hotspots: [
          {
            x: 0.5,
            y: 0.4,
            title: "Desk — Plinth",
            detail: "Cast concrete with hidden cable channel.",
            source: "Atelier 09",
          },
        ],
      },
      {
        id: "terrace",
        span: "std",
        src: img("terrace-sun", 1200, 1200),
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
