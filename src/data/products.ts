import { Product, Hotspot } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: '01 — NOIR OVERSHIRT',
    subtitle: 'Sculpted Japanese Double-Weave Cotton',
    category: 'SHIRTS',
    price: 14500,
    originalPrice: 17000,
    isNew: true,
    isFeatured: true,
    sku: 'VEL-SS26-001',
    images: [
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'A monument to understated architectural precision. Cut from an exclusive 380 GSM Japanese selvedge double-weave cotton, the Noir Overshirt marries relaxed kinetic drape with rigid, sharp geometric cuffs and an invisible placket.',
    material: '100% Japanese Selvedge Cotton (380 GSM). Horn button closures sourced sustainably.',
    details: [
      'Hidden placket with matte horn hardware',
      'Laser-cut structured point collar',
      'Articulated elbow seams engineered for fluid gesture',
      'Internal hand-finished silk binding'
    ],
    care: [
      'Specialist dry clean only',
      'Cool iron inside-out under press cloth',
      'Store on wide shoulder contoured hanger'
    ],
    shipping: 'Complimentary white-glove courier delivery across India within 48–72 hours. Hand-packaged in bespoke archival garment box.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', hex: '#121214' },
      { name: 'Raw Champagne', hex: '#dfccad' },
      { name: 'Slate Taupe', hex: '#484542' }
    ]
  },
  {
    id: 'prod-02',
    name: '02 — ATELIER SHIRT',
    subtitle: 'Hand-Spun Mulberry Silk Poplin',
    category: 'SHIRTS',
    price: 18200,
    isNew: true,
    isFeatured: true,
    sku: 'VEL-SS26-002',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620012253295-c15c429fbb41?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Engineered for dramatic movement and evening distinction. Crafted from hand-spun mulberry silk poplin woven in Varanasi ateliers, featuring a subtle fluid shimmer that catches ambient room light with liquid grace.',
    material: '100% Varanasi Mulberry Silk Poplin (110 GSM). Mother-of-pearl internal buttons.',
    details: [
      'Elongated split barrel cuffs with dual mother-of-pearl buttons',
      'Clean forward-pitched shoulder yoke',
      'Curved high-low hem designed for effortless tucking or loose draping',
      'French seam construction throughout'
    ],
    care: [
      'Dry clean gently with hydrocarbon solvent',
      'Do not steam directly on silk surface',
      'Store in provided breathable muslin garment bag'
    ],
    shipping: 'Complimentary insured door-to-door courier dispatch. Signature required upon receipt.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne Ivory', hex: '#e8e2d5' },
      { name: 'Charcoal Noir', hex: '#1a191d' },
      { name: 'Dune Sand', hex: '#c5b59e' }
    ]
  },
  {
    id: 'prod-03',
    name: '03 — MONO TROUSER',
    subtitle: 'High-Waisted Architectural Pleated Wool',
    category: 'TROUSERS',
    price: 16800,
    isNew: false,
    isFeatured: true,
    sku: 'VEL-SS26-003',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'The foundation of the modern silhouette. A high-rise double-reverse pleat trouser cut from tropical fine merino wool. Falls with clean perpendicular drop down the leg, creating an elongated sculptural proportion.',
    material: '100% Super 130s Merino Wool (260 GSM). Cotton curtain waistband lining.',
    details: [
      'Extended double waistband tab with discreet slide clip',
      'Dual deep reverse pleats creating volume through the thigh',
      'Angled side slit pockets and welt rear pockets',
      'Generous 4cm turn-up cuff hem with blind stitch'
    ],
    care: [
      'Dry clean only',
      'Steam gently along crease lines',
      'Hang from cuff clamps to preserve razor-sharp crease'
    ],
    shipping: 'Dispatches within 24 hours. Includes custom wooden travel hanger and dust cover.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Deep Anthracite', hex: '#222126' },
      { name: 'Ivory Bone', hex: '#e2ded5' },
      { name: 'Warm Taupe', hex: '#776f65' }
    ]
  },
  {
    id: 'prod-04',
    name: '04 — VELVET FORM JACKET',
    subtitle: 'Sculptural Tailored Peak Lapel Blazer',
    category: 'JACKETS',
    price: 24500,
    originalPrice: 28000,
    isNew: true,
    isFeatured: true,
    sku: 'VEL-SS26-004',
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Haute tailoring reimagined for contemporary ease. Crafted in plush micro-pile cotton velvet with structured shoulders and an assertive peak lapel. Designed to command attention from salon to evening gallery.',
    material: 'Italian Cotton-Modal Micro Velvet (420 GSM). Cupro satin full lining.',
    details: [
      'Structured roped shoulder silhouette',
      '11cm exaggerated peak lapel with silk pick stitching',
      'Functional button cuffs with horn buttons',
      'Internal smartphone and passport cigar pockets'
    ],
    care: [
      'Specialist luxury dry clean only',
      'Never press iron directly; vertical steam only',
      'Brush nap with natural horsehair garment brush'
    ],
    shipping: 'Complimentary expedited delivery. Shipped in structured rigid hanger case.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Midnight Noir', hex: '#111015' },
      { name: 'Antique Bronze', hex: '#735f43' }
    ]
  },
  {
    id: 'prod-05',
    name: '05 — SHADOW DRAPE KIMONO',
    subtitle: 'Avant-Garde Belted Lounge Coat',
    category: 'JACKETS',
    price: 21000,
    isNew: false,
    isFeatured: false,
    sku: 'VEL-SS26-005',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'An unstructured drape jacket bridging eastern ceremonial robes and modern minimalist outerwear. Seamless dropped shoulders with a removable structured self-fabric sash belt.',
    material: '65% Belgian Linen, 35% Silk Noil (310 GSM).',
    details: [
      'Wide cut kimono sleeves with internal turn-up tabs',
      'Deep inset storm pockets',
      'Removable multi-stitch tie belt',
      'Clean unlined body with Hong Kong finished interior seams'
    ],
    care: ['Gentle dry clean or cold hand wash with silk detergent', 'Dry flat in shade'],
    shipping: 'Standard expedited 48-hour delivery across India.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Charcoal Black', hex: '#18181c' },
      { name: 'Oatmeal Mist', hex: '#d9d2c5' }
    ]
  },
  {
    id: 'prod-06',
    name: '06 — ARCHITECTURAL TRENCH',
    subtitle: 'Water-Repellent Double-Breasted Long Coat',
    category: 'JACKETS',
    price: 32000,
    isNew: true,
    isFeatured: false,
    sku: 'VEL-SS26-006',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'The pinnacle of utilitarian luxury. A sweeping calf-length trench coat engineered with a storm flap, throat latch, and deep inverted back box pleat for an imposing, cinematic walk.',
    material: '100% High-Density Gabardine Cotton with fluorocarbon-free water-repellent finish.',
    details: [
      'Storm collar with concealed throat latch',
      'Deep back rain storm guard with hidden ventilation eyelets',
      'Heavy-gauge metal D-ring belt hardware in antique brushed brass',
      'Inverted box pleat back vent with button closure'
    ],
    care: ['Professional dry clean only', 'Maintain DWR water repellent coating after cleaning'],
    shipping: 'Complimentary premium courier with scheduled time slot.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cast Iron', hex: '#262629' },
      { name: 'Champagne Khaki', hex: '#b5a589' }
    ]
  },
  {
    id: 'prod-07',
    name: '07 — SELVEDGE PLEATED PANT',
    subtitle: 'Straight-Leg Structured Khadi Twill',
    category: 'TROUSERS',
    price: 15400,
    isNew: false,
    isFeatured: false,
    sku: 'VEL-SS26-007',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Rooted in heritage, designed for the future. Handspun organic khadi cotton twill woven on traditional pit-looms in Rajasthan, cut in a relaxed contemporary straight-leg silhouette.',
    material: '100% Organic Pit-Loom Khadi Twill (320 GSM). Vegetable-dyed mineral black.',
    details: [
      'Single forward knife pleat',
      'Natural corozo nut hardware',
      'Reinforced gusset for free kinetic range',
      'Bound interior waistband with cotton herringbone tape'
    ],
    care: ['Gentle cycle cold wash with plant-based detergent', 'Line dry in shade'],
    shipping: 'Standard delivery in 2-3 business days.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Mineral Black', hex: '#161618' },
      { name: 'Earthy Sand', hex: '#c9bcab' }
    ]
  },
  {
    id: 'prod-08',
    name: '08 — SILK REVERE COLLAR SHIRT',
    subtitle: 'Relaxed Resort Fit Evening Shirt',
    category: 'SHIRTS',
    price: 17800,
    isNew: true,
    isFeatured: false,
    sku: 'VEL-SS26-008',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'An ode to mid-century modern leisure redefined for private soirees and rooftop salons. Features a relaxed Cuban-style camp collar and an airy silhouette with fluid kinetic drape.',
    material: '100% Sandwashed Crepe de Chine Silk (140 GSM).',
    details: [
      'Convertible open revere notch collar',
      'Square straight-cut hem with subtle side slits',
      'Matte mother-of-pearl buttons with cross stitching',
      'Ultra-soft sandwashed hand feel'
    ],
    care: ['Dry clean only', 'Do not wring or tumble dry'],
    shipping: 'Express courier delivery with tracking.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ivory Pearl', hex: '#ece7dc' },
      { name: 'Onyx Smoke', hex: '#1e1e24' }
    ]
  },
  {
    id: 'prod-09',
    name: '09 — MINIMALIST MERINO CREW',
    subtitle: 'Seamless Fine Gauge 18-Micron Knit',
    category: 'ESSENTIALS',
    price: 12600,
    isNew: false,
    isFeatured: false,
    sku: 'VEL-SS26-009',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'The definitive daily luxury knitwear piece. Knitted seamlessly on Japanese 3D whole-garment machinery, eliminating chafing friction seams while creating a flattering ergonomic drape.',
    material: '100% Extra-fine Australian Merino Wool (18.5 micron, 14-gauge).',
    details: [
      'Seamless 3D whole-garment knit construction',
      'Narrow tubular collar and refined ribbed trims',
      'Naturally thermo-regulating and odor-resistant',
      'Zero itchy feel; wear comfortably directly against skin'
    ],
    care: ['Hand wash in lukewarm water with wool detergent', 'Dry flat on towel'],
    shipping: 'Dispatched next business day.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pitch Charcoal', hex: '#151518' },
      { name: 'Sandstone Camel', hex: '#b39f82' },
      { name: 'Warm Cream', hex: '#f0ede6' }
    ]
  },
  {
    id: 'prod-10',
    name: '10 — BRUTALIST STRUCTURE BLAZER',
    subtitle: 'Collarless Monolithic Single Button Jacket',
    category: 'JACKETS',
    price: 28500,
    isNew: true,
    isFeatured: false,
    sku: 'VEL-SS26-010',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'An architectural reduction of traditional tailoring. Stripping away lapels to reveal clean continuous collar lines, fastened with a single monolithic hand-cast geometric brushed metal button.',
    material: 'Heavyweight Virgin Wool-Cashmere Blend (390 GSM).',
    details: [
      'Clean collarless neckline contouring the clavicle',
      'Single hand-cast sculptural brass button',
      'Discreet horizontal jetted hip pockets',
      'Slightly padded floating canvas chest construction'
    ],
    care: ['Specialist dry clean only', 'Keep in structured garment carrier'],
    shipping: 'Complimentary signature delivery.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Jet', hex: '#0f0f12' },
      { name: 'Dark Slate', hex: '#32323a' }
    ]
  },
  {
    id: 'prod-11',
    name: '11 — RAW LINEN RESORT TROUSER',
    subtitle: 'Drawstring Elasticated Wide-Leg Pants',
    category: 'TROUSERS',
    price: 14000,
    isNew: false,
    isFeatured: false,
    sku: 'VEL-SS26-011',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Effortless warm-weather sophistication. Crafted from heavy European flax linen pre-washed for vintage drape. Features an internal elasticated waistband with raw silk drawcord.',
    material: '100% Normandy Flax Linen (280 GSM). Pre-shrunk enzyme wash.',
    details: [
      'Continuous interior drawstring with metal tips',
      'Deep flowy wide-leg cut with 26cm hem opening',
      'Subtle pressed pleat running down front legs',
      'Breathable, airy comfort engineered for humid climates'
    ],
    care: ['Machine wash delicate cold', 'Hang dry; embracing natural linen creases'],
    shipping: 'Dispatches in 24 hours.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Natural Ecru', hex: '#dedad0' },
      { name: 'Washed Charcoal', hex: '#2c2b30' }
    ]
  },
  {
    id: 'prod-12',
    name: '12 — SCULPTED LEATHER OVERSHIRT',
    subtitle: 'Supple Lambskin Suede Atelier Edition',
    category: 'ESSENTIALS',
    price: 36000,
    isNew: true,
    isFeatured: false,
    sku: 'VEL-SS26-012',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Our most prestigious atelier creation. Cut from ultra-pliant buttery lambskin suede with hand-beveled raw edge hems and unlined body that molds intimately to the wearer over time.',
    material: '100% Grade-A Full Grain Lambskin Suede (0.6mm lightweight luxury drape).',
    details: [
      'Raw cut geometric cuffs and hem',
      'Concealed magnetic snap closures',
      'Dual seamless interior chest pockets',
      'Limited numbered run of 50 pieces per season'
    ],
    care: ['Specialist leather care only', 'Condition annually with neutral suede protector'],
    shipping: 'Delivered in numbered wooden collector box with certificate of authenticity.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Espresso Suede', hex: '#31251e' },
      { name: 'Onyx Suede', hex: '#161618' }
    ]
  }
];

export const SHOWROOM_HOTSPOTS: Hotspot[] = [
  {
    id: 'spot-1',
    title: 'THE SIGNATURE',
    collectionKey: 'signature',
    subtitle: 'Iconic Evening Silhouettes',
    description: 'Sculptural jackets and high-contrast evening tailoring crafted with peak lapels, roped shoulders, and liquid silk linings.',
    position: [-2.2, 0.4, 0.5],
    featuredProduct: '04 — VELVET FORM JACKET',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'spot-2',
    title: 'THE ESSENTIALS',
    collectionKey: 'essentials',
    subtitle: 'Architectural Daily Uniform',
    description: 'Effortless Japanese double-weave cotton overshirts and reverse-pleated merino wool trousers engineered for perpetual kinetic elegance.',
    position: [0, 0.8, -0.8],
    featuredProduct: '01 — NOIR OVERSHIRT',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'spot-3',
    title: 'THE ATELIER',
    collectionKey: 'atelier',
    subtitle: 'Limited Edition Heritage Weaves',
    description: 'Varanasi mulberry silk and Rajasthani handspun khadi masterpieces in limited seasonal runs, finished by master generational artisans in Jaipur.',
    position: [2.2, 0.5, 0.6],
    featuredProduct: '02 — ATELIER SHIRT',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop'
  }
];
