import React from 'react';
import { BookOpen, Sparkles, Wand2, MessageCircle } from 'lucide-react';

interface HeroProps {
  onStartCustomizing: () => void;
  onExploreProducts: () => void;
  onTalkToAI: () => void;
}

export default function Hero({ onStartCustomizing, onExploreProducts, onTalkToAI }: HeroProps) {
  return (
    <div className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-100" id="vidhya-hero-section">
      {/* Absolute Hero Background: One single high-res student-library image with no duplicates, no floating frames */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/src/assets/images/vidhya_hero_premium_bg_1781797476326.jpg"
          alt="Premium Library, Students studying & Stationery Essentials Background"
          className="w-full h-full object-cover object-right md:object-right opacity-70 filter saturate-110 contrast-100"
          referrerPolicy="no-referrer"
        />
        {/* Subtle left-to-right white light gradient overlay to ensure text is perfectly readable while maintaining 100% clarity on the right-side students/products */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[55%] bg-gradient-to-r from-slate-50 via-slate-50/85 to-transparent z-10" />
        {/* Bottom smooth fade to content section */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-50 to-transparent z-10" />
      </div>

      {/* Subtle ambient light for depth */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20 lg:py-24 w-full">
        <div className="max-w-2xl space-y-6 text-left">
          {/* Tag Pill Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full text-blue-700 text-xs font-bold tracking-wide shadow-sm" id="hero-mini-banner">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="uppercase tracking-wider">New Academic Term 2026 Ready</span>
          </div>

          {/* Heading, Tagline, Description */}
          <div className="space-y-4">
            <h1 className="font-sans font-black text-5xl sm:text-6xl lg:text-7xl tracking-snug text-blue-900 leading-tight" id="hero-title">
              VIDHYA MART
            </h1>
            <p className="font-sans font-extrabold text-xl sm:text-2xl text-orange-600" id="hero-tagline">
              "Your Complete Student Essentials Hub"
            </p>
            <p className="text-slate-700 text-base sm:text-lg max-w-xl leading-relaxed font-semibold" id="hero-description">
              Discover textbooks, classmates record packs, quality footwear, state-of-the-art bags, and customized student kit generation in one single online hub. Explore budget-vetted curriculum essentials backed by our real-time smart tracking assistant.
            </p>
          </div>

          {/* Premium Blue, White, and Orange Grid list of Core Offerings */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 max-w-xl" id="hero-services-badges">
            {[
              '🎒 Complete School Kits',
              '📚 Textbook Pre-Ordering',
              '🚚 Cash on Delivery',
              '🖊️ Choice Stationery',
              '👟 Durable Footwear',
              '🤖 AI Study Companion'
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="flex items-center space-x-2.5 p-3 bg-white/95 border border-slate-200/90 hover:border-blue-500/30 shadow-sm rounded-xl text-slate-800 hover:text-slate-900 transition-all text-xs font-bold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500" />
                <span>{service}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2" id="hero-cta-group">
            <button
              onClick={onStartCustomizing}
              className="flex items-center justify-center space-x-2.5 px-8 py-4 bg-orange-500 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20 text-white rounded-xl text-base font-bold tracking-wide transition-all shadow-md group border border-orange-400"
              id="hero-customizer-cta"
            >
              <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Generate My Student Kit</span>
            </button>

            <button
              onClick={onExploreProducts}
              className="px-8 py-4 bg-white hover:bg-slate-50 border border-blue-600 text-blue-600 rounded-xl text-base font-bold shadow-sm transition-all text-center"
              id="hero-explore-cta"
            >
              Browse Categories
            </button>

            <button
              onClick={onTalkToAI}
              className="flex items-center justify-center space-x-2 px-5 py-3.5 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 rounded-xl text-sm font-semibold transition-all text-center sm:hidden"
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
