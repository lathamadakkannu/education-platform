"use client";

import React, { useState, useRef } from "react";
import styles from "./CareerView.module.scss";
import ScrollToTop from "@/app/component/ScrollToTop/ScrollToTop";
import BackButton from "@/app/component/BackButton/BackButton";
import { CgImage } from "react-icons/cg";
import { useApp } from "@/app/context/AppContext";
import {
  ADDRESS_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  MOBILE_LENGTH,
  NAME_MAX_LENGTH,
  sanitizeMobileInput,
  validateAddress,
  validateEmail,
  validateMobile,
  validateName,
  validateRequired,
} from "@/app/utils/validation";

const INITIAL_FORM = {
  name: "",
  email: "",
  gender: "",
  dob: "",
  address: "",
  phone: "",
  resume: null,
};

const CareerView = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const { showToast } = useApp();

  const handleApplyClick = () => {
    setShowForm(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  };

  const validateField = (name, value) => {
    if (name === "name") return validateName(value, "Full name");
    if (name === "email") return validateEmail(value);
    if (name === "gender") return validateRequired(value, "Gender");
    if (name === "dob") {
      const reqErr = validateRequired(value, "Date of birth");
      if (reqErr) return reqErr;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (Number.isNaN(selectedDate.getTime()) || selectedDate > today) {
        return "Enter a valid date of birth.";
      }
      return "";
    }
    if (name === "address") return validateAddress(value, true);
    if (name === "phone") return validateMobile(value);
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === "phone" ? sanitizeMobileInput(value) : value;
    setFormData((previous) => ({ ...previous, [name]: nextValue }));
    setErrors((previous) => ({
      ...previous,
      [name]: validateField(name, nextValue),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFormData((previous) => ({ ...previous, resume: null }));
      setErrors((previous) => ({ ...previous, resume: "Resume is required." }));
      return;
    }

    const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setFormData((previous) => ({ ...previous, resume: null }));
      setErrors((previous) => ({
        ...previous,
        resume: "Invalid file type. Please upload PDF, PNG, JPG, or JPEG files only.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormData((previous) => ({ ...previous, resume: null }));
      setErrors((previous) => ({
        ...previous,
        resume: "File size must be less than 5MB.",
      }));
      return;
    }

    setFormData((previous) => ({ ...previous, resume: file }));
    setErrors((previous) => ({ ...previous, resume: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      gender: validateField("gender", formData.gender),
      dob: validateField("dob", formData.dob),
      address: validateField("address", formData.address),
      phone: validateField("phone", formData.phone),
      resume: formData.resume ? "" : "Resume is required.",
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    showToast("Application submitted successfully!");
    setFormData(INITIAL_FORM);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setTimeout(() => {
      setShowForm(false);
    }, 1500);
  };

  return (
    <div className={styles.careerView}>
      <div className={styles.backBar}>
        <BackButton href="/pages/Career" label="Back to Careers" />
      </div>
      <div className={styles.careerDescriptionContainer}>
        <div className={styles.careerImage}></div>

        <div className={styles.descriptionData}>
          <div className={styles.descriptionHead}>
            <h3>Job Description</h3>
            <p>Senior Software Engineer Position · Remote · Full-Time</p>
          </div>
          <div className={styles.descriptionBtn}>
            <button type="button" onClick={handleApplyClick}>Apply Now</button>
          </div>
        </div>

        <div className={styles.descriptionContent}>
          <div className={styles.contentBlock}>
            <h4>Role Overview</h4>
            <p>
              We are looking for a Senior Software Engineer to architect and deliver high-performance learning tools, interactive course experiences, and scalable backend services for thousands of daily learners.
            </p>
          </div>

          <div className={styles.contentBlock}>
            <h4>System Architecture &amp; Reliability</h4>
            <p>
              Design modular, maintainable frontend and API layers with strong attention to performance, data integrity, and observability across web and mobile viewports.
            </p>
          </div>

          <div className={styles.contentBlock}>
            <h4>Cross-Functional Collaboration</h4>
            <p>
              Partner closely with curriculum designers, product managers, and instructors to translate educational workflows into intuitive, accessible product features.
            </p>
          </div>

          <div className={styles.contentBlock}>
            <h4>Code Quality &amp; Mentorship</h4>
            <p>
              Conduct thoughtful code reviews, champion automated testing practices, and mentor junior developers as our engineering team grows.
            </p>
          </div>

          <div className={styles.contentBlock}>
            <h4>Accessibility &amp; Inclusivity</h4>
            <p>
              Ensure every learning portal, assessment, and dashboard complies with modern accessibility standards so learners of all backgrounds can succeed without barriers.
            </p>
          </div>
        </div>

        <div className={styles.descriptionDetails}>
          <h3>Core Technical Stack:</h3>
          <div className={styles.detailBlock}>
            <h4>React, Next.js &amp; Modern JavaScript</h4>
            <p>Strong proficiency in building responsive component libraries, state management flows, and server-rendered or static Next.js applications.</p>
          </div>

          <div className={styles.detailBlock}>
            <h4>Node.js, REST APIs &amp; Databases</h4>
            <p>Experience designing clean RESTful endpoints, authentication flows, and relational or document data models with MongoDB or PostgreSQL.</p>
          </div>

          <h3>Preferred Qualifications &amp; Benefits:</h3>

          <div className={styles.detailBlock}>
            <h4>Testing, CI/CD &amp; Cloud Deployment</h4>
            <p>Hands-on familiarity with automated testing, version control workflows, and cloud hosting platforms for reliable continuous delivery.</p>
          </div>

          <div className={styles.detailBlock}>
            <h4>Learning-First Culture</h4>
            <p>Flexible remote schedule, annual learning stipend, mentorship programs, and direct impact on students advancing their careers.</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div ref={formRef} className={styles.formContainer}>
          <h3>Application Form</h3>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="career-name">Full Name *</label>
                <input
                  id="career-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  maxLength={NAME_MAX_LENGTH}
                  onChange={handleChange}
                  className={errors.name ? styles.invalidField : ""}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="career-email">Email Address *</label>
                <input
                  id="career-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={EMAIL_MAX_LENGTH}
                  className={errors.email ? styles.invalidField : ""}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="career-gender">Gender *</label>
                <select
                  id="career-gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={errors.gender ? styles.invalidField : ""}
                  aria-invalid={Boolean(errors.gender)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <span className={styles.errorMessage}>{errors.gender}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="career-dob">Date of Birth *</label>
                <input
                  id="career-dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={errors.dob ? styles.invalidField : ""}
                  aria-invalid={Boolean(errors.dob)}
                />
                {errors.dob && <span className={styles.errorMessage}>{errors.dob}</span>}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="career-address">Address *</label>
                <input
                  id="career-address"
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  maxLength={ADDRESS_MAX_LENGTH}
                  onChange={handleChange}
                  className={errors.address ? styles.invalidField : ""}
                  aria-invalid={Boolean(errors.address)}
                />
                {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="career-phone">Phone Number *</label>
                <input
                  id="career-phone"
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  placeholder="Enter 10-digit mobile number"
                  maxLength={MOBILE_LENGTH}
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? styles.invalidField : ""}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
              </div>
            </div>

            <div className={styles.fileUpload}>
              <label htmlFor="career-resume">Upload Your Resume *</label>
              <div
                className={`${styles.fileUploadContainer} ${
                  errors.resume ? styles.invalidUpload : ""
                }`}
              >
                <div className={styles.fileUploadContent}>
                  <CgImage />
                  <p>Drag &amp; drop or click to browse</p>
                  <span className={styles.fileSizeInfo}>PNG, PDF, JPG, JPEG (max 5MB)</span>
                </div>
                <input
                  id="career-resume"
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                />
              </div>
              {errors.resume && <span className={styles.errorMessage}>{errors.resume}</span>}
              {formData.resume && (
                <span className={styles.fileSuccessMessage}>
                  ✓ {formData.resume.name} uploaded successfully
                </span>
              )}
            </div>

            <div className={styles.submitBtn}>
              <button type="submit">Submit Application</button>
            </div>
          </form>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default CareerView;
