/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Sparkles, 
  X, 
  Globe, 
  Truck, 
  BookOpen, 
  ShoppingBag,
  Star,
  ArrowRight,
  Leaf,
  Droplet,
  LayoutGrid,
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { getProductMeta } from '../utils/productHelpers';
import heroBoutique from '../assets/brand/hero_boutique.png';

interface BoutiqueProps {
  products: Product[];
  setPage: (page: string, params?: any) => void;
  onAddToCart: (product: Product, e: React.MouseEvent, quantity?: number, variant?: string) => void;
}

export const Boutique: React.FC<BoutiqueProps> = ({ 
  products, 
  setPage, 
  onAddToCart 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Tous' | 'Visage' | 'Corps' | 'Rituels'>('Tous');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  
  // Luxury Filter States
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [selectedFormat, setSelectedFormat] = useState<string>('Tous');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('Tous');
  const [selectedRitualType, setSelectedRitualType] = useState<string>('Tous');
  
  // Mobile Filter Drawer Toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  // Interactive dropdown menu state
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery !== '') count++;
    if (selectedCategory !== 'Tous') count++;
    if (maxPrice < 100) count++;
    if (selectedFormat !== 'Tous') count++;
    if (selectedSkinType !== 'Tous') count++;
    if (selectedRitualType !== 'Tous') count++;
    return count;
  }, [searchQuery, selectedCategory, maxPrice, selectedFormat, selectedSkinType, selectedRitualType]);

  // Reset all filters helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tous');
    setSortBy('default');
    setMaxPrice(100);
    setSelectedFormat('Tous');
    setSelectedSkinType('Tous');
    setSelectedRitualType('Tous');
    setCurrentPage(1);
  };

  // Filter and Sort Logic using useMemo
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || 
             p.subTitle.toLowerCase().includes(q) || 
             p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'Tous') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price query
    result = result.filter(p => p.price <= maxPrice);

    // Filter by Format using getProductMeta helper
    if (selectedFormat !== 'Tous') {
      result = result.filter(p => {
        const meta = getProductMeta(p);
        return meta.formats.some(f => f.toLowerCase().includes(selectedFormat.toLowerCase()));
      });
    }

    // Filter by Skin Type
    if (selectedSkinType !== 'Tous') {
      result = result.filter(p => {
        const meta = getProductMeta(p);
        return meta.skinTypes.includes(selectedSkinType);
      });
    }

    // Filter by Ritual Type
    if (selectedRitualType !== 'Tous') {
      result = result.filter(p => {
        const meta = getProductMeta(p);
        return meta.ritualTypes.includes(selectedRitualType);
      });
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy, maxPrice, selectedFormat, selectedSkinType, selectedRitualType]);

  // Pagination bounds calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      setCurrentPage(p);
      const gridElement = document.getElementById('products-grid-anchor');
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 500, behavior: 'smooth' });
      }
    }
  };

  // Scroll to products helper
  const scrollToProducts = () => {
    const gridElement = document.getElementById('products-grid-anchor');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle adding custom ritual elements
  const handleAddRitual = (e: React.MouseEvent, ritualKey: 'eveil' | 'purif' | 'protect') => {
    e.stopPropagation();
    
    // Add primary matching cosmetics for the ritual
    if (ritualKey === 'eveil') {
      const p1 = products.find(p => p.id === 'serum-lumiere');
      const p2 = products.find(p => p.id === 'lotion-aura');
      if (p1) onAddToCart(p1, e, 1, 'Rituel Éveil - 50ml');
      if (p2) setTimeout(() => onAddToCart(p2, e, 1, 'Rituel Éveil - 100ml'), 200);
    } else if (ritualKey === 'purif') {
      const p1 = products.find(p => p.id === 'savon-ancestral');
      const p2 = products.find(p => p.id === 'huile-sacree');
      if (p1) onAddToCart(p1, e, 1, 'Soin Tradition - 100g');
      if (p2) setTimeout(() => onAddToCart(p2, e, 1, 'Rituel Purifiant - 100ml'), 200);
    } else {
      const p1 = products.find(p => p.id === 'rituel-protection');
      if (p1) onAddToCart(p1, e, 1, 'Coffret Sacré');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FAF8F3]/50 min-h-screen text-[#3B2F2F]"
    >
      
      {/* ========================================================
          1. IMMERSIVE & LUXURIOUS HERO SECTION
          ======================================================== */}
      <section 
        className="relative bg-[#1F3B2F] bg-cover bg-center md:bg-right pt-24 pb-20 lg:pt-32 lg:pb-[140px] border-b border-[#C8A96B]/25 text-white overflow-hidden flex items-center min-h-[580px] lg:min-h-[740px]"
        style={{ backgroundImage: `url(${heroBoutique})` }}
      >
        {/* Subtle gradient overlay to provide text readability while preserving the photo on the right */}
        <div className="absolute inset-0 bg-[#1F3B2F]/65 lg:bg-gradient-to-r lg:from-[#1F3B2F]/90 lg:via-[#1F3B2F]/60 lg:to-transparent z-0 pointer-events-none" />

        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col items-start gap-4 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-sans tracking-[0.25em] text-[#C8A96B] font-extrabold uppercase">L'OFFICINE DES SIMPLES</span>
              </div>

              <h1 className="font-serif text-[42px] sm:text-[56px] lg:text-[68px] text-white font-light leading-[1.1] tracking-normal mt-1">
                Herboristerie & <br />
                <span className="text-[#C8A96B] italic font-serif">Soins Ancestraux</span>
              </h1>

              <p className="text-[14.5px] sm:text-[15.5px] text-[#FAF8F3]/90 font-sans max-w-xl font-light leading-relaxed mt-2 text-left">
                Chaque soin est conçu comme un rituel sacré. Nos formulations naturelles et pures sont pensées pour révéler l'harmonie et l'équilibre profond entre votre corps, votre esprit et votre énergie.
              </p>

              <div className="flex flex-wrap items-center gap-4.5 mt-7 w-full sm:w-auto">
                <button 
                  onClick={scrollToProducts}
                  className="w-full sm:w-auto bg-[#13271F] hover:bg-[#1a352b] border border-[#13271F] text-white text-[11px] font-sans tracking-[0.2em] font-extrabold uppercase px-9 py-4.5 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                >
                  EXPLORER LES SOINS
                </button>
              </div>

              {/* Three trust bullet points horizontally arranged exactly like the mockup */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 mt-12 pt-8 border-t border-white/10 w-full">
                <div className="flex items-start gap-4 text-left">
                  <span className="text-[#C8A96B] flex-shrink-0 mt-0.5">
                    <Leaf size={22} strokeWidth={1} />
                  </span>
                  <div>
                    <h5 className="text-[11px] font-sans font-bold tracking-wider uppercase text-[#C8A96B] leading-tight">100% NATUREL</h5>
                    <p className="text-[11px] text-[#FAF8F3]/70 font-sans mt-1">Ingrédients d'origine botanique</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <span className="text-[#C8A96B] flex-shrink-0 mt-0.5">
                    <Droplet size={22} strokeWidth={1} />
                  </span>
                  <div>
                    <h5 className="text-[11px] font-sans font-bold tracking-wider uppercase text-[#C8A96B] leading-tight">PUR & SAIN</h5>
                    <p className="text-[11px] text-[#FAF8F3]/70 font-sans mt-1">Formulations sans compromis</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <span className="text-[#C8A96B] flex-shrink-0 mt-0.5">
                    <Sparkles size={22} strokeWidth={1} />
                  </span>
                  <div>
                    <h5 className="text-[11px] font-sans font-bold tracking-wider uppercase text-[#C8A96B] leading-tight">SACRÉ & CONSCIENT</h5>
                    <p className="text-[11px] text-[#FAF8F3]/70 font-sans mt-1">Conçu avec intention et respect</p>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Empty Right Column: Lets the beautiful background image show the dropper bottle fully as in the screenshot */}
            <div className="hidden lg:block lg:col-span-5" />

          </div>
        </div>
      </section>

      {/* ========================================================
          PRODUCTS AND SIDEBAR GRID ANCHOR
          ======================================================== */}
      <span id="products-grid-anchor" className="block -mt-16 pt-16" />

      {/* Main control filter bar + Product stage */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-20 text-left">
        
        {/* MOBILE FILTER TOGGLE BAR */}
        <div className="flex lg:hidden items-center justify-between mb-8 pb-4 border-b border-[#E8DFC9]/30">
          <p className="text-xs text-[#6B7280] font-sans">
            Affichage de <strong className="text-[#3B2F2F] font-semibold">{filteredProducts.length}</strong> onguents sacrés
          </p>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-[#1F3B2F] text-[#FAF8F3] px-4 py-2.5 rounded-full text-xs font-sans tracking-wider font-semibold active:scale-95 transition-transform cursor-pointer"
          >
            <SlidersHorizontal size={13} />
            <span>Filtrer & Trier</span>
            {activeFiltersCount > 0 && (
              <span className="bg-[#C8A96B] w-4.5 h-4.5 rounded-full text-[9px] flex items-center justify-center font-bold text-[#1F3B2F]">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
          
          {/* ========================================================
              2. IMPROVED FILTER SIDEBAR (DESKTOP)
              ======================================================== */}
          <div className="hidden lg:col-span-3 lg:flex flex-col gap-7.5">
            
            {/* SEARCH PANEL */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9]/35 shadow-[0_4px_16px_rgba(31,59,47,0.012)] hover:shadow-md transition-shadow">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold flex items-center gap-2 mb-3.5 pb-2 border-b border-[#E8DFC9]/20">
                <span>RECHERCHE</span>
              </h4>
              <div className="relative border border-gray-300 rounded-xl bg-white overflow-hidden p-1.5 flex items-center shadow-2xs">
                <input
                  type="text"
                  placeholder="Quel onguent ou rituel..."
                  className="bg-transparent text-xs text-[#3B2F2F] pl-2 pr-7 py-2 w-full focus:outline-none placeholder:text-gray-400 font-sans"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                {searchQuery ? (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3.5 text-gray-400 hover:text-[#1F3B2F] cursor-pointer">
                    <X size={13} />
                  </button>
                ) : (
                  <Search size={14} className="absolute right-3.5 text-gray-400 pointer-events-none" />
                )}
              </div>
            </div>

            {/* CATEGORIES / GAMMES */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9]/35 shadow-[0_4px_16px_rgba(31,59,47,0.012)] hover:shadow-md transition-shadow">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold flex items-center gap-2 mb-3.5 pb-2 border-b border-[#E8DFC9]/20">
                <span>CATÉGORIES</span>
              </h4>
              <div className="flex flex-col gap-1 mt-1">
                {[
                  { id: 'Tous', label: 'Tous les soins', count: 68 },
                  { id: 'Visage', label: 'Visage', count: 21 },
                  { id: 'Corps', label: 'Corps', count: 21 },
                  { id: 'Rituels', label: 'Rituels', count: 15 },
                  { id: 'Accessoires', label: 'Accessoires', count: 11 }
                ].map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const canSelect = cat.id !== 'Accessoires'; // Accessoires is static
                  return (
                    <button
                      key={cat.id}
                      disabled={!canSelect}
                      onClick={() => {
                        setSelectedCategory(cat.id as any);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2.5 text-xs rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                        isActive 
                          ? 'bg-[#1F3B2F] text-white font-bold shadow-xs' 
                          : 'text-gray-500 hover:bg-[#FAF8F3] hover:text-[#1F3B2F]'
                      } ${!canSelect ? 'opacity-70 cursor-not-allowed hover:bg-transparent hover:text-gray-500' : ''}`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[9.5px] font-sans px-2 py-0.5 rounded-full ${isActive ? 'bg-[#C8A96B] text-[#1F3B2F] font-bold' : 'bg-gray-100 text-gray-400 font-semibold'}`}>
                        {cat.id === 'Tous' 
                          ? products.length 
                          : cat.id === 'Accessoires' 
                            ? cat.count 
                            : products.filter(p => p.category === cat.id).length
                        }
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TYPE DE PEAU CHECKBOXES */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9]/35 shadow-[0_4px_16px_rgba(31,59,47,0.012)] hover:shadow-md transition-shadow">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold flex items-center gap-2 mb-3.5 pb-2 border-b border-[#E8DFC9]/20">
                <Sparkles size={11} className="text-[#C8A96B]" />
                <span>TYPE DE PEAU</span>
              </h4>
              <div className="flex flex-col gap-3 mt-1.5">
                {(['Sèche', 'Mixte', 'Sensible', 'Normale'] as const).map((skin) => {
                  const isChecked = selectedSkinType === skin;
                  return (
                    <label key={skin} className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedSkinType(isChecked ? 'Tous' : skin);
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-[#1F3B2F] accent-[#1F3B2F] focus:ring-[#1F3B2F] cursor-pointer"
                      />
                      <span className={`text-[12px] font-sans transition-colors ${isChecked ? 'text-[#1F3B2F] font-bold' : 'text-gray-500 hover:text-[#1F3B2F]'}`}>
                        {skin}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* RITUEL CHECKBOXES */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9]/35 shadow-[0_4px_16px_rgba(31,59,47,0.012)] hover:shadow-md transition-shadow">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold flex items-center gap-2 mb-3.5 pb-2 border-b border-[#E8DFC9]/20">
                <Sparkles size={11} className="text-[#C8A96B]" />
                <span>RITUEL</span>
              </h4>
              <div className="flex flex-col gap-3 mt-1.5">
                {(['Purification', 'Protection', 'Éveil', 'Harmonie'] as const).map((rit) => {
                  const isChecked = selectedRitualType === rit;
                  return (
                    <label key={rit} className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedRitualType(isChecked ? 'Tous' : rit);
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-[#1F3B2F] accent-[#1F3B2F] focus:ring-[#1F3B2F] cursor-pointer"
                      />
                      <span className={`text-[12px] font-sans transition-colors ${isChecked ? 'text-[#1F3B2F] font-bold' : 'text-gray-500 hover:text-[#1F3B2F]'}`}>
                        {rit}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* FORMAT CHECKBOXES */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9]/35 shadow-[0_4px_16px_rgba(31,59,47,0.012)] hover:shadow-md transition-shadow">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold flex items-center gap-2 mb-3.5 pb-2 border-b border-[#E8DFC9]/20">
                <SlidersHorizontal size={11} className="text-[#C8A96B]" />
                <span>FORMAT</span>
              </h4>
              <div className="flex flex-col gap-3 mt-1.5">
                {(['50ml', '100ml', '250ml'] as const).map((fmt) => {
                  const isChecked = selectedFormat === fmt;
                  return (
                    <label key={fmt} className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedFormat(isChecked ? 'Tous' : fmt);
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-[#1F3B2F] accent-[#1F3B2F] focus:ring-[#1F3B2F] cursor-pointer"
                      />
                      <span className={`text-[12px] font-sans transition-colors ${isChecked ? 'text-[#1F3B2F] font-bold' : 'text-gray-500 hover:text-[#1F3B2F]'}`}>
                        {fmt}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* PRICE RANGE FILTER */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9]/35 shadow-[0_4px_16px_rgba(31,59,47,0.012)] hover:shadow-md transition-shadow">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold flex items-center gap-2 mb-3.5 pb-2 border-b border-[#E8DFC9]/20">
                <SlidersHorizontal size={11} className="text-[#C8A96B]" />
                <span>PRIX</span>
              </h4>
              <div className="mt-3 px-1">
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  step="5"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-[#1F3B2F] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[11px] font-sans text-gray-400 mt-2">
                  <span>10 €</span>
                  <span className="font-bold text-[#1F3B2F] bg-[#FAF8F3] border border-[#E8DFC9]/40 px-2 py-0.5 rounded shadow-3xs">{maxPrice} €</span>
                  <span>100 €</span>
                </div>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <button 
                onClick={handleResetFilters}
                className="w-full py-3.5 border border-[#1F3B2F]/30 text-[#1F3B2F] text-[10px] tracking-widest font-sans font-bold uppercase hover:bg-[#1F3B2F] hover:text-[#FAF8F3] rounded-xl transition-all duration-300 cursor-pointer"
              >
                Réinitialiser l'officine
              </button>
            )}

          </div>

          {/* ========================================================
              PRODUCTS GRID DISPLAY & STORYTELLING
              ======================================================== */}
          <div className="lg:col-span-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E8DFC9]/30 mb-8 z-10 relative">
                <p className="text-xs text-[#6B7280] font-sans">
                  Affichage de <strong className="text-[#3B2F2F] font-semibold">{filteredProducts.length}</strong> de <strong className="text-[#3B2F2F] font-semibold">{products.length}</strong> élixirs divins
                </p>
                <div className="flex items-center gap-3">
                  {activeFiltersCount > 0 && (
                    <span className="hidden sm:inline-block text-[10px] uppercase font-sans tracking-[0.15em] text-[#C8A96B] font-bold bg-[#FAF8F3] px-3 py-1 rounded border border-[#E8DFC9]/35">
                      {activeFiltersCount} filtres actifs
                    </span>
                  )}
                  {/* Grid / List Layout Switcher */}
                  <div className="flex items-center border border-[#E8DFC9]/40 rounded-lg overflow-hidden bg-white shadow-3xs">
                    <button
                      type="button"
                      onClick={() => setViewType('grid')}
                      className={`p-2 transition-colors cursor-pointer flex items-center justify-center ${viewType === 'grid' ? 'bg-[#1F3B2F] text-white' : 'text-gray-400 hover:text-[#1F3B2F] hover:bg-stone-50'}`}
                      title="Affichage en Grille"
                    >
                      <LayoutGrid size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewType('list')}
                      className={`p-2 transition-colors cursor-pointer flex items-center justify-center ${viewType === 'list' ? 'bg-[#1F3B2F] text-white' : 'text-gray-400 hover:text-[#1F3B2F] hover:bg-stone-50'}`}
                      title="Affichage en Liste"
                    >
                      <List size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Zero product results fallback */}
              {paginatedProducts.length === 0 ? (
                <div className="py-24 text-center border border-dashed border-[#E8DFC9]/60 rounded-3xl bg-white/70 shadow-sm flex flex-col items-center justify-center p-8">
                  <span className="text-[#C8A96B] text-3xl mb-3">✧</span>
                  <p className="text-sm text-[#1F3B2F] font-serif font-medium">Aucun onguent de beauté ou rituel trouvé</p>
                  <p className="text-xs text-gray-400 font-sans max-w-sm mt-1 leading-relaxed">
                    Essayez de relâcher les critères de recherche pour laisser l'alchimie opérer à travers d'autres onguents divins.
                  </p>
                  <button 
                    onClick={handleResetFilters}
                    className="bg-[#1F3B2F] hover:bg-[#C8A96B] text-[#FAF8F3] text-[10px] tracking-widest uppercase font-bold px-7 py-3 rounded-lg mt-5 shadow-lg transition-all cursor-pointer"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <div>
                  <div className={viewType === 'list' ? "flex flex-col gap-6 sm:gap-8" : "grid grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-7 lg:gap-8"}>
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onClick={() => setPage('product_details', { product })}
                        viewType={viewType}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PAGINATION LAYOUT CONTROLS */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-14 py-4.5 border-t border-[#E8DFC9]/30">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2.5 border border-[#E8DFC9]/40 rounded-lg hover:bg-white text-[#1F3B2F] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all active:scale-95"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  const isCurrent = currentPage === pNum;
                  return (
                    <button
                      key={pNum}
                      onClick={() => handlePageChange(pNum)}
                      className={`w-10 h-10 rounded-lg text-xs select-none transition-all font-sans cursor-pointer ${
                        isCurrent 
                          ? 'bg-[#1F3B2F] text-white font-bold shadow-xs' 
                          : 'border border-[#E8DFC9]/40 text-gray-500 hover:bg-white hover:text-[#1F3B2F]'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2.5 border border-[#E8DFC9]/40 rounded-lg hover:bg-white text-[#1F3B2F] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all active:scale-95"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          NEW FULL-WIDTH 3-COLUMN VALUE PROPOSITION BANNER (AS IN CAPTURE)
          ======================================================== */}
      <section className="w-full bg-[#FAF8F3] py-2 lg:py-4 select-none">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 rounded-[28px] overflow-hidden border border-[#E8DFC9]/40 shadow-xs">
            
            {/* Column 1: Des plantes choisies avec intention */}
            <div className="bg-[#FAF8F3]/60 p-8 sm:p-10 lg:p-12 flex items-start gap-4 sm:gap-5.5 border-b md:border-b-0 md:border-r border-[#E8DFC9]/35">
              <div className="w-13 h-13 sm:w-15 sm:h-15 shrink-0 flex items-center justify-center text-[#C8A96B] bg-[#FAF8F3] rounded-full border border-[#C8A96B]/30 shadow-3xs">
                <svg className="w-8 h-8 text-[#C8A96B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 16c0-2.5 1.5-4 4-5-2-2.5-4.5-2.5-6.5-1C7.5 11.5 8.5 14 12 16" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 13c.5-1.5 1.5-2 3-2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h3 className="font-serif text-[18px] sm:text-[20px] lg:text-[21px] font-normal text-[#1F3B2F] leading-snug mb-1.5">
                  Des plantes choisies <br />avec intention
                </h3>
                <p className="text-[12px] sm:text-[13px] text-gray-500 font-sans leading-relaxed font-light mb-4 text-left">
                  Nos soins sont conçus à partir d’ingrédients naturels sélectionnés avec soin pour préserver leur puissance vibratoire et botanique.
                </p>
                <button 
                  onClick={() => setPage('philosophy_page')}
                  className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.18em] text-[#C8A96B] hover:text-[#1F3B2F] uppercase flex items-center gap-1.5 transition-colors cursor-pointer justify-start"
                >
                  <span>en savoir plus</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Column 2: Livraison internationale DHL */}
            <div className="bg-[#1F3B2F] p-8 sm:p-10 lg:p-12 flex items-start gap-4 sm:gap-5.5 text-white border-b md:border-b-0 md:border-r border-[#E8DFC9]/15">
              <div className="w-13 h-13 sm:w-15 sm:h-15 shrink-0 flex items-center justify-center text-[#C8A96B] bg-[#12241C] rounded-full border border-[#C8A96B]/20">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <ellipse cx="12" cy="12" rx="3.5" ry="9" />
                  <ellipse cx="12" cy="12" rx="9" ry="2.8" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="12" y1="3" x2="12" y2="21" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h3 className="font-serif text-[18px] sm:text-[20px] lg:text-[21px] font-normal text-white leading-snug mb-1.5">
                  Livraison internationale <br /><span className="text-[#C8A96B]">DHL</span>
                </h3>
                <p className="text-[12px] sm:text-[13px] text-white/70 font-sans leading-relaxed font-light mb-4 text-left">
                  Expédition rapide dans le monde entier avec suivi sécurisé et calcul automatique des frais de livraison.
                </p>
                <button 
                  onClick={() => setPage('about_page')}
                  className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.18em] text-[#C8A96B] hover:text-white uppercase flex items-center gap-1.5 transition-colors cursor-pointer justify-start"
                >
                  <span>en savoir plus</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Column 3: Formulations éthiques & pures */}
            <div className="bg-[#FAF8F3]/60 p-8 sm:p-10 lg:p-12 flex items-start gap-4 sm:gap-5.5">
              <div className="w-13 h-13 sm:w-15 sm:h-15 shrink-0 flex items-center justify-center text-[#C8A96B] bg-[#FAF8F3] rounded-full border border-[#E8DFC9]/30 shadow-3xs">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 12a5 5 0 0 0 12 0" />
                  <path d="M4 12h16" />
                  <path d="m15.5 5.5-4 6.5" strokeWidth="1.2" />
                  <circle cx="16" cy="5" r="1.2" fill="currentColor" />
                  <path d="M9 18h6" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h3 className="font-serif text-[18px] sm:text-[20px] lg:text-[21px] font-normal text-[#1F3B2F] leading-snug mb-1.5">
                  Formulations <br />éthiques & pures
                </h3>
                <p className="text-[12px] sm:text-[13px] text-gray-500 font-sans leading-relaxed font-light mb-4 text-left">
                  Sans ingrédients controversés, sans compromis sur la qualité. Respectueuses de votre peau et de la planète.
                </p>
                <button 
                  onClick={() => setPage('philosophy_page')}
                  className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.18em] text-[#C8A96B] hover:text-[#1F3B2F] uppercase flex items-center gap-1.5 transition-colors cursor-pointer justify-start"
                >
                  <span>en savoir plus</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. NEW RITUELS RECOMMANDÉS SECTIONS
          ======================================================== */}
      <section className="bg-[#FAF8F3] py-20 lg:py-24 border-y border-[#E8DFC9]/30 relative overflow-hidden">
        
        {/* Subtle backdrop graphics */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.015] pointer-events-none select-none">
          <svg className="w-[300px] h-[300px] text-[#1F3B2F]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="12 2 2 22 22 22" />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          {/* Header (Left-aligned & with view all link) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 text-left border-b border-[#E8DFC9]/30 pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#C8A96B] font-bold block mb-2 text-left">
                RITUELS RECOMMANDÉS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1F3B2F] font-light leading-tight text-left">
                Des rituels d'exception <span className="text-[#C8A96B] italic">pour chaque intention</span>
              </h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('Rituels');
                const el = document.getElementById('products-grid-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#C8A96B] hover:text-[#1F3B2F] transition-all flex items-center gap-2 cursor-pointer pb-1 border-b border-transparent hover:border-[#1F3B2F]/30"
            >
              <span>Découvrir tous les rituels</span>
              <ArrowRight size={13} className="text-[#C8A96B]" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Ritual 1 */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[20px] overflow-hidden border border-[#E8DFC9]/35 hover:border-[#C8A96B]/50 transition-all shadow-[0_4px_24px_rgba(31,59,47,0.015)] hover:shadow-xl text-left flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF8F3]">
                  <img 
                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop" 
                    alt="Rituel d'Éveil" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-[#1F3B2F] text-white text-[9px] tracking-widest uppercase font-bold px-3.5 py-1 rounded-full font-sans shadow-sm">
                    MATIN • INTENTION
                  </span>
                </div>
                <div className="p-6.5 sm:p-7">
                  <span className="text-[9px] tracking-[0.2em] text-[#C8A96B] uppercase font-bold font-sans">
                    ÉNERGIE • CLARTÉ • RENAISSANCE
                  </span>
                  <h3 className="font-serif text-xl font-normal text-[#1F3B2F] tracking-wide mt-2">
                    Rituel Éveil
                  </h3>
                  <p className="text-[11px] text-gray-400 font-sans tracking-wide mt-1 italic">
                    Liturgie d'Éveil & Soin d'Aura
                  </p>
                  <p className="text-[12px] text-gray-500 leading-relaxed font-sans font-light mt-3.5">
                    Réveillez votre radiance naturelle et illuminez votre épiderme dès l’aurore grâce à des soins alchimiques d’extraction d’herboriste.
                  </p>
                </div>
              </div>
              <div className="px-6.5 pb-6 pt-4 border-t border-[#E8DFC9]/20 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-[#556B2F] tracking-widest uppercase font-bold block leading-none mb-1">Tarif Coffret</span>
                  <span className="font-serif text-lg font-bold text-[#1F3B2F]">89.00 €</span>
                </div>
                <button 
                  onClick={(e) => handleAddRitual(e, 'eveil')}
                  className="bg-[#1F3B2F] hover:bg-[#C8A96B] hover:text-[#FAF8F3] text-[#FAF8F3] w-10.5 h-10.5 rounded-full shadow-sm transition-all flex items-center justify-center cursor-pointer hover:shadow-md"
                  title="Acquérir ce coffret rituel"
                >
                  <ShoppingBag size={14} />
                </button>
              </div>
            </motion.div>

            {/* Ritual 2 */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[20px] overflow-hidden border border-[#E8DFC9]/35 hover:border-[#C8A96B]/50 transition-all shadow-[0_4px_24px_rgba(31,59,47,0.015)] hover:shadow-xl text-left flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF8F3]">
                  <img 
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop" 
                    alt="Rituel Purification" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-[#1F3B2F] text-white text-[9px] tracking-widest uppercase font-bold px-3.5 py-1 rounded-full font-sans shadow-sm">
                    CRÉPUSCULE • NETTOYAGE
                  </span>
                </div>
                <div className="p-6.5 sm:p-7">
                  <span className="text-[9px] tracking-[0.2em] text-[#C8A96B] uppercase font-bold font-sans">
                    DÉTOX • PURIFICATION • HARMONIE
                  </span>
                  <h3 className="font-serif text-xl font-normal text-[#1F3B2F] tracking-wide mt-2">
                    Rituel Purification
                  </h3>
                  <p className="text-[11px] text-gray-400 font-sans tracking-wide mt-1 italic">
                    Liturgie d'Herboriste & Purification
                  </p>
                  <p className="text-[12px] text-gray-500 leading-relaxed font-sans font-light mt-3.5">
                    Purifiez votre visage, votre corps et votre esprit avec des onguents sacrés d'oliban séculaire formulés pour libérer instantanément les impuretés terrestres.
                  </p>
                </div>
              </div>
              <div className="px-6.5 pb-6 pt-4 border-t border-[#E8DFC9]/20 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-[#556B2F] tracking-widest uppercase font-bold block leading-none mb-1">Tarif Coffret</span>
                  <span className="font-serif text-lg font-bold text-[#1F3B2F]">79.00 €</span>
                </div>
                <button 
                  onClick={(e) => handleAddRitual(e, 'purif')}
                  className="bg-[#1F3B2F] hover:bg-[#C8A96B] hover:text-[#FAF8F3] text-[#FAF8F3] w-10.5 h-10.5 rounded-full shadow-sm transition-all flex items-center justify-center cursor-pointer hover:shadow-md"
                  title="Acquérir ce coffret rituel"
                >
                  <ShoppingBag size={14} />
                </button>
              </div>
            </motion.div>

            {/* Ritual 3 */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[20px] overflow-hidden border border-[#E8DFC9]/35 hover:border-[#C8A96B]/50 transition-all shadow-[0_4px_24px_rgba(31,59,47,0.015)] hover:shadow-xl text-left flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF8F3]">
                  <img 
                    src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=600&auto=format&fit=crop" 
                    alt="Rituel Protection" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-[#1F3B2F] text-white text-[9px] tracking-widest uppercase font-bold px-3.5 py-1 rounded-full font-sans shadow-sm">
                    BOUCLIER • HARMONIE
                  </span>
                </div>
                <div className="p-6.5 sm:p-7">
                  <span className="text-[9px] tracking-[0.2em] text-[#C8A96B] uppercase font-bold font-sans">
                    ANCRAGE • SÉCURITÉ • FORCE
                  </span>
                  <h3 className="font-serif text-xl font-normal text-[#1F3B2F] tracking-wide mt-2">
                    Rituel Protection
                  </h3>
                  <p className="text-[11px] text-gray-400 font-sans tracking-wide mt-1 italic">
                    Liturgie d'Enfumage & Lithothérapie
                  </p>
                  <p className="text-[12px] text-gray-500 leading-relaxed font-sans font-light mt-3.5">
                    Établissez une protection holistique durable avec une synergie d'extraits botaniques concentrés, de sauge à brûler et de précieux cristaux vibratoires d'ancrage.
                  </p>
                </div>
              </div>
              <div className="px-6.5 pb-6 pt-4 border-t border-[#E8DFC9]/20 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-[#556B2F] tracking-widest uppercase font-bold block leading-none mb-1">Tarif Coffret</span>
                  <span className="font-serif text-lg font-bold text-[#1F3B2F]">99.00 €</span>
                </div>
                <button 
                  onClick={(e) => handleAddRitual(e, 'protect')}
                  className="bg-[#1F3B2F] hover:bg-[#C8A96B] hover:text-[#FAF8F3] text-[#FAF8F3] w-10.5 h-10.5 rounded-full shadow-sm transition-all flex items-center justify-center cursor-pointer"
                  title="Acquérir ce coffret rituel"
                >
                  <ShoppingBag size={14} />
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          6. RICH SEO CONTENT SECTION
          ======================================================== */}
      <section className="bg-white py-18 lg:py-24 border-b border-[#E8DFC9]/30">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-12 relative">
          <div className="flex flex-col items-center text-center gap-3.5 max-w-2xl mx-auto mb-10">
            <span className="text-[#C8A96B] text-[20px]">✦</span>
            <h2 className="font-serif text-3xl font-light text-[#1F3B2F]">
              Pourquoi choisir des cosmétiques naturels & spirituels ?
            </h2>
            <div className="w-12 h-[1px] bg-[#C8A96B] mt-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <p className="text-xs sm:text-[13px] text-gray-500 font-sans leading-relaxed font-light mb-4 text-justify">
                Les formulations et soins de <strong className="text-[#1F3B2F] font-semibold">Vertus Ancestrales</strong> se démarquent par l’excellence et l’intégrité absolue de leur composition. En refusant fermement l’usage systématique d’engrais chimiques ou de conservateurs de synthèse industriels, nous protégeons et transmettons la puissance vitale intacte de chaque plante précieuse divine.
              </p>
              <p className="text-xs sm:text-[13px] text-gray-500 font-sans leading-relaxed font-light text-justify">
                Chaque huile florale sacrée, chaque crème, chaque onguent fait l’objet d’un processus alchimique unique de dynamisation énergétique. Cette technique exclusive permet d’harmoniser et de vibrer à une fréquence terrestre élevée, apportant une dimension cosmétique énergétique inédite.
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-[13px] text-gray-500 font-sans leading-relaxed font-light mb-4 text-justify">
                Notre engagement est spirituel autant qu'écologique. Nous collaborons en direct avec des producteurs engagés et éco-responsables de Peyrac et d'Afrique, respectueux de l’écosystème terrestre. Notre herboristerie est l'expression même d'une science d’antan, préservant la sagesse et les forces secrètes de l'univers terrestre.
              </p>
              <p className="text-xs sm:text-[13px] text-gray-500 font-sans leading-relaxed font-light text-justify">
                En intégrant ces onguents ancestraux dans votre routine quotidienne, vous ne sublimez pas uniquement votre aspect cutané : vous célébrez un hommage quotidien de gratitude envers votre corps et l'énergie créatrice divine de l'univers, pour une beauté qui transcende le temps.
              </p>
            </div>
          </div>
          
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-4 bg-[#FAF8F3] rounded-full border border-[#E8DFC9]/45 px-6 py-2.5 shadow-xs">
              <span className="text-[10px] text-[#556B2F] font-bold tracking-wider font-sans uppercase">Avis Vérifiés : 4.95 / 5 étoiles d’excellence</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. IMPROVED MOBILE UX DRAWER (MOBILE FILTER DRAWER)
          ======================================================== */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Dark modal overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-[#1F3B2F] z-55 pointer-events-auto"
            />

            {/* Slide up mobile Drawer */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 top-[10%] bg-white rounded-t-[28px] z-60 px-6 py-6 overflow-y-auto shadow-2xl border-t border-[#E8DFC9]/40 flex flex-col justify-between"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={15} className="text-[#C8A96B]" />
                    <span className="font-serif text-lg font-semibold text-[#1F3B2F]">Filtrer & Trier</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 px-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-black cursor-pointer text-xs"
                  >
                    Fermer
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Category Filter */}
                  <div>
                    <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Gammes de Soins</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Tous', 'Visage', 'Corps', 'Rituels'] as const).map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                          <button
                            key={cat}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setCurrentPage(1);
                            }}
                            className={`px-4 py-2 text-xs rounded-lg font-medium text-center transition-all cursor-pointer ${
                              isActive 
                                ? 'bg-[#1F3B2F] text-white font-bold' 
                                : 'bg-[#FAF8F3]/70 text-gray-500 border border-gray-100'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing slider */}
                  <div>
                    <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Budget Maximum</h5>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      step="5"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="w-full accent-[#1F3B2F]"
                    />
                    <div className="flex justify-between items-center text-[11px] text-gray-400 mt-1">
                      <span>10 €</span>
                      <span className="font-bold text-[#1F3B2F] bg-[#FAF8F3] px-2 py-0.5 rounded">{maxPrice} €</span>
                      <span>100 €</span>
                    </div>
                  </div>

                  {/* Format Pill Selection */}
                  <div>
                    <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Format</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {(['Tous', '50ml', '100ml', '250ml'] as const).map((fmt) => {
                        const isActive = selectedFormat === fmt;
                        return (
                          <button
                            key={fmt}
                            onClick={() => {
                              setSelectedFormat(fmt);
                              setCurrentPage(1);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                              isActive 
                                ? 'bg-[#1F3B2F] text-white font-bold' 
                                : 'bg-[#FAF8F3] text-gray-500 border border-gray-100'
                            }`}
                          >
                            {fmt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Skin Selection */}
                  <div>
                    <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Type de Peau</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {(['Tous', 'Sèche', 'Mixte', 'Sensible'] as const).map((skin) => {
                        const isActive = selectedSkinType === skin;
                        return (
                          <button
                            key={skin}
                            onClick={() => {
                              setSelectedSkinType(skin);
                              setCurrentPage(1);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                              isActive 
                                ? 'bg-[#1F3B2F] text-white' 
                                : 'bg-[#FAF8F3] text-gray-500'
                            }`}
                          >
                            {skin}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ritual Selection */}
                  <div>
                    <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Type d'Énergie / Rituel</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {(['Tous', 'Purification', 'Protection', 'Éveil'] as const).map((rit) => {
                        const isActive = selectedRitualType === rit;
                        return (
                          <button
                            key={rit}
                            onClick={() => {
                              setSelectedRitualType(rit);
                              setCurrentPage(1);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                              isActive 
                                ? 'bg-[#1F3B2F] text-white' 
                                : 'bg-[#FAF8F3] text-gray-500'
                            }`}
                          >
                            {rit}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sorting Select mobile */}
                  <div>
                    <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Trier</h5>
                    <select
                      className="border border-[#E8DFC9] px-3 py-2 text-xs rounded-lg bg-[#FAF8F3] w-full focus:outline-none"
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value as any);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="default">Recommandé</option>
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="rating">Mieux noté</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Drawer bottoms */}
              <div className="pt-6 border-t border-gray-100 flex items-center gap-3.5 mt-8">
                <button 
                  onClick={handleResetFilters}
                  className="w-1/2 py-3 border border-gray-200 text-gray-500 font-sans tracking-wider text-[11px] font-bold uppercase rounded-lg cursor-pointer"
                >
                  Tout Effacer
                </button>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-1/2 py-3 bg-[#1F3B2F] text-white font-sans tracking-wider text-[11px] font-bold uppercase rounded-lg cursor-pointer"
                >
                  Voir ({filteredProducts.length}) soins
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
