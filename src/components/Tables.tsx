/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TablesProps {
  headers: string[];
  children: React.ReactNode;
}

export const Table: React.FC<TablesProps> = ({ headers, children }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#E8DFC9]/35 bg-white shadow-xs font-sans text-xs">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#FAF8F3] border-b border-[#E8DFC9]/35 text-[#1F3B2F] font-bold uppercase tracking-wider text-[10px]">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="p-4.5 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8DFC9]/20 text-gray-700">
          {children}
        </tbody>
      </table>
    </div>
  );
};
