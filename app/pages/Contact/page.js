"use client";

import React, { useState } from "react";
import styles from "./Contact.module.scss";
import { CiMail } from "react-icons/ci";
import { FaPhone, FaMapLocation } from "react-icons/fa6";
import ScrollToTop from "@/app/component/ScrollToTop/ScrollToTop";
import { useApp } from "@/app/context/AppContext";
import {
    EMAIL_MAX_LENGTH,
    MOBILE_LENGTH,
    NAME_MAX_LENGTH,
    sanitizeMobileInput,
    validateEmail,
    validateMobile,
    validateName,
    validateRequired,
} from "@/app/utils/validation";

const details = [
    { id: 1, img: "/image/contactImg2.png", icon: <CiMail />, info: "educationplatform@gmail.com", label: "Email Us" },
    { id: 2, img: "/image/contactImg2.png", icon: <FaPhone />, info: "+91 12345 67890", label: "Call Us" },
    { id: 3, img: "/image/contactImg2.png", icon: <FaMapLocation />, info: "123 Anna Salai street, North Side of Ganapathy Temple, Tamil Nadu.", label: "Visit Us" },
];

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const { showToast } = useApp();

    const validateField = (name, value) => {
        if (name === "name") return validateName(value, "Name");
        if (name === "email") return validateEmail(value);
        if (name === "phone") return validateMobile(value);
        if (name === "gender") return validateRequired(value, "Gender");
        if (name === "message") return validateRequired(value, "Message");
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nextValue = name === "phone" ? sanitizeMobileInput(value) : value;
        setFormData((previous) => ({ ...previous, [name]: nextValue }));
        setErrors((previous) => ({ ...previous, [name]: validateField(name, nextValue) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextErrors = Object.fromEntries(
            Object.entries(formData).map(([name, value]) => [name, validateField(name, value)])
        );
        setErrors(nextErrors);
        if (Object.values(nextErrors).some(Boolean)) return;

        const msg = "Your message has been sent successfully!";
        showToast(msg);

        setFormData({
            name: "",
            email: "",
            phone: "",
            gender: "",
            message: "",
        });
        setErrors({});
    };

    return (
        <div className={styles.contactContainer}>
            <div className={styles.headerSection}>
                <h2>
                    <span>Contact</span> Us
                </h2>
                <p>Get in touch with us for any queries or support</p>
            </div>

            <div className={styles.contactImg}></div>

            <div className={styles.contactCards}>
                <div className={styles.contactRow}>
                    {details.map((detail) => (
                        <div key={detail.id} className={styles.contactCol}>
                            <div className={styles.contactCard}>
                                <div className={styles.contactHead}>
                                    <img src={detail.img} alt={detail.label} />
                                </div>
                                <div className={styles.contactDetails}>
                                    <div className={styles.iconWrapper}>
                                        {detail.icon}
                                    </div>
                                    <h4>{detail.label}</h4>
                                    <p>{detail.info}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.contactForm}>
                <div className={styles.formHeader}>
                    <h3>Send Us a Message</h3>
                    <p>We'd love to hear from you</p>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.formContainer}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    maxLength={NAME_MAX_LENGTH}
                                    onChange={handleChange}
                                    className={errors.name ? styles.invalidField : ""}
                                    aria-invalid={Boolean(errors.name)}
                                />
                                {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    maxLength={EMAIL_MAX_LENGTH}
                                    className={errors.email ? styles.invalidField : ""}
                                    aria-invalid={Boolean(errors.email)}
                                />
                                {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    maxLength={MOBILE_LENGTH}
                                    inputMode="numeric"
                                    title="Please enter a valid 10-digit phone number"
                                    className={errors.phone ? styles.invalidField : ""}
                                    aria-invalid={Boolean(errors.phone)}
                                />
                                {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={errors.gender ? styles.invalidField : ""}
                                    aria-invalid={Boolean(errors.gender)}
                                >
                                    <option value="" disabled>Select Your Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && <span className={styles.fieldError}>{errors.gender}</span>}
                            </div>
                        </div>

                        <div className={styles.formGroupFull}>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                maxLength={300}
                                onChange={handleChange}
                                rows="5"
                                className={errors.message ? styles.invalidField : ""}
                                aria-invalid={Boolean(errors.message)}
                            />
                            {errors.message && <span className={styles.fieldError}>{errors.message}</span>}
                        </div>

                        <div className={styles.submitButton}>
                            <button type="submit">
                                Send Message
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Contact;