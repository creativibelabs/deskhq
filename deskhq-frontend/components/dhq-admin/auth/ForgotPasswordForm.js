"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/common/Toast";
import { commonRules, validateField } from "@/utils/validation";
import Loader from "@/components/common/Loader";

const inputBase =
  "border bg-[#F7FBFF] min-h-10.5 rounded-xl focus:outline-none focus:ring-1 px-3 autofill:shadow-[inset_0_0_0px_1000px_rgb(247,251,255)] text-[14px] font-medium placeholder:text-[#72727266] dark-blue-color transition-colors";
const inputNormal = "border-[#E9EBF1] focus:ring-[#3B7FF799]";
const inputError = "border-red-400 focus:ring-red-300";

export default function DHQForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formattedEmail, setFormattedEmail] = useState("");

  function validate(value) {
    return validateField(value, commonRules.email);
  }

  function handleBlur(e) {
    setTouched(true);
    setError(validate(e.target.value));
  }

  function handleChange(e) {
    if (!touched) return;
    setError(validate(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;

    setTouched(true);
    const err = validate(email);
    setError(err);
    if (err) return;

    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      setSubmitted(true);
      setFormattedEmail(formatEmail(email));
      // toast.success("Reset link sent! Check your inbox.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function formatEmail(email) {
    const [name, domain] = email.split("@");

    const masked =
      name.length > 1 ? name[0] + "*".repeat(name.length - 1) : "*";

    return `${masked}@${domain}`;
  }

  return (
    <div className="">
      {!submitted ? (
        <>
          <div className="flex items-center gap-4 justify-center">
            <h1 className="text-[28px] font-medium dark-blue-color">
              Forgot Password?
            </h1>
          </div>
          <p className="grey-color text-[16px] font-light mt-2 text-center">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <div className="formWrapper">
            <div className="mt-10">
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
                noValidate
              >
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
                    className={`${inputBase} ${error && touched ? inputError : inputNormal}`}
                    placeholder="Enter your email"
                    disabled={loading}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {error && touched && (
                    <p className="text-[12px] text-red-500 font-medium mt-0.5">
                      {error}
                    </p>
                  )}
                </div>

                <div className="fieldWrapper flex flex-col gap-1 mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#3B7FF7] text-white text-[16px] font-bold min-h-10.5 rounded-xl hover:bg-[#3B7FF7CC] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader /> : "Send Reset Link"}
                  </button>
                </div>

                <div className="fieldWrapper flex flex-col gap-1 items-center justify-center">
                  <Link
                    href="/dhq-admin/login"
                    className="text-[14px] font-medium primary-blue-color hover:underline transition-all"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[36px] font-bold dark-blue-color">
            Check Your Email
          </h2>
          <p className="grey-color text-[16px] font-light text-center">
            We've sent a password reset link to{" "}
            <span className="font-semibold">{formattedEmail}</span>. Please
            check your inbox and follow the instructions to reset your password.
          </p>
          <Link
            href="/dhq-admin/login"
            className="text-[14px] font-medium primary-blue-color hover:underline transition-all"
          >
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
}
