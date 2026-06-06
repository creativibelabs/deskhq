"use client";

import { useState } from "react";

const inputBase =
  "w-full border bg-[#F7FBFF] min-h-10.5 rounded-xl focus:outline-none focus:ring-1 px-3 pr-10 autofill:shadow-[inset_0_0_0px_1000px_rgb(247,251,255)] text-[14px] font-medium placeholder:text-[#72727266] dark-blue-color transition-colors";
const inputNormal = "border-[#E9EBF1] focus:ring-[#3B7FF799]";
const inputError  = "border-red-400 focus:ring-red-300";

function EyeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20C5 20 1 12 1 12A18.45 18.45 0 015.06 5.06M9.9 4.24A9.12 9.12 0 0112 4C19 4 23 12 23 12A18.5 18.5 0 0120.71 15.68M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.88 9.88A3 3 0 0114.12 14.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function PasswordInput({ id, name, placeholder, disabled, hasError, onBlur, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        id={id}
        name={name}
        className={`${inputBase} ${hasError ? inputError : inputNormal}`}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={onBlur}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-[#72727299] hover:text-[#727272] transition-colors"
        tabIndex={-1}
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
