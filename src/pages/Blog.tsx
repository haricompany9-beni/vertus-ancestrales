/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Compass, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogArticle } from '../types';
import { BlogCard } from '../components/BlogCard';

interface BlogProps {
  articles: BlogArticle[];
  setPage: (page: string, params?: any) => void;
}

export const Blog: React.FC<BlogProps> = ({ articles, setPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'Tous' | 'Ésotérisme' | 'Ritualité' | 'Bien-être'>('Tous');

  // Filtering Logic
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        art => art.title.toLowerCase().includes(q) || 
               art.excerpt.toLowerCase().includes(q) || 
               art.content.toLowerCase().includes(q)
      );
    }

    // Category match
    if (activeCategory !== 'Tous') {
      result = result.filter(art => art.category === activeCategory);
    }

    return result;
  }, [articles, searchQuery, activeCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FAF8F3]/30 min-h-screen text-[#3B2F2F]"
    >
      {/* Blog Hero Header */}
      <section className="bg-[#FAF8F3] py-14 sm:py-20 border-b border-[#E8DFC9]/40 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-semibold">Le Grimoire Alchimique</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1F3B2F] font-medium tracking-wide">
            Le Carnet de Sagesse Ancestrale
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] font-sans max-w-xl italic mt-1 leading-relaxed">
            Consultez les écrits, correspondances de lunes et secrets d'herboristerie d'altitude de Monique Morgat pour guider votre chemin.
          </p>
        </motion.div>
      </section>

      {/* Main Search and filter tabs */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 flex flex-col gap-8">
        
        {/* Horizontal filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4.5 rounded-lg border border-[#E8DFC9]/35 shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {(['Tous', 'Ésotérisme', 'Ritualité', 'Bien-être'] as const).map((cat) => {
              const isCurrent = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs tracking-wider uppercase font-semibold px-4 py-2.5 rounded transition-all cursor-pointer ${
                    isCurrent 
                      ? 'bg-[#1F3B2F] text-white shadow-sm' 
                      : 'text-[#6B7280] hover:bg-[#FAF8F3] hover:text-[#1F3B2F]'
                  }`}
                >
                  {cat === 'Tous' ? 'Tout voir' : cat}
                </button>
              );
            })}
          </div>

          {/* Search Input bar */}
          <div className="flex border border-[#E8DFC9] rounded bg-[#FAF8F3]/10 overflow-hidden p-0.5 w-full md:w-80">
            <input
              type="text"
              placeholder="Rechercher une fiole, un oracle..."
              className="bg-transparent text-xs text-[#3B2F2F] px-3 py-2 w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Blog grid stage */}
        {filteredArticles.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#E8DFC9] rounded-lg bg-white/50">
            <p className="text-sm text-[#6B7280] font-sans italic">Aucun carnet de sagesse ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('Tous');
              }}
              className="bg-[#1F3B2F] text-white text-xs tracking-widest uppercase font-semibold px-6 py-2.5 rounded mt-4"
            >
              Réinitialiser la recherche
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <BlogCard
                key={article.id}
                article={article}
                onClick={() => setPage('blog_details', { article })}
              />
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};
