/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Globe, Sun, ShieldCheck, HelpCircle } from 'lucide-react';
import heroNotreHistoire from '../assets/brand/hero_notre_histoire.png';

interface NotreHistoireProps {
  setPage?: (page: string) => void;
}

export const NotreHistoire: React.FC<NotreHistoireProps> = ({ setPage }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#FAF8F3] min-h-screen text-[#3B2F2F] font-sans w-full"
    >
      {/* ========================================================
          1. HERO SECTION - L'héritage ancestral
          ======================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-start pt-32 pb-24 px-6 sm:px-12 lg:px-24 overflow-hidden">
        {/* Background Image with Dark Atmospheric Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroNotreHistoire} 
            alt="Herbes, huiles et fioles d'apothicaire" 
            className="w-full h-full object-cover object-right lg:object-center" 
          />
          <div className="absolute inset-0 bg-[#1F3B2F]/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F3B2F]/90 via-[#1F3B2F]/60 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-[1240px] mx-auto w-full flex flex-col items-start text-left text-white">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-start gap-1 mb-6"
          >
            <span className="text-[11px] sm:text-[12px] tracking-[0.3em] font-sans text-[#C8A96B] uppercase font-bold">
              NOTRE HISTOIRE
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-[1px] bg-[#C8A96B]"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-[#C8A96B]"></div>
              <div className="w-8 h-[1px] bg-[#C8A96B]"></div>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-[1.12] text-white tracking-wide max-w-3xl"
          >
            L'héritage ancestral<br />
            au service du soin moderne
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[#C8A96B] mb-8"
          >
            {/* Elegant 4-point star SVG */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c.5 6 5.5 11 11.5 11.5-.5.5-5.5.5-11.5 11.5-.5-.5-.5-5.5-11.5-11.5.5-.5 5.5-.5 11.5-11.5z" />
            </svg>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-sm sm:text-base md:text-lg font-light tracking-wider mb-10 text-white/90 leading-relaxed max-w-xl"
          >
            Chaque plante porte une mémoire.<br />
            Chaque rituel porte une intention.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            onClick={() => setPage && setPage('boutique')}
            className="bg-[#C8A96B] hover:bg-white text-[#1F3B2F] text-[11px] font-sans font-bold uppercase tracking-[0.25em] px-10 py-4 transition-all duration-300 cursor-pointer"
          >
            DÉCOUVRIR NOS RITUELS
          </motion.button>
        </div>
      </section>

      {/* ========================================================
          2. ORIGINS SECTION - Aux origines de Vertus Ancestrales
          ======================================================== */}
      <section className="bg-[#FAF8F3] py-24 sm:py-32 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Narrative content (left side) */}
          <div className="flex-1 text-left max-w-xl">
             <span className="text-[10px] tracking-[0.22em] font-sans text-[#C8A96B] uppercase font-extrabold block mb-4">
                AUX ORIGINES DE
             </span>
             <h2 className="font-serif text-4xl sm:text-5xl text-[#1F3B2F] font-light mb-8 leading-tight tracking-wide">
                Vertus Ancestrales
             </h2>
             <div className="space-y-6 font-sans text-[14.5px] text-gray-600 font-light leading-relaxed mb-10">
               <p>
                  Vertus Ancestrales est née d'un besoin profond : réconcilier la sagesse botanique ancestrale avec les besoins modernes du corps, de l'esprit et de l'énergie.
               </p>
               <p>
                  Inspirée par les traditions herboristes, l'aromathérapie et la spiritualité ancestrale, la marque a été créée pour offrir des soins naturels, vibrants et respectueux de la vie.
               </p>
             </div>
             
             {/* Decorative leaf + callout quote */}
             <div className="flex items-center gap-6 mt-8 border-t border-[#E8DFC9]/30 pt-8">
                <div className="text-[#C8A96B] shrink-0">
                   {/* Leaf outline SVG matching hand-drawn look */}
                   <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
                     <path d="M19 2c-2.26 4.33-5.27 7.14-8 10" />
                   </svg>
                </div>
                <div className="text-left">
                   <p className="text-[11px] font-sans text-[#C8A96B] font-bold tracking-[0.18em] uppercase leading-relaxed">
                     SAVOIR D'OÙ NOUS VENONS POUR SOIGNER NOTRE FUTUR.
                   </p>
                </div>
             </div>
          </div>
          
          {/* Image card (right side) */}
          <div className="flex-1 w-full">
            <div className="rounded-[32px] overflow-hidden aspect-[4/3] w-full shadow-xl shadow-[#1F3B2F]/5 border border-[#E8DFC9]/40 bg-[#F3EEE3]">
              <img 
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1200&auto=format&fit=crop" 
                alt="Flacon d'huile et herbes" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
        </div>
      </section>

      {/* ========================================================
          3. TIMELINE SECTION - Notre Parcours
          ======================================================== */}
      <section className="bg-[#FAF8F3] py-24 px-6 sm:px-12 lg:px-24 border-t border-[#E8DFC9]/30">
        <div className="max-w-[1240px] mx-auto text-center">
          
          <div className="flex flex-col items-center gap-1 mb-20">
            <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase font-extrabold">
              NOTRE PARCOURS
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-[1px] bg-[#C8A96B]"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-[#C8A96B]"></div>
              <div className="w-8 h-[1px] bg-[#C8A96B]"></div>
            </div>
          </div>
          
          <div className="relative">
            {/* Connecting Horizontal Line (desktop only) */}
            <div className="absolute top-[42px] left-[10%] right-[10%] h-[1px] bg-[#C8A96B]/35 hidden md:block z-0"></div>
            {/* End point diamonds (desktop only) */}
            <div className="absolute top-[39px] left-[9.5%] w-2.5 h-2.5 rotate-45 bg-[#C8A96B]/50 hidden md:block z-0"></div>
            <div className="absolute top-[39px] right-[9.5%] w-2.5 h-2.5 rotate-45 bg-[#C8A96B]/50 hidden md:block z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 relative z-10">
              
              {/* timeline 2008 */}
              <div className="flex flex-col items-center text-center">
                 <div className="w-[84px] h-[84px] rounded-full bg-[#1F3B2F] flex items-center justify-center text-[#C8A96B] mb-6 shadow-md border border-[#C8A96B]/20 outline outline-[6px] outline-[#FAF8F3]">
                   <Leaf className="w-5 h-5 stroke-[1.2]" />
                 </div>
                 <h3 className="font-serif text-[26px] text-[#1F3B2F] font-light mb-3">2008</h3>
                 <p className="font-sans text-[13px] text-gray-500 font-light leading-relaxed max-w-[210px]">
                   Premières recherches botaniques et herboristes à travers le monde.
                 </p>
              </div>
              
              {/* timeline 2015 */}
              <div className="flex flex-col items-center text-center">
                 <div className="w-[84px] h-[84px] rounded-full bg-[#1F3B2F] flex items-center justify-center text-[#C8A96B] mb-6 shadow-md border border-[#C8A96B]/20 outline outline-[6px] outline-[#FAF8F3]">
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M4 9h16v1c0 3.3-2.7 6-6 6h-4c-3.3 0-6-2.7-6-6V9z" />
                     <path d="M16 4l-4 5" />
                     <path d="M12 9v2" />
                     <path d="M8 19h8" />
                   </svg>
                 </div>
                 <h3 className="font-serif text-[26px] text-[#1F3B2F] font-light mb-3">2015</h3>
                 <p className="font-sans text-[13px] text-gray-500 font-light leading-relaxed max-w-[210px]">
                   Développement de nos premières formulations artisanales.
                 </p>
              </div>

              {/* timeline 2021 */}
              <div className="flex flex-col items-center text-center">
                 <div className="w-[84px] h-[84px] rounded-full bg-[#1F3B2F] flex items-center justify-center text-[#C8A96B] mb-6 shadow-md border border-[#C8A96B]/20 outline outline-[6px] outline-[#FAF8F3]">
                   <span className="font-serif text-[20px] tracking-wide font-light">VA</span>
                 </div>
                 <h3 className="font-serif text-[26px] text-[#1F3B2F] font-light mb-3">2021</h3>
                 <p className="font-sans text-[13px] text-gray-500 font-light leading-relaxed max-w-[210px]">
                   Naissance de Vertus Ancestrales, une vision devient réalité.
                 </p>
              </div>

              {/* timeline 2026 */}
              <div className="flex flex-col items-center text-center">
                 <div className="w-[84px] h-[84px] rounded-full bg-[#1F3B2F] flex items-center justify-center text-[#C8A96B] mb-6 shadow-md border border-[#C8A96B]/20 outline outline-[6px] outline-[#FAF8F3]">
                   <Globe className="w-5 h-5 stroke-[1.2]" />
                 </div>
                 <h3 className="font-serif text-[26px] text-[#1F3B2F] font-light mb-3">2026</h3>
                 <p className="font-sans text-[13px] text-gray-500 font-light leading-relaxed max-w-[210px]">
                   Expansion internationale et partage de notre sagesse ancestrale.
                 </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. PHILOSOPHY SECTION - Notre Philosophie
          ======================================================== */}
      <section className="bg-[#1F3B2F] py-28 px-6 sm:px-12 lg:px-24 text-center text-white relative overflow-hidden border-t border-[#C8A96B]/30">
        <div className="max-w-[1240px] mx-auto relative z-10">
          
          <div className="flex flex-col items-center gap-1 mb-8">
            <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase font-bold">
              NOTRE PHILOSOPHIE
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-[1px] bg-[#C8A96B]/40"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-[#C8A96B]"></div>
              <div className="w-8 h-[1px] bg-[#C8A96B]/40"></div>
            </div>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-light mb-20 text-[#FAF8F3] max-w-4xl mx-auto leading-snug tracking-wide">
            Une cosmétique guidée par l'intuition et le respect du vivant
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 text-center divide-y md:divide-y-0 md:divide-x divide-[#FAF8F3]/10">
             
             {/* Pillar 1 */}
             <div className="flex flex-col items-center md:px-10 py-6 md:py-4">
                <div className="text-[#C8A96B] mb-6">
                   <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
                     <path d="M19 2c-2.26 4.33-5.27 7.14-8 10" />
                   </svg>
                </div>
                <h3 className="font-serif text-[22px] font-normal mb-4 text-[#FAF8F3] tracking-wide">Pureté Botanique</h3>
                <p className="font-sans text-[13.5px] font-light leading-relaxed text-white/70 max-w-[280px]">
                  Des ingrédients naturels, bruts et puissants, sélectionnés avec exigence pour leur qualité et leur vibration.
                </p>
             </div>
             
             {/* Pillar 2 */}
             <div className="flex flex-col items-center md:px-10 py-6 md:py-4">
                <div className="text-[#C8A96B] mb-6">
                   {/* Concentric circles - Energy geometric outline */}
                   <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                     <circle cx="12" cy="12" r="10"/>
                     <circle cx="12" cy="12" r="6"/>
                     <circle cx="12" cy="12" r="2.5"/>
                     <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/>
                   </svg>
                </div>
                <h3 className="font-serif text-[22px] font-normal mb-4 text-[#FAF8F3] tracking-wide">Intelligence Énergétique</h3>
                <p className="font-sans text-[13.5px] font-light leading-relaxed text-white/70 max-w-[280px]">
                  Chaque soin est formulé comme un rituel énergétique pour agir en profondeur sur le corps, l'esprit et l'âme.
                </p>
             </div>

             {/* Pillar 3 */}
             <div className="flex flex-col items-center md:px-10 py-6 md:py-4">
                <div className="text-[#C8A96B] mb-6">
                   {/* Sunburst Outline */}
                   <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                     <circle cx="12" cy="12" r="4.5" />
                     <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" strokeLinecap="round" />
                   </svg>
                </div>
                <h3 className="font-serif text-[22px] font-normal mb-4 text-[#FAF8F3] tracking-wide">Transformation Holistique</h3>
                <p className="font-sans text-[13.5px] font-light leading-relaxed text-white/70 max-w-[280px]">
                  Nous croyons en une beauté globale : équilibre intérieur, harmonie du corps et connecter à soi pour révéler son éclat naturel.
                </p>
             </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. FOUNDER SECTION - Notre Fondatrice
          ======================================================== */}
      <section className="bg-[#FAF8F3] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Founder Image (Left side) */}
          <div className="aspect-[4/3] lg:aspect-auto lg:h-[720px] relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" 
              alt="Monique Morgat" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Founder Content with Watermark (Right side) */}
          <div className="py-24 px-8 sm:px-16 lg:px-24 flex flex-col justify-center relative bg-[#FAF8F3] border-l border-[#E8DFC9]/20">
             {/* Faint leaf watermark decoration on right */}
             <div className="absolute right-[-10%] bottom-[-5%] opacity-[0.03] pointer-events-none w-[70%] h-[90%] flex justify-end items-end select-none text-[#1F3B2F]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.4" className="w-full h-full">
                  <path d="M12 21c-1.8-2.5-4-5-4-8.5c0-2.5 1.8-4.5 4-7c2 2.5 4 4.5 4 7c0 3.5-2.2 6-4 8.5Z" />
                </svg>
             </div>
             
             <div className="relative z-10 max-w-[500px] text-left">
               <span className="text-[10px] tracking-[0.22em] font-sans text-[#C8A96B] uppercase font-extrabold block mb-4">
                 NOTRE FONDATRICE
               </span>
               <h2 className="font-serif text-4xl lg:text-[44px] text-[#1F3B2F] font-light mb-6 leading-tight tracking-wide">
                 La femme derrière<br />Vertus Ancestrales
               </h2>
               
               <div className="text-[#C8A96B] mb-6">
                  {/* Small gold 4-point star SVG */}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c.5 6 5.5 11 11.5 11.5-.5.5-5.5.5-11.5 11.5-.5-.5-.5-5.5-11.5-11.5.5-.5 5.5-.5 11.5-11.5z" />
                  </svg>
               </div>
               
               <div className="space-y-6 font-sans text-[14.5px] text-gray-600 font-light leading-relaxed mb-10">
                 <p>
                   Monique Morgat, herboriste et praticienne intuitive, accompagne depuis plus de 20 ans celles et ceux qui cherchent à se reconnecter à leur essence profonde.
                 </p>
                 <p>
                   Sa mission : transmettre la sagesse ancestrale, réveiller l'intuition et offrir des outils naturels pour cultiver l'harmonie au quotidien.
                 </p>
               </div>
               
               {/* Elegant signature & button */}
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-6 border-t border-[#E8DFC9]/30">
                  <div className="select-none flex items-center">
                     <span className="font-signature text-6xl text-[#C8A96B] font-light tracking-wide leading-none">
                       Monique Morgat
                     </span>
                  </div>
                  <button 
                     onClick={() => setPage && setPage('monique')}
                     className="bg-[#1F3B2F] hover:bg-[#C8A96B] text-white text-[11px] font-sans font-bold uppercase tracking-[0.22em] px-8 py-4 transition-all duration-300 self-start sm:self-auto cursor-pointer"
                  >
                     RENCONTRER MONIQUE
                  </button>
               </div>
             </div>
          </div>
          
        </div>
      </section>

      {/* ========================================================
          6. PROCESS SECTION - L'art de créer des rituels de soin
          ======================================================== */}
      <section className="bg-[#FAF8F3] py-28 px-6 sm:px-12 lg:px-24 text-center border-t border-b border-[#E8DFC9]/30">
        <div className="max-w-[1240px] mx-auto">
          
          <div className="flex flex-col items-center gap-1 mb-24">
            <span className="text-[10px] tracking-[0.25em] font-sans text-[#1F3B2F] uppercase font-extrabold">
              L'ART DE CRÉER DES RITUELS DE SOIN
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-[1px] bg-[#C8A96B]"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-[#C8A96B]"></div>
              <div className="w-8 h-[1px] bg-[#C8A96B]"></div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 relative">
             {/* Connecting line arrows (desktop only) */}
             <div className="hidden md:flex absolute top-12 left-[12%] right-[12%] justify-between items-center text-[#C8A96B]/55 z-0 px-8 pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
             </div>
             
             {/* Step 1 */}
             <div className="flex flex-col items-center flex-1 relative z-10 bg-[#FAF8F3] px-2 w-full">
                <div className="w-[96px] h-[96px] rounded-full border border-[#C8A96B]/50 flex items-center justify-center text-[#1F3B2F] mb-6 bg-[#FAF8F3] shadow-sm">
                  <Leaf className="w-6 h-6 stroke-[1.1] text-[#1F3B2F]" />
                </div>
                <h3 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#1F3B2F] mb-3 uppercase">1. SÉLECTION BOTANIQUE</h3>
                <p className="font-sans text-[13px] text-gray-500 font-light leading-relaxed max-w-[240px]">
                  Nous sélectionnons les plantes les plus pures pour leurs vertus exceptionnelles.
                </p>
             </div>

             {/* Arrow for mobile */}
             <div className="md:hidden flex justify-center w-full text-[#C8A96B]/50 my-2">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="rotate-90"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
             </div>
             
             {/* Step 2 */}
             <div className="flex flex-col items-center flex-1 relative z-10 bg-[#FAF8F3] px-2 w-full">
                <div className="w-[96px] h-[96px] rounded-full border border-[#C8A96B]/50 flex items-center justify-center text-[#1F3B2F] mb-6 bg-[#FAF8F3] shadow-sm">
                   <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="text-[#1F3B2F]">
                     <path d="M4 9h16v1c0 3.3-2.7 6-6 6h-4c-3.3 0-6-2.7-6-6V9z" />
                     <path d="M16 4l-4 5" />
                     <path d="M12 9v2" />
                     <path d="M8 19h8" />
                   </svg>
                </div>
                <h3 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#1F3B2F] mb-3 uppercase">2. FORMULATION ARTISANALE</h3>
                <p className="font-sans text-[13px] text-gray-500 font-light leading-relaxed max-w-[240px]">
                  Chaque formule est créée avec soin, selon des méthodes traditionnelles et des actifs de haute qualité.
                </p>
             </div>

             {/* Arrow for mobile */}
             <div className="md:hidden flex justify-center w-full text-[#C8A96B]/50 my-2">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="rotate-90"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
             </div>

             {/* Step 3 */}
             <div className="flex flex-col items-center flex-1 relative z-10 bg-[#FAF8F3] px-2 w-full">
                <div className="w-[96px] h-[96px] rounded-full border border-[#C8A96B]/50 flex items-center justify-center text-[#1F3B2F] mb-6 bg-[#FAF8F3] shadow-sm">
                  <Sun className="w-6 h-6 stroke-[1.1] text-[#1F3B2F]" />
                </div>
                <h3 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#1F3B2F] mb-3 uppercase">3. CHARGE VIBRATOIRE</h3>
                <p className="font-sans text-[13px] text-gray-500 font-light leading-relaxed max-w-[240px]">
                  Nos soins sont infusés d'intentions positives et d'énergies bienveillantes pour amplifier leurs bienfaits.
                </p>
             </div>

             {/* Arrow for mobile */}
             <div className="md:hidden flex justify-center w-full text-[#C8A96B]/50 my-2">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="rotate-90"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
             </div>

             {/* Step 4 */}
             <div className="flex flex-col items-center flex-1 relative z-10 bg-[#FAF8F3] px-2 w-full">
                <div className="w-[96px] h-[96px] rounded-full border border-[#C8A96B]/50 flex items-center justify-center text-[#1F3B2F] mb-6 bg-[#FAF8F3] shadow-sm">
                  {/* Apothecary bottle icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" className="text-[#1F3B2F]">
                     <rect x="7" y="9" width="10" height="12" rx="2" />
                     <path d="M9 9V5h6v4" />
                     <path d="M10 5h4" />
                     <circle cx="12" cy="14" r="1.5" />
                  </svg>
                </div>
                <h3 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#1F3B2F] mb-3 uppercase">4. RITUEL FINAL</h3>
                <p className="font-sans text-[13px] text-gray-500 font-light leading-relaxed max-w-[240px]">
                  Chaque soin est un rituel complet, alliant efficacité, plaisir et connexion à soi.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. BOTTOM BANNER - Vertus Ancestrales n'est pas une marque
          ======================================================== */}
      <section className="bg-[#FAF8F3]">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          
          {/* Left Column: Image of premium cosmetic jar */}
          <div className="relative aspect-[4/3] md:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1200&auto=format&fit=crop" 
              alt="Premium cosmetic jar Vertus Ancestrales" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1F3B2F]/5"></div>
          </div>
          
          {/* Right Column: Text & Flower of Life watermark */}
          <div className="py-24 px-8 sm:px-16 lg:px-24 flex flex-col justify-center items-center text-center relative overflow-hidden bg-[#FAF8F3] border-l border-[#E8DFC9]/20">
             {/* Sacred geometry "Flower of Life" watermark */}
             <div className="absolute right-[-10%] bottom-[-10%] w-[380px] h-[380px] opacity-[0.035] pointer-events-none select-none text-[#1F3B2F]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.4" className="w-full h-full">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  <path d="M2 12a15.3 15.3 0 0 1 10-4 15.3 15.3 0 0 1 10 4 15.3 15.3 0 0 1-10 4 15.3 15.3 0 0 1-10-4z"/>
                </svg>
             </div>
             
             <div className="relative z-10 max-w-[450px]">
                <h2 className="font-serif text-3xl sm:text-[36px] text-[#1F3B2F] font-light mb-8 leading-snug tracking-wide">
                  Vertus Ancestrales n'est pas une marque.<br className="hidden sm:block" />
                  C'est un retour à l'essentiel.
                </h2>
                
                <div className="text-[#C8A96B] mb-8 flex justify-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c.5 6 5.5 11 11.5 11.5-.5.5-5.5.5-11.5 11.5-.5-.5-.5-5.5-11.5-11.5.5-.5 5.5-.5 11.5-11.5z" />
                  </svg>
                </div>
                
                <button 
                  onClick={() => setPage && setPage('boutique')}
                  className="bg-[#1F3B2F] hover:bg-[#C8A96B] text-white text-[11px] font-sans font-bold uppercase tracking-[0.25em] px-10 py-4 transition-all duration-300 cursor-pointer"
                >
                  EXPLORER LA BOUTIQUE
                </button>
             </div>
          </div>
          
        </div>
      </section>

      {/* ========================================================
          8. INDICATORS STRIP (FOOTER ACCENTS)
          ======================================================== */}
      <section className="bg-[#FAF8F3] py-16 px-6 sm:px-12 border-t border-[#E8DFC9]/30">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           
           {/* Item 1 */}
           <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#1F3B2F]/5 flex items-center justify-center text-[#1F3B2F] shrink-0">
                <Leaf className="w-5 h-5 stroke-[1.2]" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-[11px] uppercase tracking-[0.12em] text-[#1F3B2F]">INGRÉDIENTS NATURELS</h4>
                <p className="text-xs text-gray-500 font-light mt-0.5">Sourcés avec respect</p>
              </div>
           </div>

           {/* Item 2 */}
           <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#1F3B2F]/5 flex items-center justify-center text-[#1F3B2F] shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1F3B2F]">
                  <path d="M4 9h16v1c0 3.3-2.7 6-6 6h-4c-3.3 0-6-2.7-6-6V9z" />
                  <path d="M16 4l-4 5" />
                  <path d="M8 19h8" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-bold text-[11px] uppercase tracking-[0.12em] text-[#1F3B2F]">FABRICATION ARTISANALE</h4>
                <p className="text-xs text-gray-500 font-light mt-0.5">Petits lots, faits avec amour</p>
              </div>
           </div>

           {/* Item 3 */}
           <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#1F3B2F]/5 flex items-center justify-center text-[#1F3B2F] shrink-0">
                <Globe className="w-5 h-5 stroke-[1.2]" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-[11px] uppercase tracking-[0.12em] text-[#1F3B2F]">LIVRAISON INTERNATIONALE</h4>
                <p className="text-xs text-gray-500 font-light mt-0.5">Via DHL & suivi en temps réel</p>
              </div>
           </div>

           {/* Item 4 */}
           <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#1F3B2F]/5 flex items-center justify-center text-[#1F3B2F] shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[1.2]" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-[11px] uppercase tracking-[0.12em] text-[#1F3B2F]">PAIEMENT SÉCURISÉ</h4>
                <p className="text-xs text-gray-500 font-light mt-0.5">100% sécurisé avec Stripe</p>
              </div>
           </div>

        </div>
      </section>

    </motion.div>
  );
};
