import React from "react";
import styles from "./Business.module.scss";
import Image from 'next/image';
import { PiCertificateBold } from "react-icons/pi";
import { FaPeopleLine } from "react-icons/fa6";
import ScrollToTop from "@/app/component/ScrollToTop/ScrollToTop";

const plan = [
  { id: 1, head: "100 Days Foundation", info: "Structured learning path designed to take you from beginner to confident practitioner in 100 days with daily assignments and guided exercises." },
  { id: 2, head: "Career Accelerator", info: "Comprehensive curriculum covering full-stack development, modern design workflows, and real-world team collaboration." },
  { id: 3, head: "Portfolio Capstone", info: "Industry-relevant capstone projects with mentor feedback that help you build a strong portfolio and showcase your skills to employers." },
];

const Business = () => {
  return (
    <>
      <div className={styles.businessContainer}>
        {/* Hero Section */}
        <div className={styles.businessHero}>
          <div className={styles.businessContent}>
            <h1>
              We Are <span>Increasing Business</span> Success with IT Courses
            </h1>
            <p>
              Equip your teams and aspiring professionals with practical software engineering,
              UI/UX design, and digital product skills. Our structured training tracks combine
              interactive lessons, real-world case studies, and mentor feedback to accelerate
              workplace readiness and measurable business outcomes.
            </p>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <div className={styles.iconWrapper}>
                  <PiCertificateBold />
                </div>
                <div className={styles.featureInfo}>
                  <h4>Certified Company</h4>
                  <p>Best Provide Skill Services</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.iconWrapper}>
                  <FaPeopleLine />
                </div>
                <div className={styles.featureInfo}>
                  <h4>Expert Team</h4>
                  <p>100% Expert Team</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.businessImage}>
            <Image 
              src="/image/d3.png" 
              alt="Business growth illustration" 
              width={500} 
              height={500}
              priority
            />
          </div>
        </div>

        {/* Plans Section */}
        <div className={styles.plansSection}>
          <div className={styles.sectionHeader}>
            <h2>We Are <span>Increasing Business</span></h2>
            <h2>Success with IT Courses</h2>
            <p>Choose the right learning path for your career growth</p>
          </div>

          <div className={styles.plansGrid}>
            {plan.map((item) => (
              <div key={item.id} className={styles.planCard}>
                <div className={styles.planHeader}>
                  <h3>{item.head}</h3>
                </div>
                <div className={styles.planBody}>
                  <p>{item.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Business;