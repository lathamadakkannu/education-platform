"use client";

import React, { useState } from "react";
import styles from "./SignIn.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/context/AppContext";
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  validateEmail,
  validateName,
  validatePassword,
} from "@/app/utils/validation";

const SignIn = () => {
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { login, showToast } = useApp();

  const validateField = (field, value) => {
    if (field === "name") return validateName(value, "Full name");
    if (field === "email") return validateEmail(value);
    if (field === "password") return validatePassword(value);
    return "";
  };

  const updateField = (field, value) => {
    if (field === "name") setName(value);
    if (field === "email") setIdentifier(value);
    if (field === "password") setPassword(value);
    setErrors((previous) => ({ ...previous, [field]: validateField(field, value) }));
  };

  const handleSignin = (e) => {
    e.preventDefault();
    const nextErrors = {
      name: validateField("name", name),
      email: validateField("email", identifier),
      password: validateField("password", password),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    login(
      { name: name.trim(), email: identifier.trim() },
      { silentToast: true }
    );
    showToast("Signed in successfully. Redirecting...");

    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    const destination = returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//")
      ? returnTo
      : "/pages/ProfilePage";
    setTimeout(() => router.push(destination), 1200);
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signinForm}>
        <h3>Welcome</h3>
        <form onSubmit={handleSignin} noValidate>

          {/* ── Name field ── */}
          <div className={styles.signinInputs}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              maxLength={NAME_MAX_LENGTH}
              placeholder="Enter your full name"
              onChange={(e) => updateField("name", e.target.value)}
              className={errors.name ? styles.invalidField : ""}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
          </div>

          <div className={styles.signinInputs}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={identifier}
              maxLength={EMAIL_MAX_LENGTH}
              onChange={(e) => updateField("email", e.target.value)}
              className={errors.email ? styles.invalidField : ""}
              aria-invalid={Boolean(errors.email)}
              title="Please enter a valid email address."
            />
            {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
          </div>

          <div className={styles.signinInputs}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordContainer}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                maxLength={20}
                onChange={(e) => updateField("password", e.target.value)}
                className={errors.password ? styles.invalidField : ""}
                aria-invalid={Boolean(errors.password)}
                title="Password must be at least 6 characters long."
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            <div className={styles.forgotPassword}>
              <span>Forgot Password?</span>
            </div>
          </div>

          <div className={styles.btns}>
            <button type="submit" className={styles.signinBtn}>
              Sign in
            </button>
            <p>Or</p>
            <button type="button" className={styles.googleBtn}>
              <FcGoogle className={styles.googleIcon} />
              Login with Google
            </button>
          </div>
        </form>
      </div>

      <div className={styles.signinImg}>
        <div className={styles.logoImg}>
          <Image src="/image/SignInLogo.png" alt="logo" width={100} height={100} />
        </div>
        <div className={styles.logoImg1}>
          <Image src="/image/rb_757.png" alt="Sign In" width={100} height={100} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;