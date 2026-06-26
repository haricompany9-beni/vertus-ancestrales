/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  MessageSquarePlus, 
  CheckCircle2, 
  Quote, 
  Sparkles, 
  Users, 
  Award, 
  Globe, 
  ArrowRight, 
  Heart,
  ChevronDown
} from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsPageProps {
  testimonials: Testimonial[];
  onAddTestimonial: (testimonial: Testimonial) => void;
  setPage?: (page: string) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({
  testimonials,
  onAddTestimonial,
  setPage,
}) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [city, setCity] = useState('');
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !reviewText) return;

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      name: userName,
      rating: rating,
      review: reviewText,
      date: "Aujourd'hui",
      verified: true,
      avatar: undefined // Custom submitted review
    };

    onAddTestimonial(newTestimonial);
    setSuccess(true);
    setUserName('');
    setReviewText('');
    setCity('');
    setRating(5);
    setTimeout(() => {
      setSuccess(false);
      setShowForm(false);
    }, 4000);
  };

  // Pre-configured Luxury Consultations Testimonials
  const CONSULTATION_TESTIMONIALS = [
    {
      name: "Claire M.",
      city: "Paris",
      type: "Consultation Holistique",
      review: "Avant ma séance avec Monique, je traversais une période de confusion intense. Sa guidance m’a permis de retrouver clarté, apaisement et direction.",
      details: "Monique lit en nous comme dans un livre ouvert, avec un amour et un respect infini. Les blocages énergétiques se sont dissous dès le premier soir."
    },
    {
      name: "Sophie R.",
      city: "Lyon",
      type: "Consultation Médiumnique",
      review: "Cette consultation a été une révélation. Monique a mis des mots sur des blocages profonds que je portais depuis des années.",
      details: "Elle capte l'invisible avec une justesse bouleversante. Je me sens libérée d'un poids ancestral invisible mais pourtant si lourd."
    },
    {
      name: "Emma D.",
      city: "Bruxelles",
      type: "Nettoyage Énergétique",
      review: "J’ai ressenti un vrai allègement intérieur après la séance. Une sensation de paix difficile à décrire.",
      details: "L'énergie circule à nouveau librement. Mon sommeil est redevenu profond et réparateur, baigné d'une sérénité retrouvée."
    },
    {
      name: "Marc A.",
      city: "Genève",
      type: "Bilan Énergétique",
      review: "La justesse des mots de Monique m'a profondément ému. Un accompagnement d'un niveau rare pour dépasser mes blocages.",
      details: "Plus qu'une séance, c'est une véritable feuille de route vibratoire qui continue d'éclairer mes choix quotidiens."
    }
  ];

  // Pre-configured Luxury Product Testimonials
  const PRODUCT_TESTIMONIALS = [
    {
      product: "Sérum Lumière",
      quote: "Ma peau est plus lumineuse, mais surtout chaque application est devenue un rituel sacré de pure gratitude.",
      author: "Hélène J.",
      city: "Nice",
      rating: 5,
      desc: "Une synergie d'actifs botaniques rares qui éveille l'éclat originel de l'épiderme tout en apaisant le système nerveux."
    },
    {
      product: "Huile Sacrée",
      quote: "L’Huile Sacrée procure un apaisement incroyable. C’est bien plus qu’un soin, c’est une onction divine réconfortante.",
      author: "Isabelle P.",
      city: "Bordeaux",
      rating: 5,
      desc: "Formulée à partir d'oliban sacré et d'huiles dynamisées, elle enveloppe le corps et l'esprit d'un voile protecteur céleste."
    },
    {
      product: "Élixir de Vénus",
      quote: "Une texture divine et un parfum envoûtant. Ma peau revit et mon esprit s'ancre à chaque rituel précieux du soir.",
      author: "Chloé L.",
      city: "Paris",
      rating: 5,
      desc: "Une infusion nocturne majestueuse de roses de Damas et de résines précieuses pour une régénération cellulaire suprême."
    }
  ];

  // For Wall of Love ticker columns (rows)
  const WALL_OF_LOVE_ROW_1 = [
    { name: "Laetitia B.", city: "Toulouse", review: "Une expérience bouleversante d'authenticité." },
    { name: "Amandine T.", city: "Marseille", review: "Une vraie reconnexion à moi-même et à la terre." },
    { name: "Nathalie G.", city: "Strasbourg", review: "Je recommande profondément les rituels de Monique." },
    { name: "Marie-Eve D.", city: "Nantes", review: "Une alchimie magique, ma peau rayonne de vie !" },
    { name: "Camille P.", city: "Lille", review: "Monique est un guide bienveillant hors du commun." },
    { name: "Valérie K.", city: "Montpellier", review: "L'éclat retrouvé de l'intérieur comme de l'extérieur." }
  ];

  const WALL_OF_LOVE_ROW_2 = [
    { name: "Florence M.", city: "Brest", review: "L'huile d'oliban est devenue mon indispensable absolu." },
    { name: "Sarah V.", city: "Liège", review: "L'impression d'être enveloppée dans un cocon céleste." },
    { name: "Caroline H.", city: "Renens", review: "La justesse des canalisations m'accompagne chaque jour." },
    { name: "Eléonore R.", city: "Biarritz", review: "Un voyage sensoriel et vibratoire exceptionnel." },
    { name: "Audrey S.", city: "Tours", review: "Une clarté d'esprit immédiate après la consultation." },
    { name: "Isabelle B.", city: "Avignon", review: "Merci pour cette transmission sacrée inestimable." }
  ];

  return (
    <div className="bg-[#F7F3EE] min-h-screen text-[#3B2F2F] pb-16 sm:pb-24">
      
      {/* Dynamic Marquee CSS Styles inserted directly for smooth hardware performance */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 35s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 35s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ---------------------------------------------------
          SECTION 1 — HERO PREMIUM
          --------------------------------------------------- */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 text-center bg-[#F7F3EE] overflow-hidden flex flex-col items-center">
        {/* Subtle organic elegant background aura glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A96B]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1000px] mx-auto px-6 relative z-10 flex flex-col items-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#163126]/5 border border-[#C8A96B]/20 text-[#C8A96B] text-[11px] font-medium tracking-[0.2em] uppercase mb-6"
          >
            <Sparkles size={11} className="text-[#C8A96B] animate-pulse" />
            <span>Témoignages sacrés</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#163126] font-light tracking-wide leading-[1.15]"
          >
            L’éveil que partagent <br />
            <span className="italic font-normal text-[#C8A96B]">nos initiés</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-lg text-[#556B2F] font-sans max-w-2xl mt-8 leading-relaxed font-light"
          >
            Chaque témoignage raconte une transformation, une reconnexion à soi et un chemin vers l’équilibre intérieur.
          </motion.p>

          {/* Secondary small text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xs sm:text-sm text-gray-400 font-sans italic max-w-md mt-4 font-light"
          >
            Des centaines de clients ont déjà fait confiance à Monique pour leurs soins, consultations et rituels.
          </motion.p>

          {/* Decorative Divider Line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
            className="h-[1px] bg-[#C8A96B]/30 mt-12"
          />
        </div>
      </section>


      {/* ---------------------------------------------------
          SECTION 2 — TÉMOIGNAGES CONSULTATIONS
          --------------------------------------------------- */}
      <section className="py-20 bg-[#F7F3EE] max-w-[1240px] mx-auto px-6 border-t border-[#C8A96B]/10">
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl sm:text-3.5xl text-[#163126] font-light tracking-wide leading-tight">
              Transformations après consultation
            </h2>
            <p className="text-[#556B2F] text-xs sm:text-sm font-sans mt-3 font-light">
              Des expériences vécues après les consultations holistiques et médiumniques.
            </p>
          </div>
          {/* Action button to expand form */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="border border-[#C8A96B] hover:bg-[#163126] hover:text-white text-[#163126] font-sans text-xs tracking-[0.15em] font-semibold uppercase py-3.5 px-6 rounded transition-all duration-500 hover:scale-[1.01] shrink-0 self-center md:self-end"
          >
            {showForm ? "Fermer le formulaire" : "Inscrire votre bénédiction"}
          </button>
        </div>

        {/* Dynamic Interactive Testimonial Form Wrapper */}
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 bg-[#FCFAF7] p-6 sm:p-10 rounded-2xl border border-[#C8A96B]/25 shadow-sm max-w-3xl mx-auto overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageSquarePlus className="text-[#C8A96B]" size={18} />
              <h3 className="font-serif text-xl font-medium text-[#163126]">Inscrire votre bénédiction</h3>
            </div>
            <p className="text-xs text-[#556B2F] mb-8 font-light leading-relaxed">
              Partagez votre propre expérience vibratoire, qu'il s'agisse de l'éclat retrouvé de votre peau avec nos rituels sacrés ou d'une profonde révélation spirituelle lors d'une consultation holistique avec Monique.
            </p>

            {success ? (
              <div className="bg-[#163126]/5 border border-[#C8A96B]/30 rounded-xl p-8 text-center flex flex-col items-center gap-3 animate-fade-in">
                <CheckCircle2 size={32} className="text-[#C8A96B]" />
                <p className="text-base font-serif font-medium text-[#163126]">Merci pour votre partage sacré</p>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">Votre témoignage a été précieusement consigné et sera partagé avec la communauté des initiés.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-left">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-700 tracking-wider uppercase text-[10px]">Votre Prénom ou Signature</label>
                  <input
                    type="text"
                    required
                    className="border border-[#C8A96B]/20 p-3.5 rounded bg-[#FCFAF7] focus:bg-white focus:border-[#C8A96B] focus:outline-none transition-colors text-sm"
                    placeholder="Ex: Éléonore R."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-700 tracking-wider uppercase text-[10px]">Votre Ville / Province</label>
                  <input
                    type="text"
                    required
                    className="border border-[#C8A96B]/20 p-3.5 rounded bg-[#FCFAF7] focus:bg-white focus:border-[#C8A96B] focus:outline-none transition-colors text-sm"
                    placeholder="Ex: Genève"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-2">
                  <label className="font-semibold text-gray-700 tracking-wider uppercase text-[10px]">Note spirituelle d'évaluation</label>
                  <div className="flex gap-2.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-[#C8A96B] hover:scale-110 transition-transform p-1 cursor-pointer focus:outline-none"
                      >
                        <Star 
                          size={24} 
                          className={star <= rating ? 'fill-current text-[#C8A96B]' : 'opacity-20'} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2 flex flex-col gap-2">
                  <label className="font-semibold text-gray-700 tracking-wider uppercase text-[10px]">Votre témoignage de transformation</label>
                  <textarea
                    required
                    rows={4}
                    className="border border-[#C8A96B]/20 p-4 rounded bg-[#FCFAF7] focus:bg-white focus:border-[#C8A96B] focus:outline-none transition-colors text-sm resize-none"
                    placeholder="Décrivez votre voyage d'éveil vibratoire..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end mt-2">
                  <button
                    type="submit"
                    className="bg-[#163126] hover:bg-[#C8A96B] text-white hover:text-[#163126] text-xs font-semibold tracking-widest uppercase py-4 px-10 rounded transition-all duration-300"
                  >
                    Publier sur le Livre d'Or
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}

        {/* 2x2 Clean Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {CONSULTATION_TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FCFAF7] p-8 sm:p-10 rounded-2xl border border-[#C8A96B]/15 hover:border-[#C8A96B]/30 transition-all duration-500 shadow-xs relative flex flex-col justify-between group"
            >
              {/* Fine quotation mark */}
              <div className="absolute top-8 right-8 text-[#C8A96B]/15 group-hover:text-[#C8A96B]/30 transition-colors duration-500">
                <Quote size={40} className="stroke-[1]" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#C8A96B] font-semibold mb-6 block">
                  ✦ {item.type}
                </span>
                
                {/* Main Quote Text */}
                <p className="font-serif text-lg sm:text-xl text-[#163126] italic leading-relaxed mb-6 font-light">
                  "{item.review}"
                </p>

                {/* Secondary elaborate text */}
                <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed mb-8 font-light">
                  {item.details}
                </p>
              </div>

              {/* Author Footer */}
              <div className="border-t border-[#C8A96B]/10 pt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-[#163126] font-medium text-base">{item.name}</h4>
                  <p className="text-[11px] text-[#556B2F] font-sans tracking-wider uppercase mt-0.5">{item.city}</p>
                </div>
                {/* Decorative 5-star marker */}
                <div className="flex gap-1 text-[#C8A96B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ---------------------------------------------------
          SECTION 3 — TÉMOIGNAGES PRODUITS
          --------------------------------------------------- */}
      <section className="py-24 bg-[#FCFAF7] border-y border-[#C8A96B]/15 relative">
        <div className="absolute inset-0 bg-[#C8A96B]/2 pointer-events-none" />
        
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-semibold mb-3 block">
              L'écho de la nature
            </span>
            <h2 className="font-serif text-2xl sm:text-3.5xl text-[#163126] font-light tracking-wide">
              L’expérience à travers nos soins
            </h2>
            <div className="h-[1px] w-12 bg-[#C8A96B]/40 mx-auto my-4" />
            <p className="text-[#556B2F] text-xs sm:text-sm font-sans font-light">
              Des retours authentiques de clients sur nos rituels sacrés et cosmétiques ancestrales d’alchimie énergétique.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            {PRODUCT_TESTIMONIALS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-[#F7F3EE]/50 p-8 rounded-xl border border-[#C8A96B]/10 hover:border-[#C8A96B]/25 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-[#C8A96B] mb-5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-current" />
                    ))}
                  </div>

                  {/* Main Quote */}
                  <p className="font-serif text-base sm:text-lg text-[#163126] italic leading-relaxed mb-4 font-light">
                    "{item.quote}"
                  </p>

                  {/* Static product description context */}
                  <p className="text-[11px] text-[#556B2F] font-sans leading-relaxed mb-6 font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#C8A96B]/10 flex items-center justify-between">
                  <span className="font-sans text-xs font-semibold text-[#163126] tracking-wider uppercase">
                    {item.product}
                  </span>
                  <span className="font-serif text-xs text-gray-500 italic">
                    {item.author}, {item.city}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------
          SECTION 4 — CHIFFRES DE CONFIANCE
          --------------------------------------------------- */}
      <section className="py-20 bg-[#F7F3EE]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y-0 divide-x-0 md:divide-x divide-[#C8A96B]/15">
            {/* Stat 1 */}
            <div className="text-center flex flex-col items-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#163126]/5 flex items-center justify-center text-[#C8A96B] mb-3">
                <Users size={16} />
              </div>
              <span className="font-serif text-3xl sm:text-4xl text-[#163126] font-light">500+</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#556B2F] font-sans font-medium mt-1.5">
                Clientes accompagnées
              </span>
            </div>

            {/* Stat 2 */}
            <div className="text-center flex flex-col items-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#163126]/5 flex items-center justify-center text-[#C8A96B] mb-3">
                <Award size={16} />
              </div>
              <span className="font-serif text-3xl sm:text-4xl text-[#163126] font-light">98%</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#556B2F] font-sans font-medium mt-1.5">
                Satisfaction
              </span>
            </div>

            {/* Stat 3 */}
            <div className="text-center flex flex-col items-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#163126]/5 flex items-center justify-center text-[#C8A96B] mb-3">
                <Star size={16} className="fill-current" />
              </div>
              <span className="font-serif text-3xl sm:text-4xl text-[#163126] font-light">4.9/5</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#556B2F] font-sans font-medium mt-1.5">
                Note moyenne
              </span>
            </div>

            {/* Stat 4 */}
            <div className="text-center flex flex-col items-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#163126]/5 flex items-center justify-center text-[#C8A96B] mb-3">
                <Globe size={16} />
              </div>
              <span className="font-serif text-3xl sm:text-4xl text-[#163126] font-light">8</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#556B2F] font-sans font-medium mt-1.5">
                Pays servis
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------
          SECTION 5 — WALL OF LOVE (INFINITE SCROLL)
          --------------------------------------------------- */}
      <section className="py-24 bg-[#F7F3EE] border-t border-[#C8A96B]/15 relative overflow-hidden select-none">
        <div className="text-center mb-16 max-w-2xl mx-auto px-6">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-semibold mb-3 block">
            Miroir de l'âme
          </span>
          <h2 className="font-serif text-2xl sm:text-3.5xl text-[#163126] font-light tracking-wide">
            Ils partagent leur lumière
          </h2>
          <p className="text-[#556B2F] text-xs sm:text-sm font-sans mt-3 font-light">
            Des centaines d’expériences authentiques de transformation.
          </p>
        </div>

        {/* Ticker Row 1 (Left Direction Scroll) */}
        <div className="w-full overflow-hidden mb-6 relative">
          {/* Subtle fade overlay left and right to blend with body background */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#F7F3EE] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#F7F3EE] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-left flex gap-6">
            {/* Double array of cards for true seamless looping */}
            {[...WALL_OF_LOVE_ROW_1, ...WALL_OF_LOVE_ROW_1, ...WALL_OF_LOVE_ROW_1].map((card, idx) => (
              <div 
                key={idx} 
                className="w-[260px] sm:w-[320px] bg-[#FCFAF7] border border-[#C8A96B]/10 p-5 rounded-xl flex flex-col justify-between shrink-0 hover:border-[#C8A96B]/40 transition-all duration-300 shadow-2xs"
              >
                <div>
                  <div className="flex gap-0.5 text-[#C8A96B] mb-2.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-current" />
                    ))}
                  </div>
                  <p className="font-serif text-sm text-[#163126] italic font-light leading-relaxed mb-4">
                    "{card.review}"
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-sans border-t border-[#C8A96B]/5 pt-3">
                  <span className="font-medium text-[#163126]">{card.name}</span>
                  <span className="uppercase tracking-wider text-[9px]">{card.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticker Row 2 (Right Direction Scroll) */}
        <div className="w-full overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#F7F3EE] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#F7F3EE] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-right flex gap-6">
            {[...WALL_OF_LOVE_ROW_2, ...WALL_OF_LOVE_ROW_2, ...WALL_OF_LOVE_ROW_2].map((card, idx) => (
              <div 
                key={idx} 
                className="w-[260px] sm:w-[320px] bg-[#FCFAF7] border border-[#C8A96B]/10 p-5 rounded-xl flex flex-col justify-between shrink-0 hover:border-[#C8A96B]/40 transition-all duration-300 shadow-2xs"
              >
                <div>
                  <div className="flex gap-0.5 text-[#C8A96B] mb-2.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-current" />
                    ))}
                  </div>
                  <p className="font-serif text-sm text-[#163126] italic font-light leading-relaxed mb-4">
                    "{card.review}"
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-sans border-t border-[#C8A96B]/5 pt-3">
                  <span className="font-medium text-[#163126]">{card.name}</span>
                  <span className="uppercase tracking-wider text-[9px]">{card.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------
          SECTION 6 — CTA FINAL
          --------------------------------------------------- */}
      <section className="py-24 px-6 max-w-[1240px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-br from-[#163126] to-[#12241C] text-[#FCFAF7] rounded-3xl p-10 sm:p-16 lg:p-20 text-center overflow-hidden border border-[#C8A96B]/20 shadow-2xl"
        >
          {/* Subtle gold glow aura in the center background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#C8A96B]/8 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-[#C8A96B] text-[10px] uppercase font-sans tracking-[0.3em] font-semibold mb-6">
              ✦ Équilibre Originel
            </span>
            
            <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-tight mb-6">
              Prête à vivre votre <br />
              <span className="italic font-normal text-[#C8A96B]">propre transformation ?</span>
            </h3>
            
            <p className="text-white/70 text-xs sm:text-base font-sans max-w-lg mb-12 font-light leading-relaxed">
              Découvrez les soins, rituels et consultations conçus pour rétablir votre équilibre intérieur et réveiller l'éclat de votre âme.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <button
                onClick={() => setPage && setPage('booking')}
                className="bg-[#C8A96B] hover:bg-white text-[#163126] hover:text-black font-sans text-xs tracking-[0.2em] font-bold uppercase py-4.5 px-8 sm:px-10 rounded transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/20"
              >
                Réserver une consultation
              </button>
              
              <button
                onClick={() => setPage && setPage('boutique')}
                className="border border-[#C8A96B]/60 hover:border-white hover:bg-white/5 text-[#FCFAF7] font-sans text-xs tracking-[0.2em] font-bold uppercase py-4.5 px-8 sm:px-10 rounded transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
              >
                Découvrir la boutique
              </button>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
