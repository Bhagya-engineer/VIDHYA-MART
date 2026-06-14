/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Sparkles, BookOpen, Search, Filter, ShoppingBag, 
  MapPin, Phone, Mail, Award, ThumbsUp, Truck, RotateCcw, 
  Clock, CheckCircle, Navigation, MessageCircle, Send, 
  FileText, Shield, ArrowRight, User, ShoppingCart, Info, Check, Trash2, X
} from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard, { ProductIcon } from './components/ProductCard';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from './data';
import { Product, CartItem, CustomKitConfig, Order, ChatMessage, ContactMessage } from './types';

// Mock Initial Orders to give the user something to track instantly out of the box
const INITIAL_TRACKING_ORDERS: Order[] = [
  {
    id: "VIDHYA-TRACK-8820",
    items: [
      {
        product: PRODUCTS.find(p => p.id === 'n-classmate-long-6pack') || PRODUCTS[5],
        quantity: 1
      },
      {
        product: PRODUCTS.find(p => p.id === 'pen-pentonic-ball-10pack') || PRODUCTS[10],
        quantity: 1
      }
    ],
    total: 419,
    customerDetails: {
      name: "Akshat Reddy",
      email: "akshat.reddy@gmail.com",
      phone: "+91 98455 12345",
      address: "12, Maple Heights, HSR Layout",
      city: "Bengaluru",
      zipCode: "560102"
    },
    serviceType: "Standard Delivery",
    paymentMethod: "COD",
    status: "Confirmed",
    createdAt: "2026-06-12T10:00:00Z",
    trackingNumber: "VIDHYA-TRACK-8820"
  },
  {
    id: "VIDHYA-TRACK-4024",
    items: [
      {
        product: PRODUCTS.find(p => p.id === 'b-class10-math') || PRODUCTS[0],
        quantity: 1
      },
      {
        product: PRODUCTS.find(p => p.id === 'e-milton-thermosteel-bottle') || PRODUCTS[15],
        quantity: 1
      }
    ],
    total: 894,
    customerDetails: {
      name: "Meera Nair",
      email: "meera.nair@yahoo.com",
      phone: "+91 99002 88201",
      address: "Flat 4B, Lotus Apartments, T Nagar",
      city: "Chennai",
      zipCode: "600017"
    },
    serviceType: "Pre-Book",
    paymentMethod: "Online",
    status: "Dispatched",
    createdAt: "2026-06-13T14:30:00Z",
    trackingNumber: "VIDHYA-TRACK-4024"
  }
];

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  
  // Shopping Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vidhya_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('vidhya_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('vidhya_orders');
    return saved ? JSON.parse(saved) : INITIAL_TRACKING_ORDERS;
  });

  // Modal Dialogs visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Checkout Input form
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutCity, setCheckoutCity] = useState('');
  const [checkoutZip, setCheckoutZip] = useState('');
  const [checkoutService, setCheckoutService] = useState<'Pre-Book' | 'Standard Delivery' | 'Bulk Order'>('Standard Delivery');
  const [checkoutPayment, setCheckoutPayment] = useState<'COD' | 'Online'>('COD');
  const [checkoutSuccessOrder, setCheckoutSuccessOrder] = useState<Order | null>(null);

  // Bulk Booking Custom template
  const [bulkName, setBulkName] = useState('');
  const [bulkEmail, setBulkEmail] = useState('');
  const [bulkPhone, setBulkPhone] = useState('');
  const [bulkInstitution, setBulkInstitution] = useState('');
  const [bulkRequirements, setBulkRequirements] = useState('');
  const [bulkSuccessMsg, setBulkSuccessMsg] = useState(false);

  // Contact State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Catalog Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(2000);

  // Custom Kit Builder state
  const [kitClass, setKitClass] = useState('Class 10');
  const [kitSubjects, setKitSubjects] = useState<string[]>(['Mathematics', 'Science', 'English']);
  const [kitNotebook, setKitNotebook] = useState('Classmate Long Books');
  const [kitStationery, setKitStationery] = useState('Standard Kit (Pencils, Pens, Eraser)');
  const [kitBag, setKitBag] = useState('Skybags Backpack');
  const [kitShoes, setKitShoes] = useState('Bata Classic Black (Velcro/Lace)');
  const [kitShoeSize, setKitShoeSize] = useState('6 UK');
  const [kitSpecialRequests, setKitSpecialRequests] = useState('');
  const [generatedKit, setGeneratedKit] = useState<{
    id: string;
    items: { name: string; category: string; estPrice: number; icon: string }[];
    estimatedTotal: number;
    savings: number;
  } | null>(null);

  // Manual Tracking search
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [trackError, setTrackError] = useState('');

  // AI Chat Assistant System State
  const [chats, setChats] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Namaste & Welcome! 🌸 I am VIDHYA MART Smart Assistant, your offline-capable educational buddy. Ask me anything about textbooks, classmate record packs, Bata school footwear size recommendations or customized class curriculum kits. How can I facilitate your learning preparation today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Save to LocalStorage helpers
  useEffect(() => {
    localStorage.setItem('vidhya_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vidhya_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('vidhya_orders', JSON.stringify(orders));
  }, [orders]);

  // Scroll to bottom of Chat panel automatically
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, isAiTyping]);

  // Cart actions
  const handleAddToCart = (product: Product, size?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.product.id === product.id && item.selectedSize === size)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedSize: size }];
    });
    
    // Quick success action indicator or open cart briefly
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, val: number, size?: string) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size) {
          const nextQty = item.quantity + val;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        }
        return item;
      }).filter((Boolean) as any) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, size?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isProductWishlisted = (id: string) => {
    return wishlist.some(p => p.id === id);
  };

  // Generate Interactive Customized Kit Logic
  const handleGenerateStoreKit = () => {
    // Generate logical list of items based on form values
    const classLevel = kitClass;
    const itemBundle = [];
    let priceCumulative = 0;

    // 1. Textbooks estimation based on Class Level & Subjects selected
    const subjectsCount = kitSubjects.length;
    let textbookRate = 180;
    if (classLevel.includes('11') || classLevel.includes('12')) textbookRate = 220;
    if (classLevel.includes('Degree')) textbookRate = 300;
    if (classLevel.includes('Competitive')) textbookRate = 350;

    itemBundle.push({
      name: `${classLevel} Curriculum Textbooks (${subjectsCount} Subjects)`,
      category: 'Books',
      estPrice: textbookRate * subjectsCount,
      icon: 'BookOpen'
    });
    priceCumulative += (textbookRate * subjectsCount);

    // 2. Notebook package setup
    let notebookCost = 299; // Default classmate
    if (kitNotebook.includes('Practical Record')) notebookCost = 85 * 3; // pack of 3
    if (kitNotebook.includes('Square Ruled')) notebookCost = 180;

    itemBundle.push({
      name: `Notebooks: ${kitNotebook} Package`,
      category: 'Notebooks',
      estPrice: notebookCost,
      icon: 'Notebook'
    });
    priceCumulative += notebookCost;

    // 3. Stationery selection
    let stationeryCost = 120; // Pentonic
    if (kitStationery.includes('Basic')) stationeryCost = 75; // Apsara Box
    if (kitStationery.includes('Ultimate')) stationeryCost = 280; // geometry + sketch art

    itemBundle.push({
      name: `Stationery Pack: ${kitStationery}`,
      category: 'Stationery',
      estPrice: stationeryCost,
      icon: 'PenTool'
    });
    priceCumulative += stationeryCost;

    // 4. Bag selection
    let bagCost = 1299; // Skybags
    if (kitBag.includes('American Tourister')) bagCost = 1499;
    if (kitBag.includes('Wildcraft')) bagCost = 1699;

    itemBundle.push({
      name: `Ergonomic Carrying Pack: ${kitBag}`,
      category: 'School Bags',
      estPrice: bagCost,
      icon: 'ShoppingBag'
    });
    priceCumulative += bagCost;

    // 5. Shoes selection
    let shoeCost = 599; // Bata
    if (kitShoes.includes('Gola sports') || kitShoes.includes('Liberty')) shoeCost = 450;
    if (kitShoes.includes('Sparx')) shoeCost = 899;

    itemBundle.push({
      name: `Footwear: ${kitShoes} (Size: ${kitShoeSize})`,
      category: 'School Shoes',
      estPrice: shoeCost,
      icon: 'Activity'
    });
    priceCumulative += shoeCost;

    // Calculate dynamic savings for complete kits
    const savingsAmount = Math.round(priceCumulative * 0.15); // 15% comprehensive discount
    const discountedTotal = priceCumulative - savingsAmount;

    setGeneratedKit({
      id: `KIT-${Math.floor(1000 + Math.random() * 9000)}`,
      items: itemBundle,
      estimatedTotal: discountedTotal,
      savings: savingsAmount
    });
  };

  // Add Complete Customized Student Kit to Cart
  const handleAddKitToCart = () => {
    if (!generatedKit) return;
    
    // Create a physical representative product item
    const kitProduct: Product = {
      id: `custom-kit-${generatedKit.id}`,
      name: `VIDHYA MART Customized Student Kit [${kitClass}]`,
      category: 'essentials',
      subcategory: 'Custom Packages',
      price: generatedKit.estimatedTotal,
      originalPrice: generatedKit.estimatedTotal + generatedKit.savings,
      brand: 'VIDHYA MART',
      rating: 5.0,
      reviewsCount: 1,
      specs: [
        `Class: ${kitClass}`,
        `Subjects: ${kitSubjects.join(', ')}`,
        `Notebook: ${kitNotebook}`,
        `Stationery: ${kitStationery}`,
        `Bag: ${kitBag}`,
        `Shoes: ${kitShoes} (${kitShoeSize})`,
        kitSpecialRequests ? `Req: ${kitSpecialRequests}` : ''
      ].filter(Boolean),
      description: `Comprehensive custom aggregated set of essential learning guides, writing materials and matching gear customized for ${kitClass} needs.`,
      image: 'Sparkles'
    };

    handleAddToCart(kitProduct);
    setGeneratedKit(null); // reset generator form
    setIsCartOpen(true);
  };

  // Checkout and place Order
  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail || !checkoutPhone || !checkoutAddress) {
      alert("Please provide the required contact details for verification.");
      return;
    }

    const orderTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const trackingID = `VIDHYA-TRACK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: trackingID,
      items: [...cart],
      total: orderTotal,
      customerDetails: {
        name: checkoutName,
        email: checkoutEmail,
        phone: checkoutPhone,
        address: checkoutAddress,
        city: checkoutCity || 'N/A',
        zipCode: checkoutZip || 'N/A'
      },
      serviceType: checkoutService === 'Pre-Book' ? 'Pre-Book' : checkoutService === 'Bulk Order' ? 'Bulk Order' : 'Standard Delivery',
      paymentMethod: checkoutPayment,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      trackingNumber: trackingID
    };

    setOrders(prev => [newOrder, ...prev]);
    setCheckoutSuccessOrder(newOrder);
    setCart([]); // Clear Cart upon successful booking
  };

  // Trigger tracked manual look up
  const handleTrackOrderInput = (trackNum: string) => {
    const cleanNum = trackNum.trim().toUpperCase();
    const match = orders.find(o => o.id.toUpperCase() === cleanNum || o.trackingNumber.toUpperCase() === cleanNum);
    if (match) {
      setTrackedOrder(match);
      setTrackError('');
    } else {
      setTrackedOrder(null);
      setTrackError(`Reference "${trackNum}" not found. Try Tracking with demo numbers: VIDHYA-TRACK-8820 or VIDHYA-TRACK-4024.`);
    }
  };

  // Handle Contact submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      alert("Please complete name, email, and description fields.");
      return;
    }
    setContactSuccess(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMsg('');
      setContactSuccess(false);
    }, 5000);
  };

  // Handle Bulk Wholesale submit
  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkName || !bulkEmail || !bulkRequirements) {
      alert("Please enter Name, Email contact, and estimated student count/requirements.");
      return;
    }
    setBulkSuccessMsg(true);
    setTimeout(() => {
      setBulkName('');
      setBulkEmail('');
      setBulkPhone('');
      setBulkInstitution('');
      setBulkRequirements('');
      setBulkSuccessMsg(false);
    }, 6000);
  };

  // Chat API call sending message to express server routing to gemini
  const handleSendChatMessage = async (presetText?: string) => {
    const textToSend = presetText || aiInput;
    if (!textToSend.trim()) return;

    // Clear user input
    setAiInput('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    try {
      // Create current interactive state context to help ground the chat advice
      const currentCartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
      
      const payload = {
        messages: chats.concat(userMsg).map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.text
        })),
        currentContext: {
          cartTotal: currentCartTotal,
          wishlistLength: wishlist.length,
          kitClass: kitClass
        }
      };

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Local backend routing error code " + res.status);
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChats(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      // Friendly offline simulator response
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: `I've prepared a direct answer for you! Yes, we have standard school kits configured, Classmate Notebook bundles (MRP ₹299), Linc Pentonic pens packs (₹120) and Bata Classic Black Shoes (₹599). Feel free to customize these options directly in the **"Custom Student Kit"** tab or add them manually.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChats(prev => [...prev, fallbackMsg]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Quick category items filter
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (p.subcategory && p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesPrice = p.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col justify-between" id="vidhya-root-div">
      
      {/* HEADER SECTION */}
      <Header 
        cart={cart}
        wishlist={wishlist}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openCartModal={() => setIsCartOpen(true)}
        openWishlistModal={() => setIsWishlistOpen(true)}
        onTrackOrderDirectly={(num) => {
          setTrackQuery(num);
          handleTrackOrderInput(num);
        }}
      />

      {/* DYNAMIC VIEW CONTAINER */}
      <main className="flex-1 pb-16">
        
        {/* VIEW 1: HOME TAB */}
        {currentTab === 'home' && (
          <div className="space-y-16" id="view-home">
            
            {/* HERO PROMOTIONS */}
            <Hero 
              onStartCustomizing={() => setCurrentTab('customizer')}
              onExploreProducts={() => {
                setSelectedCategory('all');
                setCurrentTab('categories');
              }}
              onTalkToAI={() => setCurrentTab('chat')}
            />

            {/* CATEGORIES SECTION WITH PREMIUM GENERATED BACKGROUNDS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Shop by Scholastic Categories
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Discover curated books, neat classmates-certified records, high-grade pen/stationery boxes, authentic uniform shoes, and durable backpacks.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" id="categories-visual-card-grid">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentTab('categories');
                    }}
                    className="group relative h-48 rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all text-left flex flex-col justify-end p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {/* Background image & gradient overlay */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={cat.image}
                        alt={`${cat.name} Category`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#0f172a]/70 to-transparent" />
                    </div>

                    {/* Category Details */}
                    <div className="relative z-10 w-full">
                      <div className="bg-white/20 backdrop-blur-md w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 text-white border border-white/10">
                        <span className="text-xs">
                          {cat.id === 'books' && '📚'}
                          {cat.id === 'notebooks' && '📓'}
                          {cat.id === 'stationery' && '🖊️'}
                          {cat.id === 'bags' && '🎒'}
                          {cat.id === 'shoes' && '👟'}
                          {cat.id === 'essentials' && '🍱'}
                        </span>
                      </div>
                      <h3 className="font-sans font-bold text-sm sm:text-base text-white tracking-tight leading-snug group-hover:text-amber-400 transition-colors font-sans">
                        {cat.name}
                      </h3>
                      <p className="text-[10px] text-amber-400 font-semibold tracking-wide flex items-center mt-1 group-hover:text-white transition-colors">
                        Explore Catalog &rarr;
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* QUICK FEATURED PRODUCTS SECTION */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Popular Student Essentials
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Get premium quality products suggested immediately for the upcoming semester.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentTab('categories');
                  }}
                  className="mt-3 md:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  <span>View all items</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="popular-essentials-grid">
                {PRODUCTS.slice(0, 8).map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onAddToCart={(p) => handleAddToCart(p)}
                    onToggleWishlist={(p) => handleToggleWishlist(p)}
                    isWishlisted={isProductWishlisted(product.id)}
                  />
                ))}
              </div>
            </div>

            {/* THREE COLUMN VALUE GRAPHICS SECTION */}
            <div className="bg-white py-12 border-y border-slate-100" id="vidhya-guarantees-bar">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Affordable Home Delivery</h3>
                    <p className="text-xs text-slate-500 mt-1">Convenient door delivery straight to your residential campus or home.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Custom aggregated School Kits</h3>
                    <p className="text-xs text-slate-500 mt-1">Generate complete packages curated for class subjects on-demand.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Cash on Delivery option</h3>
                    <p className="text-xs text-slate-500 mt-1">Pay when you receive your educational materials safely in hand.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* INTERACTIVE STUDENT KIT BANNER PREVIEW */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl" id="custom-generator-banner">
                {/* Visual abstract overlay */}
                <div className="absolute top-0 right-0 w-80 h-full bg-white/5 skew-x-12 pointer-events-none" />
                <div className="relative z-10 max-w-2xl space-y-4">
                  <div className="inline-flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase">
                    <span>💡 Smart aggregations</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Generate Your Class Pack in 60 Seconds
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Pick your class level, books requirements, comfortable classmate records, preferred sports/PT assembly shoes size and get a fully packaged custom kit instantly with a special 15% discount.
                  </p>
                  <div>
                    <button
                      onClick={() => setCurrentTab('customizer')}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition-all inline-flex items-center space-x-2"
                    >
                      <span>Custom Kit Generator</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TESTIMONIALS SECTION */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-xl mx-auto mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">What Students & Parents Say</h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-2">
                  VIDHYA MART has simplified back-to-school routines for hundreds of academic families.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials-grid">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors shadow-xs flex flex-col justify-between">
                    <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed">
                      "{t.comment}"
                    </p>
                    <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-slate-50">
                      <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center font-bold text-slate-700 text-xs">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{t.role}</p>
                      </div>
                      <div className="ml-auto text-amber-500 font-bold text-xs">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SIMPLE CONTACT SECTION */}
            <div className="max-w-xl mx-auto px-4 sm:px-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Need Help or Have Custom Requests?</h3>
                <p className="text-slate-500 text-xs mb-4">Send a direct note to VIDHYA MART Student Assistance office, we respond within 12 business hours.</p>
                
                {contactSuccess ? (
                  <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-xl border border-emerald-100">
                    Thank you for your response! Representative from the VIDHYA MART Student Desk will call or write back shortly.
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Phone (Optional)"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                      placeholder="List special textbooks requirements, bulk student sizes, or notes..."
                      rows={3}
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                    >
                      Submit Message
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: CATEGORIES TAB (CATALOG & SEARCH) */}
        {currentTab === 'categories' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8" id="view-categories">
            
            {/* Header Area */}
            <div className="text-left space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Student Essentials Catalog</h2>
              <p className="text-slate-500 text-sm">Browse categorized textbooks for multiple classes, stationery kits, footwear sizing, water bottles, and accessories.</p>
            </div>

            {/* Control Panel: Search, Category Buttons, Price Slider */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Search query box */}
                <div className="md:col-span-5 relative">
                  <span className="absolute left-3.5 top-3.5 text-slate-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search pencils, classmate notebook, Bata shoe, NCERT textbooks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-slate-700"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Sub-filtering Categories bar */}
                <div className="md:col-span-7 flex flex-wrap gap-1.5" id="categories-filter-capsules">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedCategory === 'all' 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    All Essentials
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                        selectedCategory === cat.id 
                          ? 'bg-blue-600 text-white shadow-xs' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range selector */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 pt-1 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 shrink-0">Filter by Maximum Price:</span>
                <input
                  type="range"
                  min="50"
                  max="2500"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full max-w-xs accent-blue-600"
                />
                <span className="text-xs font-bold text-blue-600">Under ₹{priceRange}</span>
              </div>
            </div>

            {/* PRODUCTS DISPLAY LIST */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                <span>Showing {filteredProducts.length} items from standard library inventory matching criteria</span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="category-products-grid">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      onAddToCart={(p) => handleAddToCart(p)}
                      onToggleWishlist={(p) => handleToggleWishlist(p)}
                      isWishlisted={isProductWishlisted(product.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 text-center rounded-2xl border border-slate-150 text-slate-500 space-y-3">
                  <Info className="w-12 h-12 text-slate-350 mx-auto" />
                  <p className="text-sm font-semibold">No products found matching "{searchQuery}" under ₹{priceRange}.</p>
                  <p className="text-xs text-slate-400">Try adjusting your filters, query terms or checkout our ready packages!</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setPriceRange(2000);
                    }}
                    className="mt-2 text-xs font-bold text-blue-600 border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-50"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>

            {/* SECTIONS FOR EACH EXPLICIT USER-REQUESTED CATEGORY DETAILS ACCORDING TO SPECS */}
            <div className="border-t border-slate-200 pt-12 space-y-10" id="exact-specifications-dictionary">
              <h3 className="text-xl font-bold text-slate-800">Catalogue Specifications & Supported Items Dictionary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Books spec block */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">📚</span>
                    <h4 className="font-bold text-slate-900 text-sm">Books Supported</h4>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 md:space-y-1.5 list-disc pl-5">
                    <li><strong className="text-slate-800">Classes:</strong> Class 1 to Class 12 standard NCERT guides</li>
                    <li><strong className="text-slate-800">Degree Course Packs:</strong> BS Grewal Higher Engineering mathematics or reference books</li>
                    <li><strong className="text-slate-800">Competitive Exams:</strong> Concepts of Physics HC Verma prep sets</li>
                  </ul>
                </div>

                {/* Notebook details */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">📒</span>
                    <h4 className="font-bold text-slate-900 text-sm">Notebooks Brands</h4>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 md:space-y-1.5 list-disc pl-5">
                    <li><strong className="text-slate-800">Classmate:</strong> Premium long books (packaged in sets of 6)</li>
                    <li><strong className="text-slate-800">Navneet:</strong> Standard practical record spiral books</li>
                    <li><strong className="text-slate-800">Sundaram:</strong> Kraft paper packs and square layouts for toddlers</li>
                  </ul>
                </div>

                {/* Stationery details */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">✏️</span>
                    <h4 className="font-bold text-slate-900 text-sm">Writing & Stationery</h4>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 md:space-y-1.5 list-disc pl-5">
                    <li><strong className="text-slate-800">Pencils:</strong> Apsara platinum extra-dark and Doms custom groove</li>
                    <li><strong className="text-slate-800">Pens:</strong> Speed New Radium gel, Pentonic ball pens, Linc and Cello Butterflow</li>
                  </ul>
                </div>

                {/* Bags specification */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">🎒</span>
                    <h4 className="font-bold text-slate-900 text-sm">Bags & Luggage</h4>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 md:space-y-1.5 list-disc pl-5">
                    <li><strong className="text-slate-800">Skybags:</strong> Captain Marvel edition for primary class juniors</li>
                    <li><strong className="text-slate-800">American Tourister:</strong> High capacity casual school backpack with padded laptop frames</li>
                    <li><strong className="text-slate-800 font-semibold">Wildcraft:</strong> Heavy-duty university and high school bags</li>
                  </ul>
                </div>

                {/* Footwear details */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">👟</span>
                    <h4 className="font-bold text-slate-900 text-sm">School Footwear</h4>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 md:space-y-1.5 list-disc pl-5">
                    <li><strong className="text-slate-800">Bata:</strong> Premium synthetic leather uniform black shoes with velcro/lace options</li>
                    <li><strong className="text-slate-800">Liberty white:</strong> Classic canvas Gola shoes for PT mornings</li>
                    <li><strong className="text-slate-800">Sparx & Campus:</strong> Cushioned performance school sports shoes</li>
                  </ul>
                </div>

                {/* Lunch & Geometry details */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">💧</span>
                    <h4 className="font-bold text-slate-900 text-sm">Accessories</h4>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 md:space-y-1.5 list-disc pl-5">
                    <li><strong className="text-slate-800 font-semibold">Brands:</strong> Milton Thermosteel insulated bottle & Cello steel lunchboxes</li>
                    <li><strong className="text-slate-800">Drafting:</strong> Maped Study heavy metallic geometry precision cases</li>
                    <li><strong className="text-slate-800">Art kits:</strong> Camel watercolor saturated paint cakes and brushes set</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* VIEW 3: CUSTOM STUDENT KIT GENERATOR */}
        {currentTab === 'customizer' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-8" id="view-customizer">
            
            <div className="text-center space-y-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                VIDHYA MART Kit Wizard
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">Customize Your Requirements</h2>
              <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
                Select your student level parameters below, and our advanced catalog aggregator will instantly package books, notebooks and accessories together with a bundled 15% discount.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
              
              {/* Form Input fields */}
              <div className="p-6 md:p-8 md:col-span-7 space-y-5 border-b md:border-b-0 md:border-r border-slate-150">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Configure Parameters</h3>
                
                {/* Select Class */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">1. Select Class/Grade</label>
                  <select
                    value={kitClass}
                    onChange={(e) => setKitClass(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium text-slate-700"
                  >
                    {['Class 1', 'Class 2', 'Class 5', 'Class 6', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Intermediate', 'Degree Courses', 'Competitive Exams Prep'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Subsidized subjects selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">2. Select Key Subjects</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Mathematics', 'Science', 'Social Studies', 'English', 'Regional Language', 'Physics/Chemistry', 'EVS / GK', 'Computer Programming'].map(sub => {
                      const isChecked = kitSubjects.includes(sub);
                      return (
                        <label 
                          key={sub} 
                          className={`flex items-center space-x-2.5 p-2 rounded-lg border transition-all text-xs cursor-pointer ${
                            isChecked 
                              ? 'bg-blue-50/70 border-blue-200 text-blue-900 font-semibold' 
                              : 'bg-slate-50/40 border-slate-150 hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="rounded text-blue-600 accent-blue-600"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setKitSubjects(prev => prev.filter(s => s !== sub));
                              } else {
                                setKitSubjects(prev => [...prev, sub]);
                              }
                            }}
                          />
                          <span>{sub}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Choose Notebook */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">3. Notebook Layout Type</label>
                  <select
                    value={kitNotebook}
                    onChange={(e) => setKitNotebook(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium text-slate-700"
                  >
                    <option value="Classmate Long Books">ITC Classmate Softcover Ruled (standard)</option>
                    <option value="Navneet Practical Records">Navneet Labs Practical record files</option>
                    <option value="Sundaram Square Ruled">Sundaram Square Ruled (maths format)</option>
                  </select>
                </div>

                {/* Custom stationery selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">4. Stationery Kit Tier</label>
                  <select
                    value={kitStationery}
                    onChange={(e) => setKitStationery(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium text-slate-700"
                  >
                    <option value="Basic (Apsara Platinum Pencils & Eraser)">Basic (Apsara Platinum Pencils & Eraser - ₹75)</option>
                    <option value="Standard Kit (Pencils, Pens, Eraser)">Standard (Pentonic Ink Pens + Doms groove set - ₹120)</option>
                    <option value="Ultimate Aggregation Kit">Ultimate Academic (Geometry Box + Camel Saturated colors - ₹280)</option>
                  </select>
                </div>

                {/* Bag & Shoes specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">5. Choose Bag Brand</label>
                    <select
                      value={kitBag}
                      onChange={(e) => setKitBag(e.target.value)}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-700"
                    >
                      <option value="Skybags Backpack">Skybags Captain Marvel</option>
                      <option value="American Tourister Casual">American Tourister Padded Casual</option>
                      <option value="Wildcraft Campus">Wildcraft Heavy-Duty Campus</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">6. Choose Footwear Brand</label>
                    <select
                      value={kitShoes}
                      onChange={(e) => setKitShoes(e.target.value)}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-700"
                    >
                      <option value="Bata Classic Uniform Black">Bata school classic uniform black</option>
                      <option value="Liberty Gola Sports White">Liberty white Gola sports PT shoe</option>
                      <option value="Sparx Performance Mesh">Sparx performance school sports</option>
                    </select>
                  </div>
                </div>

                {/* Feet size configuration */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-750 block">Footwear Size (UK Range)</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['2 UK', '3 UK', '4 UK', '5 UK', '6 UK', '7 UK', '8 UK', '9 UK', '10 UK'].map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setKitShoeSize(size)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                          kitShoeSize === size 
                            ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-xs' 
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/60 text-slate-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Special Student Request notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Include specific non-NCERT language guides or blue speed gel pens"
                    value={kitSpecialRequests}
                    onChange={(e) => setKitSpecialRequests(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Submitting Trigger to aggregate list */}
                <button
                  onClick={handleGenerateStoreKit}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-blue-200"
                >
                  Generate My Student Kit
                </button>
              </div>

              {/* Aggregated Output details */}
              <div className="p-6 md:p-8 md:col-span-5 bg-slate-900 text-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 uppercase tracking-widest text-slate-400 font-mono text-[10px]">
                    <span>AGGREGATION INVOICE</span>
                    <span className="text-amber-400 font-bold font-sans">VIDHYA MART SYSTEM</span>
                  </div>

                  {generatedKit ? (
                    <div className="mt-4 space-y-4">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AGGREGATED PACKAGE</p>
                        <h4 className="text-sm font-bold text-amber-400">{generatedKit.id} for {kitClass}</h4>
                      </div>

                      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                        {generatedKit.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-start text-xs border-b border-white/5 pb-2">
                            <div>
                              <p className="font-bold text-white leading-tight">{it.name}</p>
                              <p className="text-[10px] text-slate-400">{it.category}</p>
                            </div>
                            <span className="font-mono text-slate-300">₹{it.estPrice}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/10 space-y-1">
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span>Kit Aggregate Savings (15% Package Discount)</span>
                          <span className="text-emerald-400 font-semibold font-mono">-₹{generatedKit.savings}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-sm pt-2">
                          <span className="font-bold">Total Estimated Kit rate:</span>
                          <span className="text-xl font-mono font-black text-amber-400">₹{generatedKit.estimatedTotal}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-20 text-center space-y-3">
                      <span className="text-4xl">🎒</span>
                      <p className="text-xs text-slate-400">No student pack generated yet. Configure options on the left desk and click generate!</p>
                    </div>
                  )}
                </div>

                {generatedKit && (
                  <div className="pt-6 border-t border-white/10 space-y-2">
                    <button
                      onClick={handleAddKitToCart}
                      className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition-all"
                    >
                      Add Package Pack to Cart
                    </button>
                    <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                      This will add a custom formatted pack item with code spec sheets directly to your active Checkout bag.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 4: SERVICES & MANUAL TRACKING TAB */}
        {currentTab === 'orders' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 space-y-12" id="view-orders">
            
            {/* MANUAL TRACKING WIDGET */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="text-left space-y-1">
                <h2 className="text-2xl font-black text-slate-900">Track Student Shipments</h2>
                <p className="text-slate-500 text-xs sm:text-sm">Verify the real-time shipping status of your textbook bookings or stationery kit orders.</p>
              </div>

              {/* Form Input */}
              <div className="max-w-xl">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Tracking Reference e.g. VIDHYA-TRACK-8820"
                    value={trackQuery}
                    onChange={(e) => setTrackQuery(e.target.value)}
                    className="flex-1 text-xs sm:text-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-700 font-mono"
                  />
                  <button
                    onClick={() => handleTrackOrderInput(trackQuery)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Track Shipment
                  </button>
                </div>
                {trackError && <p className="text-rose-600 text-[11px] font-medium mt-2">{trackError}</p>}
                
                <p className="text-[11px] text-slate-400 mt-2">
                  💡 Hint: Enter standard demo references <span className="font-bold text-slate-600">VIDHYA-TRACK-8820</span> or <span className="font-bold text-slate-600">VIDHYA-TRACK-4024</span> to see status progress bars instantly!
                </p>
              </div>

              {/* TRACKING PATH GRAPHIC RESULT */}
              {trackedOrder ? (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline pb-4 border-b border-slate-200 gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Booking ID</span>
                      <h4 className="text-base font-black text-slate-950 font-mono">{trackedOrder.id}</h4>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Service Type</span>
                      <p className="text-xs font-bold text-slate-800">{trackedOrder.serviceType} ({trackedOrder.paymentMethod})</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimated Delivery</span>
                      <p className="text-xs font-bold text-slate-800">June 18, 2026</p>
                    </div>
                  </div>

                  {/* Shipment Status Path Graphic bar */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-500">Shipping Journey Line:</p>
                    
                    <div className="grid grid-cols-4 gap-1 relative pt-4">
                      {/* Active green bars */}
                      <div className="absolute top-[22px] left-0 right-0 h-1 bg-slate-200 z-0" />
                      
                      {[
                        { step: 'Pending', label: 'Order Registered', desc: 'Sunk into queue' },
                        { step: 'Confirmed', label: 'Item Package Assembled', desc: 'Kit generated & verified' },
                        { step: 'Dispatched', label: 'On Route', desc: 'Handed to campus cargo' },
                        { step: 'Delivered', label: 'Safely Delivered', desc: 'At classroom door' }
                      ].map((item, index) => {
                        const statusMapping = {
                          'Pending': 1,
                          'Confirmed': 2,
                          'Dispatched': 3,
                          'Delivered': 4
                        };
                        const orderStepNum = statusMapping[trackedOrder.status] || 1;
                        const isDone = index + 1 <= orderStepNum;
                        const isCurrent = index + 1 === orderStepNum;

                        return (
                          <div key={item.step} className="flex flex-col items-center text-center z-10 relative">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] pb-0.5 border-2 ${
                              isCurrent
                                ? 'bg-amber-400 border-amber-500 text-slate-950 scale-110 shadow-md shadow-amber-100' 
                                : isDone
                                ? 'bg-blue-600 border-blue-700 text-white' 
                                : 'bg-white border-slate-300 text-slate-400'
                            }`}>
                              {isDone ? '✓' : index + 1}
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold text-slate-900 mt-2.5 leading-tight">{item.label}</span>
                            <span className="text-[9px] text-slate-400 max-w-[100px] mt-0.5 hidden sm:inline">{item.desc}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Booking items list inside shipment */}
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs font-bold text-slate-500 mb-2.5">Packed Essentials in Shipment:</p>
                    <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-100">
                      {trackedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs text-slate-700 py-1 border-b last:border-0 border-slate-50">
                          <span className="font-medium">{item.product.name} (Qty: {item.quantity})</span>
                          <span className="font-mono font-bold text-slate-900">₹{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* SERVICES INGREDIENT LISTING */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Service Cards Left */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Supported Campus Services</h3>
                
                {[
                  { title: "📚 Pre-Book Textbooks Program", desc: "Allows high school levels, degree cohorts and test prep candidates to place bookings on syllabus catalogs ahead of seasonal bookstore spikes, guaranteeing timely acquisition." },
                  { title: "📦 School Kit Packages", desc: "Get all class notes, classmate longbooks, writing materials, geometry accessories and uniform footwear color coordinates grouped within one cohesive order." },
                  { title: "🚚 Reliable Cash on Delivery", desc: "No complex transactions required. We trust our student group; simply place an order, track via shipping updates, and pay of delivery arrival." },
                  { title: "🏫 Bulk Institution Orders Office", desc: "Wholesale packages available for district institutions, private boarding schools, state residential colleges, with unified discount programs." }
                ].map((s, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors flex items-start space-x-3.5 shadow-xs">
                    <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{s.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 lines-clamp-3 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Bulk order Form on Right */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between" id="bulk-order-form-widget">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Bulk Wholesales Inquiries Desk</h3>
                  <p className="text-slate-500 text-xs mb-4">Are you a coordinator, boarding manager, or school cluster officer? Use this direct submission to request quotes on bulk educational aggregates.</p>

                  {bulkSuccessMsg ? (
                    <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-150">
                      Great! Bulk Wholesales application register request parsed under reference "VIDHYA-BULK-Q9". A senior representative will write back with quotes shortly.
                    </div>
                  ) : (
                    <form onSubmit={handleBulkSubmit} className="space-y-3.5">
                      <input
                        type="text"
                        placeholder="Contact Representative Name"
                        value={bulkName}
                        onChange={(e) => setBulkName(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Official Email"
                        value={bulkEmail}
                        onChange={(e) => setBulkEmail(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Representative Phone"
                        value={bulkPhone}
                        onChange={(e) => setBulkPhone(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="School/College Name"
                        value={bulkInstitution}
                        onChange={(e) => setBulkInstitution(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                      <textarea
                        placeholder="Specify estimated volume requirements (e.g. 150 Classmate Longbook sets, 80 Skybags, 120 Gola White sports shoes size 3 to 7)..."
                        rows={4}
                        value={bulkRequirements}
                        onChange={(e) => setBulkRequirements(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase transition-all"
                      >
                        Submit Institutional Inquiry
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 5: AI SUPPORT CHAT SUPPORT (GEMINI) */}
        {currentTab === 'chat' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6 flex flex-col h-[75vh]" id="view-chat">
            
            <div className="flex justify-between items-center bg-white p-4 rounded-t-2xl border-t border-x border-slate-200">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-xl text-white flex items-center justify-center shadow-sm">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">VIDHYA MART Student Support Assistant</h3>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 inline-block animate-pulse"></span>
                    Online & Smart Support Active
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChats([
                  {
                    id: 'welcome',
                    sender: 'assistant',
                    text: 'Namaste! Cleared previous context lines. Ask me any pricing, school kit suggest or Bata sizing questions!',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ])}
                className="text-[10px] text-slate-400 hover:text-red-500 font-semibold border border-slate-150 py-1.5 px-3 rounded-lg flex items-center gap-1 bg-slate-50/70"
              >
                Clear Chats
              </button>
            </div>

            {/* Chat list block */}
            <div className="flex-1 bg-white border-x border-slate-200 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              {chats.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 space-y-1 ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-50 text-slate-800 border border-slate-150 rounded-bl-none'
                    }`}
                  >
                    <div className="font-medium whitespace-pre-line leading-relaxed">{msg.text}</div>
                    <div className={`text-[9px] text-right mt-1.5 ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-450'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 rounded-bl-none flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-slate-400 animate-pulse">VIDHYA MART assistant is writing...</span>
                    <div className="flex space-x-1">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Recommendations clickable prompts */}
            <div className="bg-slate-50 px-4 py-3 border-x border-slate-200">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Student Suggested FAQ prompts:</p>
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1" id="chat-prompt-chips">
                {[
                  "Which notebooks are best for Class 10?",
                  "Do you have Pentonic blue pens?",
                  "Suggest a school bag under ₹1000.",
                  "Track my order."
                ].map((chipText) => (
                  <button
                    key={chipText}
                    onClick={() => handleSendChatMessage(chipText)}
                    className="text-[10px] bg-white hover:bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-150 transition-colors shrink-0"
                  >
                    {chipText}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input form */}
            <div className="bg-white p-3 rounded-b-2xl border-b border-x border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask VIDHYA MART AI about textbook pricing, school kits aggregation, or order tracking..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendChatMessage();
                }}
                className="flex-1 text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleSendChatMessage()}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* VIEW 6: ABOUT US / WHY VIDHYA TAB */}
        {currentTab === 'about' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-12" id="view-about">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why Choose VIDHYA MART?</h2>
              <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                We are building the smartest online academic companion designed specifically with Indian school and college ecosystems in mind.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="about-features-grid">
              {[
                {
                  title: "Affordable Student Rates",
                  desc: "We work directly with stationery manufacturers like ITC-Classmate, DOMS, Reynolds alongside textbook distributors to bypass markup chains, offering absolute lowest rates."
                },
                {
                  title: "Quality Certifications",
                  desc: "Zero compromise on safety. We handle BPA-free Milton water container materials, elemental chlorine-free classmate long books and genuine ortho-sole Bata footwear."
                },
                {
                  title: "Fast Delivery Coordinates",
                  desc: "Strategic local logistics networks ensure aggregated school kit orders arrive at your home doorstep safely sealed inside waterproof cargo bounds."
                },
                {
                  title: "Smart AI Assistance Desk",
                  desc: "Built with responsive systems to answer book code mappings, sizing charts, custom package configurations instantly, assisting non-tech parents effortlessly."
                }
              ].map((f, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors shadow-xs">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">0{i+1}</span>
                  <h4 className="font-bold text-slate-900 text-base">{f.title}</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-6 sm:p-8 rounded-3xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left space-y-1 max-w-lg">
                <h4 className="text-sm font-extrabold text-blue-900">Need immediate counseling on bulk orders?</h4>
                <p className="text-xs text-blue-700 leading-relaxed">Contact VIDHYA MART Desk directly at bhagyalakshmi2584@gmail.com. We prepare tailored school budgets with instant cash discounts.</p>
              </div>
              <button
                onClick={() => setCurrentTab('orders')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl whitespace-nowrap transition-all"
              >
                Go to Institutional Inquiries
              </button>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-900 text-white pt-12 pb-8 border-t border-slate-800" id="vidhya-footer-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="font-extrabold text-lg tracking-tight">VIDHYA MART</h2>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              VIDHYA MART – Everything a Student Needs in One Place. Making back-to-school preparation simple, budget-optimized and interactive.
            </p>
            <p className="text-[10px] text-slate-500">Academic Year © 2026. All rights reserved.</p>
          </div>

          {/* Quick tabs */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Platform Links</h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-300">
              <button onClick={() => setCurrentTab('home')} className="hover:text-amber-400 text-left">Home Base</button>
              <button onClick={() => { setSelectedCategory('all'); setCurrentTab('categories'); }} className="hover:text-amber-400 text-left">Essentials Categories</button>
              <button onClick={() => setCurrentTab('customizer')} className="hover:text-amber-400 text-left">Custom Kit Generator</button>
              <button onClick={() => setCurrentTab('orders')} className="hover:text-amber-400 text-left font-semibold">Track Shipment Order</button>
            </div>
          </div>

          {/* Catalog Categories helper */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Class Supplies</h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-300">
              <button onClick={() => { setSelectedCategory('books'); setCurrentTab('categories'); }} className="hover:text-slate-100 text-left">NCERT Textbooks</button>
              <button onClick={() => { setSelectedCategory('notebooks'); setCurrentTab('categories'); }} className="hover:text-slate-100 text-left font-medium">Classmate Longbooks</button>
              <button onClick={() => { setSelectedCategory('shoes'); setCurrentTab('categories'); }} className="hover:text-slate-100 text-left">Bata Uniform Footwear</button>
              <button onClick={() => { setSelectedCategory('stationery'); setCurrentTab('categories'); }} className="hover:text-slate-100 text-left">Apsara & Pentonic Kit</button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Student Helpdesk</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center space-x-1.5 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="font-medium">bhagyalakshmi2584@gmail.com</span>
              </p>
              <p className="flex items-center space-x-1.5 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>+91 91234 56789 (Support)</span>
              </p>
              <p className="text-[10px] text-slate-400 leading-normal">
                Bengaluru, Karnataka, India Campus Central Supply Hub. Verified and monitored by AI Studio dev sandbox.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-center text-slate-400 text-[11px] space-y-1">
          <p>VIDHYA MART – Everything a Student Needs in One Place. Designed & Aggregated for Bhagyashri educational goals.</p>
          <div className="flex justify-center space-x-4 text-[10px]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Shipping & Refund Rules</a>
          </div>
        </div>
      </footer>


      {/* MODAL WINDOW 1: SHOPPING CART */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-0 bg-slate-950/50 backdrop-blur-xs" id="cart-drawer-modal">
          
          {/* Transparent Backdrop toggle */}
          <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />
          
          {/* Drawer content */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250 border-l border-slate-100">
            
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Your Education Basket</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart body items list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {cart.length > 0 ? (
                cart.map((item, idx) => (
                  <div 
                    key={`${item.product.id}-${idx}`}
                    className="flex justify-between items-start bg-slate-50 p-3 rounded-xl border border-slate-150 relative"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-white border border-slate-200 text-slate-700 rounded-lg flex items-center justify-center shrink-0">
                        <ProductIcon name={item.product.image} className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                          {item.product.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 leading-tight pr-4">
                          {item.product.name}
                        </h4>
                        <div className="flex items-baseline space-x-2 pt-1">
                          <span className="text-xs font-extrabold text-slate-900">₹{item.product.price}</span>
                          {item.product.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through">₹{item.product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-full min-h-[50px]">
                      {/* Delete */}
                      <button
                        onClick={() => handleRemoveItem(item.product.id, item.selectedSize)}
                        className="text-slate-400 hover:text-red-600 p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Quantity counters */}
                      <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-lg p-1 mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, -1, item.selectedSize)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 rounded"
                        >
                          -
                        </button>
                        <span className="text-xs font-extrabold text-slate-800 min-w-[12px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, 1, item.selectedSize)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-24 text-center space-y-3.5">
                  <span className="text-4xl">🛒</span>
                  <p className="text-xs text-slate-400">Your basket is currently empty. Shop popular classroom textbooks, stationery kits or Bata shoes in Categories!</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentTab('categories');
                    }}
                    className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-600 font-bold text-xs rounded-xl hover:bg-blue-100"
                  >
                    Browse Categories
                  </button>
                </div>
              )}
            </div>

            {/* Checkout Area summary */}
            {cart.length > 0 && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-700">
                    <span>Subtotal</span>
                    <span className="font-mono">₹{cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-700">
                    <span>Shipping Delivery fee</span>
                    <span className="text-emerald-500 font-bold uppercase text-[10px]">FREE SHIPPING</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                    <span className="text-sm font-bold text-slate-900">Total rate:</span>
                    <span className="text-lg font-mono font-black text-slate-900">
                      ₹{cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-200"
                  >
                    Proceed to Booking Verification
                  </button>
                  <p className="text-[10px] text-slate-400 text-center">
                    Pay via COD (Cash on Delivery) or mock Instant online banking secure systems.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}


      {/* MODAL WINDOW 2: WISHLIST VIEW */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs" id="wishlist-modal-view">
          
          {/* Backdrop */}
          <div className="absolute inset-0" onClick={() => setIsWishlistOpen(false)} />
          
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-100 max-h-[80vh] flex flex-col justify-between">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center space-x-1.5 text-sm">
                <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                <span>Saved Essentials ({wishlist.length})</span>
              </h3>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              {wishlist.length > 0 ? (
                wishlist.map(product => (
                  <div key={product.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white text-blue-600 rounded flex items-center justify-center">
                        <ProductIcon name={product.image} className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 leading-tight">{product.name}</h4>
                        <p className="text-xs font-bold text-slate-900 mt-0.5">₹{product.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          handleAddToCart(product);
                          setIsWishlistOpen(false);
                        }}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center"
                        title="Add to Basket"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleWishlist(product)}
                        className="text-red-500 hover:text-red-700 p-1 bg-white border border-red-100 rounded"
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center space-y-2 text-slate-400">
                  <span>💔</span>
                  <p className="text-xs">No items saved in wishlist yet. Click heart buttons on products to compare books & kits easily.</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
              >
                Return to Shop
              </button>
            </div>
          </div>
        </div>
      )}


      {/* MODAL WINDOW 3: CHECKOUT WORKFLOW */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs" id="checkout-modal">
          
          <div className="absolute inset-0" onClick={() => {
            if (!checkoutSuccessOrder) {
              setIsCheckoutOpen(false);
            }
          }} />

          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col justify-between animate-in zoom-in-95 duration-200">
            
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="bg-blue-50 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold uppercase">
                Student Booking Order
              </span>
              {!checkoutSuccessOrder && (
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-1 text-slate-450 hover:text-slate-700 hover:bg-slate-50 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-left space-y-4">
              {checkoutSuccessOrder ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in duration-200">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-9 h-9" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-black text-slate-950">Booking Registered!</h3>
                    <p className="text-slate-500 text-xs sm:text-sm">We successfully received your aggregates requirements.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2">
                    <p className="text-xs text-slate-500 flex justify-between">
                      <span>Tracking Reference:</span>
                      <strong className="text-slate-950 font-mono text-sm">{checkoutSuccessOrder.id}</strong>
                    </p>
                    <p className="text-xs text-slate-500 flex justify-between">
                      <span>Customer:</span>
                      <span className="text-slate-800 font-bold">{checkoutSuccessOrder.customerDetails.name}</span>
                    </p>
                    <p className="text-xs text-slate-500 flex justify-between">
                      <span>Total Invoice:</span>
                      <strong className="text-slate-950 font-mono text-sm">₹{checkoutSuccessOrder.total}</strong>
                    </p>
                    <p className="text-xs text-slate-500 flex justify-between">
                      <span>Delivery Method:</span>
                      <span className="text-slate-800 font-bold">{checkoutSuccessOrder.serviceType} ({checkoutSuccessOrder.paymentMethod})</span>
                    </p>
                    <p className="text-[10px] text-slate-450 leading-relaxed pt-2 border-t border-slate-100">
                      💡 Take a screen snap or copy your Reference Number <span className="font-bold underline">{checkoutSuccessOrder.id}</span>. You can paste it into the search bar of the **Orders & Tracking** tab to monitor dispatch coordinates instantly!
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCheckoutSuccessOrder(null);
                      setIsCheckoutOpen(false);
                      setCurrentTab('orders');
                    }}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Go to Tracking Board
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePlaceOrderSubmit} className="space-y-4">
                  
                  <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100">
                    <p className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">AGGREGATES SUMMARY</p>
                    <div className="text-xs font-bold text-slate-800 flex justify-between mt-1 pt-1.5">
                      <span>Items Count: {cart.length}</span>
                      <span>Total Cumulative Rate: ₹{cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}</span>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Student Delivery Location details</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 block">Full Name (Required)</label>
                      <input
                        type="text"
                        placeholder="e.g. Bhagyashri Kumar"
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 block">Email Address (Required)</label>
                      <input
                        type="email"
                        placeholder="e.g. bhagyashri@outlook.com"
                        value={checkoutEmail}
                        onChange={(e) => setCheckoutEmail(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 block">Contact Phone Number (Required)</label>
                      <input
                        type="text"
                        placeholder="e.g. +91 9988221100"
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl animate-in"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 block">ZIP Code</label>
                      <input
                        type="text"
                        placeholder="e.g. 560001"
                        value={checkoutZip}
                        onChange={(e) => setCheckoutZip(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 block">Complete Home / Dorm Address Address</label>
                    <input
                      type="text"
                      placeholder="Street address, hostel flat, landmark guides coordinates"
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    
                    {/* Select type program */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600 block">Academic Booking Option</label>
                      <div className="flex flex-col gap-1 text-xs">
                        {[
                          { id: 'Standard Delivery', t: '🚚 Door Delivery (Fast)' },
                          { id: 'Pre-Book', t: '📚 Pre-Book Textbooks Program' },
                          { id: 'Bulk Order', t: '🏫 Institutional Wholesale' }
                        ].map(serv => (
                          <label key={serv.id} className="flex items-center space-x-2 text-slate-700 font-medium cursor-pointer">
                            <input
                              type="radio"
                              name="checkout_service"
                              checked={checkoutService === serv.id}
                              onChange={() => setCheckoutService(serv.id as any)}
                              className="accent-blue-600"
                            />
                            <span>{serv.t}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Pay option */}
                    <div className="space-y-1.5 font-mono">
                      <label className="text-[10px] font-mono font-bold text-slate-600 block">PAY TAX METHOD</label>
                      <div className="flex flex-col gap-1 text-xs font-sans">
                        <label className="flex items-center space-x-2 text-slate-700 font-medium cursor-pointer">
                          <input
                            type="radio"
                            name="checkout_pay"
                            checked={checkoutPayment === 'COD'}
                            onChange={() => setCheckoutPayment('COD')}
                            className="accent-blue-600"
                          />
                          <span>💵 Cash on Delivery (COD)</span>
                        </label>
                        <label className="flex items-center space-x-2 text-slate-700 font-medium cursor-pointer">
                          <input
                            type="radio"
                            name="checkout_pay"
                            checked={checkoutPayment === 'Online'}
                            onChange={() => setCheckoutPayment('Online')}
                            className="accent-blue-600"
                          />
                          <span>💻 Mock Online UPI Bank link</span>
                        </label>
                      </div>
                    </div>

                  </div>

                  <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="flex-1 py-3 text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    >
                      Back to Basket
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-200"
                    >
                      Confirm Booking Order
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
