/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Instagram, Facebook, Compass, ShieldCheck, Truck, Clock, RefreshCw } from 'lucide-react';
import logoImg from '../assets/brand/logo.jpeg';

interface FooterProps {
  setPage: (page: string) => void;
  onQuickLogin?: (role: 'client' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ setPage, onQuickLogin }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#1F3B2F] text-[#FAF8F3] pt-16 pb-8 border-t border-[#C8A96B]/20">
      {/* Guarantees bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pb-12 border-b border-[#FAF8F3]/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-full bg-[#FAF8F3]/5 text-[#C8A96B]">
              <Compass size={22} className="stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-sm tracking-widest uppercase">100% Ingrédients Rares</h4>
              <p className="text-xs text-[#FAF8F3]/70 font-sans mt-1">Sourcing éthique certifié</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-full bg-[#FAF8F3]/5 text-[#C8A96B]">
              <Truck size={22} className="stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-sm tracking-widest uppercase">Expédition d'Élite dhl</h4>
              <p className="text-xs text-[#FAF8F3]/70 font-sans mt-1">Suivi en direct sous 48-72h</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-full bg-[#FAF8F3]/5 text-[#C8A96B]">
              <ShieldCheck size={22} className="stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-sm tracking-widest uppercase">Paiement avec Stripe</h4>
              <p className="text-xs text-[#FAF8F3]/70 font-sans mt-1">Données bancaires cryptées</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-full bg-[#FAF8F3]/5 text-[#C8A96B]">
              <Clock size={22} className="stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-sm tracking-widest uppercase">Témoignages Vérifiés</h4>
              <p className="text-xs text-[#FAF8F3]/70 font-sans mt-1">Avis de clients authentiques</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Brand identity column */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#C8A96B] overflow-hidden flex items-center justify-center bg-[#FAF8F3]/10 shrink-0">
              <img src={logoImg} alt="Vertus Ancestrales Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-medium tracking-widest uppercase">
                VERTUS ANCESTRALES
              </span>
              <span className="text-[9px] font-sans tracking-[0.2em] text-[#C8A96B] uppercase leading-none">
                L’ÉVEIL PAR LES PLANTES
              </span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-[#FAF8F3]/70 font-sans max-w-sm">
            Une alchimie de cosmétiques biologiques artisanaux et de sagesse médiumnique guidée par l'intuition et la sagesse traditionnelle de Monique Morgat pour rééquilibrer vos sens.
          </p>
          <div className="flex items-center gap-4 text-[#FAF8F3]/80 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#C8A96B] transition-colors p-1.5 rounded-full bg-[#FAF8F3]/5">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#C8A96B] transition-colors p-1.5 rounded-full bg-[#FAF8F3]/5">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Links Navigation 1 */}
        <div className="md:col-span-1 lg:col-span-2 lg:col-start-5 flex flex-col gap-4">
          <h4 className="font-serif text-xs uppercase tracking-[0.15em] text-[#C8A96B] font-semibold">Boutique & Soins</h4>
          <ul className="flex flex-col gap-3.5 text-xs text-[#FAF8F3]/75 font-sans">
            <li><button onClick={() => setPage('boutique')} className="hover:text-[#C8A96B] transition-colors cursor-pointer text-left">Gamme Visage</button></li>
            <li><button onClick={() => setPage('boutique')} className="hover:text-[#C8A96B] transition-colors cursor-pointer text-left">Gamme Corps</button></li>
            <li><button onClick={() => setPage('boutique')} className="hover:text-[#C8A96B] transition-colors cursor-pointer text-left">Kits de rituels</button></li>
            <li><button onClick={() => setPage('consultations')} className="hover:text-[#C8A96B] transition-colors cursor-pointer text-left">Consultations</button></li>
          </ul>
        </div>

        {/* Links Navigation 2 */}
        <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-4">
          <h4 className="font-serif text-xs uppercase tracking-[0.15em] text-[#C8A96B] font-semibold">La Maison</h4>
          <ul className="flex flex-col gap-3.5 text-xs text-[#FAF8F3]/75 font-sans">
            <li><button onClick={() => setPage('history')} className="hover:text-[#C8A96B] transition-colors cursor-pointer text-left">Notre Histoire</button></li>
            <li><button onClick={() => setPage('monique')} className="hover:text-[#C8A96B] transition-colors cursor-pointer text-left">Rencontrez Monique</button></li>
            <li><button onClick={() => setPage('blog')} className="hover:text-[#C8A96B] transition-colors cursor-pointer text-left">Le Blog Alchimique</button></li>
            <li><button onClick={() => {
  const el = document.getElementById('paroles-sacrees-testimonials');
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  } else {
    setPage('home');
    setTimeout(() => {
      const el = document.getElementById('paroles-sacrees-testimonials');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 400);
  }
}} className="hover:text-[#C8A96B] transition-colors cursor-pointer text-left">Témoignages</button></li>
            <li className="pt-1.5 border-t border-[#FAF8F3]/10"><button onClick={() => onQuickLogin ? onQuickLogin('client') : setPage('dashboard_client')} className="hover:text-[#C8A96B] transition-colors cursor-pointer text-left font-semibold text-[#C8A96B]">Espace Client</button></li>
            <li><button onClick={() => onQuickLogin ? onQuickLogin('admin') : setPage('dashboard_admin')} className="hover:text-[#C8A96B] transition-colors cursor-pointer text-left font-semibold text-[#E8DFC9]">Espace Administrateur</button></li>
          </ul>
        </div>

        {/* Newsletter column */}
        <div className="md:col-span-2 lg:col-span-4 flex flex-col gap-4">
          <h4 className="font-serif text-xs uppercase tracking-[0.15em] text-[#C8A96B] font-semibold">Lettre Alchimique</h4>
          <p className="text-xs text-[#FAF8F3]/75 font-sans leading-relaxed">
            Inscrivez-vous pour recevoir les bulletins de nouvelle lune, nos guidances d'oracle et offres privées de cosmétiques.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-2">
            <div className="flex border border-[#FAF8F3]/20 focus-within:border-[#C8A96B] rounded bg-[#FAF8F3]/5 transition-all overflow-hidden p-0.5">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="bg-transparent text-xs text-white px-3 py-3 w-full focus:outline-none placeholder-[#FAF8F3]/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-[#C8A96B] hover:bg-[#FAF8F3] hover:text-[#1F3B2F] text-[#1F3B2F] font-sans font-medium text-xs uppercase px-5 py-3 transition-colors shrink-0"
              >
                Inscrire
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-[#C8A96B] mt-1 font-sans animate-fade-in font-medium">
                Sainte bienvenue. Vous ferez partie des bénédictions de notre newsletter !
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Copyrights and legals */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 mt-4 border-t border-[#FAF8F3]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF8F3]/50 font-sans">
        <p>© 2026 Vertus Ancestrales. Propulsé par la force curative des plantes indigènes.</p>
        <div className="flex gap-6">
          <a href="#legal" className="hover:text-[#C8A96B] transition-all">Mentions Légales</a>
          <a href="#cookies" className="hover:text-[#C8A96B] transition-all">Politique de Confidentialité</a>
          <a href="#cgv" className="hover:text-[#C8A96B] transition-all">CGV</a>
        </div>
      </div>
    </footer>
  );
};
