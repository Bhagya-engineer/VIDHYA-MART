import React from 'react';
import { BookOpen, Sparkles, Wand2, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartCustomizing: () => void;
  onExploreProducts: () => void;
  onTalkToAI: () => void;
}

export default function Hero({ onStartCustomizing, onExploreProducts, onTalkToAI }: HeroProps) {
  return (
    <div className="relative pt-16 pb-20 overflow-hidden" id="vidhya-hero-section">
      {/* Real student objects background image matching 60-70% visibility & high vibrancy */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/src/assets/images/vidhya_hero_bg_1781412604890.jpg"
          alt="Vidhya Modern Academic Student Essentials Background"
          className="w-full h-full object-cover opacity-65 lg:opacity-70 filter saturate-125 contrast-110"
          referrerPolicy="no-referrer"
        />
        {/* Subtle left-to-right gradient overlay only behind the text area to keep text readable */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[55%] bg-gradient-to-r from-[#F8FAFC]/95 via-white/85 to-transparent z-10" />
        {/* Soft bottom transition page blender */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent z-10" />
      </div>

      {/* Decorative ambient background nodes */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-5 left-1/4 w-96 h-96 bg-amber-100/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 lg:py-16">
        {/* Left Column Text details with extra contrast container for mobile */}
        <div className="max-w-2xl space-y-6 text-left relative z-20 bg-white/85 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none p-6 sm:p-10 lg:p-0 rounded-3.5xl lg:rounded-none border border-white/50 lg:border-none shadow-sm lg:shadow-none">
          <div className="inline-flex items-center space-x-2 bg-blue-50/90 border border-blue-150 px-4 py-1.5 rounded-full text-blue-700 text-xs font-semibold tracking-wide shadow-xs" id="hero-mini-banner">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span>New Academic Term 2026 Ready</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-sans font-black text-5xl sm:text-6xl tracking-tight text-slate-900 leading-[1.05]" id="hero-title">
              VIDHYA MART
            </h1>
            <p className="font-sans font-bold text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-600" id="hero-tagline">
              "Your Complete Student Essentials Hub"
            </p>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed" id="hero-description">
              Discover textbooks, stationery, bags, shoes, and study essentials in one place. Browse premium brands, customize your class requirement package, order easily, and get instant guidance through our smart assistant.
            </p>
          </div>

          {/* Quick interactive badges conveying "Pre-Book" etc */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 max-w-lg" id="hero-services-[badges]">
            {[
              '🎒 Complete school Kits',
              '📚 Textbook Pre-Ordering',
              '🚚 Cash on Delivery',
              '🖊️ Choice Stationery',
              '👟 Durable Footwear',
              '🤖 AI Study Companion'
            ].map((service, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 p-2 bg-white/90 border border-slate-100 text-xs text-slate-700 font-medium rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>{service}</span>
              </div>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5" id="hero-cta-group">
            <button
              onClick={onStartCustomizing}
              className="flex items-center justify-center space-x-2.5 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-150 text-white rounded-xl text-base font-semibold tracking-wide transition-all shadow-md group border border-blue-500"
              id="hero-customizer-cta"
            >
              <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Generate My Student Kit</span>
            </button>

            <button
              onClick={onExploreProducts}
              className="px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-base font-semibold border border-slate-200 shadow-sm transition-all text-center"
              id="hero-explore-cta"
            >
              Browse Category Catalog
            </button>

            <button
              onClick={onTalkToAI}
              className="flex items-center justify-center space-x-1.5 px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-sm font-semibold border border-amber-250 transition-all text-center sm:hidden"
              id="hero-chat-cta"
            >
              <MessageCircle className="w-4 h-4 text-amber-600" />
              <span>Ask VIDHYA MART Assistant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
