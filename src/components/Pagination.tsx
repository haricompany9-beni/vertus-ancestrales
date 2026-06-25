/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-8 font-sans text-xs">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-[#E8DFC9]/40 rounded hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer text-[#1F3B2F]"
      >
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: totalPages }).map((_, idx) => {
        const page = idx + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8.5 h-8.5 rounded font-medium select-none transition-all cursor-pointer ${
              currentPage === page
                ? 'bg-[#1F3B2F] text-[#FAF8F3] font-bold'
                : 'border border-[#E8DFC9]/40 text-gray-500 hover:bg-white hover:text-[#1F3B2F]'
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-[#E8DFC9]/40 rounded hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer text-[#1F3B2F]"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
