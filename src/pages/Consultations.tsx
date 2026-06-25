import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Leaf, 
  Eye, 
  Sun, 
  Check, 
  ArrowRight, 
  Star,
  CheckCircle,
  Camera,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Consultation, ConsultationBooking, User as UserType } from '../types';
import { TestimonialsConsultationSection } from '../components/ui/testimonials-consultation-section';

interface ConsultationsProps {
  consultations: Consultation[];
  currentUser: UserType | null;
  onBookConsultation: (booking: ConsultationBooking) => void;
  setPage: (page: string, params?: any) => void;
}

export const Consultations: React.FC<ConsultationsProps> = ({
  consultations,
  currentUser,
  onBookConsultation,
  setPage,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChooseConsultation = (id: string) => {
    setPage('booking', { initialSelectedID: id });
  };

  const faqs = [
    {
      q: "Comment se déroule une consultation en visio ?",
      a: "Lors de la confirmation de votre rendez-vous, un lien sécurisé Zoom ou Google Meet vous est immédiatement envoyé par courriel. Monique vous accueillera en direct à l'heure précise dans un espace d'écoute bienveillant."
    },
    {
      q: "Puis-je annuler ou reporter mon rendez-vous ?",
      a: "Toute séance peut être reportée ou annulée sans aucun frais jusqu'à 48 heures avant le début de la consultation pour vous offer un maximum de flexibilité spirituelle."
    },
    {
      q: "Vais-je recevoir une fiche conseil ?",
      a: "Oui. Sous un délai maximum de 24 heures suivant votre consultation, vous recevrez une fiche conseil personnalisée élaborée par Monique Morgat au format PDF, détaillant vos ordonnances de simplicité, recommandation d'élixirs de plantes et rituels."
    },
    {
      q: "Quels moyens de paiement acceptez-vous ?",
      a: "Nous acceptons uniquement les règlements sécurisés par carte bancaire propulsés par l'infrastructure mondiale Stripe. Vos transactions et données de facturation sont entièrement anonymisées et cryptées."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#FAF8F3]/40 min-h-screen text-[#3B2F2F] antialiased"
    >
      {/* ========================================================
          1. PREMIUM HERO SECTION MATCHING SCREENSHOT EXACTLY
          ======================================================== */}
      <section className="bg-[#FAF8F3] pt-12 pb-16 sm:py-20 lg:py-24 border-b border-[#E8DFC9]/40 relative overflow-hidden">
        {/* Ambient top decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-[#C8A96B]/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Left: Strategic copy branding */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <span className="text-[11px] font-sans tracking-[0.25em] text-[#C8A96B] font-extrabold uppercase select-none">
                LE TEMPLE INTUITIF
              </span>
              
              <h1 className="font-serif text-[38px] sm:text-[54px] lg:text-[62px] text-[#1F3B2F] font-light leading-[1.08] tracking-tight text-left">
                Consultations <br />
                <span className="text-[#1F3B2F] font-light">Holistiques & Guidance</span> <br />
                <span className="text-[#C8A96B] italic font-serif">Médiumnique</span>
              </h1>

              <p className="text-[14.5px] sm:text-[15.5px] text-gray-500 font-sans max-w-xl font-light leading-relaxed mt-2 text-left">
                Des séances personnalisées avec Monique Morgat pour vous accompagner, vous éclairer et vous aider à avancer en confiance sur votre chemin.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
                <button 
                  onClick={() => setPage('booking')}
                  className="w-full sm:w-auto bg-[#1F3B2F] hover:bg-[#152a21] text-white text-[11px] font-sans tracking-[0.2em] font-extrabold uppercase px-9 py-4.5 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>RÉSERVER MAINTENANT</span>
                  <ArrowRight size={13} className="text-[#C8A96B]" />
                </button>
                <button 
                  onClick={() => handleChooseConsultation('générale')}
                  className="w-full sm:w-auto bg-transparent border border-[#1F3B2F]/15 hover:border-[#1F3B2F]/40 hover:bg-white text-[#1F3B2F] text-[11px] font-sans tracking-[0.2em] font-extrabold uppercase px-9 py-4.5 rounded-lg transition-all duration-300 cursor-pointer"
                >
                  DÉCOUVRIR LES SÉANCES
                </button>
              </div>

              {/* Inline trust bullet points styled cleanly horizontally */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#E8DFC9]/40 w-full text-left">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1F3B2F]/5 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-[#C8A96B] stroke-[3]" />
                  </span>
                  <span className="text-[10px] sm:text-[10.5px] font-sans font-medium text-gray-500 leading-tight">Consultations sécurisées</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1F3B2F]/5 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-[#C8A96B] stroke-[3]" />
                  </span>
                  <span className="text-[10px] sm:text-[10.5px] font-sans font-medium text-gray-500 leading-tight">Confidentialité totale</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1F3B2F]/5 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-[#C8A96B] stroke-[3]" />
                  </span>
                  <span className="text-[10px] sm:text-[10.5px] font-sans font-medium text-gray-500 leading-tight">Paiement sécurisé Stripe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1F3B2F]/5 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-[#C8A96B] stroke-[3]" />
                  </span>
                  <span className="text-[10px] sm:text-[10.5px] font-sans font-medium text-gray-500 leading-tight">Fiche conseil sous 24h</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Portrait composition with floating counts */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full max-w-[380px] sm:max-w-[420px] mx-auto rounded-[32px] overflow-hidden border border-[#E8DFC9]/40 shadow-2xl">
                <img 
                  src="/src/assets/images/monique_morgat_1782122440112.jpg"
                  alt="Monique Morgat, Praticienne Divine et Médium"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-[1.02] hover:scale-105 transition-transform duration-[6s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F3B2F]/25 via-transparent to-transparent z-0 pointer-events-none" />
                
                {/* Floating dark premium rating card */}
                <div className="absolute bottom-6 right-6 bg-[#12241C] text-white p-4.5 rounded-2xl border border-[#C8A96B]/30 flex flex-col gap-1 shadow-2xl max-w-[170px] select-none text-left">
                  <div className="flex items-center gap-1.5 text-[#C8A96B]">
                    <Sparkles size={16} />
                    <span className="font-serif text-lg font-bold leading-noneTracking-wide">+500</span>
                  </div>
                  <span className="text-[10px] font-sans tracking-wide text-white/80 uppercase font-bold leading-normal">
                    Guidances réalisées
                  </span>
                  <div className="flex items-center gap-0.5 mt-1 text-[#C8A96B]">
                    <Star size={10} fill="currentColor" className="stroke-none" />
                    <Star size={10} fill="currentColor" className="stroke-none" />
                    <Star size={10} fill="currentColor" className="stroke-none" />
                    <Star size={10} fill="currentColor" className="stroke-none" />
                    <Star size={10} fill="currentColor" className="stroke-none" />
                  </div>
                </div>
              </div>
              
              {/* Outer decorative gold floating frame */}
              <div className="absolute -inset-4 border border-[#C8A96B]/15 rounded-[36px] pointer-events-none -z-10" />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. POURQUOI CONSULTER ? SECTION
          ======================================================== */}
      <section className="py-16 sm:py-24 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-16 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-extrabold">
            POURQUOI CONSULTER ?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F3B2F] font-light tracking-wide mt-1">
            Un accompagnement pour révéler votre essence
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A96B] mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="bg-white/80 border border-[#E8DFC9]/30 rounded-2xl p-7 flex flex-col items-start gap-4 text-left shadow-2xs hover:shadow-sm hover:border-[#C8A96B]/30 transition-all duration-300">
            <span className="w-11 h-11 rounded-full bg-[#FAF8F3] border border-[#E8DFC9]/40 flex items-center justify-center text-[#C8A96B]">
              <Leaf size={18} strokeWidth={1.5} />
            </span>
            <h4 className="font-serif text-lg font-medium text-[#1F3B2F] leading-snug">
              Débloquer & Libérer
            </h4>
            <p className="text-[12.5px] font-sans text-gray-500 font-light leading-relaxed">
              Identifiez et libérez les blocages émotionnels, énergétiques et karmiques qui vous freinent dans votre quotidien.
            </p>
          </div>

          {/* Column 2 */}
          <div className="bg-white/80 border border-[#E8DFC9]/30 rounded-2xl p-7 flex flex-col items-start gap-4 text-left shadow-2xs hover:shadow-sm hover:border-[#C8A96B]/30 transition-all duration-300">
            <span className="w-11 h-11 rounded-full bg-[#FAF8F3] border border-[#E8DFC9]/40 flex items-center justify-center text-[#C8A96B]">
              <Eye size={18} strokeWidth={1.5} />
            </span>
            <h4 className="font-serif text-lg font-medium text-[#1F3B2F] leading-snug">
              Recevoir une guidance claire
            </h4>
            <p className="text-[12.5px] font-sans text-gray-500 font-light leading-relaxed">
              Obtenez des réponses précises et des conseils adaptés et éclairés pour illuminer et guider votre chemin de vie.
            </p>
          </div>

          {/* Column 3 */}
          <div className="bg-white/80 border border-[#E8DFC9]/30 rounded-2xl p-7 flex flex-col items-start gap-4 text-left shadow-2xs hover:shadow-sm hover:border-[#C8A96B]/30 transition-all duration-300">
            <span className="w-11 h-11 rounded-full bg-[#FAF8F3] border border-[#E8DFC9]/40 flex items-center justify-center text-[#C8A96B]">
              <Sun size={18} strokeWidth={1.5} />
            </span>
            <h4 className="font-serif text-lg font-medium text-[#1F3B2F] leading-snug">
              Réaligner vos énergies
            </h4>
            <p className="text-[12.5px] font-sans text-gray-500 font-light leading-relaxed">
              Harmonisez votre corps, votre esprit et votre âme pour retrouver un équilibre vibratoire d'une vitalité pure.
            </p>
          </div>

          {/* Column 4 */}
          <div className="bg-white/80 border border-[#E8DFC9]/30 rounded-2xl p-7 flex flex-col items-start gap-4 text-left shadow-2xs hover:shadow-sm hover:border-[#C8A96B]/30 transition-all duration-300">
            <span className="w-11 h-11 rounded-full bg-[#FAF8F3] border border-[#E8DFC9]/40 flex items-center justify-center text-[#C8A96B]">
              <Sparkles size={18} strokeWidth={1.5} />
            </span>
            <h4 className="font-serif text-lg font-medium text-[#1F3B2F] leading-snug">
              Évoluer en conscience
            </h4>
            <p className="text-[12.5px] font-sans text-gray-500 font-light leading-relaxed">
              Avancez avec clarté, confiance et alignement vers la vie sacrée et spirituelle qui résonne avec votre être profond.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. NOS CONSULTATIONS SECTION (TWO SPLENDID CARDS)
          ======================================================== */}
      <section className="py-16 sm:py-24 bg-[#FAF8F3]/50 border-t border-[#E8DFC9]/20">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-extrabold">
              NOS CONSULTATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F3B2F] font-light tracking-wide mt-1">
              Des soins et guidances pensés pour votre harmonie
            </h2>
            <div className="w-12 h-[1px] bg-[#C8A96B] mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 max-w-[1100px] mx-auto">
            
            {/* CARD 1: GENERAL HOLISTIC - DARK GREEN LUXURY CARD */}
            <div className="bg-[#1F3B2F] text-white border border-[#C8A96B]/30 rounded-[30px] p-8 sm:p-11 flex flex-col justify-between shadow-2xl relative overflow-hidden text-left hover:scale-[1.01] transition-all duration-500">
              
              {/* Circular floating leaf icon background watermark as in screen */}
              <div className="absolute top-8 right-8 w-20 h-20 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02] text-[#C8A96B] select-none">
                <Leaf size={32} strokeWidth={0.75} />
              </div>

              <div>
                {/* Title and details */}
                <span className="text-[10px] font-sans tracking-[0.2em] text-[#C8A96B] font-bold uppercase block mb-2">SÉANCE DU CORPS & DE L'ÂME</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF8F3] tracking-wide mb-1">
                  Consultation Générale <br />
                  <span className="text-[#C8A96B] italic font-serif">Holistique</span>
                </h3>
                <p className="text-[11.5px] font-sans text-white/50 tracking-wide uppercase mb-6">En visio avec Monique Morgat</p>

                {/* Duration and Price badges */}
                <div className="flex items-center gap-3.5 mb-7">
                  <span className="text-[10.5px] font-sans font-extrabold tracking-wider bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-white">
                    45 MINUTES
                  </span>
                  <span className="text-[10.5px] font-sans font-extrabold tracking-wider bg-[#C8A96B]/15 border border-[#C8A96B]/35 px-3.5 py-1.5 rounded-full text-[#C8A96B]">
                    70 €
                  </span>
                </div>

                <p className="text-[13.5px] font-sans text-white/80 font-light leading-relaxed mb-8">
                  Une séance globale pour faire le point sur votre situation, comprendre vos blocages et recevoir des conseils énergétiques personnalisés adaptés à vos besoins de simplicité.
                </p>

                {/* Benefits Checklists */}
                <div className="h-[1px] bg-white/10 my-6" />
                <ul className="flex flex-col gap-4 text-xs font-sans text-white/90">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#C8A96B]">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="font-light">Bilan énergétique global de votre derme vibratoire</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#C8A96B]">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="font-light">Guidance claire et conseils d'alignement personnel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#C8A96B]">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="font-light">Recommandations d'élixirs de plantes et rituels sacrés</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#C8A96B]">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="font-light">Fiche conseil personnalisée en PDF sous 24h</span>
                  </li>
                </ul>
              </div>

              {/* Action */}
              <div className="mt-10 pt-6 border-t border-white/10 w-full flex items-center justify-between gap-4">
                <button 
                  onClick={() => handleChooseConsultation('générale')}
                  className="w-full bg-transparent border border-[#C8A96B]/50 hover:bg-[#C8A96B] text-[#FAF8F3] hover:text-[#1F3B2F] text-[11px] font-sans tracking-[0.2em] font-extrabold uppercase py-4.5 rounded-lg shadow transition-all duration-300 cursor-pointer text-center"
                >
                  CHOISIR CETTE SÉANCE
                </button>
              </div>
            </div>

            {/* CARD 2: MEDIUMSHIP CONSULTATION - SOFT LIGHT CREAM CARD */}
            <div className="bg-white text-[#1F3B2F] border border-[#E8DFC9] rounded-[30px] p-8 sm:p-11 flex flex-col justify-between shadow-lg relative overflow-hidden text-left hover:scale-[1.01] transition-all duration-500">
              
              {/* Circular floating sparkles icon background watermark as in screen */}
              <div className="absolute top-8 right-8 w-20 h-20 rounded-full border border-[#E8DFC9]/40 flex items-center justify-center bg-[#FAF8F3] text-[#C8A96B] select-none">
                <Sparkles size={32} strokeWidth={0.75} />
              </div>

              <div>
                {/* Title and details */}
                <span className="text-[10px] font-sans tracking-[0.2em] text-[#C8A96B] font-bold uppercase block mb-2">CONNEXION AUX PLANS SUBTILS</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1F3B2F] tracking-wide mb-1">
                  Consultation <br />
                  <span className="text-[#1F3B2F] font-light">Médiumnique</span>
                </h3>
                <p className="text-[11.5px] font-sans text-gray-400 tracking-wide uppercase mb-6">En visio avec Monique Morgat</p>

                {/* Duration and Price badges */}
                <div className="flex items-center gap-3.5 mb-7">
                  <span className="text-[10.5px] font-sans font-extrabold tracking-wider bg-[#FAF8F3] border border-[#E8DFC9]/40 px-3.5 py-1.5 rounded-full text-[#1F3B2F]">
                    1 HEURE
                  </span>
                  <span className="text-[10.5px] font-sans font-extrabold tracking-wider bg-[#C8A96B]/10 border border-[#C8A96B]/30 px-3.5 py-1.5 rounded-full text-[#C8A96B]">
                    90 €
                  </span>
                </div>

                <p className="text-[13.5px] font-sans text-gray-500 font-light leading-relaxed mb-8">
                  Une connexion intuitive et spirituelle pour recevoir des messages vibratoires, éclairages intenses et guidances profondes de vos guides et ancêtres.
                </p>

                {/* Benefits Checklists */}
                <div className="h-[1px] bg-[#E8DFC9]/35 my-6" />
                <ul className="flex flex-col gap-4 text-xs font-sans text-[#1F3B2F]">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#FAF8F3] border border-[#E8DFC9]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#C8A96B]">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="text-gray-600 font-light">Connexion directe aux guides célestes et défunts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#FAF8F3] border border-[#E8DFC9]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#C8A96B]">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="text-gray-600 font-light">Canal de messages de justesse et révélations de vie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#FAF8F3] border border-[#E8DFC9]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#C8A96B]">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="text-gray-600 font-light">Nettoyage, rééquilibrage et soin énergétique à distance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#FAF8F3] border border-[#E8DFC9]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#C8A96B]">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="text-gray-600 font-light">Fiche conseil personnalisée de rituels sacrés en PDF (24h)</span>
                  </li>
                </ul>
              </div>

              {/* Action */}
              <div className="mt-10 pt-6 border-t border-[#E8DFC9]/30 w-full flex items-center justify-between gap-4">
                <button 
                  onClick={() => handleChooseConsultation('médiumnique')}
                  className="w-full bg-[#C8A96B] hover:bg-[#b09257] text-white text-[11px] font-sans tracking-[0.2em] font-extrabold uppercase py-4.5 rounded-lg shadow-md transition-all duration-300 cursor-pointer text-center"
                >
                  CHOISIR CETTE SÉANCE
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. COMMENT SE DÉROULE UNE SÉANCE SECTION
          ======================================================== */}
      <section className="py-16 sm:py-24 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 border-t border-[#E8DFC9]/20 relative">
        <div className="text-center mb-16 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-extrabold animate-pulse">
            COMMENT SE DÉROULE UNE SÉANCE ?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F3B2F] font-light tracking-wide mt-1">
            Les étapes vers votre guidance d'éveil
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A96B] mt-4" />
        </div>

        {/* Desktop Connected steppers layout exactly as capture */}
        <div className="relative max-w-[1200px] mx-auto mt-12">
          
          {/* Connecting line representing the screen line */}
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[1px] border-t border-dashed border-[#C8A96B]/35 -z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-14">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <span className="w-22 h-22 rounded-full bg-white border border-[#E8DFC9]/40 shadow flex items-center justify-center text-[#C8A96B]">
                  <CalendarIcon size={24} strokeWidth={1.5} />
                </span>
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1F3B2F] border border-[#C8A96B]/30 text-white font-serif text-[11px] font-bold flex items-center justify-center">
                  1
                </span>
              </div>
              <h4 className="font-serif text-lg font-medium text-[#1F3B2F] mt-2">Réservation</h4>
              <p className="text-[12.5px] font-sans text-gray-500 font-light leading-relaxed max-w-[240px]">
                Choisissez votre séance, la date et l'horaire qui vous conviennent dans le scheduler et réglez en ligne.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <span className="w-22 h-22 rounded-full bg-white border border-[#E8DFC9]/40 shadow flex items-center justify-center text-[#C8A96B]">
                  <CheckCircle size={24} strokeWidth={1.5} />
                </span>
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1F3B2F] border border-[#C8A96B]/30 text-white font-serif text-[11px] font-bold flex items-center justify-center">
                  2
                </span>
              </div>
              <h4 className="font-serif text-lg font-medium text-[#1F3B2F] mt-2">Confirmation</h4>
              <p className="text-[12.5px] font-sans text-gray-500 font-light leading-relaxed max-w-[240px]">
                Vous recevez un email de confirmation instantané avec toutes les informations pratiques d'organisation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <span className="w-22 h-22 rounded-full bg-white border border-[#E8DFC9]/40 shadow flex items-center justify-center text-[#C8A96B]">
                  <Camera size={24} strokeWidth={1.5} />
                </span>
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1F3B2F] border border-[#C8A96B]/30 text-white font-serif text-[11px] font-bold flex items-center justify-center">
                  3
                </span>
              </div>
              <h4 className="font-serif text-lg font-medium text-[#1F3B2F] mt-2">Consultation</h4>
              <p className="text-[12.5px] font-sans text-gray-500 font-light leading-relaxed max-w-[240px]">
                Rendez-vous en visio pour votre séance avec Monique Morgat dans un espace d'échanges sacré et bienveillant.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <span className="w-22 h-22 rounded-full bg-white border border-[#E8DFC9]/40 shadow flex items-center justify-center text-[#C8A96B]">
                  <FileText size={24} strokeWidth={1.5} />
                </span>
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1F3B2F] border border-[#C8A96B]/30 text-white font-serif text-[11px] font-bold flex items-center justify-center">
                  4
                </span>
              </div>
              <h4 className="font-serif text-lg font-medium text-[#1F3B2F] mt-2">Fiche Conseil</h4>
              <p className="text-[12.5px] font-sans text-gray-500 font-light leading-relaxed max-w-[240px]">
                Sous 24h, vous recevez votre fiche conseil personnalisée au format PDF rédigée sur-mesure par Monique.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. CTA TO Standalone Booking Page
          ======================================================== */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <div className="bg-[#1F3B2F] border border-[#C8A96B]/20 rounded-3xl p-10 sm:p-14 md:p-16 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute -bottom-14 -right-14 opacity-[0.05] pointer-events-none select-none">
            <Leaf className="w-56 h-auto text-white animate-pulse" />
          </div>
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-extrabold block">
            RÉSERVATION EN LIGNE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F3] font-light tracking-wide max-w-xl leading-snug">
            Prêt à initier votre voyage de transformation ?
          </h2>
          <p className="text-[13.5px] text-white/75 font-sans leading-relaxed max-w-lg font-light">
            Choisissez l’un de nos créneaux exclusifs pour votre guidance personnalisée. Bénéficiez d’un espace d'écoute bienveillant en visioconférence sécurisée avec Monique Morgat.
          </p>
          <div className="pt-4">
            <button 
              type="button"
              onClick={() => setPage('booking')}
              className="bg-[#C8A96B] hover:bg-[#b09257] text-[#1F3B2F] hover:text-white text-[11px] font-sans tracking-[0.2em] font-extrabold uppercase px-10 py-5 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            >
              PRENDRE RENDEZ-VOUS EN LIGNE
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. THE BEAUTIFUL VERTICAL TESTIMONIALS SECTION (BOTTOM TO TOP SCROLL)
          ======================================================== */}
      <TestimonialsConsultationSection />

      {/* ========================================================
          7. FOIRE AUX QUESTIONS - PREMIUM IMAGE SPLIT LAYOUT
          ======================================================== */}
      <section className="bg-white py-20 px-6 sm:px-10 lg:px-16 border-t border-[#E8DFC9]/20">
        <div className="max-w-[1150px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* FAQ Left image and text column */}
          <div className="lg:col-span-5 flex flex-col items-start gap-5 text-left">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-extrabold block">
              FOIRE AUX QUESTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F3B2F] font-light leading-snug tracking-wide">
              Tout ce que vous devez savoir
            </h2>
            
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden mt-4 border border-[#E8DFC9]/30">
              <img 
                src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop"
                alt="Sacred Lithotherapy and wellness"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* FAQ Right Accordions */}
          <div className="lg:col-span-7 flex flex-col gap-4 font-sans text-left mt-4 lg:mt-11">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border-b border-[#E8DFC9]/35 pb-5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center text-left py-2.5 font-serif text-base text-[#1F3B2F] font-semibold cursor-pointer focus:outline-none"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <span className="text-[#C8A96B] font-light text-2xl leading-none">{isOpen ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[13px] text-gray-500 leading-relaxed mt-2.5 pl-1 font-light">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </motion.div>
  );
};
