/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Sparkles, BookOpen, Star, ArrowRight, ShoppingBag, Eye, Heart, HelpCircle, ArrowLeft, ArrowRight as ArrowRightIcon, User, FileText, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Testimonial } from '../types';
import { TestimonialCard } from '../components/TestimonialCard';
import { TestimonialsSection } from '../components/ui/testimonials-section';
import heroHome1 from '../assets/brand/hero_home1.jpg';
import heroHome2 from '../assets/brand/hero_home2.png';
import heroHome3 from '../assets/brand/hero_home3.png';

const PREMIUM_TESTIMONIALS_TOP = [
  {
    id: 't-top-1',
    name: 'Élise T.',
    type: 'Cliente fidèle',
    review: 'Vertus Ancestrales a transformé ma peau et surtout ma confiance. Des produits purs, puissants et remplis d’amour.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-top-2',
    name: 'Nadia K.',
    type: 'Consultation privée',
    review: 'Les rituels de Monique ont changé ma vision du bien-être. Une approche holistique profonde et authentique.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-top-3',
    name: 'Sophie M.',
    type: 'Cliente fidèle',
    review: 'Enfin une marque alignée avec mes valeurs. Naturelle, sacrée et d’une qualité exceptionnelle. Je ne peux plus m’en passer.',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-top-4',
    name: 'Linda B.',
    type: 'Accompagnement',
    review: 'Monique est une guide, une médium bienveillante. Ses conseils m’ont permis de me reconnecter à mon essence.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-top-5',
    name: 'Aïcha D.',
    type: 'Cliente fidèle',
    review: 'Chaque soin est une expérience sensorielle et spirituelle. Merci pour votre lumière et votre dévouement.',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop'
  }
];

const PREMIUM_TESTIMONIALS_BOTTOM = [
  {
    id: 't-bottom-1',
    name: 'Maya L.',
    type: 'Cliente fidèle',
    review: 'Une marque qui honore nos traditions et sublime la beauté naturelle. Je recommande les yeux fermés !',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-bottom-2',
    name: 'Chloé R.',
    type: 'Cliente fidèle',
    review: 'Les produits sont d’une pureté rare. Ma peau n’a jamais été aussi lumineuse et équilibrée.',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-bottom-3',
    name: 'Laura P.',
    type: 'Consultation privée',
    review: 'Grâce aux consultations de Monique, j’ai retrouvé clarté, paix intérieure et confiance en mon chemin.',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-bottom-4',
    name: 'Fatou S.',
    type: 'Cliente fidèle',
    review: 'Vertus Ancestrales, c’est bien plus qu’une marque, c’est un héritage, une mission, une vibration d’amour.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-bottom-5',
    name: 'Inès M.',
    type: 'Accompagnement',
    review: 'Chaque rituel est un moment sacré. Je me sens alignée, ressourcée et profondément reconnectée.',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=200&auto=format&fit=crop'
  }
];

interface HomeProps {
  setPage: (page: string, params?: any) => void;
  featuredProducts: Product[];
  testimonials: Testimonial[];
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  setPage, 
  featuredProducts, 
  testimonials,
  onAddToCart 
}) => {
  const [scrollY, setScrollY] = React.useState(0);
  const [heroImageIdx, setHeroImageIdx] = React.useState(0);
  const heroSectionRef = React.useRef<HTMLDivElement>(null);
  const lastStepChangeTime = React.useRef(0);
  const touchStartY = React.useRef(0);

  const HERO_IMAGES = [
    heroHome1,
    heroHome2,
    heroHome3
  ];

  const HERO_SLIDES = [
    {
      title: "L’héritage ancestral",
      highlight: "beauté",
      subtitle: "au service de votre éveil & de votre",
      desc: "Cosmétiques naturels, rituels, consultations et conseils pour une transformation holistique."
    },
    {
      title: "Cosmétiques divins",
      highlight: "sacrés",
      subtitle: "nés de la terre sainte & des rituels",
      desc: "Élixirs de jeunesse de l'Or Noir et huiles précieuses d'Afrique formulées à partir d'extraits naturels purs."
    },
    {
      title: "L'éveil holistique",
      highlight: "l’âme",
      subtitle: "par la guidance d’oracle & les soins de",
      desc: "Trouvez la clarté et reconnectez-vous à votre essence divine à travers nos consultations intenses."
    }
  ];

  const HERO_SLIDES_INFO = [
    { title: "L’HÉRITAGE" },
    { title: "SOINS NATURELS" },
    { title: "L’ÉVEIL SPIRITUEL" }
  ];

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intercept scroll/wheel and swipe on hero to block and show other images
  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const isAtTop = window.scrollY <= 15;
      if (!isAtTop) return;

      const now = Date.now();
      if (now - lastStepChangeTime.current < 600) {
        // Prevent default wheel action to maintain focus on slide transition
        if ((e.deltaY > 5 && heroImageIdx < 2) || (e.deltaY < -5 && heroImageIdx > 0)) {
          e.preventDefault();
        }
        return;
      }

      if (e.deltaY > 5) {
        // Scrolling Down
        if (heroImageIdx < 2) {
          e.preventDefault();
          setHeroImageIdx(prev => prev + 1);
          lastStepChangeTime.current = now;
        }
      } else if (e.deltaY < -5) {
        // Scrolling Up
        if (heroImageIdx > 0) {
          e.preventDefault();
          setHeroImageIdx(prev => prev - 1);
          lastStepChangeTime.current = now;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const isAtTop = window.scrollY <= 15;
      if (!isAtTop) return;

      const touchY = e.touches[0].clientY;
      const diffY = touchStartY.current - touchY;
      const now = Date.now();

      if (Math.abs(diffY) > 30) {
        if (now - lastStepChangeTime.current < 600) {
          if ((diffY > 0 && heroImageIdx < 2) || (diffY < 0 && heroImageIdx > 0)) {
            e.preventDefault();
          }
          return;
        }

        if (diffY > 30) {
          // Swipe up (Scroll Down)
          if (heroImageIdx < 2) {
            e.preventDefault();
            setHeroImageIdx(prev => prev + 1);
            lastStepChangeTime.current = now;
            touchStartY.current = touchY;
          }
        } else if (diffY < -30) {
          // Swipe down (Scroll Up)
          if (heroImageIdx > 0) {
            e.preventDefault();
            setHeroImageIdx(prev => prev - 1);
            lastStepChangeTime.current = now;
            touchStartY.current = touchY;
          }
        }
      }
    };

    const element = heroSectionRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [heroImageIdx]);

  // Smoothly disappear the overlapping navigation cards section (section en haut de "NOTRE ESSENCE") as the user scrolls down past/at Notre Essence (starting around 300px)
  const navSectionOpacity = scrollY < 300 ? 1 : Math.max(0, 1 - (scrollY - 300) / 380);

  // Mouse tracking state for premium interactive cursor on Hero
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = React.useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="bg-[#FAF8F3]/40 min-h-screen text-[#3B2F2F] animate-fade-in">
      {/* 1. HERO SECTION */}
      <section 
        ref={heroSectionRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
        className="relative h-[400px] sm:h-[580px] lg:h-[660px] flex items-center bg-[#12241C] border-b border-[#C8A96B]/15 overflow-hidden md:cursor-none"
      >
        {/* Premium Mouse-Tracking Cursor Indicator on Hero */}
        {isHoveringHero && (
          <div 
            style={{ 
              left: mousePos.x, 
              top: mousePos.y,
              transform: `translate(-50%, -50%) scale(${isHoveringInteractive ? 0.35 : 1})`,
              pointerEvents: 'none'
            }}
            className="absolute hidden md:flex flex-col items-center justify-center w-24 h-24 rounded-full border border-[#C8A96B]/50 bg-gradient-to-br from-[#12241C]/85 to-[#1F3B2F]/50 backdrop-blur-[2px] z-50 transition-all duration-300 ease-out text-[#C8A96B]"
          >
            {!isHoveringInteractive && (
              <>
                <span className="font-serif text-[9px] tracking-[0.2em] uppercase font-semibold text-white/95 mb-1.5">Défiler</span>
                <div className="flex flex-col gap-0.5 items-center">
                  <svg className="w-3.5 h-3.5 animate-bounce text-[#C8A96B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </div>
              </>
            )}
            {isHoveringInteractive && (
              <div className="w-4 h-4 rounded-full bg-[#C8A96B]" />
            )}
          </div>
        )}

        {/* Cinematic rich backgrounds that cross-fade */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#12241C]">
          {HERO_IMAGES.map((imgUrl, idx) => (
            <div
              key={imgUrl}
              style={{
                opacity: heroImageIdx === idx ? 1 : 0,
                transition: 'opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'opacity'
              }}
              className="absolute inset-0"
            >
              <img 
                src={imgUrl} 
                alt="L’héritage ancestral" 
                style={{ 
                  transform: `translateY(${scrollY * 0.25}px) scale(${heroImageIdx === idx ? 1.05 : 1.12})`,
                  transition: 'transform 10s cubic-bezier(0.25, 1, 0.5, 1)',
                  willChange: 'transform'
                }}
                className="w-full h-full object-cover object-bottom sm:object-center select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          {/* Subtle gradient vignette on LHS to preserve extreme readability & luxury depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#12241C]/90 via-[#12241C]/65 to-transparent hidden md:block z-1"></div>
          {/* Mobile full background tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12241C]/95 via-[#12241C]/75 to-[#12241C]/45 md:hidden z-1"></div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20 relative z-10 py-8 sm:py-24 lg:py-32">
          <motion.div 
            key={heroImageIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-left flex flex-col items-start gap-4 sm:gap-7 animate-fade-in"
          >
            <h1 className="font-serif text-[28px] sm:text-[46px] lg:text-[54px] xl:text-[60px] font-light text-white leading-[1.2] tracking-wide">
              {HERO_SLIDES[heroImageIdx].title} <br />
              {HERO_SLIDES[heroImageIdx].subtitle} <span className="font-serif italic font-normal text-[#C8A96B]">{HERO_SLIDES[heroImageIdx].highlight}</span>
            </h1>
            <p className="text-[11px] sm:text-xs lg:text-base leading-relaxed text-white/85 font-sans font-light max-w-lg">
              {HERO_SLIDES[heroImageIdx].desc}
            </p>
            
            {/* CTA Button */}
            <div className="mt-2 sm:mt-4">
              <button 
                onMouseEnter={() => setIsHoveringInteractive(true)}
                onMouseLeave={() => setIsHoveringInteractive(false)}
                onClick={() => setPage(heroImageIdx === 2 ? 'consultations' : 'boutique')}
                className="bg-[#C8A96B] hover:bg-white text-[#1F3B2F] hover:text-black border border-transparent font-sans text-xs sm:text-[13px] tracking-[0.2em] font-bold uppercase py-3.5 px-6 sm:px-10 rounded transition-all duration-500 shadow-xl shadow-black/25 cursor-pointer hover:scale-[1.02] flex items-center gap-2 md:cursor-pointer"
              >
                <span>{heroImageIdx === 2 ? "Prendre rendez-vous" : "Voir nos Produits"}</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Luxury Steps Indicators */}
        <div className="absolute bottom-6 right-8 sm:right-12 z-20 flex items-center gap-4">
          {/* Mobile dots */}
          <div className="flex sm:hidden items-center gap-2">
            {HERO_SLIDES_INFO.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroImageIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  heroImageIdx === idx ? 'bg-[#C8A96B] w-4' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
          {/* Desktop labels */}
          <div className="hidden sm:flex items-center gap-4">
            {HERO_SLIDES_INFO.map((slide, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setIsHoveringInteractive(true)}
                onMouseLeave={() => setIsHoveringInteractive(false)}
                onClick={() => setHeroImageIdx(idx)}
                className="flex flex-col items-start gap-1 cursor-pointer group text-left outline-none md:cursor-pointer"
              >
                <span className={`text-[8px] sm:text-[9px] tracking-[0.2em] font-sans font-semibold transition-colors ${heroImageIdx === idx ? 'text-[#C8A96B]' : 'text-white/40 group-hover:text-white/70'}`}>
                  0{idx + 1} {slide.title}
                </span>
                <div className={`h-[2px] transition-all duration-700 ${heroImageIdx === idx ? 'w-16 bg-[#C8A96B]' : 'w-4 bg-white/20 group-hover:bg-white/40'}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING NAVIGATION CARDS */}
      <section 
        style={{ 
          opacity: navSectionOpacity,
          pointerEvents: navSectionOpacity === 0 ? 'none' : 'auto',
          transition: 'opacity 0.05s ease-out',
          willChange: 'opacity'
        }}
        className="relative z-30 -mt-10 sm:-mt-14 max-w-[1240px] mx-auto px-4 sm:px-8"
      >
        
        {/* Mobile View (Unified List with dividers matching screenshot) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block md:hidden bg-white/95 backdrop-blur rounded-[20px] shadow-xl border border-[#C8A96B]/10 overflow-hidden divide-y divide-[#E8DFC9]/30"
        >
          {/* Boutique Row */}
          <div 
            onClick={() => setPage('boutique')}
            className="p-5 flex items-center gap-5 cursor-pointer active:bg-[#FAF8F3] transition-colors"
          >
            <div className="w-11 h-11 rounded-full border border-[#C8A96B]/30 flex items-center justify-center shrink-0 bg-[#FAF8F3]/60 text-[#C8A96B]">
              <ShoppingBag size={18} className="stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-[#1F3B2F]">Boutique</h4>
              <p className="text-[10px] text-gray-500 font-sans mt-0.5">Cosmétiques naturels</p>
            </div>
          </div>

          {/* Consultations Row */}
          <div 
            onClick={() => setPage('consultations')}
            className="p-5 flex items-center gap-5 cursor-pointer active:bg-[#FAF8F3] transition-colors"
          >
            <div className="w-11 h-11 rounded-full border border-[#C8A96B]/30 flex items-center justify-center shrink-0 bg-[#FAF8F3]/60 text-[#C8A96B]">
              <User size={18} className="stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-[#1F3B2F]">Consultations</h4>
              <p className="text-[10px] text-gray-500 font-sans mt-0.5">Réservez votre séance</p>
            </div>
          </div>

          {/* Blog Row */}
          <div 
            onClick={() => setPage('blog')}
            className="p-5 flex items-center gap-5 cursor-pointer active:bg-[#FAF8F3] transition-colors"
          >
            <div className="w-11 h-11 rounded-full border border-[#C8A96B]/30 flex items-center justify-center shrink-0 bg-[#FAF8F3]/60 text-[#C8A96B]">
              <FileText size={18} className="stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-[#1F3B2F]">Blog</h4>
              <p className="text-[10px] text-gray-500 font-sans mt-0.5">Articles & rituels</p>
            </div>
          </div>
        </motion.div>

        {/* Desktop View (Grid/Bento styling preserving spacing) */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:grid grid-cols-3 gap-5 sm:gap-6"
        >
          {/* Boutique */}
          <div 
            onClick={() => setPage('boutique')}
            className="bg-white hover:bg-[#FAF8F3] text-[#1F3B2F] rounded-xl shadow-xl hover:shadow-2xl border border-[#C8A96B]/10 p-5 sm:p-7 flex items-center gap-5 transition-all duration-500 cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full border border-[#C8A96B]/30 flex items-center justify-center shrink-0 bg-[#FAF8F3]/60 text-[#C8A96B] group-hover:bg-[#1F3B2F] group-hover:text-white transition-all duration-300">
              <ShoppingBag size={18} className="stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-sans text-[13px] font-bold tracking-[0.16em] uppercase text-[#1F3B2F]">Boutique</h4>
              <p className="text-[11px] text-gray-500 font-sans mt-0.5">Cosmétiques naturels</p>
            </div>
          </div>

          {/* Consultations */}
          <div 
            onClick={() => setPage('consultations')}
            className="bg-white hover:bg-[#FAF8F3] text-[#1F3B2F] rounded-xl shadow-xl hover:shadow-2xl border border-[#C8A96B]/10 p-5 sm:p-7 flex items-center gap-5 transition-all duration-500 cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full border border-[#C8A96B]/30 flex items-center justify-center shrink-0 bg-[#FAF8F3]/60 text-[#C8A96B] group-hover:bg-[#1F3B2F] group-hover:text-white transition-all duration-300">
              <User size={18} className="stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-sans text-[13px] font-bold tracking-[0.16em] uppercase text-[#1F3B2F]">Consultations</h4>
              <p className="text-[11px] text-gray-500 font-sans mt-0.5">Réservez votre séance</p>
            </div>
          </div>

          {/* Blog */}
          <div 
            onClick={() => setPage('blog')}
            className="bg-white hover:bg-[#FAF8F3] text-[#1F3B2F] rounded-xl shadow-xl hover:shadow-2xl border border-[#C8A96B]/10 p-5 sm:p-7 flex items-center gap-5 transition-all duration-500 cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full border border-[#C8A96B]/30 flex items-center justify-center shrink-0 bg-[#FAF8F3]/60 text-[#C8A96B] group-hover:bg-[#1F3B2F] group-hover:text-white transition-all duration-300">
              <FileText size={18} className="stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-sans text-[13px] font-bold tracking-[0.16em] uppercase text-[#1F3B2F]">Blog</h4>
              <p className="text-[11px] text-gray-500 font-sans mt-0.5">Articles & rituels</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. BRAND PRESENTATION SECTION (Editorial Aesop-like brand philosophy introduction) */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-[#FAF8F3] overflow-hidden border-t border-[#E8DFC9]/20">
        {/* Decorative soft ambient lights */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#C8A96B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1F3B2F]/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-24 items-center">
          
          {/* Brand Content Left */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start gap-6 relative z-10"
          >
            {/* Elegant luxury style label badge */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-[#C8A96B]" />
              <span className="text-[11px] uppercase font-sans tracking-[0.3em] text-[#C8A96B] font-bold">
                NOTRE ESSENCE
              </span>
            </div>

            <h2 className="font-serif text-[34px] sm:text-[46px] lg:text-[52px] text-[#1F3B2F] font-light leading-[1.12] tracking-tight">
              Honorer l’héritage, <br />
              révéler <span className="text-[#C8A96B] italic font-serif">l’essence</span>.
            </h2>

            {/* Elegant typography divider */}
            <div className="flex items-center gap-2.5 w-full max-w-sm">
              <div className="w-16 h-[1.5px] bg-[#C8A96B]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
              <div className="flex-1 h-[0.5px] bg-[#E8DFC9]/40" />
            </div>

            <div className="flex flex-col gap-6 text-[14px] sm:text-[15px] text-gray-700 leading-relaxed font-sans max-w-xl font-light">
              <p className="font-medium text-[#1F3B2F] text-[16px] sm:text-[17px] leading-relaxed">
                Vertus Ancestrales est née de la rencontre entre les savoirs ancestraux, la beauté naturelle et l’éveil spirituel.
              </p>
              <p>
                Nous créons bien plus que des soins : nous offrons des rituels, des expériences et des accompagnements pensés pour nourrir le corps, apaiser l'esprit et révéler votre lumière intérieure.
              </p>
              <p className="text-gray-500 text-[13.5px] sm:text-[14px]">
                Chaque produit, chaque consultation et chaque rituel est conçu avec intention, pureté et respect des traditions sacrées.
              </p>
            </div>

            {/* Luxury dynamic button links to our path story */}
            <button
              onClick={() => setPage('monique')}
              className="group relative mt-4 bg-[#1F3B2F] hover:bg-[#152a21] text-white text-[10.5px] tracking-[0.18em] uppercase font-bold px-9 py-4 rounded-[4px] shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <span>DÉCOUVRIR NOTRE HISTOIRE</span>
              <svg className="w-4 h-4 text-[#C8A96B] group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* Luxury Visual Right */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            {/* Outline minimalist border frame background */}
            <div className="absolute -inset-4 border border-[#E8DFC9]/35 rounded-3xl pointer-events-none transform translate-x-2.5 translate-y-2.5 hidden sm:block" />

            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#E8DFC9]/20 bg-[#F3EEE3]/40 max-w-[520px]">
              <img 
                src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop" 
                alt="Flacon d'huile sacrée et herbes botaniques précieuses" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.94] saturate-[0.95] transform hover:scale-101 transition-transform duration-1000 ease-out"
              />
              {/* Premium radial gold shadow vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F3B2F]/15 via-transparent to-transparent pointer-events-none" />

              {/* Floating Circular Premium Quality Badge */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md border border-[#C8A96B]/50 p-4 rounded-full shadow-lg flex flex-col items-center justify-center w-28 h-28 transform hover:rotate-12 transition-transform duration-700 ease-out select-none">
                <svg className="w-5 h-5 text-[#C8A96B] mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 21c-1.8-2.5-4-5-4-8.5c0-2.5 1.8-4.5 4-7" />
                  <path d="M12 21c1.8-2.5 4-5 4-8.5c0-2.5-1.8-4.5-4-7" />
                </svg>
                <span className="text-[8px] font-sans font-bold text-[#1F3B2F] tracking-widest text-center uppercase leading-tight">
                  100%<br />NATUREL
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (Nos produits phares) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center gap-3 mb-12"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#C8A96B]"></span>
            <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-[#C8A96B] font-semibold">Prestige artisanal</span>
            <span className="w-6 h-[1px] bg-[#C8A96B]"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F3B2F] font-medium tracking-wide">
            Nos produits phares
          </h2>
          <p className="text-xs text-[#6B7280] font-sans max-w-md italic mt-1 leading-relaxed">
            Des onguents de beauté et des huiles botaniques rares, coulés à la main sous l'influence bénéfique lunaire.
          </p>
        </motion.div>

        {/* Carousel / Grid of 4 Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.slice(0, 4).map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              onClick={() => setPage('product_details', { product })}
              className="group bg-white rounded-lg overflow-hidden border border-[#E8DFC9]/30 hover:border-[#C8A96B]/50 transition-all duration-500 shadow-sm hover:shadow-lg flex flex-col justify-between h-full cursor-pointer relative"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-[#FAF8F3]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-all duration-700"
                  />
                  {/* Category flag */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-[#E8DFC9]/35 text-[#1F3B2F] text-[9px] tracking-widest uppercase px-2 py-0.5 rounded font-medium">
                    {product.category}
                  </span>
                  
                  {/* Quick Cart button overlays */}
                  <div className="absolute inset-0 bg-[#1F3B2F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setPage('product_details', { product }); }}
                      className="p-3 bg-white hover:bg-[#C8A96B] hover:text-white rounded-full text-[#1F3B2F] shadow-md transition-all cursor-pointer"
                      title="Détails"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product, e); }}
                      className="p-3 bg-[#1F3B2F] hover:bg-[#C8A96B] rounded-full text-white shadow-md transition-all cursor-pointer"
                      title="Ajouter au Panier"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#C8A96B]">
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} className={i < Math.floor(product.rating) ? 'fill-current' : 'opacity-25'} />
                      ))}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">({product.reviewsCount})</span>
                  </div>

                  <h3 className="font-serif text-base font-semibold text-[#1F3B2F] leading-tight group-hover:text-[#C8A96B] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-[#556B2F] italic font-sans leading-none">
                    {product.subTitle}
                  </p>
                  <p className="text-xs text-[#6B7280] font-sans mt-1 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-[#E8DFC9]/20 flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-[#1F3B2F]">
                  {product.price.toFixed(2)} €
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product, e); }}
                  className="text-[10px] tracking-widest uppercase font-bold text-[#1F3B2F] hover:text-[#C8A96B] transition-colors flex items-center gap-1"
                >
                  <ShoppingBag size={13} />
                  <span>Ajouter</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => setPage('boutique')}
            className="border border-[#1F3B2F] text-[#1F3B2F] hover:bg-[#1F3B2F] hover:text-white text-xs tracking-widest uppercase font-semibold px-8 py-3.5 rounded transition-all duration-300 cursor-pointer"
          >
            Voir toute la boutique
          </button>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 bg-[#FAF8F3] border-t border-b border-[#E8DFC9]/30 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Monique Desk visuals Left */}
          <motion.div 
            initial={{ opacity: 0, x: -20, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center z-10 w-full"
          >
            <div className="w-full aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-[580px] bg-[#F3EEE3]/40">
              <img 
                src="/src/assets/images/monique_morgat_1782122440112.jpg" 
                alt="Monique Morgat - Fondatrice de Vertus Ancestrales" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-95 transform hover:scale-101 transition-transform duration-1000 ease-out"
              />
            </div>
          </motion.div>

          {/* Monique Bio Right */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-6 flex flex-col items-start gap-4 z-10 lg:pl-6"
          >
            <div className="flex items-center gap-3">
              {/* Premium custom lotus line art icon */}
              <svg className="w-5 h-5 text-[#C8A96B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 21c-1.8-2.5-4-5-4-8.5c0-2.5 1.8-4.5 4-7c2 2.5 4 4.5 4 7c0 3.5-2.2 6-4 8.5Z" />
                <path d="M12 21c-.8-1.5-1.5-3.5-1.5-5.5c0-1.5.8-2.5 1.5-3.5c.7 1 1.5 2 1.5 3.5c0 2-.7 4-1.5 5.5Z" />
                <path d="M8 14.5c-1.8.3-2.5 1-2.5 2s2.5 2 5 2.5" />
                <path d="M16 14.5c1.8.3 2.5 1 2.5 2s-2.5 2-5 2.5" />
              </svg>
              <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-bold">
                RENCONTREZ MONIQUE
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F3B2F] font-light leading-[1.15] tracking-tight">
              La fondatrice de <br />
              Vertus <span className="text-[#C8A96B] italic font-serif">Ancestrales</span>
            </h2>

            <div className="w-16 h-[1.5px] bg-[#C8A96B] mt-2 mb-4"></div>

            <div className="flex flex-col gap-5 text-[13.5px] sm:text-[14px] text-gray-700 leading-relaxed font-sans max-w-xl">
              <p>
                Médium, herboriste et praticienne holistique, Monique consacre sa vie à accompagner les femmes et les hommes sur le chemin de leur éveil et de leur transformation intérieure.
              </p>
              <p>
                À travers Vertus Ancestrales, elle transmet l’héritage des rituels ancestraux, le pouvoir des plantes sacrées et la sagesse de traditions spirituelles pour révéler la beauté, l’harmonie et l’énergie qui sommeillent en chacun de nous.
              </p>
              <p className="text-gray-800 font-medium">
                Chaque soin, chaque produit et chaque consultation sont le fruit de plus de 30 ans d’expérience, d’intuition et d’amour au service du sacré.
              </p>
            </div>

            <button 
              onClick={() => setPage('monique')}
              className="mt-8 bg-[#1F3B2F] hover:bg-[#152a21] text-white text-[10.5px] tracking-[0.16em] uppercase font-bold px-8 py-4 rounded-[4px] transition-all duration-300 flex items-center gap-2.5 group cursor-pointer shadow-md"
            >
              <svg className="w-4 h-4 text-[#C8A96B] group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21c-1.8-2.5-4-5-4-8.5c0-2.5 1.8-4.5 4-7" />
                <path d="M12 21c1.8-2.5 4-5 4-8.5c0-2.5-1.8-4.5-4-7" />
              </svg>
              <span className="font-sans text-[#E8DFC9]">DÉCOUVRIR SON PARCOURS</span>
            </button>
          </motion.div>

        </div>
      </section>

      {/* Premium Infinite Marquee Announcement Bar */}
      <motion.div 
        initial={{ opacity: 0, scaleY: 0.8 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#1F3B2F] h-[56px] md:h-[96px] overflow-hidden flex items-center select-none border-y-2 border-[#C8A96B] shadow-2xl relative z-20"
      >
        <div 
          className="flex whitespace-nowrap animate-scroll-left hover:[animation-play-state:paused] cursor-pointer"
          style={{ animationDuration: '32s' }}
        >
          {/* Half 1 */}
          <div className="flex items-center shrink-0">
            {Array.from({ length: 4 }).map((_, idx) => (
              <span 
                key={`marquee-1-${idx}`} 
                className="flex items-center font-sans text-[13.5px] md:text-[17px] font-semibold tracking-[0.16em] text-[#F8F5F0]"
              >
                <span className="text-[#C8A96B] mx-10 sm:mx-12 font-bold text-base md:text-[20px]">✦</span>
                <span>LIVRAISON OFFERTE INTERNATIONALE VIA DHL EXCLUSIF</span>
                <span className="text-[#C8A96B] mx-10 sm:mx-12 text-base md:text-[20px]">•</span>
                <span>PAIEMENT SÉCURISÉ STRIPE HAUTE SÉCURITÉ</span>
                <span className="text-[#C8A96B] mx-10 sm:mx-12 text-base md:text-[20px]">•</span>
                <span>CONSULTATIONS EN LIGNE AVEC MONIQUE</span>
              </span>
            ))}
          </div>
          {/* Half 2 (exact clone for seamless transition) */}
          <div className="flex items-center shrink-0">
            {Array.from({ length: 4 }).map((_, idx) => (
              <span 
                key={`marquee-2-${idx}`} 
                className="flex items-center font-sans text-[13.5px] md:text-[17px] font-semibold tracking-[0.16em] text-[#F8F5F0]"
              >
                <span className="text-[#C8A96B] mx-10 sm:mx-12 font-bold text-base md:text-[20px]">✦</span>
                <span>LIVRAISON OFFERTE INTERNATIONALE VIA DHL EXCLUSIF</span>
                <span className="text-[#C8A96B] mx-10 sm:mx-12 text-base md:text-[20px]">•</span>
                <span>PAIEMENT SÉCURISÉ STRIPE HAUTE SÉCURITÉ</span>
                <span className="text-[#C8A96B] mx-10 sm:mx-12 text-base md:text-[20px]">•</span>
                <span>CONSULTATIONS EN LIGNE AVEC MONIQUE</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 6. TESTIMONIAL PREVIEWS (Premium Fleekdash infinite dynamic banner) */}
      <TestimonialsSection />

      {/* Global CTA button at bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#F8F5F0] pb-24 flex justify-center border-b border-[#E8DFC9]/30 relative z-10"
      >
        <button 
          onClick={() => {
            const el = document.getElementById('paroles-sacrees-testimonials');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
          className="group relative bg-[#FAF8F3] hover:bg-[#1F3B2F] border border-[#1F3B2F]/80 hover:border-[#1F3B2F] text-[#1F3B2F] hover:text-white text-[11px] tracking-[0.18em] uppercase font-bold px-9 py-4 rounded-[4px] shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-3.5 cursor-pointer"
        >
          <span>VOIR PLUS DE TÉMOIGNAGES</span>
          <svg className="w-4 h-4 text-[#C8A96B]/90 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 21c-1.8-2.5-4-5-4-8.5c0-2.5 1.8-4.5 4-7c2 2.5 4 4.5 4 7" />
            <path d="M12 21c1.8-2.5 4-5 4-8.5c0-2.5-1.8-4.5-4-7" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};
