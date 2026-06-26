/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, BookOpen, Compass, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const RencontreMonique: React.FC = () => {
  const certifications = [
    { title: "Diplôme National d'Herboristerie Pratique", school: "École Européenne des Médecines Douces, Paris" },
    { title: "Maîtrise Professionnelle de Magnétisme Holistique", school: "Alliance des Praticiens Énergéticiens Sacrés" },
    { title: "Praticienne Certifiée de Reiki Traditionnel Usui", school: "Lignage direct Japonais de Transmission Intuitif" },
    { title: "Lecture & Alignement des corps subtils (Aura)", school: "Institut International de Recherche Animique" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FAF8F3]/30 min-h-screen text-[#3B2F2F] pb-16 sm:pb-24 font-sans"
    >
      
      {/* 1. HERO CORNER */}
      <section className="bg-[#FAF8F3] py-16 sm:py-24 border-b border-[#E8DFC9]/40 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-semibold">Le Guide de l'Ombre et de la Lumière</span>
          <h1 className="font-serif text-3xl sm:text-[54px] text-[#1F3B2F] font-medium leading-[1.1] tracking-tight">
            Monique Morgat, Praticienne & Médium
          </h1>
          <p className="text-xs sm:text-base text-[#6B7280] font-sans max-w-xl italic mt-2.5 leading-relaxed">
            "Ma vie est dédiée à catalyser vos rituels d'éveil intérieurs et extérieurs par la sagesse médicinale des plantes sauvages."
          </p>
        </motion.div>
      </section>

      {/* 2. BIOGRAPHY SECTION */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Monique Photo card left */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 flex flex-col gap-4"
        >
          <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-[#C8A96B]/30 bg-stone-300">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" 
              alt="Monique Morgat" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-[#FAF8F3] p-4 rounded border border-[#E8DFC9]/40 text-center">
            <p className="font-serif text-sm font-semibold text-[#1F3B2F]">Monique Morgat</p>
            <p className="text-[10px] text-[#C8A96B] uppercase font-sans tracking-wider mt-1">Cabinet Privé, Paris Vème</p>
          </div>
        </motion.div>

        {/* Narrative bio right */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="md:col-span-7 flex flex-col gap-6"
        >
          <span className="text-[10px] uppercase text-[#C8A96B] tracking-wider font-semibold">Lignée et chemin d'incarnation</span>
          <h2 className="font-serif text-2xl sm:text-3.5xl text-[#1F3B2F] font-semibold leading-tight">Canaliser le souffle guérisseur</h2>
          
          <div className="text-xs leading-relaxed text-[#6B7280] flex flex-col gap-4">
            <p>
              Iniciée très tôt par sa grand-mère herboriste dans les hauts plateaux sauvages de l'Aubrac, Monique a développé dès son enfance une sensibilité intuitive peu commune, percevant les vibrations émergeant des cours d'eau, des minéraux d'arène et des feuillages. Après des études académiques complétées par plusieurs cycles cliniques en médecine naturelle et phytothérapie, elle décide d'unifier ces deux compétences.
            </p>
            <p>
              "Soigner l'épiderme sans pacifier l'esprit revient à essuyer l'eau sans couper la source." C'est sur ce précepte holistique d'excellence que Monique fonde **Vertus Ancestrales**. Elle y verse toute sa science des sèves végétales précieuses en synergie étroite avec la canalisation vibratoire des ondes sacrées terrestres.
            </p>
            <p>
              Chaque onguent qui quitte l'atelier d'herboristerie est personnellement consacré et magnétisé pour libérer ses pleins potentiels régénérateurs, physiologiques et spirituels.
            </p>
          </div>

          {/* Expertises areas lists */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#E8DFC9]/20 mt-4"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-1.5 p-3.5 bg-[#FAF8F3]/80 hover:bg-[#FAF8F3] hover:shadow-md transition-all duration-300 rounded border border-[#E8DFC9]/35"
            >
              <Compass size={16} className="text-[#C8A96B]" />
              <h4 className="font-serif font-semibold text-[#1F3B2F] text-xs">Clairvoyance</h4>
              <p className="text-[10px] text-[#6B7280]">Lecture d'aura et guidance spirituelle intuitive.</p>
            </motion.div>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-1.5 p-3.5 bg-[#FAF8F3]/80 hover:bg-[#FAF8F3] hover:shadow-md transition-all duration-300 rounded border border-[#E8DFC9]/35"
            >
              <Award size={16} className="text-[#C8A96B]" />
              <h4 className="font-serif font-semibold text-[#1F3B2F] text-xs">Phytothérapie</h4>
              <p className="text-[10px] text-[#6B7280]">Conception alchimique d'onguents sacrés bio.</p>
            </motion.div>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-1.5 p-3.5 bg-[#FAF8F3]/80 hover:bg-[#FAF8F3] hover:shadow-md transition-all duration-300 rounded border border-[#E8DFC9]/35"
            >
              <BookOpen size={16} className="text-[#C8A96B]" />
              <h4 className="font-serif font-semibold text-[#1F3B2F] text-xs">Magnétisme</h4>
              <p className="text-[10px] text-[#6B7280]">Soins énergétiques de méridiens corporels.</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. CERTIFICATIONS SECTION */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#E8DFC9]/30">
        <div className="max-w-[850px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center flex flex-col items-center gap-2 mb-12"
          >
            <Award size={20} className="text-[#C8A96B] stroke-[1.5]" />
            <h2 className="font-serif text-2xl sm:text-3.5xl text-[#1F3B2F] font-semibold">Parcours, Diplômes & Sceaux</h2>
            <p className="text-xs text-[#6B7280]">Un socle de compétences académiques et empiriques d'excellence certifié.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 font-sans bg-[#FAF8F3]/50 p-6 sm:p-8 rounded-xl border border-[#E8DFC9]/40"
          >
            {certifications.map((cert, index) => (
              <div key={index} className="flex gap-4 items-start pb-4 border-b border-[#E8DFC9]/20 last:border-0 last:pb-0">
                <div className="w-5 h-5 rounded-full bg-[#1F3B2F]/10 text-[#1F3B2F] flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 size={13} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#1F3B2F] leading-tight">{cert.title}</h4>
                  <p className="text-[11px] text-[#6B7280] font-sans mt-0.5">{cert.school}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};
