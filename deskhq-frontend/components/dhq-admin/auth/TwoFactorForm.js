"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useToast } from "@/components/common/Toast";
import Loader from "@/components/common/Loader";

const OTP_LENGTH = 6;

export default function DHQ2FAForm() {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const refs = useRef([]);
  const toast = useToast();

  async function submit(_code) {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      toast.success("Verified successfully!");
    } catch {
      toast.error("Invalid code. Please try again.");
      setDigits(Array(OTP_LENGTH).fill(""));
      refs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  function handleChange(index, value) {
    const char = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    setHasError(false);

    if (char && index < OTP_LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }

    if (char && index === OTP_LENGTH - 1) {
      const code = next.join("");
      if (code.length === OTP_LENGTH) submit(code);
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        refs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...digits];
    pasted.split("").forEach((char, i) => { next[i] = char; });
    setDigits(next);
    setHasError(false);
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    refs.current[focusIndex]?.focus();
    if (pasted.length === OTP_LENGTH) submit(pasted);
  }

  return (
    <div className="">
      <div className="flex items-center gap-4 justify-center">
        <h1 className="text-[28px] font-medium dark-blue-color">
          Two-Factor Authentication
        </h1>
      </div>
      <p className="grey-color text-[16px] font-light mt-2 text-center">
        Enter the 6-digit code from your Authenticator app.
      </p>
      <div className="formWrapper">
        <div className="mt-10">
          <div className="flex flex-col gap-6">

            <div className="relative flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (refs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    onFocus={(e) => e.target.select()}
                    disabled={loading}
                    className={`w-12 h-12 text-center text-[20px] font-bold dark-blue-color border rounded-xl bg-[#F7FBFF] focus:outline-none focus:ring-1 transition-colors disabled:opacity-60
                      ${hasError
                        ? "border-red-400 focus:ring-red-300"
                        : digit
                        ? "border-[#3B7FF7] focus:ring-[#3B7FF799]"
                        : "border-[#E9EBF1] focus:ring-[#3B7FF799]"
                      }
                      
                      ${loading ? "bg-black/5" : ""}`}
                  />
                ))}
              </div>
              {loading && (
                <div className="absolute top-0 h-12 flex items-center justify-center">
                  <Loader />
                </div>
              )}
              {hasError && (
                <p className="text-[12px] text-red-500 font-medium">
                  Please enter the complete 6-digit code.
                </p>
              )}
            </div>

            <div className="flex items-center justify-center">
              <Link href="/dhq-admin/login" className="text-[14px] font-medium primary-blue-color hover:underline transition-all">
                Back to Login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
