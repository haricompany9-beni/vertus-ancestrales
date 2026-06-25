/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl border border-[#E8DFC9] w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative animate-scale-up">
        <div className="flex items-center justify-between p-5 border-b border-[#E8DFC9]/20 bg-[#FAF8F3] shrink-0">
          <h3 className="font-serif text-lg font-semibold text-[#1F3B2F]">{title || 'Alerte'}</h3>
          <button onClick={onClose} className="p-1 rounded-full text-[#3B2F2F] hover:bg-[#E8DFC9]/40 transition-colors cursor-pointer">
            <X size={16} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
