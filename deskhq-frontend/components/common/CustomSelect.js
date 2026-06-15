"use client";

import { useState, useRef, useEffect } from "react";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 bg-white shadow-[0px_4px_6px_0px_#00000008] rounded-full py-2.5 px-4 text-[14px] font-normal text-[#2C2C2C] cursor-pointer select-none min-w-36"
      >
        <span className="flex-1 text-left">
          {selected ? selected.label : <span className="text-[#2C2C2C] font-normal">{placeholder}</span>}
        </span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.144967 0.149109C-0.0483224 0.347922 -0.0483224 0.67026 0.144967 0.869072L4.10456 4.9418C4.19738 5.03727 4.32328 5.09091 4.45455 5.09091C4.58581 5.09091 4.71171 5.03727 4.80453 4.9418L8.76412 0.869072C8.95741 0.67026 8.95741 0.347921 8.76412 0.149109C8.57083 -0.0497035 8.25745 -0.0497034 8.06416 0.149109L4.45455 3.86185L0.844932 0.149109C0.651642 -0.0497031 0.338257 -0.0497031 0.144967 0.149109Z"
            fill="#153875"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-full bg-white rounded-[14px] shadow-[0px_8px_24px_0px_#00000012] overflow-hidden">
          {options.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors duration-150 cursor-pointer
                  ${value === option.value
                    ? "dark-blue-color font-medium bg-[#EBF1FD]"
                    : "grey-color hover:bg-[#F5F8FF] hover:text-[#153875]"
                  }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
