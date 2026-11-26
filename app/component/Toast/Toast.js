"use client";

import React from "react";
import { FaCheckCircle, FaInfoCircle, FaTimes } from "react-icons/fa";
import styles from "./Toast.module.scss";

const Toast = ({ toast, onDismiss }) => {
  if (!toast) return null;

  const isInfo = toast.type === "info";

  return (
    <div
      className={`${styles.toast} ${isInfo ? styles.toastInfo : styles.toastSuccess}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.toastIcon} aria-hidden="true">
        {isInfo ? <FaInfoCircle /> : <FaCheckCircle />}
      </span>
      <span className={styles.toastMessage}>{toast.message}</span>
      <button
        type="button"
        className={styles.toastClose}
        onClick={onDismiss}
        aria-label="Close notification"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast;
