"use client";

import { FaTimes } from "react-icons/fa";
import styles from "./InfoModal.module.scss";

const InfoModal = ({ title, message, onClose }) => (
  <div className={styles.overlay} onClick={onClose}>
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      onClick={(event) => event.stopPropagation()}
    >
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">
        <FaTimes />
      </button>
      <h2 id="info-modal-title">{title}</h2>
      <p>{message}</p>
    </div>
  </div>
);

export default InfoModal;
