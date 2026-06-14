import React from 'react';
import { 
  Heart, Eye, ShoppingCart, Star, CheckCircle, 
  BookOpen, Book, Notebook, PenTool, Pencil, 
  ShoppingBag, Activity, GlassWater, Utensils, Sparkles, X
} from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

// Global utility helper to render category/product icons automatically from lucide
export function ProductIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  switch (name) {
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Book':
      return <Book className={className} />;
    case 'Notebook':
      return <Notebook className={className} />;
    case 'PenTool':
      return <PenTool className={className} />;
    case 'Pen':
      return <PenTool className={className} />;
    case 'Pencil':
      return <Pencil className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'Glass':
      return <GlassWater className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted 
}: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = React.useState(false);
  
  // Calculate discount percentage
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <>
      <div 
        className="group relative bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 overflow-hidden flex flex-col h-full"
        id={`product-card-${product.id}`}
      >
        {/* Wishlist toggle */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
            isWishlisted 
              ? 'bg-red-50 text-red-500 border-red-200 shadow-sm' 
              : 'bg-white text-slate-400 border-slate-100 hover:text-red-500 shadow-xs'
          }`}
          id={`wishlist-toggle-${product.id}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
        </button>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs z-10">
            -{discount}% OFF
          </span>
        )}

        {/* Product Visual Area representing item beautifully with color matching */}
        <div className="h-44 bg-slate-50 relative flex items-center justify-center group-hover:bg-slate-100 transition-colors duration-200 overflow-hidden">
          {product.image.startsWith('/') || product.image.includes('.') ? (
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-xs">
              <ProductIcon name={product.image} className="w-9 h-9 stroke-[1.8]" />
            </div>
          )}

          {/* Quick action overlay button */}
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-2">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="p-2.5 bg-white text-slate-800 rounded-xl font-medium text-xs hover:bg-slate-100 shadow-md flex items-center gap-1.5 transition-all transform translate-y-2 group-hover:translate-y-0 duration-200"
              title="Quick View"
              id={`quickview-trigger-${product.id}`}
            >
              <Eye className="w-4 h-4" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Details section */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Category tag and subcategory */}
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
              {product.subcategory || product.category}
            </p>
            
            <h3 className="font-sans font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors line-clamp-2 min-h-10 leading-snug">
              {product.name}
            </h3>

            {/* Rating summary */}
            <div className="flex items-center space-x-1.5 mt-2 mb-2">
              <div className="flex text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              </div>
              <span className="text-slate-800 font-bold text-xs">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          <div>
            {/* Pricing Section */}
            <div className="flex items-baseline space-x-2 mt-1 mb-3.5">
              <span className="text-base font-extrabold text-slate-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Quick Add To Cart Button */}
            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-2.5 bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-blue-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:scale-[1.01]"
              id={`add-to-cart-${product.id}`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK VIEW DIALOG / MODAL */}
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id={`quickview-modal-${product.id}`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" 
            onClick={() => setIsQuickViewOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Product Information
              </span>
              <button
                onClick={() => setIsQuickViewOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-2/5 bg-slate-50/70 rounded-xl border border-slate-150 flex items-center justify-center aspect-square overflow-hidden">
                  {product.image.startsWith('/') || product.image.includes('.') ? (
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                      <ProductIcon name={product.image} className="w-10 h-10" />
                    </div>
                  )}
                </div>

                <div className="w-full sm:w-3/5 space-y-3">
                  <p className="text-xs text-slate-400 font-medium uppercase font-mono">{product.category}</p>
                  <h2 className="text-lg font-extrabold text-slate-800 leading-tight">{product.name}</h2>
                  
                  {product.brand && (
                    <p className="text-xs text-slate-600">
                      Brand: <span className="font-bold text-slate-800">{product.brand}</span>
                    </p>
                  )}

                  <div className="flex items-center space-x-2">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 fill-current ${
                            star <= Math.round(product.rating) ? 'text-amber-500' : 'text-slate-200'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                    <span className="text-xs text-slate-400">({product.reviewsCount} global ratings)</span>
                  </div>

                  <div className="flex items-baseline space-x-2 py-2">
                    <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">M.R.P.: ₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-800">Product Description</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Specifications & Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => {
                  onToggleWishlist(product);
                }}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{isWishlisted ? 'Liked' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={() => {
                  onAddToCart(product);
                  setIsQuickViewOpen(false);
                }}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-200 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Basket</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
