import React from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import styles from "./BackButton.module.scss";

// Reusable "back to list" button for detail pages.
// Uses a fixed href so it works even after a refresh or when the page is opened directly.
const BackButton = ({ href, label }) => (
  <Link href={href} className={styles.backButton} aria-label={label}>
    <IoArrowBack aria-hidden="true" />
    <span>{label}</span>
  </Link>
);

export default BackButton;
