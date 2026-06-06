"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/common/Toast";
import { commonRules, rules, validateField, validateForm } from "@/utils/validation";
import Loader from "@/components/common/Loader";
import PasswordInput from "@/components/common/PasswordInput";


export default function DHQResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [password, setPassword] = useState("");
  const toast = useToast();

  const confirmPasswordRules = [
    rules.required("Confirm Password"),
    rules.match(password, "Passwords"),
  ];

  function handleBlur(field, value) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldRules = field === "password" ? commonRules.password : confirmPasswordRules;
    setErrors((prev) => ({ ...prev, [field]: validateField(value, fieldRules) }));
  }

  function handleChange(field, value) {
    if (field === "password") setPassword(value);
    if (!touched[field]) return;
    const fieldRules = field === "password" ? commonRules.password : confirmPasswordRules;
    setErrors((prev) => ({ ...prev, [field]: validateField(value, fieldRules) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newPassword = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    setTouched({ password: true, confirmPassword: true });
    const errs = validateForm({
      password:        { value: newPassword,      fieldRules: commonRules.password },
      confirmPassword: { value: confirmPassword,  fieldRules: [rules.required("Confirm Password"), rules.match(newPassword, "Passwords")] },
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      {!submitted ? (
        <>
          <div className="flex items-center gap-4 justify-center">
            <h1 className="text-[28px] font-medium dark-blue-color">
              Reset Password
            </h1>
          </div>
          <p className="grey-color text-[16px] font-light mt-2 text-center">
            Enter your new password below.
          </p>
          <div className="formWrapper">
            <div className="mt-10">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>

                <div className="fieldWrapper flex flex-col gap-1">
                  <label htmlFor="password" className="text-[16px] font-semibold grey-color">
                    New Password
                  </label>
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="Enter new password"
                    disabled={loading}
                    hasError={!!(errors.password && touched.password)}
                    onBlur={(e) => handleBlur("password", e.target.value)}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  {errors.password && touched.password && (
                    <p className="text-[12px] text-red-500 font-medium mt-0.5">{errors.password}</p>
                  )}
                </div>

                <div className="fieldWrapper flex flex-col gap-1">
                  <label htmlFor="confirmPassword" className="text-[16px] font-semibold grey-color">
                    Confirm Password
                  </label>
                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    disabled={loading}
                    hasError={!!(errors.confirmPassword && touched.confirmPassword)}
                    onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-[12px] text-red-500 font-medium mt-0.5">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="fieldWrapper flex flex-col gap-1 mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#3B7FF7] text-white text-[16px] font-bold min-h-10.5 rounded-xl hover:bg-[#3B7FF7CC] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader /> : "Reset Password"}
                  </button>
                </div>

                <div className="fieldWrapper flex flex-col gap-1 items-center justify-center">
                  <Link href="/dhq-admin/login" className="text-[14px] font-medium primary-blue-color hover:underline transition-all">
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
            Password Reset!
          </h2>
          <p className="grey-color text-[16px] font-light text-center">
            Your password has been reset successfully. You can now log in with your new password.
          </p>
          <Link
            href="/dhq-admin/login"
            className="bg-[#3B7FF7] text-white text-[14px] font-bold px-6 min-h-10.5 rounded-xl hover:bg-[#3B7FF7CC] transition-all flex items-center"
          >
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
}
