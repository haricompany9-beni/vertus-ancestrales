/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Star, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogArticle } from '../types';

interface BlogDetailsProps {
  article: BlogArticle;
  allArticles: BlogArticle[];
  setPage: (page: string, params?: any) => void;
}

export const BlogDetails: React.FC<BlogDetailsProps> = ({
  article,
  allArticles,
  setPage,
}) => {
  // Select other related articles (not including current)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FAF8F3]/30 min-h-screen text-[#3B2F2F] pb-16 sm:pb-24"
    >
      {/* Editorial Navigation breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 flex items-center justify-between border-b border-[#E8DFC9]/20 bg-white/45">
        <button 
          onClick={() => setPage('blog')}
          className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#1F3B2F] hover:text-[#C8A96B] transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Retour au Grimoire de rituels</span>
        </button>
        <span className="text-[10px] text-[#6B7280] font-sans uppercase font-medium tracking-wider">
          Sujet : <strong className="text-[#1F3B2F] font-semibold">{article.category}</strong>
        </span>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-10">
        
        {/* COVER BLOCK IMAGE */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-[#E8DFC9]/40 bg-stone-300 mb-8 sm:mb-10">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <span className="text-[10px] uppercase bg-[#C8A96B] text-[#1F3B2F] border-none tracking-widest px-3 py-1 rounded w-max font-semibold font-sans mb-3">
              {article.category}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl text-white font-medium tracking-wide leading-tight">
              {article.title}
            </h1>
          </div>
        </div>

        {/* METADATA INDICATORS */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-[#6B7280] font-sans border-b border-[#E8DFC9]/35 pb-5.5 mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[#C8A96B]" />
            Le {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={14} className="text-[#C8A96B]" />
            Rédigé par <strong className="text-[#1F3B2F] font-semibold">{article.author}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-[#C8A96B]" />
            {article.readTime} de lecture initiée
          </span>
        </div>

        {/* ARTICLE TEXT CORE CONTENT */}
        <article className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed text-[#556B2F] space-y-6 font-sans">
          {article.content.split('\n\n').map((paragraph, index) => {
            // Very simple rich formatter checks for paragraph structures
            if (paragraph.startsWith('## ')) {
              return (
                <h3 key={index} className="font-serif text-xl sm:text-2xl text-[#1F3B2F] font-semibold pt-4 mt-6 border-b border-[#E8DFC9]/20 pb-2">
                  {paragraph.replace('## ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('* **')) {
              return (
                <div key={index} className="bg-[#FAF8F3] border-l-2 border-[#C8A96B] p-4 rounded-r my-4 pl-5">
                  <p className="font-sans italic text-[#3B2F2F]">
                    {paragraph.replace('* **', '**')}
                  </p>
                </div>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
              const numAndVal = paragraph.split('. ');
              return (
                <div key={index} className="flex gap-3.5 items-start pl-2">
                  <span className="w-5 h-5 rounded-full bg-[#1F3B2F] text-[#FAF8F3] flex items-center justify-center font-sans font-bold text-[10px] scale-95 mt-0.5 shrink-0">
                    {paragraph[0]}
                  </span>
                  <p className="text-[#3B2F2F]">{numAndVal.slice(1).join('. ')}</p>
                </div>
              );
            }
            return (
              <p key={index} className="text-[#3B2F2F]">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* TAGS CLOUD */}
        <div className="flex flex-wrap gap-2 pt-8 mt-10 border-t border-[#E8DFC9]/35">
          {article.tags.map((tag, idx) => (
            <span key={idx} className="bg-[#1F3B2F]/5 text-[#1F3B2F] border border-[#1F3B2F]/10 text-[10px] uppercase font-semibold font-sans tracking-wide px-3 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        {/* RELATED ARTICLES BLOCK */}
        <section className="mt-16 pt-12 border-t border-[#E8DFC9]/40">
          <div className="text-center flex flex-col items-center gap-1.5 mb-8">
            <Compass size={18} className="text-[#C8A96B] stroke-[1.5]" />
            <h3 className="font-serif text-xl sm:text-2xl text-[#1F3B2F] font-medium leading-none">Poursuivre la lecture céleste</h3>
            <p className="text-xs text-[#6B7280]">Découvrez d'autres secrets d'ésotérisme ou de santé naturelle.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
            {relatedArticles.map((relArt) => (
              <div 
                key={relArt.id}
                onClick={() => {
                  setPage('blog_details', { article: relArt });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group border border-[#E8DFC9]/35 hover:border-[#C8A96B]/50 bg-white/60 p-5 rounded-lg flex gap-4 items-center cursor-pointer transition-all duration-300"
              >
                <img 
                  src={relArt.image} 
                  alt="" 
                  className="w-16 h-16 rounded object-cover border shrink-0 bg-stone-100"
                />
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-amber-600 font-bold bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">{relArt.category}</span>
                  <h4 className="font-serif font-semibold text-sm text-[#1F3B2F] mt-1 group-hover:text-[#C8A96B] transition-colors leading-tight line-clamp-1">{relArt.title}</h4>
                  <span className="text-[10px] text-gray-400 mt-0.5 block flex items-center gap-1">
                    <Clock size={10} /> {relArt.readTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};
