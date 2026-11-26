"use client";

import React, { useState, useRef } from "react";
import { FaAngleRight } from "react-icons/fa";
import styles from "./Career.module.scss";
import Link from "next/link";
import ScrollToTop from "@/app/component/ScrollToTop/ScrollToTop";

const Career = () => {
  const [filter, setFilter] = useState("recent");

  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      img: "/image/career1.png",
      info: "Architect scalable React and Node.js learning experiences, lead technical reviews, and mentor engineers across core product squads.",
      experience: "3+ Years Experience",
      date: "Remote | Today",
      addedRecently: true,
    },
    {
      id: 2,
      title: "Junior Software Engineer",
      img: "/image/career2.png",
      info: "Build responsive UI components, collaborate on API integrations, and grow your full-stack engineering skills with senior mentorship.",
      experience: "Fresher / 0-1 Year Experience",
      date: "Remote | Yesterday",
      addedRecently: false,
    },
    {
      id: 3,
      title: "Full Stack Developer",
      img: "/image/career3.png",
      info: "Develop end-to-end course dashboards, interactive assessments, and REST APIs using Next.js, Express, and modern databases.",
      experience: "1-2 Years Experience",
      date: "Remote | Today",
      addedRecently: true,
    },
    {
      id: 4,
      title: "Backend Developer",
      img: "/image/career4.png",
      info: "Design reliable API services, optimize database queries, and maintain secure authentication and enrollment workflows.",
      experience: "1-2 Years Experience",
      date: "Remote | Last Week",
      addedRecently: false,
    },
  ];

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredJobs = filter === "recent" ? jobs.filter((job) => job.addedRecently) : jobs;

  return (
    <div className={styles.careerContainer}>
      <div className={styles.careerHead}>
        <h2>
          <span>Come</span> Work With Us
        </h2>
        <p>We are looking for great people, who love their work, solving problems, and having fun.</p>
      </div>

      <div className={styles.careerImg}></div>

      <div className={styles.careerFilter}>
        <button
          className={`${styles.filterBtn} ${filter === "recent" ? styles.active : ""}`}
          onClick={() => handleFilterChange("recent")}
        >
          Recently Added
        </button>
        <button
          className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`}
          onClick={() => handleFilterChange("all")}
        >
          See All
        </button>
      </div>

      <div className={styles.jobsList}>
        {filteredJobs.map((job) => (
          <div className={styles.careerContent} key={job.id}>
            <div className={styles.careerContentImg}>
              <img src={job.img} alt={job.title} />
            </div>

            <div className={styles.careerDetails}>
              <h3>{job.title}</h3>
              <p className={job.info}>{job.info}</p>
              <div className={styles.jobMeta}>
                <span className={styles.experience}>{job.experience}</span>
                <span className={styles.date}>{job.date}</span>
              </div>
            </div>

            <div className={styles.careerBtn}>
              <Link href="/pages/Career/CareerView">
                Read More <FaAngleRight />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Career;