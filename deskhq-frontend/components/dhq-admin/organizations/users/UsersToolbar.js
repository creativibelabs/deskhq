"use client";

import { Search, Filter, Download, Plus, ChevronDown } from "lucide-react";

export default function UsersToolbar({ search, onSearchChange, onFilter, onExport, onAddUser }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="flex items-center gap-1.5 bg-white rounded-full py-2.5 px-4 w-full max-w-[210px]">
          <Search className="w-4 h-4 grey-color shrink-0" strokeWidth={2} />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search for anything..."
            className="w-full bg-transparent text-[13px] font-normal text-[#2C2C2C] placeholder:grey-color outline-none"
          />
        </label>

        <button
          type="button"
          onClick={onFilter}
          className="flex items-center gap-1.5 bg-white rounded-full py-2 px-3.5 text-[14px] font-normal text-[#2C2C2C] cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <Filter className="w-3.5 h-3.5" strokeWidth={2} />
          Filter
          <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
        </button>

        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-1.5 bg-white rounded-full py-2 px-3.5 text-[14px] font-normal text-[#2C2C2C] cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <Download className="w-3.5 h-3.5" strokeWidth={2} />
          Export
        </button>
      </div>

      <button
        type="button"
        onClick={onAddUser}
        className="flex items-center gap-2 bg-[#3B7FF7] rounded-full py-1.5 pl-1.5 pr-3.5 text-[16px] font-semibold text-white cursor-pointer self-start sm:self-auto hover:scale-105 transition-transform duration-200"
      >
        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          <Plus className="w-4 h-4" strokeWidth={2} />
        </span>
        Add Users
      </button>
    </div>
  );
}
