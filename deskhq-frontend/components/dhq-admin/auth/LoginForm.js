"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/common/Toast";
import { commonRules, validateField, validateForm } from "@/utils/validation";
import Loader from "@/components/common/Loader";
import PasswordInput from "@/components/common/PasswordInput";
import { authAPI } from "@/utils/api";
import { isAuthenticated } from "@/utils/cookies";

const inputBase =
  "border bg-[#F7FBFF] min-h-10.5 rounded-xl focus:outline-none focus:ring-1 px-3 autofill:shadow-[inset_0_0_0px_1000px_rgb(247,251,255)] text-[14px] font-medium placeholder:text-[#72727266] dark-blue-color transition-colors";
const inputNormal = "border-[#E9EBF1] focus:ring-[#3B7FF799]";
const inputError = "border-red-400 focus:ring-red-300";

export default function DHQLoginForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const toast = useToast();

  function handleBlur(field, value) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(value, commonRules[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  function handleChange(field, value) {
    if (!touched[field]) return;
    const error = validateField(value, commonRules[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setTouched({ email: true, password: true });
    const errs = validateForm({
      email: { value: email, fieldRules: commonRules.email },
      password: { value: password, fieldRules: commonRules.password },
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);

    try {
      await authAPI.login(
        {
          login: email,
          password: password,
        },
        rememberMe,
      );

      toast.success("Logged in successfully!");
      router.push("/dhq-admin/");
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <div className="fieldWrapper flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-[16px] font-semibold grey-color"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`${inputBase} ${errors.email && touched.email ? inputError : inputNormal}`}
            placeholder="Enter your email"
            disabled={loading}
            onBlur={(e) => handleBlur("email", e.target.value)}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && touched.email && (
            <p className="text-[12px] text-red-500 font-medium mt-0.5">
              {errors.email}
            </p>
          )}
        </div>

        <div className="fieldWrapper flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-[16px] font-semibold grey-color"
          >
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Enter your password"
            disabled={loading}
            hasError={!!(errors.password && touched.password)}
            onBlur={(e) => handleBlur("password", e.target.value)}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {errors.password && touched.password && (
            <p className="text-[12px] text-red-500 font-medium mt-0.5">
              {errors.password}
            </p>
          )}
        </div>

        <div className="forgetWrapper flex items-center justify-between mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" id="remember" className="sr-only peer" />
            <div className="w-5 h-5 rounded-md bg-transparent border border-[#3B7FF7] flex items-center justify-center transition-all text-transparent peer-checked:bg-[#3B7FF7] peer-checked:border-[#3B7FF7] peer-checked:text-white">
              <svg
                className="w-3 h-3 transition-colors"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6L5 9L10 3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-[14px] font-medium grey-color">
              Remember me
            </span>
          </label>
          <Link
            href="/dhq-admin/forgot-password"
            className="text-[14px] font-medium primary-blue-color hover:underline transition-all"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="fieldWrapper flex flex-col gap-1 mt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#3B7FF7] text-white text-[16px] font-bold min-h-10.5 rounded-xl hover:bg-[#3B7FF7CC] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader /> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
