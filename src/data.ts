import { Product, Testimonial } from './types';

export const CATEGORIES = [
  { id: 'books', name: 'Books', icon: 'BookOpen', image: '/src/assets/images/category_books_1781411276122.jpg' },
  { id: 'notebooks', name: 'Notebooks', icon: 'Notebook', image: '/src/assets/images/category_notebooks_1781411292437.jpg' },
  { id: 'stationery', name: 'Stationery', icon: 'PenTool', image: '/src/assets/images/category_stationery_1781411308697.jpg' },
  { id: 'bags', name: 'School Bags', icon: 'ShoppingBag', image: '/src/assets/images/category_bags_1781411324982.jpg' },
  { id: 'shoes', name: 'School Shoes', icon: 'Activity', image: '/src/assets/images/category_shoes_1781411340227.jpg' },
  { id: 'essentials', name: 'Daily Essentials', icon: 'Utensils', image: '/src/assets/images/category_essentials_1781411358612.jpg' }
];

export const PRODUCTS: Product[] = [
  // --- BOOKS ---
  {
    id: 'b-class10-math',
    name: 'Mathematics Textbook Class 10',
    category: 'books',
    subcategory: 'Textbooks (Class 10)',
    price: 195,
    originalPrice: 220,
    rating: 4.8,
    reviewsCount: 340,
    specs: ['Language: English', 'Publisher: NCERT', 'Edition: 2026', 'Softcover'],
    description: 'The standard mathematics textbook for CBSE Class 10 students, covering topics from Algebra to Trigonometry thoroughly with exercises.',
    image: '/src/assets/images/prod_math10_1781411610306.jpg'
  },
  {
    id: 'b-class12-physics',
    name: 'Physics Volume I & II Class 12',
    category: 'books',
    subcategory: 'Textbooks (Class 12)',
    price: 360,
    originalPrice: 400,
    rating: 4.9,
    reviewsCount: 180,
    specs: ['Language: English', 'Publisher: NCERT', 'Set of 2 Volumes', 'Paperback'],
    description: 'Comprehensive physics textbooks covering Electrostatics, Current Electricity, Magnetism, and modern physics for Class 12 Boards and competitive exams.',
    image: '/src/assets/images/prod_physics12_1781412139712.jpg'
  },
  {
    id: 'b-class5-all',
    name: 'Class 5 Semester 1 Pack (All Subjects)',
    category: 'books',
    subcategory: 'Textbooks (Class 5)',
    price: 650,
    originalPrice: 750,
    rating: 4.5,
    reviewsCount: 95,
    specs: ['Subjects: EVS, English, Maths, Hindi', 'Syllabus: CBSE/State Boards', 'Comes with online worksheets'],
    description: 'An all-in-one textbook pack for Class 5 Semester 1. Reduces bag weight and aggregates topics seamlessly.',
    image: 'https://files.catbox.moe/i9d1ds.png'
  },
  {
    id: 'b-degree-engineering-math',
    name: 'Higher Engineering Mathematics - BS Grewal',
    category: 'books',
    subcategory: 'Degree Course Books',
    price: 890,
    originalPrice: 1100,
    rating: 4.7,
    reviewsCount: 520,
    specs: ['Author: B.S. Grewal', 'Type: Reference Book', 'Pages: 1200+', 'Useful for: B.Tech / B.E. / B.Sc'],
    description: 'The ultimate textbook guide for engineering graduates covering advanced calculus, differential equations, and numerical analysis.',
    image: '/src/assets/images/prod_bsgrewal_1781412172099.jpg'
  },
  {
    id: 'b-comp-jee-hc-verma',
    name: 'Concepts of Physics (Vol 1 & 2 HC Verma)',
    category: 'books',
    subcategory: 'Competitive Exams',
    price: 799,
    originalPrice: 950,
    rating: 4.9,
    reviewsCount: 1820,
    specs: ['Author: Dr. H.C. Verma', 'Set of 2 Books', 'Comprehensive theory and exercises', 'Must-have for IIT-JEE/NEET'],
    description: 'The most popular physics reference guide for JEE and competitive exam aspirants, focusing on building solid fundamentals.',
    image: '/src/assets/images/prod_hcverma_1781411626440.jpg'
  },

  // --- NOTEBOOKS ---
  {
    id: 'n-classmate-long-6pack',
    name: 'Classmate Premium Long Books (Pack of 6)',
    category: 'notebooks',
    subcategory: 'Long Books',
    brand: 'Classmate',
    price: 299,
    originalPrice: 350,
    rating: 4.8,
    reviewsCount: 1420,
    specs: ['Pages: 172 per book', 'Size: 27.2cm x 16.7cm', 'Paper quality: 57 GSM', 'Ruled, Softcover'],
    description: 'Super-smooth paper from ITC Classmate. Designed with premium cover art and dynamic trivia on back cover.',
    image: '/src/assets/images/prod_notebooks_1781411639713.jpg'
  },
  {
    id: 'n-navneet-practical-record',
    name: 'Navneet Practical Record Notebook',
    category: 'notebooks',
    subcategory: 'Practical Records',
    brand: 'Navneet',
    price: 85,
    originalPrice: 95,
    rating: 4.6,
    reviewsCount: 310,
    specs: ['Pages: 120', 'One-Side Blank / One-Side Ruled', 'Includes index and periodic table chart', 'Spiral Bound options available'],
    description: 'Perfect for Physics, Chemistry, and Biology laboratory reports. High quality paper prevents ink bleed.',
    image: '/src/assets/images/prod_navneet_prac_1781412184787.jpg'
  },
  {
    id: 'n-sundaram-kraft-pack4',
    name: 'Sundaram Premium Square Ruled Notebooks (Pack of 4)',
    category: 'notebooks',
    subcategory: 'Long Books',
    brand: 'Sundaram',
    price: 180,
    originalPrice: 210,
    rating: 4.5,
    reviewsCount: 125,
    specs: ['Size: A4', 'Pages: 120 per book', 'Square ruled for kids', 'Highly durable binding'],
    description: 'Ideal for junior class students practicing mathematics or handwriting. Eco-friendly elemental chlorine-free paper.',
    image: '/src/assets/images/prod_sundaram_sq_1781412198583.jpg'
  },

  // --- STATIONERY - PENCILS & PENS ---
  {
    id: 'p-apsara-platinum-pack',
    name: 'Apsara Platinum Extra Dark Pencils (Pack of 10)',
    category: 'stationery',
    subcategory: 'Pencils',
    brand: 'Apsara',
    price: 75,
    originalPrice: 80,
    rating: 4.9,
    reviewsCount: 940,
    specs: ['Lead: Extra Dark 2B', 'Includes: 1 Sharpener, 1 Non-dust Eraser', 'Wood: Premium soft wood for easy sharpening'],
    description: 'Familiar classic pencils giving sharp writing lines and needing lesser pressure with highly break-resistant lead.',
    image: 'Pencil'
  },
  {
    id: 'p-doms-groove-pencil-box',
    name: 'Doms Groove Super-Dark Triangle Pencils',
    category: 'stationery',
    subcategory: 'Pencils',
    brand: 'Doms',
    price: 99,
    originalPrice: 110,
    rating: 4.7,
    reviewsCount: 410,
    specs: ['Shape: Ergonomic Triangular Grip', 'Lead: Extra Dark Graphites', 'Free: Eraser and dual sharpener'],
    description: 'Featuring natural grip-grooves that automatically guide kids’ dynamic finger posture for comfortable handwriting.',
    image: 'Pencil'
  },
  {
    id: 'pen-pentonic-ball-10pack',
    name: 'Linc Pentonic Ball Pen Assorted Pack (10 pens)',
    category: 'stationery',
    subcategory: 'Pens',
    brand: 'Pentonic',
    price: 120,
    originalPrice: 150,
    rating: 4.8,
    reviewsCount: 2200,
    specs: ['Ink: Low-viscosity smart gel-feel technology', 'NIB size: 0.7mm', 'Colors: 5 Blue, 3 Black, 2 Red', 'Matt finish smart body'],
    description: 'Sleek style, featherlight weight, and incredibly smooth writing capabilities make the Pentonic the student favorite writing tool.',
    image: '/src/assets/images/prod_pentonic_1781411654041.jpg'
  },
  {
    id: 'pen-speed-new-radium-6pack',
    name: 'Speed New Radium Gel Pens (Pack of 6)',
    category: 'stationery',
    subcategory: 'Pens',
    brand: 'Speed New Radium',
    price: 90,
    originalPrice: 100,
    rating: 4.6,
    reviewsCount: 145,
    specs: ['NIB: 0.5mm Japanese technology', 'Water proof fade resistant ink', 'Neon style neon cap highlight'],
    description: 'Premium liquid ink mechanism designed specifically for neat exam writing without smudging.',
    image: 'Pen'
  },
  {
    id: 'pen-cello-butterflow-pack',
    name: 'Cello Butterflow Blue Ball Pens (Pack of 10)',
    category: 'stationery',
    subcategory: 'Pens',
    brand: 'Cello',
    price: 150,
    originalPrice: 180,
    rating: 4.7,
    reviewsCount: 850,
    specs: ['Spring-tip technology for supreme smooth flow', 'Comfortable elasto grip', 'Classic metallic clip style'],
    description: 'The standard trusted choice for millions of high schoolers. Designed to boost writing velocity.',
    image: 'Pen'
  },

  // --- BAGS ---
  {
    id: 'bag-skybags-marvel-st',
    name: 'Skybags Marvel Captain Backpack',
    category: 'bags',
    subcategory: 'School Bags',
    brand: 'Skybags',
    price: 1299,
    originalPrice: 1999,
    rating: 4.6,
    reviewsCount: 310,
    specs: ['Volume: 28 Liters', 'Material: Water-Resistant Polyester', 'Compartments: 3 main + 1 front organizer', 'Warranty: 1 Year International'],
    description: 'Ergonomic school bag designed for Primary to Middle school students. Features shoulder padding and a reinforced bottom base.',
    image: '/src/assets/images/prod_backpack_1781411668307.jpg'
  },
  {
    id: 'bag-american-tourister-casual',
    name: 'American Tourister Unisex Student Backpack',
    category: 'bags',
    subcategory: 'School Bags',
    brand: 'American Tourister',
    price: 1499,
    originalPrice: 2400,
    rating: 4.8,
    reviewsCount: 1720,
    specs: ['Volume: 32 Liters', 'Padded Laptop Sleeve included', 'Strap Type: Cushioned padded back support', 'Rain cover integrated'],
    description: 'Premium looking, long lasting and super spacious bag suitable for senior school, college, and tuition daily routines.',
    image: 'ShoppingBag'
  },
  {
    id: 'bag-wildcraft-campus',
    name: 'Wildcraft Campus Heavy-Duty School Backpack',
    category: 'bags',
    subcategory: 'School Bags',
    brand: 'Wildcraft',
    price: 1699,
    originalPrice: 2200,
    rating: 4.9,
    reviewsCount: 880,
    specs: ['Material: Double PU coated Ripstop Nylon', 'Weight: Lightweight (410gm)', 'Abrasion resistant quick durability'],
    description: 'Legendary Wildcraft durability. Adventure ready school backpack built to withstand active outdoor students.',
    image: 'ShoppingBag'
  },

  // --- SHOES ---
  {
    id: 'shoe-bata-classic-black',
    name: 'Bata School Classic Black Shoes',
    category: 'shoes',
    subcategory: 'School Shoes',
    brand: 'Bata',
    price: 599,
    originalPrice: 699,
    rating: 4.7,
    reviewsCount: 3400,
    specs: ['Material: Premium Breathable Synthetic Leather', 'Sole: Soft Anti-skid PVC sole', 'Fastener: Easy Velcro for kids / Lace-up for elders', 'Odor-control inner lining'],
    description: 'Standard school uniform black shoe. Extremely comfortable, durable and easy to wash. A staple of student assemblies.',
    image: '/src/assets/images/prod_batashoe_1781411681769.jpg'
  },
  {
    id: 'shoe-liberty-canvas-white',
    name: 'Liberty White Gola Sports School Shoes',
    category: 'shoes',
    subcategory: 'School Shoes',
    brand: 'Liberty',
    price: 450,
    originalPrice: 500,
    rating: 4.5,
    reviewsCount: 1220,
    specs: ['Ideal for: PT, Games, and Physical Drill days', 'Upper Canvas: Ultra duty washable canvas', 'Sole: Vulcunized flexible white rubber'],
    description: 'The classic Indian PT assembly shoe. Machine washable, provides elastic grip, and is incredibly budget friendly.',
    image: 'Activity'
  },
  {
    id: 'shoe-sparx-unisex-sports',
    name: 'Sparx Performance School Sports Shoes',
    category: 'shoes',
    subcategory: 'School Shoes',
    brand: 'Sparx',
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviewsCount: 560,
    specs: ['Comfort: Cushioned EVA Midsole', 'Breathable Mesh Upper pattern', 'Exceptional athletic grip', 'Size range: 1 to 10 UK'],
    description: 'A modern, dynamic athletic school sport shoe in compliance with school parameters. Combines elegance and sports stamina.',
    image: 'Activity'
  },

  // --- DAILY ESSENTIALS ---
  {
    id: 'e-milton-thermosteel-bottle',
    name: 'Milton Thermosteel Water Bottle (1 Litre)',
    category: 'essentials',
    subcategory: 'Water Bottles',
    brand: 'Milton',
    price: 699,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 2310,
    specs: ['Material: 304 High grade Stainless Steel', 'Insulation: Hot or cold for up to 24 hours', 'Leak proof rust free finish', 'Includes carry pouch'],
    description: 'Keep drinking water crystal-cold through exhausting summer class periods. Highly robust and impact resistant.',
    image: '/src/assets/images/prod_milton_1781411698700.jpg'
  },
  {
    id: 'e-celo-lunch-insulated',
    name: 'Cello Max Fresh Insulated Steel Lunch Box',
    category: 'essentials',
    subcategory: 'Lunch Boxes',
    brand: 'Cello',
    price: 399,
    originalPrice: 450,
    rating: 4.6,
    reviewsCount: 412,
    specs: ['Comes with 3 leak proof steel containers', 'Double walled insulation cover pouch', 'Food-grade BPA free lids'],
    description: 'Keep home-cooked parathas and veggie items fresh, warm and hygienic until the recess bell rings.',
    image: 'Utensils'
  },
  {
    id: 'e-maped-geometry-box',
    name: 'Maped Study Geometry Box',
    category: 'essentials',
    subcategory: 'Geometry Boxes',
    brand: 'Maped',
    price: 175,
    originalPrice: 200,
    rating: 4.7,
    reviewsCount: 680,
    specs: ['Material: Heavy gauge metal case', 'Includes: Compass, Divider, Ruler, Protractor, Set Squares', 'Self-centering safety compass locks'],
    description: 'Fitted with highly accurate measurement parameters. The companion for geometry diagrams and engineering classes.',
    image: '/src/assets/images/prod_geometry_1781411712803.jpg'
  },
  {
    id: 'e-camel-art-craft-supplies',
    name: 'Camel Premium Water Color Cake + Paintbrushes Kit',
    category: 'essentials',
    subcategory: 'Art & Craft Supplies',
    brand: 'Camel',
    price: 199,
    originalPrice: 250,
    rating: 4.8,
    reviewsCount: 540,
    specs: ['No of colors: 24 highly saturated paint tablets', 'Includes synthetic fine-line paintbrushes', 'Non toxic child safety certified'],
    description: 'Perfect for art class and school exhibition poster projects. Highly soluble and blends beautifully.',
    image: 'Sparkles'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Vikram Sharma',
    role: 'Parent',
    rating: 5,
    comment: 'Ordering all books and custom Class 9 stationeries with standard skybag in one go saved me hours of rushing between multiple local markets. Highly recommended for parents!',
    avatarSeed: 'vikram'
  },
  {
    id: 't-2',
    name: 'Akshat Reddy',
    role: 'Student',
    rating: 5,
    comment: 'The custom student kit generation is so cool. I picked my Class 10 subjects, added school shoe Bata size 8, a wildcraft bag, classmate notebooks, and received everything in active packaging under 48 hours.',
    avatarSeed: 'akshat'
  },
  {
    id: 't-3',
    name: 'Nisha Sundaresan',
    role: 'Teacher',
    rating: 5,
    comment: 'The pre-order textbook service has resolved standard delay friction for students at the start of academic terms. Smart Assistant recommendations for practical records are spot on.',
    avatarSeed: 'nisha'
  }
];
