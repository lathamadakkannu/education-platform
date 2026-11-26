"use client";

import React from "react";
import Image from "next/image";
import styles from "./Events.module.scss";
import ScrollToTop from "@/app/component/ScrollToTop/ScrollToTop";

const Events = () => {
  const webDesignPrinciples = [
    {
      title: "User-Centered Design (UCD)",
      content: "The design should prioritize the needs, goals, and preferences of users. A user-friendly interface improves the overall experience and keeps visitors engaged."
    },
    {
      title: "Simplicity",
      content: "Simplicity ensures that users can easily navigate the site. It often means clean layouts, readable fonts, and intuitive navigation."
    },
    {
      title: "Consistency",
      content: "Maintaining uniform design elements (fonts, colors, button styles, etc.) throughout the site creates a cohesive look and feel, enhancing the user experience."
    },
    {
      title: "Responsive Design",
      content: "Modern websites must work across multiple devices—desktops, tablets, and mobile phones. Responsive design ensures that the website layout adjusts to fit different screen sizes."
    },
    {
      title: "Accessibility",
      content: "Websites should be designed to accommodate all users, including those with disabilities. Accessibility standards ensure that sites can be navigated by screen readers and are understandable for users with visual or hearing impairments."
    }
  ];

  const designSoftware = [
    {
      name: "Adobe XD, Figma, Sketch",
      description: "These tools are used for creating wireframes, mockups, and prototypes. They provide designers with an environment to experiment with layouts and UI elements."
    },
    {
      name: "Photoshop, Illustrator",
      description: "Graphics design software used to create and edit visual elements such as logos, icons, and custom images."
    }
  ];

  const cmsPlatforms = [
    {
      name: "WordPress, Wix, Squarespace",
      description: "CMS platforms that offer pre-built themes and templates for easy web design and content management."
    },
    {
      name: "Webflow",
      description: "A no-code tool that combines visual design with the power of HTML/CSS."
    }
  ];

  return (
    <div className={styles.events}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>
            Introduction to Web Design: From Basics <br /> to Advanced - Explained in Tamil
          </h1>
        </div>
        <div className={styles.heroImage}>
          <Image 
            src="/image/events.jpeg" 
            width={1200} 
            height={500} 
            alt="Web Design Events"
            priority
          />
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        {/* Principles Section */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h2>Key Principles of Web Design</h2>

          </div>
          <div className={styles.sectionContent}>
            {webDesignPrinciples.map((principle, index) => (
              <div key={index} className={styles.principleItem}>
                <h3>{principle.title}</h3>
                <p>{principle.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Design Software Section */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h2>Web Design Tools</h2>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.subSection}>
              <h3>Design Software:</h3>
              <div className={styles.toolsList}>
                {designSoftware.map((tool, index) => (
                  <div key={index} className={styles.toolItem}>
                    <h4>{tool.name}</h4>
                    <p>{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.subSection}>
              <h3>Website Builders and Content Management Systems (CMS):</h3>
              <div className={styles.toolsList}>
                {cmsPlatforms.map((platform, index) => (
                  <div key={index} className={styles.toolItem}>
                    <h4>{platform.name}</h4>
                    <p>{platform.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Events;