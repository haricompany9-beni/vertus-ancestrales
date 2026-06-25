/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Clock, Euro, Check, Heart, Sparkles } from 'lucide-react';
import { Consultation } from '../types';

interface ConsultationCardProps {
  consultation: Consultation;
  onSelect: () => void;
  isSelected?: boolean;
}

export const ConsultationCard: React.FC<ConsultationCardProps> = ({ 
  consultation, 
  onSelect,
  isSelected = false
}) => {
  return (
    <div 
      className={`bg-[#FAF8F3]/60 rounded-xl overflow-hidden border transition-all duration-500 flex flex-col lg:flex-row h-full ${
        isSelected 
          ? 'border-[#C8A96B] shadow-lg ring-1 ring-[#C8A96B]' 
          : 'border-[#E8DFC9]/40 hover:border-[#C8A96B]/50 hover:bg-white shadow-sm hover:shadow-md'
      }`}
    >
      {/* Visual illustration of the sacred space */}
      <div className="lg:w-2/5 relative min-h-[220px] lg:min-h-full bg-[#F3EEE3]">
        <img 
          src={consultation.image} 
          alt={consultation.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1F3B2F]/10"></div>
        
        {/* Corner icon badges */}
        <div className="absolute top-4 left-4 bg-[#1F3B2F] text-[#C8A96B] p-2.5 rounded-full border border-[#C8A96B]/30 shadow-md">
          {consultation.type === 'general' ? <Heart size={18} /> : <Sparkles size={18} />}
        </div>
      </div>

      {/* Structured core info column */}
      <div className="lg:flex-1 p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Metadata banner */}
          <div className="flex flex-wrap items-center gap-4 text-xs tracking-wider uppercase font-medium text-[#556B2F] font-sans mb-3.5">
            <span className="flex items-center gap-1.5 bg-[#F3EEE3] px-3 py-1 rounded-full">
              <Clock size={13} className="text-[#C8A96B]" />
              {consultation.duration}
            </span>
            <span className="flex items-center gap-1.5 bg-[#FAF8F3] px-3 py-1 rounded-full border border-[#E8DFC9]/40 text-[#1F3B2F]">
              <Euro size={13} className="text-[#C8A96B]" />
              {consultation.price} €
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-[#1F3B2F] mb-3">
            {consultation.title}
          </h3>
          <p className="text-sm leading-relaxed text-[#6B7280] font-sans mb-6">
            {consultation.description}
          </p>

          <h4 className="font-serif text-sm tracking-widest text-[#1F3B2F] uppercase mb-3 font-semibold">
            Ce que comprend la séance :
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 text-xs text-[#3B2F2F] font-sans">
            {consultation.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-[#1F3B2F]/10 text-[#1F3B2F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={10} className="stroke-[3]" />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-[#E8DFC9]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7280] font-sans italic text-center sm:text-left">
            * Séance réalisée en visioconférence ou en cabinet privé à Paris.
          </p>
          <button
            onClick={onSelect}
            className={`w-full sm:w-auto text-xs tracking-widest uppercase font-medium px-6 py-3.5 rounded transition-all duration-300 shadow-sm cursor-pointer ${
              isSelected 
                ? 'bg-[#C8A96B] hover:bg-[#1F3B2F] hover:text-[#FAF8F3] text-white' 
                : 'bg-[#1F3B2F] hover:bg-[#556B2F] text-white hover:shadow'
            }`}
          >
            {isSelected ? 'Sélectionné • Choisir autre chose' : 'Choisir cette consultation'}
          </button>
        </div>
      </div>
    </div>
  );
};
