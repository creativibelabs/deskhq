import { LayoutGrid, ChevronRight, CircleCheck, CircleDashed, CircleX } from "lucide-react";

const MODULES = [
  { name: "Project Management", status: "Active" },
  { name: "Project Management", status: "Active" },
  { name: "Project Management", status: "Active" },
  { name: "Project Management", status: "Active" },
  { name: "Project Management", status: "Active" },
];

const SUMMARY = [
  { label: "Active Modules", value: 123, icon: CircleCheck, color: "#0CCC67" },
  { label: "Inactive Modules", value: 123, icon: CircleDashed, color: "#727272" },
  { label: "Disabled Modules", value: 123, icon: CircleX, color: "#F11D1D" },
];

export default function CoreModules() {
  return (
    <div className="bg-white rounded-[32px] p-5 sm:p-6 w-full xl:w-[368px] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <LayoutGrid className="w-[22px] h-[22px] primary-blue-color" strokeWidth={2} />
          <h2 className="text-[16px] font-medium text-[#2C2C2C]">Core Modules</h2>
        </div>
        <button type="button" className="flex items-center gap-1 text-[14px] font-normal text-[#2C2C2C] cursor-pointer">
          View All
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {MODULES.map((module, index) => (
          <li
            key={`${module.name}-${index}`}
            className="flex items-center justify-between gap-3 bg-[#D9E6F8] rounded-2xl py-2 px-2.5"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-[26px] h-[26px] rounded-[8px] flex items-center justify-center bg-[#3B7FF7] shrink-0">
                <LayoutGrid className="w-3.5 h-3.5 text-white" strokeWidth={2} />
              </span>
              <span className="text-[14px] font-normal text-[#2C2C2C]">{module.name}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-2xl py-1 px-2.5 text-[14px] font-normal text-[#0CCC67] bg-[#0CCC6733]">
              <span className="w-2 h-2 rounded-full bg-[#0CCC67]" />
              {module.status}
            </span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-3 gap-2.5">
        {SUMMARY.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-[#ECF1FB] rounded-2xl p-3 flex flex-col gap-2">
            <Icon className="w-[22px] h-[22px]" style={{ color }} strokeWidth={2} />
            <div className="flex flex-col">
              <span className="text-[11px] font-normal grey-color">{label}</span>
              <span className="text-[18px] font-medium" style={{ color }}>
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
