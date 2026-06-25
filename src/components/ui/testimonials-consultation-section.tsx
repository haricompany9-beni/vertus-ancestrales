import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardData {
  id: string;
  name: string;
  category: string;
  review: string;
  avatar: string;
  rating: number;
}

// Tailored and general premium testimonials for consultations columns
const COLUMN_1_TESTIMONIALS: TestimonialCardData[] = [
  {
    id: 'tc-col1-1',
    name: 'Sophie L.',
    category: 'Consultation Générale',
    review: "Monique est d'une bienveillance exceptionnelle. Sa guidance m'a permis d'y voir très clair sur mes blocages et de prendre enfin les bonnes décisions pour mon chemin personnel.",
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'tc-col1-2',
    name: 'Astrid V.',
    category: 'Rituel beauté',
    review: "L'Élixir d’Or Noir a éveillé ma peau à une clarté divine. Mes rituels du soir sont devenus un véritable rendez-vous sacré.",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'tc-col1-3',
    name: 'Amandine R.',
    category: 'Consultation Médiumnique',
    review: "Une séance d'une justesse et force incroyables. Je me sens profondément alignée, apaisée et reconnectée à ma véritable spiritualité. Les conseils cosmétiques associés font des merveilles.",
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'tc-col1-4',
    name: 'Hélène D.',
    category: 'Accompagnement holistique',
    review: "Une alliance sublime de science naturelle et de haute spiritualité. Ma peau ne tolère plus que cette pureté sensorielle absolue.",
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    rating: 5
  }
];

const COLUMN_2_TESTIMONIALS: TestimonialCardData[] = [
  {
    id: 'tc-col2-1',
    name: 'Claire D.',
    category: 'Consultation Médiumnique',
    review: "Les révélations transmises par Monique étaient incroyablement intimes et précises. Sa fiche conseil PDF m'accompagne tous les matins au réveil, elle est essentielle.",
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'tc-col2-2',
    name: 'Kenza B.',
    category: 'Guidance privée',
    review: "La guidance de Monique m'a révélé ma propre vérité spirituelle. Un moment hors du temps, d'une justesse de perception bouleversante.",
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'tc-col2-3',
    name: 'Isabelle L.',
    category: 'Soin métamorphique',
    review: "Je traverse l'existence avec une paix nouvelle. Le soin métamorphique a guéri des blessures énergétiques enfouies depuis des années.",
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'tc-col2-4',
    name: 'Salomé P.',
    category: 'Harmonisation vibratoire',
    review: "Chaque goutte de sérum résonne comme un mantra de guérison. Mon bien-être est devenu complet, extrêmement vivant et aligné.",
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&auto=format&fit=crop',
    rating: 5
  }
];

const COLUMN_3_TESTIMONIALS: TestimonialCardData[] = [
  {
    id: 'tc-col3-1',
    name: 'Nora F.',
    category: 'Chemin de vie',
    review: "Un éveil spirituel d’une immense délicatesse qui se reflète sur mon visage autant que dans mon quotidien. Monique transmet une sagesse infinie.",
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'tc-col3-2',
    name: 'Amandine G.',
    category: 'Rituel impératrice',
    review: "Le masque de l'impératrice procure un éclat d'une intensité inégalée. Une efficacité exceptionnelle portée par le souffle de rituels majestueux.",
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'tc-col3-3',
    name: 'Fatoumata B.',
    category: 'Soin Ancestral',
    review: "D’une noblesse et d’une authenticité sans pareil. Nos traditions et secrets sacrés africains sont enfin honorés à sa plus grande gloire.",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'tc-col3-4',
    name: 'Clara S.',
    category: 'Guidance d\'ancêtres',
    review: "Les élixirs et l'huile sacrée m'ont délivrée de mes doutes profonds. Je me sens re-connectée à mon essence originelle et à mes vertus ancestrales.",
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    rating: 5
  }
];

export const TestimonialsConsultationSection: React.FC = () => {
  return (
    <section id="paroles-sacrees-consultations" className="bg-[#F8F5F0] py-20 lg:py-28 overflow-hidden relative border-y border-[#E8DFC9]/30">
      {/* Background elegant graphical watermarks */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none z-0">
        <svg className="w-[300px] h-[300px] text-[#1F3B2F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 21c-1.8-2.5-4-5-4-8.5c0-2.5 1.8-4.5 4-7c2 2.5 4 4.5 4 7c0 3.5-2.2 6-4 8.5Z" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none z-0">
        <svg className="w-[300px] h-[300px] text-[#1F3B2F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 21c-1.8-2.5-4-5-4-8.5c0-2.5 1.8-4.5 4-7c2 2.5 4 4.5 4 7c0 3.5-2.2 6-4 8.5Z" />
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 mb-16 relative z-10 text-center flex flex-col items-center"
      >
        {/* SMALL LABEL */}
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans text-[#C8A96B] font-bold mb-3 block">
          PAROLES SACRÉES
        </span>

        {/* MAIN TITLE */}
        <h2 className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] text-[#1F3B2F] font-light leading-tight tracking-tight">
          L’éveil que <span className="text-[#C8A96B] italic font-serif">partagent</span> nos initiés
        </h2>

        {/* SUBTITLE */}
        <p className="text-[13px] sm:text-sm lg:text-base text-gray-500 font-sans max-w-xl mt-3 font-light leading-relaxed">
          Découvrez les retours authentiques de ceux qui ont expérimenté nos rituels, soins et accompagnements de guidance.
        </p>
      </motion.div>

      {/* INFINITE VERTICAL SCROLL TRACKS CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        
        {/* Vertical tracks scrolling content box */}
        <div className="h-[520px] overflow-hidden mask-gradient-y relative pause-on-hover-vertical">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 h-full max-w-[1150px] mx-auto items-start">
            
            {/* COLUMN 1: Bottom to Top Scrolling */}
            <div className="h-[520px] overflow-hidden flex flex-col relative select-none">
              <div className="flex flex-col gap-6 animate-scroll-up py-4">
                {/* First Cycle */}
                {COLUMN_1_TESTIMONIALS.map((test) => (
                  <VerticalTestimonialCard key={`col1-first-${test.id}`} test={test} />
                ))}
                {/* Duplicate Cycle */}
                {COLUMN_1_TESTIMONIALS.map((test) => (
                  <VerticalTestimonialCard key={`col1-second-${test.id}`} test={test} />
                ))}
              </div>
            </div>

            {/* COLUMN 2: Bottom to Top Scrolling with delayed animation */}
            <div className="h-[520px] overflow-hidden hidden sm:flex flex-col relative select-none">
              <div className="flex flex-col gap-6 animate-scroll-up-delayed py-4">
                {/* First Cycle */}
                {COLUMN_2_TESTIMONIALS.map((test) => (
                  <VerticalTestimonialCard key={`col2-first-${test.id}`} test={test} />
                ))}
                {/* Duplicate Cycle */}
                {COLUMN_2_TESTIMONIALS.map((test) => (
                  <VerticalTestimonialCard key={`col2-second-${test.id}`} test={test} />
                ))}
              </div>
            </div>

            {/* COLUMN 3: Bottom to Top Scrolling with slow animation */}
            <div className="h-[520px] overflow-hidden hidden lg:flex flex-col relative select-none">
              <div className="flex flex-col gap-6 animate-scroll-up-slow py-4">
                {/* First Cycle */}
                {COLUMN_3_TESTIMONIALS.map((test) => (
                  <VerticalTestimonialCard key={`col3-first-${test.id}`} test={test} />
                ))}
                {/* Duplicate Cycle */}
                {COLUMN_3_TESTIMONIALS.map((test) => (
                  <VerticalTestimonialCard key={`col3-second-${test.id}`} test={test} />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

interface VerticalTestimonialCardProps {
  test: TestimonialCardData;
}

const VerticalTestimonialCard: React.FC<VerticalTestimonialCardProps> = ({ test }) => {
  return (
    <div
      style={{ contentVisibility: 'auto' }}
      className="bg-white rounded-2xl lg:rounded-3xl p-6 border border-[#E8DFC9]/35 shadow-[0_4px_22px_rgba(31,59,47,0.015)] hover:shadow-[0_12px_45px_rgba(31,59,47,0.055)] flex flex-col justify-between transition-all duration-500 ease-out shrink-0 w-full min-h-[220px] lg:min-h-[240px]"
    >
      <div>
        {/* Quote and Stars Header */}
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#C8A96B] opacity-80" strokeWidth={1.5} />
          
          <div className="flex items-center gap-0.5">
            {Array.from({ length: test.rating }).map((_, idx) => (
              <Star key={idx} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8A96B] fill-[#C8A96B]" />
            ))}
          </div>
        </div>

        {/* Review text */}
        <p className="font-sans font-light italic text-[#3B2F2F]/90 leading-relaxed text-xs sm:text-[13.5px] line-clamp-5">
          « {test.review} »
        </p>
      </div>

      {/* Separator & Customer Details */}
      <div className="mt-4">
        <div className="w-full h-[1px] bg-[#E8DFC9]/30 mb-3 sm:mb-4" />
        
        <div className="flex items-center gap-3">
          <img
            src={test.avatar}
            alt={test.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-[#C8A96B]/30 shrink-0"
          />
          <div className="flex flex-col text-left">
            <span className="font-serif text-[12.5px] sm:text-[14px] font-bold text-[#1F3B2F] tracking-wide leading-none">
              {test.name}
            </span>
            <span className="text-[9px] sm:text-[10.5px] text-[#556B2F] font-sans font-medium mt-1 uppercase tracking-widest leading-none">
              {test.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
