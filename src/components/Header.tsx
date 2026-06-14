import React from 'react';
import { ShoppingCart, Heart, Search, ClipboardList, MessageSquare, Menu, BookOpen } from 'lucide-react';
import { CartItem, Product } from '../types';

interface HeaderProps {
  cart: CartItem[];
  wishlist: Product[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openCartModal: () => void;
  openWishlistModal: () => void;
  onTrackOrderDirectly: (trackNum: string) => void;
}

export default function Header({
  cart,
  wishlist,
  currentTab,
  setCurrentTab,
  openCartModal,
  openWishlistModal,
  onTrackOrderDirectly,
}: HeaderProps) {
  const [trackInput, setTrackInput] = React.useState('');
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      onTrackOrderDirectly(trackInput.trim());
      setCurrentTab('orders');
      setTrackInput('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all" id="vidhya-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* LOGO */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center space-x-2.5 cursor-pointer select-none group"
          id="vidhya-logo-container"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200 group-hover:scale-105 transition-transform duration-200">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-xl tracking-tight text-slate-900 flex items-center">
              VIDHYA MART
            </h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest font-medium uppercase">Student Essentials</p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" id="vidhya-navbar">
          {[
            { id: 'home', label: 'Home' },
            { id: 'categories', label: 'Categories' },
            { id: 'customizer', label: 'Custom Kit' },
            { id: 'orders', label: 'Orders & Service' },
            { id: 'chat', label: 'AI Support' },
            { id: 'about', label: 'Why VIDHYA MART' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                currentTab === tab.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900Color'
              }`}
              id={`nav-tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* QUICK QUICK ORDER TRACKING INPUT & CONSOLE */}
        <div className="hidden lg:flex items-center max-w-xs w-full px-4" id="header-quick-track-container">
          <form onSubmit={handleQuickTrackSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Quick track (VIDHYA-TRACK-...)"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              className="w-full text-xs py-2 pl-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-white text-slate-700 transition-all font-mono"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 text-slate-400 hover:text-blue-500 p-1.5 rounded-md"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* ACTION BUTTONS: CART, WISHLIST & CHAT */}
        <div className="flex items-center space-x-1.5 sm:space-x-3" id="header-actions">
          {/* Wishlist Icon */}
          <button
            onClick={openWishlistModal}
            className="p-2 text-slate-600 hover:bg-slate-50 hover:text-red-500 rounded-lg relative transition-colors"
            title="Wishlist"
            id="wishlist-trigger-btn"
          >
            <Heart className={`w-5.5 h-5.5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center animate-bounce">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={openCartModal}
            className="p-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg relative transition-colors"
            title="Shopping Cart"
            id="cart-trigger-btn"
          >
            <ShoppingCart className="w-5.5 h-5.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick AI Help Icon */}
          <button
            onClick={() => setCurrentTab('chat')}
            className="p-2 bg-gradient-to-tr from-amber-500 to-amber-400 text-white hover:opacity-90 rounded-lg shadow-sm font-semibold text-xs flex items-center gap-1.5 sm:px-3.5 sm:py-2 transition-all"
            id="chat-nav-btn"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>
      </div>
    </header>
  );
}
