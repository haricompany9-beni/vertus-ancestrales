/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Eye, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { getProductMeta, getVariantPrice } from '../utils/productHelpers';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, e: React.MouseEvent, quantity?: number, variant?: string) => void;
  onClick: () => void;
  viewType?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onClick,
  viewType = 'grid'
}) => {
  const meta = getProductMeta(product);
  const [selectedVariant, setSelectedVariant] = useState(meta.formats[0] || '100ml');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Calculate current price dynamically
  const currentPrice = getVariantPrice(product.price, selectedVariant);

  // Sync wishlist state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('va_wishlist');
    if (saved) {
      try {
        const list = JSON.parse(saved) as string[];
        setIsWishlisted(list.includes(product.id));
      } catch (e) {
        // ignore
      }
    }
  }, [product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const saved = localStorage.getItem('va_wishlist');
    let list: string[] = [];
    if (saved) {
      try {
        list = JSON.parse(saved) as string[];
      } catch (err) {
        // ignore
      }
    }
    
    if (list.includes(product.id)) {
      list = list.filter(id => id !== product.id);
      setIsWishlisted(false);
    } else {
      list.push(product.id);
      setIsWishlisted(true);
    }
    localStorage.setItem('va_wishlist', JSON.stringify(list));
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, e, 1, selectedVariant);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const isList = viewType === 'list';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group bg-white rounded-3xl overflow-hidden border border-[#E8DFC9]/30 hover:border-[#C8A96B]/50 transition-all duration-500 shadow-[0_4px_20px_rgba(31,59,47,0.012)] hover:shadow-[0_12px_36px_rgba(31,59,47,0.05)] cursor-pointer relative flex ${
        isList ? 'flex-col md:flex-row w-full gap-2' : 'flex-col justify-between h-full'
      }`}
    >
      {/* Product Image Stage */}
      <div 
        className={`relative overflow-hidden bg-[#FAF8F3] ${
          isList ? 'aspect-[4/3] md:aspect-square w-full md:w-72 flex-shrink-0' : 'aspect-[4/3] sm:aspect-[1.1]'
        }`} 
        onClick={onClick}
      >
        {/* Main Visual */}
        <img 
          src={product.image} 
          alt={product.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[4s] ease-out"
        />

        {/* Luxury ambient overlay on hover */}
        <div className="absolute inset-0 bg-[#1F3B2F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top floating badges */}
        <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 flex justify-between items-start z-10 pointer-events-none">
          <div className="flex flex-col gap-1.5 flex-wrap">
            {meta.badges.slice(0, 2).map((b, idx) => (
              <span 
                key={idx} 
                className="bg-[#1F3B2F] text-[#FAF8F3] text-[9px] sm:text-[10px] tracking-[0.16em] uppercase font-bold px-3 py-1.5 rounded shadow-sm font-sans pointer-events-auto"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Wishlist Button */}
          <button 
            onClick={toggleWishlist}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white hover:bg-[#FAF8F3] text-[#1F3B2F] rounded-full shadow-md flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer border border-[#E8DFC9]/20"
            title={isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart size={14} className={isWishlisted ? "fill-rose-500 text-rose-500" : "text-[#1F3B2F]/70"} />
          </button>
        </div>
        
        {product.stock <= 5 && (
          <span className="absolute bottom-3 right-3 bg-[#D64545] text-white text-[8px] tracking-[0.15em] uppercase font-bold px-2 py-0.5 rounded shadow-sm font-sans">
            Épuisement proche ({product.stock})
          </span>
        )}
      </div>

      {/* Info plus Action Container */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 md:p-6">
        
        <div className="flex flex-col gap-2">
          {/* Categories */}
          <span className="text-[10px] sm:text-[11px] text-[#C8A96B] tracking-[0.18em] font-sans font-bold uppercase transition-colors">
            {product.category}
          </span>

          {/* Product Name & Sub */}
          <div onClick={onClick}>
            <h3 className="font-serif text-[20px] sm:text-[23px] text-[#1F3B2F] tracking-wide font-normal hover:text-[#C8A96B] transition-colors leading-tight mb-1">
              {product.name}
            </h3>
            
            {/* Benefits Row */}
            <p className="text-[9.5px] font-sans tracking-[0.12em] text-[#C8A96B] uppercase font-extrabold mt-1">
              {meta.benefits.join(' • ').toUpperCase()}
            </p>
          </div>

          <p className="text-[11.5px] sm:text-[12.5px] text-gray-400 font-sans leading-relaxed line-clamp-2 md:line-clamp-3 font-light mt-1" onClick={onClick}>
            {product.description}
          </p>

          {/* Product Variant Format Selector */}
          {meta.formats.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-[#E8DFC9]/15">
              <span className="text-[9px] tracking-[0.15em] text-gray-400 font-sans font-extrabold uppercase block mb-2">Choisir le format</span>
              <div className="grid grid-cols-3 gap-1.5">
                {meta.formats.map((fmt) => {
                  const isSelected = selectedVariant === fmt;
                  const fmtPrice = getVariantPrice(product.price, fmt);
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVariant(fmt);
                      }}
                      className={`flex items-center justify-center py-1.5 px-3 text-[10px] sm:text-[10.5px] font-sans rounded-lg border transition-all duration-300 font-medium cursor-pointer ${
                        isSelected 
                          ? 'bg-[#1F3B2F] border-[#1F3B2F] text-white font-semibold' 
                          : 'border-gray-200 bg-[#FAF8F3]/60 text-gray-500 hover:border-[#1F3B2F] hover:text-[#1F3B2F]'
                      }`}
                    >
                      <span className="tracking-wide">{fmt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Pricing and Action bottom rail */}
        <div className={`pt-4 ${isList ? 'border-t-0 mt-3 md:mt-5' : 'border-t border-[#E8DFC9]/20 mt-3 sm:mt-5'} flex items-center justify-between`}>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5 font-sans">Prix sélectionné</span>
            <span className="font-mono text-[16px] sm:text-[18px] font-bold text-[#1F3B2F]">
              {currentPrice.toFixed(2).replace('.', ',')} €
            </span>
          </div>
          
          <button
            onClick={handleAdd}
            className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
              justAdded 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-[#1F3B2F] hover:bg-[#3B2F2F] text-white'
            }`}
            title={justAdded ? "Ajouté au panier" : "Ajouter au panier"}
          >
            <ShoppingBag size={14} className={justAdded ? "text-emerald-600" : "text-white"} />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
