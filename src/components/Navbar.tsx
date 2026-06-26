/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ShoppingBag, User as UserIcon, LogOut, ChevronRight, LayoutDashboard, Search } from 'lucide-react';
import { User, CartItem } from '../types';
import logoImg from '../assets/brand/logo.jpeg';

interface NavbarProps {
  currentPage: string;
  setPage: (page: string, params?: any) => void;
  currentUser: User | null;
  onLogout: () => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setPage,
  currentUser,
  onLogout,
  cart,
  setIsCartOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', id: 'home' },
    { label: 'Boutique', id: 'boutique' },
    { label: 'Consultations', id: 'consultations' },
    { label: 'Notre Histoire', id: 'history' },
    { label: 'Monique', id: 'monique' },
    { label: 'Blog', id: 'blog' },
    { label: 'Témoignages', id: 'testimonials' }
  ];

  const scrollToTestimonials = () => {
    const el = document.getElementById('paroles-sacrees-testimonials');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNavClick = (id: string) => {
    if (id === 'testimonials') {
      if (currentPage === 'home') {
        scrollToTestimonials();
      } else {
        setPage('home');
        setTimeout(scrollToTestimonials, 400);
      }
      setIsOpen(false);
      return;
    }
    setPage(id);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#1F3B2F] border-[#C8A96B]/20 shadow-lg shadow-black/15' : 'bg-[#FAF8F3]/95 backdrop-blur-md border-[#E8DFC9]/40'}`}>
      {/* Top Banner */}
      <div className={`bg-[#12241C] text-[#FAF8F3]/90 text-[10px] sm:text-[11px] leading-none py-2 sm:py-3 px-4 text-center tracking-[0.2em] font-sans uppercase font-medium border-b border-[#FAF8F3]/5 transition-all duration-300 h-auto ${isScrolled ? 'max-h-0 py-0 opacity-0 overflow-hidden border-none' : 'max-h-20 opacity-100'}`}>
        <span className="text-[#C8A96B] font-extrabold mr-2">✦</span>
        <span className="hidden sm:inline">LIVRAISON OFFERTE INTERNATIONALE VIA DHL • PAIEMENT SÉCURISÉ STRIPE • CONSULTATION EN LIGNE DISPONIBLE</span>
        <span className="sm:hidden">LIVRAISON OFFERTE • PAIEMENT SÉCURISÉ</span>
        <span className="text-[#C8A96B] font-extrabold ml-2">✦</span>
      </div>

      <div className={`max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center transition-all duration-300 relative ${isScrolled ? 'h-14 sm:h-16' : 'h-20 sm:h-24'}`}>
        {/* Mobile controls: Hamburger on the left */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 focus:outline-none cursor-pointer z-10 shrink-0 transition-colors ${isScrolled ? 'text-[#FAF8F3] hover:text-[#C8A96B]' : 'text-[#1F3B2F] hover:text-[#C8A96B]'}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} className="stroke-[1.75]" /> : <Menu size={22} className="stroke-[1.75]" />}
        </button>

        {/* Spacer left for mobile to keep logo centered */}
        <div className="lg:hidden w-10 shrink-0" />

        {/* Logo Container (Left-aligned on desktop, centered on mobile) */}
        <button 
          onClick={() => setPage('home')} 
          className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer focus:outline-none py-1 mx-auto lg:mx-0"
        >
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full border border-[#C8A96B] overflow-hidden flex items-center justify-center bg-[#1F3B2F] group-hover:border-[#C8A96B] transition-all duration-300 shadow shrink-0">
            <img src={logoImg} alt="Vertus Ancestrales Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col items-center lg:items-start select-none">
            <span className={`font-serif text-[14px] sm:text-lg lg:text-xl font-medium tracking-[0.12em] uppercase leading-none transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-[#1F3B2F]'}`}>
              VERTUS
            </span>
            <span className="text-[7.5px] sm:text-[9px] lg:text-[10px] font-sans tracking-[0.25em] text-[#C8A96B] uppercase leading-none mt-0.5 sm:mt-1.5 font-semibold">
              ANCESTRALES
            </span>
          </div>
        </button>

        {/* Navigation Desktop Center */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0">
          {navItems.map((item) => {
            const isActive = currentPage === item.id || (item.id === 'blog' && currentPage === 'blog_details') || (item.id === 'testimonials' && currentPage === 'home');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs tracking-[0.18em] uppercase font-sans relative py-2 transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'text-[#C8A96B] font-bold' 
                    : isScrolled
                      ? 'text-[#FAF8F3]/80 hover:text-[#C8A96B]'
                      : 'text-[#1F3B2F]/80 hover:text-[#C8A96B]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#C8A96B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Controls Right */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
          {/* Search Button */}
          <button 
            onClick={() => setShowSearchModal(true)}
            className={`p-1.5 sm:p-2 transition-colors cursor-pointer ${isScrolled ? 'text-white hover:text-[#C8A96B]' : 'text-[#1F3B2F] hover:text-[#C8A96B]'}`}
            title="Rechercher"
          >
            <Search size={18} className="stroke-[1.75]" />
          </button>

          {/* User Sign In / Profile Panel */}
          {currentUser ? (
            <div className={`relative hidden sm:flex items-center gap-1.5 border-l pl-2 transition-colors ${isScrolled ? 'border-[#FAF8F3]/10' : 'border-[#E8DFC9]/40'}`}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-1.5 hover:opacity-85 transition-opacity cursor-pointer focus:outline-none"
                title="Profil"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C8A96B] text-[#1F3B2F] flex items-center justify-center font-sans font-bold text-xs border border-white/10 shadow-sm">
                  {currentUser.firstName[0]}{currentUser.lastName[0]}
                </div>
              </button>

              {isProfileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-35 cursor-default" 
                    onClick={() => setIsProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-52 bg-[#FAF8F3] border border-[#E8DFC9] rounded-lg shadow-xl py-2 z-40 animate-fade-in text-left">
                    <div className="px-4 py-2 border-b border-[#E8DFC9]/40 mb-1 select-none">
                      <p className="text-[9px] font-sans text-gray-500 uppercase tracking-widest leading-none">Connecté en tant que</p>
                      <p className="text-xs font-semibold text-[#1F3B2F] truncate mt-1">
                        {currentUser.firstName} {currentUser.lastName}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setPage(currentUser.role === 'admin' ? 'dashboard_admin' : 'dashboard_client');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#1F3B2F]/90 hover:bg-[#F3EEE3] hover:text-[#C8A96B] transition-colors flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <LayoutDashboard size={14} className="text-[#C8A96B]" />
                      <span>Mon Espace ({currentUser.role === 'admin' ? 'Admin' : 'Client'})</span>
                    </button>

                    <button
                      onClick={() => {
                        onLogout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2 border-t border-[#E8DFC9]/30 mt-1 cursor-pointer font-medium"
                    >
                      <LogOut size={14} className="stroke-[1.75]" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setPage('login')}
              className={`hidden sm:flex transition-colors p-1.5 sm:p-2 cursor-pointer ${isScrolled ? 'text-white hover:text-[#C8A96B]' : 'text-[#1F3B2F] hover:text-[#C8A96B]'}`}
              title="Se connecter"
            >
              <UserIcon size={18} className="stroke-[1.75]" />
            </button>
          )}

          {/* Shopping Bag Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className={`relative p-1.5 sm:p-2 transition-all cursor-pointer ${isScrolled ? 'text-white hover:text-[#C8A96B]' : 'text-[#1F3B2F] hover:text-[#C8A96B]'}`}
          >
            <ShoppingBag size={18} className="stroke-[1.75]" />
            {cartCount > 0 && (
              <span className={`absolute -top-1 -right-1 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border transition-colors ${isScrolled ? 'bg-[#C8A96B] text-[#1F3B2F] border-[#1F3B2F]' : 'bg-[#1F3B2F] text-[#C8A96B] border-[#FAF8F3]'}`}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Booking CTA Button (Desktop large only) */}
          <button
            onClick={() => setPage('consultations')}
            className={`hidden lg:block text-[10px] tracking-[0.2em] uppercase font-bold border border-transparent px-3 py-2 rounded transition-all duration-300 cursor-pointer ${isScrolled ? 'bg-[#C8A96B] hover:bg-white text-[#1F3B2F] shadow-md shadow-black/10' : 'bg-[#C8A96B] hover:bg-[#1F3B2F] text-[#1F3B2F] hover:text-white shadow shadow-[#C8A96B]/15'}`}
          >
            Consultation
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#FAF8F3] border-t border-[#E8DFC9]/40 py-6 px-6 absolute top-full left-0 w-full shadow-lg flex flex-col gap-5 animate-fade-in z-50 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.id || (item.id === 'testimonials' && currentPage === 'home');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 font-serif text-lg tracking-wide border-b border-[#E8DFC9]/20 flex items-center justify-between ${
                    isActive ? 'text-[#1F3B2F] font-bold pl-2' : 'text-[#6B7280]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="text-[#C8A96B]" />
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-[#E8DFC9]/50">
            {currentUser && (
              <p className="text-xs text-[#6B7280] font-sans">
                Bonjour, <strong className="text-[#1F3B2F] font-medium">{currentUser.firstName}</strong>
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setPage('consultations');
                  setIsOpen(false);
                }}
                className="col-span-2 bg-[#1F3B2F] text-[#FAF8F3] text-center text-xs tracking-widest uppercase font-medium py-3 rounded-md focus:outline-none"
              >
                Réservez un soin
              </button>
              {currentUser ? (
                <>
                  <button
                    onClick={() => {
                      setPage(currentUser.role === 'admin' ? 'dashboard_admin' : 'dashboard_client');
                      setIsOpen(false);
                    }}
                    className="bg-[#E8DFC9] text-[#1F3B2F] text-center text-xs tracking-widest uppercase font-medium py-3 rounded-md focus:outline-none"
                  >
                    Mon Espace
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="border border-[#D64545] text-[#D64545] text-center text-xs tracking-widest uppercase font-medium py-3 rounded-md focus:outline-none"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setPage('login');
                      setIsOpen(false);
                    }}
                    className="bg-[#E8DFC9] text-[#1F3B2F] text-center text-xs tracking-widest uppercase font-medium py-3 rounded-md focus:outline-none"
                  >
                    Connexion
                  </button>
                  <button
                    onClick={() => {
                      setPage('register');
                      setIsOpen(false);
                    }}
                    className="border border-[#1F3B2F] text-[#1F3B2F] text-center text-xs tracking-widest uppercase font-medium py-3 rounded-md focus:outline-none"
                  >
                    Créer Compte
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
