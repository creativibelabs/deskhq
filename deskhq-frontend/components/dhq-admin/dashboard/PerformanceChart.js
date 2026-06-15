"use client";

import { ChevronDown } from "lucide-react";

const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

const SERIES = [
  { key: "organizations", label: "Organizations", color: "#153875" },
  { key: "users", label: "Users", color: "#3B7FF7" },
  { key: "revenue", label: "Revenue", color: "#0CCC67" },
];

const DATA = [
  { organizations: 100, users: 72, revenue: 86 },
  { organizations: 100, users: 72, revenue: 26 },
  { organizations: 70, users: 50, revenue: 26 },
  { organizations: 35, users: 29, revenue: 16 },
  { organizations: 50, users: 65, revenue: 23 },
  { organizations: 16, users: 72, revenue: 33 },
  { organizations: 36, users: 72, revenue: 50 },
  { organizations: 100, users: 72, revenue: 36 },
];

export default function PerformanceChart() {
  return (
    <div className="bg-white rounded-[32px] p-5 sm:p-6 flex-1">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[18px] font-medium text-[#2C2C2C]">Performance</h2>
        <button
          type="button"
          className="flex items-center gap-2 rounded-2xl py-2 px-3.5 text-[14px] font-normal text-[#2C2C2C] bg-white border border-[#ECF1FB] cursor-pointer"
        >
          Last 30 days
          <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="flex items-end justify-between gap-4 sm:gap-6 min-w-[560px] h-[200px]">
          {DATA.map((entry, index) => (
            <div key={MONTHS[index]} className="flex items-end gap-1 h-full flex-1">
              {SERIES.map(({ key, color }) => (
                <span
                  key={key}
                  className="flex-1 rounded-t-[6px] min-w-[8px]"
                  style={{ height: `${entry[key]}%`, backgroundColor: color }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 sm:gap-6 min-w-[560px] mt-3">
          {MONTHS.map((month) => (
            <span key={month} className="flex-1 text-center text-[12px] font-normal grey-color">
              {month}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 mt-6">
        {SERIES.map(({ key, label, color }) => (
          <div key={key} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[14px] font-normal grey-color">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
