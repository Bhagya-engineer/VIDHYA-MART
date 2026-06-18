export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatarSeed: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  specs: string[];
  description: string;
  image: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  reviews: { id: string; userName: string; rating: number; comment: string; date: string }[];
}

export const CATEGORIES = [
  { id: 'notebooks', name: 'Notebooks', icon: 'Notebook', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=500&q=80' },
  { id: 'bottles', name: 'Water Bottles', icon: 'Glass', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80' },
  { id: 'pencilboxes', name: 'Pencil Boxes', icon: 'Box', image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=500&q=80' },
  { id: 'geometry', name: 'Geometry Sets', icon: 'PenTool', image: 'https://images.unsplash.com/photo-1452830978618-d6feae7d0ffa?auto=format&fit=crop&w=500&q=80' },
  { id: 'bags', name: 'School Bags', icon: 'ShoppingBag', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80' },
  { id: 'pens', name: 'Pens', icon: 'Pen', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80' },
  { id: 'pencils', name: 'Pencils', icon: 'Pencil', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=500&q=80' },
  { id: 'erasers', name: 'Erasers', icon: 'Eraser', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80' }
];

export const PRODUCTS: Product[] = [
  // ==================== NOTEBOOKS ====================
  {
    id: 'n-classmate-long-6',
    name: 'ITC Classmate Premium A4 Long Books (6 Pack)',
    category: 'notebooks',
    subcategory: 'Notebooks',
    brand: 'Classmate',
    price: 350,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 1210,
    specs: ['Size: A4 (29.7cm x 21cm)', 'No. of pages: 172 pages per book', 'High quality 57 GSM archival paper', 'Pack of 6 single line notebook series'],
    description: 'Premium eco-friendly writing paper from ITC Classmate. Designed with high bright white sheets matching premium standard school notebooks.',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-n1', userName: 'Rohan K.', rating: 5, comment: 'Hands down standard top tier copies.', date: '2026-06-02' }
    ]
  },
  {
    id: 'n-navneet-short-12',
    name: 'Navneet Short Single Line Books (12 Pack)',
    category: 'notebooks',
    subcategory: 'Notebooks',
    brand: 'Navneet',
    price: 199,
    originalPrice: 240,
    rating: 4.5,
    reviewsCount: 430,
    specs: ['Size: 24cm x 18cm standard short', 'No. of pages: 76 pages per book', 'Acid-free bright sheets', 'Pack of 12 softbound copy segments'],
    description: 'Highly cost-effective daily practice copies. Perfect for routine spelling, chemistry formulas, and homework worksheets.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-n2', userName: 'Aarti S.', rating: 4, comment: 'Very practical and pocket friendly kit accessory.', date: '2026-05-18' }
    ]
  },
  {
    id: 'n-sundaram-prac',
    name: 'Sundaram Practical Record Notebook',
    category: 'notebooks',
    subcategory: 'Notebooks',
    brand: 'Sundaram',
    price: 85,
    originalPrice: 100,
    rating: 4.8,
    reviewsCount: 220,
    specs: ['Hardbound high rigidity paper backing', 'Alternating layout: 1 blank diagram & 1 ruled sheet', 'Index tables and metric charts inside'],
    description: 'The national favorite practical records notebooks for high school CBSE/ICSE science lab experiments.',
    image: 'https://images.unsplash.com/photo-1452830978618-d6feae7d0ffa?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-n3', userName: 'Meera Nair', rating: 5, comment: 'Sturdy hard bind, doesn\'t bend in backpack.', date: '2026-06-11' }
    ]
  },
  {
    id: 'n-camlin-graph',
    name: 'Camlin Premium Spiral Graph Book',
    category: 'notebooks',
    subcategory: 'Notebooks',
    brand: 'Camlin',
    price: 60,
    originalPrice: 75,
    rating: 4.7,
    reviewsCount: 150,
    specs: ['Contains 40 grid pages', '1mm precise grid spacing', 'Spiral rustproof loop rings', 'Includes trigonometry reference tables'],
    description: 'Allows standard architectural diagrams and mathematical plotting to be executed securely on crisp sheets.',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-n4', userName: 'Kabir B.', rating: 5, comment: 'Excellent millimeter tracking precision.', date: '2026-05-30' }
    ]
  },

  // ==================== WATER BOTTLES ====================
  {
    id: 'wt-milton-kool',
    name: 'Milton Kool Insulated Dual-Wall Student Bottle',
    category: 'bottles',
    subcategory: 'Water Bottles',
    brand: 'Milton',
    price: 250,
    originalPrice: 300,
    rating: 4.7,
    reviewsCount: 1950,
    specs: ['Polyurethane insulation maintains cool water for 6 hours', 'Intelligent dust-proof flip straw head', 'Includes adjustable shoulder strap'],
    description: 'Quench your student thirst during hot games periods with refreshing cool water. Highly impact-resistant outer body.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-w1', userName: 'Niveda T.', rating: 5, comment: 'Keeps water beautifully cool.', date: '2026-06-14' }
    ]
  },
{ 
  id: 'wt-blossom-bottle',
  name: 'Blossom Steel Water Bottle (750ml)',
  category: 'bottles',
  subcategory: 'Water Bottles',
  brand: 'VidhyaMart',
  price: 399,
  originalPrice: 499,
  rating: 4.7,
  reviewsCount: 625,
  specs: [
    'Premium stainless steel body',
    'Leak-proof flip-top lid',
    'Lightweight and student-friendly design'
  ],
    description: 'Stylish, durable, and perfect for everyday hydration.',
    image: 'https://files.catbox.moe/1zg081.jpg',
    stockStatus: 'In Stock',
    reviews: [ { 
    id: 'r-w2',
    userName: 'Priya S.',
    rating: 5,
    comment: 'Beautiful design and perfect for carrying to college every day.',
    date: '2026-05-24'
    }
    ]
},

  {
  id: 'silver-steel-bottle',
  name:'SilverEdge Stainless Steel Water Bottle (1L)',
  category: 'bottles',
  subcategory: 'Water Bottles',
  brand: 'VidhyaMart',
  price: 549,
  originalPrice: 649,
  rating: 4.8,
  reviewsCount: 735,
  specs: [
    'Premium food-grade stainless steel body',
    'Leak-proof screw cap with carry loop',
    'Durable rust-resistant matte finish'
  ],
  description: 'A sleek stainless steel bottle designed for students, keeping water fresh throughout long study sessions.',
  image: 'https://files.catbox.moe/8gf3uv.jpg',
  stockStatus: 'In Stock',
  reviews: [
    {
      id: 'r-w3',
      userName: 'Karthik R.',
      rating: 5,
      comment: 'Strong build quality and easy to carry to college every day.',
      date: '2026-06-03'
    }
  ]

  },
  
{
  id: 'midnight-hydro-bottle',
  name: 'Midnight Hydro Stainless Steel Bottle (750ml)',
  category: 'bottles',
  subcategory: 'Water Bottles',
  brand: 'VidhyaMart',
  price: 599,
  originalPrice: 699,
  rating: 4.8,
  reviewsCount: 682,
  specs: [
    'Double-wall insulated stainless steel body',
    'Leak-proof cap with carrying strap',
    'Keeps drinks fresh and cool for hours'
  ],
  description: 'A premium insulated bottle designed for students, perfect for staying hydrated during classes, study sessions, and travel.',
  image: 'https://files.catbox.moe/1zg081.jpg',
  stockStatus: 'In Stock',
  reviews: [
    {
      id: 'r-w4',
      userName: 'Ananya P.',
      rating: 5,
      comment: 'Stylish design, excellent insulation, and very convenient to carry.',
      date: '2026-06-05'
    }
  ]
},

  // ==================== PENCIL BOXES ====================
  {
    id: 'pb-doms-metal',
    name: 'Doms Metal Slide Compass & Pencil Box Combo',
    category: 'pencilboxes',
    subcategory: 'Pencil Boxes',
    brand: 'Doms',
    price: 110,
    originalPrice: 130,
    rating: 4.7,
    reviewsCount: 310,
    specs: ['Slick sheet steel sliding mechanism', 'Double tiered tray drawers', 'Printed high grade multiplication charts inside'],
    description: 'Durable classic tin pencil chest containing specialized slots for holding scales, pencils, and compass pieces safely.',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-pb1', userName: 'Amitabh J.', rating: 5, comment: 'Great multiplication tables details inside.', date: '2026-04-18' }
    ]
  },
  {
    id: 'pb-classmate-purple',
    name: 'Classmate Smart Pencil Box Neon Edition',
    category: 'pencilboxes',
    subcategory: 'Pencil Boxes',
    brand: 'Classmate',
    price: 145,
    originalPrice: 175,
    rating: 4.8,
    reviewsCount: 220,
    specs: ['Material: Polycarbonate impactproof plastic', 'Vibrant transparent cover panel', 'Includes standard plastic drawing set tools'],
    description: 'Sturdy, colorful pencil organizer with slide-snap lock details. Eliminates clattering noises inside school bags.',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-pb2', userName: 'Meera K.', rating: 5, comment: 'Extremely silent snap locks.', date: '2026-05-12' }
    ]
  },
  {
    id: 'pb-camlin-double',
    name: 'Camlin Double Tray Pencil Storage Box',
    category: 'pencilboxes',
    subcategory: 'Pencil Boxes',
    brand: 'Camlin',
    price: 125,
    originalPrice: 150,
    rating: 4.6,
    reviewsCount: 140,
    specs: ['Double-level sorting layout', 'Built-in pencil sharpener drawer', 'Eco-friendly scratch-resistant ABS polymer'],
    description: 'Highly functional multi-tray pencil holder holding up to 24 pens, pencils, rulers, and geometric instruments easily.',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-pb3', userName: 'Leena J.', rating: 4, comment: 'Nice sharpener slot.', date: '2026-06-08' }
    ]
  },

  // ==================== GEOMETRY SETS ====================
  {
    id: 'g-camlin-scholar',
    name: 'Camlin Scholar Mathematical Instrument Box',
    category: 'geometry',
    subcategory: 'Geometry Boxes',
    brand: 'Camlin',
    price: 160,
    originalPrice: 195,
    rating: 4.8,
    reviewsCount: 1420,
    specs: ['Contains compass, divider, 15cm scale, protractor', 'Heavy gauge scratchproof metal tin casing', 'Self-centering compass gears'],
    description: 'The national standard trusted mathematical kit containing high precision, scratchproof divider legs.',
    image: 'https://images.unsplash.com/photo-1452830978618-d6feae7d0ffa?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-g1', userName: 'Vijay S.', rating: 5, comment: 'Standard issue classic. Reliable setup.', date: '2026-06-01' }
    ]
  },
  {
    id: 'g-doms-neon',
    name: 'Doms Premium Neon Mathematical Geometry Box',
    category: 'geometry',
    subcategory: 'Geometry Boxes',
    brand: 'Doms',
    price: 180,
    originalPrice: 220,
    rating: 4.7,
    reviewsCount: 420,
    specs: ['Premium neon accents design', 'Includes zero-slip zinc alloy compass', 'Complimentary mechanical pencil inside'],
    description: 'Beautifully modern geometry kit designed with high visibility millimeter demarcations for accurate mapping and layout plotting.',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-g2', userName: 'Hari P.', rating: 5, comment: 'Solid zinc metal, compass stays tight.', date: '2026-05-19' }
    ]
  },
  {
    id: 'g-faber-student',
    name: 'Faber-Castell Academic Drawing Tin Set',
    category: 'geometry',
    subcategory: 'Geometry Boxes',
    brand: 'Faber-Castell',
    price: 240,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 512,
    specs: ['Sleek metal tin drawer packaging', 'Slick diecast rustproof instruments', 'Premium laser markings'],
    description: 'German quality professional-grade school drawing set. Ensures absolutely zero misalignment during diagram building.',
    image: 'https://images.unsplash.com/photo-1452830978618-d6feae7d0ffa?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-g3', userName: 'Anil Roy', rating: 5, comment: 'Extremely precise ruler and divider components.', date: '2026-05-11' }
    ]
  },

  // ==================== SCHOOL BAGS ====================
  {
    id: 'b-skybags-marvel',
    name: 'Skybags Marvel Captain America Backpack',
    category: 'bags',
    subcategory: 'School Bags',
    brand: 'Skybags',
    price: 1299,
    originalPrice: 1999,
    rating: 4.8,
    reviewsCount: 740,
    specs: ['Volume: 28 Liters', 'Material: Waterproof Polyester', '3 main pockets + water bottle net holder', '1 Year warranty'],
    description: 'Dynamic comic-theme bag suitable for primary-middle school. Features cushioned back cooling channels to minimize heat build-up.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-b1', userName: 'Vikas J.', rating: 4, comment: 'Kids love the design, very spacious.', date: '2026-06-10' }
    ]
  },
  {
    id: 'b-wildcraft-heavy',
    name: 'Wildcraft Alpinist Heavy-Duty Academic Bag',
    category: 'bags',
    subcategory: 'School Bags',
    brand: 'Wildcraft',
    price: 1699,
    originalPrice: 2200,
    rating: 4.9,
    reviewsCount: 1420,
    specs: ['Volume: 32 Liters with laptop pocket', 'Double reinforced heavy-gauge Ripstop nylon', 'Abrasion resistant rubber base panel'],
    description: 'Legendary performance bag. Endures multi-textbook payload weights without compromising on back spinal wellness.',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-b2', userName: 'Suresh N.', rating: 5, comment: 'Stitching is indestructible.', date: '2026-06-03' }
    ]
  },
  {
    id: 'b-safari-bounce',
    name: 'Safari Bounce Durable School Backpack',
    category: 'bags',
    subcategory: 'School Bags',
    brand: 'Safari',
    price: 999,
    originalPrice: 1599,
    rating: 4.6,
    reviewsCount: 390,
    specs: ['Volume: 30 Liters', 'Slick raincover integrated inside bottom pocket', '2 side mesh pockets'],
    description: 'Amazing lightweight design with ergonomic, moisture-wicking foam. Holds daily school notebooks and bulky lunch kits easily.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-b3', userName: 'Mayank U.', rating: 5, comment: 'Great budget bag with built-in raincover.', date: '2026-05-28' }
    ]
  },

  // ==================== PENS ====================
  {
    id: 'pen-pentonic-blue',
    name: 'Pentonic Blue Ink Smooth Ball Pens (10 Pack)',
    category: 'pens',
    subcategory: 'Pens',
    brand: 'Pentonic',
    price: 120,
    originalPrice: 150,
    rating: 4.9,
    reviewsCount: 2450,
    specs: ['Ink type: Low viscosity quick flow', 'NIB size: 0.7 mm stainless tip', 'Matte black sleek pen barrel'],
    description: 'The current ultimate student heartthrob. Feather-touch fluid flow makes fast notebook writing during exams feel effortless.',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-p1', userName: 'Akshat Reddy', rating: 5, comment: 'Extremely fast writing flow.', date: '2026-06-12' }
    ]
  },
  {
    id: 'pen-reynolds-red',
    name: 'Reynolds 045 Fine Red Ball Pens (10 Pack)',
    category: 'pens',
    subcategory: 'Pens',
    brand: 'Reynolds',
    price: 90,
    originalPrice: 100,
    rating: 4.7,
    reviewsCount: 1610,
    specs: ['NIB: 0.5 mm tungsten alloy point', 'Laser smooth speed mechanism', 'Heritage white body and blue clip caps'],
    description: 'The legendary red pen relied upon by teachers and student diagram planners for neat annotation guidelines.',
    image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-p2', userName: 'Leena Roy', rating: 5, comment: 'The vintage classic standard in notebooks.', date: '2026-05-18' }
    ]
  },
  {
    id: 'pen-cello-butter-black',
    name: 'Cello Butterflow Max Black Ball Pens (5 Pack)',
    category: 'pens',
    subcategory: 'Pens',
    brand: 'Cello',
    price: 75,
    originalPrice: 90,
    rating: 4.8,
    reviewsCount: 920,
    specs: ['Spring-tip luxury flow', 'Elastomer soft rubber grip sleeve', 'Transparent ink level body indicator'],
    description: 'Perfect for subheadings, titles, and layout margins. Deep dynamic black ink dries under 1 second.',
    image: 'https://images.unsplash.com/photo-1585336139057-3c50681b75d8?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-p3', userName: 'Hari S.', rating: 5, comment: 'Best grip for long exam days.', date: '2026-06-03' }
    ]
  },
  {
    id: 'pen-doms-red',
    name: 'Doms Retractable Red Ink Pens (5 Pack)',
    category: 'pens',
    subcategory: 'Pens',
    brand: 'Doms',
    price: 60,
    originalPrice: 75,
    rating: 4.5,
    reviewsCount: 105,
    specs: ['Spring mechanism retractable head', 'Grip sleeve padding', '0.7 mm writing width'],
    description: 'Durable push-button red pens, excellent for highlighting formulas, chemical structures, and key notes.',
    image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-p4', userName: 'Niveda T.', rating: 4, comment: 'Very convenient slide mechanism.', date: '2026-04-12' }
    ]
  },

  // ==================== PENCILS ====================
  {
    id: 'p-apsara-plat',
    name: 'Apsara Platinum Extra Dark Wooden Pencils (10 Pack)',
    category: 'pencils',
    subcategory: 'Pencils',
    brand: 'Apsara',
    price: 70,
    originalPrice: 80,
    rating: 4.9,
    reviewsCount: 3890,
    specs: ['Contains special super-dark dense carbon graphite core', 'Requires zero pressure for legible writing', 'Wood harvested from specialized sustainable forestry zones'],
    description: 'The legendary "Extra Dark" pencils trusted for CBSE board examinations and primary drawing assignments alike.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-pe1', userName: 'Sanjay Deshmukh', rating: 5, comment: 'Standard board exam helper. Writing remains clean.', date: '2026-06-01' }
    ]
  },
  {
    id: 'p-nataraj-621',
    name: 'Nataraj 621 Standard Red & Black Striped Pencils (10 Pack)',
    category: 'pencils',
    subcategory: 'Pencils',
    brand: 'Nataraj',
    price: 50,
    originalPrice: 60,
    rating: 4.8,
    reviewsCount: 2910,
    specs: ['Classic hexagonal safety posture structure', 'Tough break-resistant HB bonded cores', 'Reliable budget daily classroom wear pencil'],
    description: 'The classic, vintage red-and-black striped workhorse pencil of Indian primary schools for several decades.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-pe2', userName: 'Dheeraj R.', rating: 5, comment: 'Classic nostalgia, still sharp and resilient.', date: '2026-05-11' }
    ]
  },
  {
    id: 'p-doms-groove',
    name: 'Doms Zoom Triangle Super Dark Pencils (10 Pack)',
    category: 'pencils',
    subcategory: 'Pencils',
    brand: 'Doms',
    price: 55,
    originalPrice: 65,
    rating: 4.7,
    reviewsCount: 1120,
    specs: ['Ergonomic triangle body shape', 'Super dark premium graphite leads', 'Assorted neon color outer sleeves'],
    description: 'Specifically shaped to reduce finger fatigue during competitive drawing tests. Includes free eraser and sharpener.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-pe3', userName: 'Kunal G.', rating: 4, comment: 'Comfortable grip for children.', date: '2026-05-30' }
    ]
  },
  {
    id: 'p-faber-tri',
    name: 'Faber-Castell Tri-Grip Comfort Drafting Pencils (10 Pack)',
    category: 'pencils',
    subcategory: 'Pencils',
    brand: 'Faber-Castell',
    price: 80,
    originalPrice: 95,
    rating: 4.8,
    reviewsCount: 410,
    specs: ['Patented non-slip grip dots', 'Ergonomic triangular shape prevents desktop rolling', 'SV break-resistant core bonding process'],
    description: 'Premium drafts wooden pencils. Delivers steady, micro-precise geometric plotting line details.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-pe4', userName: 'Vinay T.', rating: 5, comment: 'Zero lead breakage while writing fast.', date: '2026-06-03' }
    ]
  },

  // ==================== ERASERS ====================
  {
    id: 'er-apsara-non-dust',
    name: 'Apsara Non-Dust Jumbo Erasers (20 Pack)',
    category: 'erasers',
    subcategory: 'Erasers',
    brand: 'Apsara',
    price: 90,
    originalPrice: 100,
    rating: 4.9,
    reviewsCount: 2210,
    specs: ['Non-dust residue aggregation technology', 'Soft on paper, no tearing', 'BPA/Phthalate free child safe material'],
    description: 'Specially aggregated polymer rolls graphite away cleanly without scattering micro-dust particles on school notebooks.',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-e1', userName: 'Komal J.', rating: 5, comment: 'No black streaks left behind on premium paper.', date: '2026-05-14' }
    ]
  },
  {
    id: 'er-nataraj-white',
    name: 'Nataraj Classic White Student Erasers (20 Pack)',
    category: 'erasers',
    subcategory: 'Erasers',
    brand: 'Nataraj',
    price: 35,
    originalPrice: 40,
    rating: 4.6,
    reviewsCount: 1420,
    specs: ['Dependable value package', 'Classic white rectangular pattern', 'Fits standard school geometry slot'],
    description: 'Indian schools classic standard eraser. Inexpensive, reliable, soft, and suitable for daily math classes.',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-e2', userName: 'Farhan S.', rating: 4, comment: 'Old school staple but absolutely solid.', date: '2026-04-20' }
    ]
  },
  {
    id: 'er-doms-neon',
    name: 'Doms Dust-Free Vibrant Neon Erasers (10 Pack)',
    category: 'erasers',
    subcategory: 'Erasers',
    brand: 'Doms',
    price: 45,
    originalPrice: 50,
    rating: 4.8,
    reviewsCount: 710,
    specs: ['Fun neon pastel colors', 'Individually wrapped', 'Excellent rectangular posture grip'],
    description: 'Exciting, colored high-performance active erasers that add a dash of fun to standard stationery sets.',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=500&q=80',
    stockStatus: 'In Stock',
    reviews: [
      { id: 'r-e3', userName: 'Leena Roy', rating: 5, comment: 'Nice neon colors, and is fully dust-free.', date: '2026-06-03' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Vikram Sharma',
    role: 'Parent',
    rating: 5,
    comment: 'Ordering all custom study packs and standard backpacks in one go saved me hours of rushing between multiple local markets.',
    avatarSeed: 'vikram'
  },
  {
    id: 't-2',
    name: 'Akshat Reddy',
    role: 'Student',
    rating: 5,
    comment: 'The custom student kit wizard is so cool. Added my classmate notebooks, a wildcraft bag, Dom pencils, and got it delivered under 48 hours.',
    avatarSeed: 'akshat'
  },
  {
    id: 't-3',
    name: 'Nisha Sundaresan',
    role: 'Teacher',
    rating: 5,
    comment: 'Extremely helpful service to pre-pack student kits at the start of academic terms. Highly recommended.',
    avatarSeed: 'nisha'
  }
];
