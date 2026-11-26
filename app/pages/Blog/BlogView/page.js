"use client";

import React, { Suspense } from "react";
import { MdStarRate } from "react-icons/md";
import styles from "./BlogView.module.scss";
import BackButton from "@/app/component/BackButton/BackButton";

const BLOG_REVIEWS = [
  {
    id: 1,
    name: "Arun Kumar",
    date: "Feb 14, 2026",
    rating: 5,
    avatarBg: "linear-gradient(135deg, #5751e1, #7c3aed)",
    comment:
      "This article breaks down responsive layout and visual hierarchy in a very practical way. Applying the consistency checklist immediately improved how I structure navigation and spacing in my portfolio projects.",
  },
  {
    id: 2,
    name: "Priya Nair",
    date: "Jan 28, 2026",
    rating: 5,
    avatarBg: "linear-gradient(135deg, #0ea5e9, #5751e1)",
    comment:
      "The section on accessibility and user-centered design stood out the most. It connects nicely with the platform's front-end courses and explains why readable typography and keyboard navigation matter from day one.",
  },
  {
    id: 3,
    name: "Vikram Patel",
    date: "Jan 11, 2026",
    rating: 4,
    avatarBg: "linear-gradient(135deg, #10b981, #059669)",
    comment:
      "Clear, concise, and easy to follow even for beginners. I bookmarked the simplicity guidelines to use as a quick reference before starting any new landing page or web application.",
  },
];

const BlogViewComponent = () => {
  return (
    <div className={styles.blogViewContainer}>
      <div className={styles.backBar}>
        <BackButton href="/pages/Blog" label="Back to Blog" />
      </div>
      <div className={styles.principleContainer}>
        <div className={styles.blogImg}>
          <div className={styles.imgOverlay}></div>
        </div>

        <div className={styles.principleDetails}>
          <div className={styles.principleHead}>
            <h3>Key Principles of Web Design</h3>
          </div>

          <div className={styles.principleRating}>
            <MdStarRate />
            <MdStarRate />
            <MdStarRate />
            <MdStarRate />
            <MdStarRate />
            <span>4.8</span>
          </div>

          <div className={styles.principleDate}>
            <p>Feb 09, 2026</p>
          </div>
        </div>

        <div className={styles.principleContent}>
          <div className={styles.contentBlock}>
            <h4>User-Centered Design (UCD)</h4>
            <p>The design should prioritize the needs, goals, and preferences of users. A user-friendly interface improves the overall experience and keeps visitors engaged.</p>
          </div>

          <div className={styles.contentBlock}>
            <h4>Simplicity</h4>
            <p>Effective web design avoids clutter and ensures that users can easily navigate the site. Simplicity often means clean layouts, readable fonts, and intuitive navigation.</p>
          </div>

          <div className={styles.contentBlock}>
            <h4>Consistency</h4>
            <p>Maintaining uniform design elements (fonts, colors, button styles, etc.) throughout the site creates a cohesive look and feel, enhancing the user experience.</p>
          </div>

          <div className={styles.contentBlock}>
            <h4>Responsive Design</h4>
            <p>Modern websites must work across multiple devices—desktops, tablets, and mobile phones. Responsive design ensures that the website layout adjusts to fit different screen sizes.</p>
          </div>

          <div className={styles.contentBlock}>
            <h4>Accessibility</h4>
            <p>Websites should be designed to accommodate all users, including those with disabilities. Accessibility standards ensure that sites can be navigated by screen readers, and content is understandable for users with visual or hearing impairments.</p>
          </div>
        </div>

        <div className={styles.reviewContainer}>
          <h3>Reviews</h3>

          {BLOG_REVIEWS.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewContent}>
                <div
                  className={styles.reviewProfile}
                  style={{ background: review.avatarBg }}
                  aria-label={`${review.name} avatar`}
                >
                  <span aria-hidden="true">{review.name.charAt(0).toUpperCase()}</span>
                </div>

                <div className={styles.reviewDetails}>
                  <div className={styles.userInfo}>
                    <h4>{review.name}</h4>
                    <p>{review.date}</p>
                  </div>

                  <div className={styles.reviewRating} aria-label={`${review.rating} out of 5 stars`}>
                    {[...Array(review.rating)].map((_, idx) => (
                      <MdStarRate key={idx} />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.reviewData}>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogView = () => (
  <Suspense fallback={<div className={styles.loading}>Loading blog data...</div>}>
    <BlogViewComponent />
  </Suspense>
);

export default BlogView;
