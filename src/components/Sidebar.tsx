/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  activeId: string;
  onChange: (id: string) => void;
  title?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, activeId, onChange, title }) => {
  return (
    <div className="w-full md:w-64 bg-white border border-[#E8DFC9]/45 rounded-xl p-5 flex flex-col gap-6 shadow-sm font-sans text-xs">
      {title && (
        <h3 className="font-serif text-sm uppercase tracking-wider text-[#1F3B2F] font-bold border-b border-[#E8DFC9]/20 pb-3">
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-1.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`w-full text-left px-3.5 py-3 rounded transition-all cursor-pointer flex items-center gap-3 font-medium ${
                isActive
                  ? 'bg-[#1F3B2F] text-[#FAF8F3] shadow-xs'
                  : 'text-gray-500 hover:bg-[#FAF8F3]/70 hover:text-[#1F3B2F]'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
