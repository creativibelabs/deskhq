"use client";

import { useState } from "react";
import Image from "next/image";
import SideBarLinks from "@/utils/SideBarLinks";

export default function DHQSidebar({ role = "prod-admin" }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`${collapsed ? "w-20" : "w-65"} shrink-0 min-h-screen overflow-hidden transition-[width] duration-300 ease-in-out`}
    >
      <div className="p-7.5 pr-0">
        {/* Header */}
        <div className={`flex items-center ${ collapsed ? "justify-center" : "justify-between" } gap-2 `}>
          <div
            className={`overflow-hidden transition-[max-width,opacity] duration-200 ease-in-out ${
              collapsed ? "max-w-0 opacity-0 hidden" : "max-w-33.75 opacity-100"
            }`}
          >
            <Image
              src="/assets/common/logo.webp"
              alt="logo"
              width={135}
              height={35.2}
              className="shrink-0"
            />
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-7.5 h-7.5 rounded-full bg-[#FFFFFF66] border border-white flex items-center justify-center cursor-pointer shrink-0"
          >
            <svg
              width="6"
              height="9"
              viewBox="0 0 6 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.94171 0.144967C4.7429 -0.0483224 4.42056 -0.0483224 4.22175 0.144967L0.14902 4.10456C0.0535471 4.19738 -8.88407e-05 4.32328 -8.88407e-05 4.45455C-8.88407e-05 4.58581 0.0535471 4.71171 0.14902 4.80453L4.22175 8.76412C4.42056 8.95741 4.7429 8.95741 4.94171 8.76412C5.14052 8.57083 5.14052 8.25745 4.94171 8.06416L1.22897 4.45455L4.94171 0.844932C5.14052 0.651642 5.14052 0.338257 4.94171 0.144967Z"
                fill="#3B7FF7"
              />
            </svg>
          </button>
        </div>

        {/* Icon logo — collapsed state only */}
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out flex justify-center ${
            collapsed ? "max-h-12 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <Image
            src="/assets/common/icon-logo.webp"
            alt="logo"
            width={32}
            height={32}
          />
        </div>

        {/* Links */}
        <div className={`${collapsed ? "mt-4" : "mr-7.5 mt-11.5"}`}>
          <SideBarLinks role={role} collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
}
