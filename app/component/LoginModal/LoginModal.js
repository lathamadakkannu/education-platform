"use client";

import React, { useState, useEffect } from "react";
import { FaTimes, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  validateEmail,
  validateName,
  validatePassword,
} from "@/app/utils/validation";
import styles from "./LoginModal.module.scss";

const INITIAL_FORM = { name: "", email: "", password: "" };

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loginData, setLoginData] = useState(INITIAL_FORM);
  const [loginErrors, setLoginErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setLoginData(INITIAL_FORM);
      setLoginErrors({});
      setShowPassword(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateLoginField = (field, value) => {
    if (field === "name") return validateName(value, "Full name");
    if (field === "email") return validateEmail(value);
    if (field === "password") return validatePassword(value);
    return "";
  };

  const updateLoginField = (field, value) => {
    setLoginData((previous) => ({ ...previous, [field]: value }));
    setLoginErrors((previous) => ({
      ...previous,
      [field]: validateLoginField(field, value),
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = {
      name: validateLoginField("name", loginData.name),
      email: validateLoginField("email", loginData.email),
      password: validateLoginField("password", loginData.password),
    };
    setLoginErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    onLoginSuccess({
      name: loginData.name.trim(),
      email: loginData.email.trim(),
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="common-login-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close login modal"
        >
          <FaTimes />
        </button>

        <div className={styles.modalHeader}>
          <span className={styles.modalIcon} aria-hidden="true">🎓</span>
          <h2 id="common-login-title">Welcome Back</h2>
          <p>Sign in to continue learning</p>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="login-modal-name">Full Name</label>
            <input
              id="login-modal-name"
              type="text"
              placeholder="Enter your full name"
              value={loginData.name}
              maxLength={NAME_MAX_LENGTH}
              onChange={(e) => updateLoginField("name", e.target.value)}
              className={loginErrors.name ? styles.invalidField : ""}
              aria-invalid={Boolean(loginErrors.name)}
            />
            {loginErrors.name && (
              <span className={styles.fieldError}>{loginErrors.name}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="login-modal-email">Email</label>
            <input
              id="login-modal-email"
              type="email"
              placeholder="you@example.com"
              value={loginData.email}
              maxLength={EMAIL_MAX_LENGTH}
              onChange={(e) => updateLoginField("email", e.target.value)}
              className={loginErrors.email ? styles.invalidField : ""}
              aria-invalid={Boolean(loginErrors.email)}
            />
            {loginErrors.email && (
              <span className={styles.fieldError}>{loginErrors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="login-modal-password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                id="login-modal-password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={loginData.password}
                onChange={(e) => updateLoginField("password", e.target.value)}
                className={loginErrors.password ? styles.invalidField : ""}
                aria-invalid={Boolean(loginErrors.password)}
                maxLength={20}
              />
              <button
                type="button"
                className={styles.eyeToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {loginErrors.password && (
              <span className={styles.fieldError}>{loginErrors.password}</span>
            )}
          </div>

          <button type="submit" className={styles.submitLoginBtn}>
            Sign In <FaArrowRight className={styles.btnIcon} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
