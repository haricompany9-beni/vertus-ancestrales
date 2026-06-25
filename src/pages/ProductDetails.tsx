import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, Plus, Minus, ShoppingBag, Compass, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { getVariantPrice } from '../utils/productHelpers';

interface ProductDetailsProps {
  product: Product;
  setPage: (page: string) => void;
  onAddToCart: (product: Product, e: React.MouseEvent, quantity: number, variant?: string) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  setPage, 
  onAddToCart 
}) => {
  const variantsList = (product.variants && product.variants.length > 0)
    ? product.variants
    : ['50ml', '100ml', '250ml'];

  const [selectedVariant, setSelectedVariant] = useState<string>(variantsList.includes('100ml') ? '100ml' : variantsList[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'usage'>('desc');
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Synchronize dynamic updates if the active product switches
  useEffect(() => {
    setActiveImage(product.image);
    const list = (product.variants && product.variants.length > 0)
      ? product.variants
      : ['50ml', '100ml', '250ml'];
    setSelectedVariant(list.includes('100ml') ? '100ml' : list[0]);
  }, [product]);

  const finalPrice = getVariantPrice(product.price, selectedVariant);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const currentVariantLabel = selectedVariant;

  // Let's create beautiful high-end alternative photo angles
  const extraImages = (product.images && product.images.length > 0)
    ? product.images
    : [
        product.image,
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=600&auto=format&fit=crop"
      ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FAF8F3]/30 min-h-screen text-[#3B2F2F] pb-16 sm:pb-24"
    >
      {/* Editorial Navigation breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6">
        <button 
          onClick={() => setPage('boutique')}
          className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-[#1F3B2F] hover:text-[#C8A96B] transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Retour à l'officine de soins</span>
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-2">
        
        {/* Product Gallery Stage Left */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="relative aspect-square rounded-xl overflow-hidden border border-[#E8DFC9]/40 bg-white group cursor-zoom-in shadow-xs"
          >
            <img 
              src={activeImage} 
              alt={product.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
            />
            {product.stock <= 5 && (
              <span className="absolute top-4 right-4 bg-[#D64545] text-white text-[9px] tracking-widest uppercase px-3 py-1 rounded font-semibold font-sans z-10">
                Rupture imminente • Seul {product.stock} restent
              </span>
            )}

            <div className="absolute bottom-4 right-4 bg-[#1F3B2F]/80 backdrop-blur-xs text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
              <Maximize2 size={14} />
            </div>
            
            <div className="absolute inset-0 bg-[#1F3B2F]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Multi-angle actual active selectors */}
          <div className="grid grid-cols-3 gap-4">
            {extraImages.map((imgSrc, idx) => {
              const isActive = activeImage === imgSrc;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveImage(imgSrc)}
                  className={`aspect-square rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer bg-white ${
                    isActive 
                      ? 'border-[#C8A96B] scale-[1.03] shadow-sm ring-1 ring-[#C8A96B]/30' 
                      : 'border-[#E8DFC9]/40 opacity-70 hover:opacity-100 hover:border-[#1F3B2F]'
                  }`}
                >
                  <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Details Columns Right */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-semibold">{product.category}</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1F3B2F] font-medium tracking-wide mt-1.5 leading-snug">
              {product.name}
            </h1>
            <p className="text-sm font-sans italic text-[#556B2F] mt-1">
              {product.subTitle}
            </p>

            {/* Rating Stars summary */}
            <div className="flex items-center gap-2 mt-4 text-[#C8A96B]">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-current' : 'opacity-25'} />
                ))}
              </div>
              <span className="text-xs text-[#6B7280] font-sans">
                {product.rating.toFixed(1)} / 5.0 ({product.reviewsCount} avis d'initiés certifiés)
              </span>
            </div>
          </div>

          <div className="text-2xl font-serif font-semibold text-[#1F3B2F] pb-4 border-b border-[#E8DFC9]/30">
            {finalPrice.toFixed(2)} €
          </div>

          {/* CHOOSE PRECIOUS VOLUME VARIANTS */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-[11px] uppercase tracking-wider text-[#1F3B2F] font-semibold font-sans">Contenance du flacon</h4>
            <div className="flex flex-wrap gap-4">
              {variantsList.map((fmt) => {
                const isSelected = selectedVariant === fmt;
                const fmtPrice = getVariantPrice(product.price, fmt);
                return (
                  <button
                    key={fmt}
                    onClick={() => setSelectedVariant(fmt)}
                    className={`flex-1 min-w-[80px] text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1F3B2F] bg-[#1F3B2F]/5 shadow-xs'
                        : 'border-[#E8DFC9] bg-white hover:border-[#1F3B2F]'
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#1F3B2F] font-sans truncate">{fmt}</p>
                    <p className="text-[10.5px] text-[#C8A96B] font-semibold font-mono mt-1">{fmtPrice.toFixed(2).replace('.', ',')} €</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* QUANTITY SELECTOR AND BASKET BINDING */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 font-sans">
              <span className="text-xs text-[#6B7280] mr-2">Quantité :</span>
              <div className="flex border border-[#E8DFC9] rounded overflow-hidden bg-white select-none">
                <button 
                  onClick={handleDecrease}
                  className="px-3.5 py-3 hover:bg-stone-50 text-gray-600 transition-colors cursor-pointer"
                >
                  <Minus size={12} />
                </button>
                <span className="px-5 py-3 text-xs font-mono font-bold flex items-center justify-center min-w-[40px]">
                  {quantity}
                </span>
                <button 
                  onClick={handleIncrease}
                  className="px-3.5 py-3 hover:bg-stone-50 text-gray-600 transition-colors cursor-pointer"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            <button
              onClick={(e) => {
                const adjustedAndPricedProd = { ...product, price: finalPrice };
                onAddToCart(adjustedAndPricedProd, e, quantity, currentVariantLabel);
              }}
              className="flex-1 bg-[#1F3B2F] hover:bg-[#556B2F] text-white text-xs tracking-widest uppercase font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#1F3B2F]/10"
            >
              <ShoppingBag size={14} />
              <span>Placer dans mon panier • { (finalPrice * quantity).toFixed(2) } €</span>
            </button>
          </div>

          {/* EDITORIAL INFORMATIONS EXPANDABLES (TABS) */}
          <div className="mt-6 border border-[#E8DFC9]/35 rounded-xl overflow-hidden bg-white">
            <div className="flex border-b border-[#E8DFC9]/20 font-sans text-xs uppercase tracking-wider font-semibold">
              <button
                onClick={() => setActiveTab('desc')}
                className={`flex-1 text-center py-3.5 font-medium border-r border-[#E8DFC9]/20 transition-all cursor-pointer ${
                  activeTab === 'desc' ? 'bg-[#FAF8F3] text-[#1F3B2F] font-bold' : 'text-[#6B7280] hover:text-[#1F3B2F]'
                }`}
              >
                description
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`flex-1 text-center py-3.5 font-medium border-r border-[#E8DFC9]/20 transition-all cursor-pointer ${
                  activeTab === 'ingredients' ? 'bg-[#FAF8F3] text-[#1F3B2F] font-bold' : 'text-[#6B7280] hover:text-[#1F3B2F]'
                }`}
              >
                ingrédients
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`flex-1 text-center py-3.5 font-medium transition-all cursor-pointer ${
                  activeTab === 'usage' ? 'bg-[#FAF8F3] text-[#1F3B2F] font-bold' : 'text-[#6B7280] hover:text-[#1F3B2F]'
                }`}
              >
                conseils d'utilisation
              </button>
            </div>

            <div className="p-6 text-xs text-[#3B2F2F] font-sans leading-relaxed">
              {/* TAB 1: DESCRIPTION */}
              {activeTab === 'desc' && (
                <div className="flex flex-col gap-3 animate-fade-in animate-duration-300">
                  <p>{product.detailedDescription}</p>
                  <div className="flex items-center gap-2.5 text-[#556B2F] font-medium pt-2 border-t border-gray-100 mt-2">
                    <Compass size={14} className="text-[#C8A96B]" />
                    <span>Flacon dynamisé en géode d'Améthyste, sans parabens ni parfums de synthèse.</span>
                  </div>
                </div>
              )}

              {/* TAB 2: INGREDIENTS */}
              {activeTab === 'ingredients' && (
                <div className="flex flex-col gap-3 animate-fade-in animate-duration-300">
                  <p className="font-semibold text-[#1F3B2F] mb-1">Ingrédients purs actifs naturels :</p>
                  <ul className="flex flex-col gap-2.5">
                    {product.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] shrink-0 mt-1.5" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-[#6B7280] mt-3 italic">*Issus de l'Agriculture Biologique et de cueillettes d'altitude éco-responsables.</p>
                </div>
              )}

              {/* TAB 3: USAGE */}
              {activeTab === 'usage' && (
                <div className="flex flex-col gap-4 animate-fade-in animate-duration-300">
                  <p className="font-semibold text-[#1F3B2F]">Le protocole spirituel de Monique :</p>
                  <ol className="flex flex-col gap-3.5">
                    {product.usage.map((step, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="w-5 h-5 rounded-full bg-[#1F3B2F] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LUXURY LIGHTBOX MODAL COVERS THE PAGE ON TRUE */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 bg-[#12241C]/95 z-50 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
          >
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-[#FAF8F3]/80 hover:text-white p-3 rounded-full hover:bg-white/5 transition-all cursor-pointer z-10"
              title="Fermer"
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-stone-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeImage} 
                alt={product.name} 
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 text-center text-white">
                <h3 className="font-serif text-lg tracking-wide">{product.name}</h3>
                <p className="text-xs text-[#C8A96B] tracking-widest uppercase font-sans mt-1">{product.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
