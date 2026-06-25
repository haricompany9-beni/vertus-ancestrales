/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white/70 p-6 sm:p-8 rounded-lg border border-[#E8DFC9]/30 shadow-sm relative hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Absolute quoting block watermarks */}
      <Quote size={40} className="absolute top-6 right-6 text-[#E8DFC9]/20 stroke-[1]" />

      <div>
        <div className="flex items-center gap-1.5 mb-4 text-[#C8A96B]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < testimonial.rating ? 'fill-current text-[#C8A96B]' : 'opacity-20'} 
            />
          ))}
        </div>

        <p className="font-sans text-xs italic leading-relaxed text-[#3B2F2F] pr-4">
          "{testimonial.review}"
        </p>
      </div>

      <div className="flex items-center gap-4 mt-6 pt-5 border-t border-[#E8DFC9]/20">
        {testimonial.avatar ? (
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-[#C8A96B]/50 shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#1F3B2F] text-[#FAF8F3] flex items-center justify-center font-serif text-sm border border-[#C8A96B]/40 shrink-0">
            {testimonial.name[0]}
          </div>
        )}
        <div>
          <h4 className="font-serif text-sm font-medium text-[#1F3B2F] tracking-wide">
            {testimonial.name}
          </h4>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] text-[#556B2F] font-sans">
              Client vérifié
            </span>
            {testimonial.verified && (
              <CheckCircle size={10} className="text-[#1F7A4D] fill-current text-white" />
            )}
            <span className="text-[10px] text-[#6B7280] font-sans">• {testimonial.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
