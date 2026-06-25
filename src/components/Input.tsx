/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full font-sans text-xs">
      {label && <label className="font-semibold text-gray-700">{label}</label>}
      <input
        className={`border border-[#E8DFC9] px-3.5 py-2.5 rounded bg-[#FAF8F3]/30 focus:bg-white focus:outline-none focus:border-[#C8A96B] transition-colors ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 text-[10px]">{error}</span>}
    </div>
  );
};
