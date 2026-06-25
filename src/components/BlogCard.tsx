/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BlogArticle } from '../types';

interface BlogCardProps {
  article: BlogArticle;
  onClick: () => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article, onClick }) => {
  // Mapping color palettes according to categories
  const categoryColors = {
    'Ésotérisme': 'bg-[#FAF8F3] text-[#3B2F2F] border-[#C8A96B]/30',
    'Ritualité': 'bg-[#FAF8F3] text-[#1F3B2F] border-[#1F3B2F]/25',
    'Bien-être': 'bg-[#FAF8F3] text-[#556B2F] border-[#556B2F]/25'
  };

  return (
    <article 
      onClick={onClick}
      className="group flex flex-col justify-between bg-[#FAF8F3]/60 rounded-lg overflow-hidden border border-[#E8DFC9]/30 hover:border-[#C8A96B]/50 hover:bg-white transition-all duration-500 h-full cursor-pointer shadow-sm hover:shadow-md"
    >
      <div>
        {/* Cover Illustration */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EEE3]">
          <img 
            src={article.image} 
            alt={article.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
          />
          <span className={`absolute top-4 left-4 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded border font-sans font-medium ${
            categoryColors[article.category] || 'bg-[#FAF8F3] text-[#1F3B2F]'
          }`}>
            {article.category}
          </span>
        </div>

        {/* Content detail */}
        <div className="p-6">
          <div className="flex items-center gap-4 text-[11px] text-[#6B7280] font-sans mb-3.5">
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-[#C8A96B]" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <User size={12} className="text-[#C8A96B]" />
              Par {article.author}
            </span>
          </div>

          <h3 className="font-serif text-xl font-medium tracking-wide text-[#1F3B2F] mb-3 group-hover:text-[#C8A96B] transition-colors leading-snug">
            {article.title}
          </h3>
          <p className="text-xs leading-relaxed text-[#6B7280] font-sans line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Read More link */}
      <div className="px-6 pb-6 pt-4 border-t border-[#E8DFC9]/20 flex items-center justify-between">
        <span className="text-[11px] font-sans text-[#6B7280] uppercase tracking-wider">
          {article.readTime} de lecture
        </span>
        <span className="flex items-center gap-1 text-xs tracking-widest uppercase font-medium text-[#1F3B2F] group-hover:text-[#C8A96B] transition-colors">
          <span>Lire l'article</span>
          <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
        </span>
      </div>
    </article>
  );
};
