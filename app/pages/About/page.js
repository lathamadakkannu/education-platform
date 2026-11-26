"use client"; 

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { PiCertificateBold } from "react-icons/pi";
import { FaPeopleLine, FaSquarePhone } from "react-icons/fa6";
import { MdCheckCircle } from 'react-icons/md';
import styles from "./About.module.scss";
import ScrollToTop from '@/app/component/ScrollToTop/ScrollToTop';

const About = () => {
  const teamMembers = [
    { id: 1, img: '/image/imgslide1.png', name: 'Elisa Peter', role: 'Web Designer' },
    { id: 2, img: '/image/imgslide2.png', name: 'Andrus', role: 'Software Engineer' },
    { id: 3, img: '/image/imgslide3.png', name: 'Elson Peter', role: 'Web Designer' },
    { id: 4, img: '/image/imgslide4.png', name: 'Lisa David', role: 'Java Trainer' },
    { id: 5, img: '/image/imgslide5.jpg', name: 'Sarah Johnson', role: 'UI/UX Designer' },
    { id: 6, img: '/image/imgslide6.jpg', name: 'Michael Chen', role: 'Full Stack Developer' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 600) return 1;
      if (window.innerWidth < 1024) return 2;
      return 4;
    }
    return 4;
  };

  useEffect(() => {
    const handleResize = () => {
      const newCardsPerView = getCardsPerView();
      setCardsPerView(newCardsPerView);
      if (currentIndex >= teamMembers.length - newCardsPerView) {
        setCurrentIndex(Math.max(0, teamMembers.length - newCardsPerView));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, teamMembers.length]);

  const nextSlide = () => {
    if (currentIndex < teamMembers.length - cardsPerView) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className={styles.about}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroImage}>
            <Image 
              src="/image/about.png" 
              alt="About Education Platform" 
              width={500} 
              height={500}
              priority
            />
          </div>

          <div className={styles.heroContent}>
            <h1>We Are <span>Increasing Business</span> Success with IT Courses</h1>
            <p>
              We empower learners and organizations with practical technology education,
              industry-aligned curricula, and mentor-led training designed to turn skills into measurable career growth.
            </p>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <PiCertificateBold />
                </div>
                <div className={styles.featureInfo}>
                  <h4>Certified Company</h4>
                  <p>Best Provide Skill Services</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <FaPeopleLine />
                </div>
                <div className={styles.featureInfo}>
                  <h4>Expert Team</h4>
                  <p>100% Expert Team</p>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
             

              <div className={styles.contactInfo}>
                <div className={styles.contactIcon}>
                  <FaSquarePhone />
                </div>
                <div className={styles.contactText}>
                  <h4>Call Us On:</h4>
                  <p>+91 12345 67890</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeContent}>
            <h2>Welcome to Education Platform</h2>
            <p>At Education Platform, we are on a mission to empower individuals with the knowledge and skills needed to thrive in the ever-evolving world of technology. 
              Established with a passion for innovation and a commitment to excellence, 
              we strive to be a beacon of learning, where aspiring tech professionals find the guidance and resources to turn their dreams into reality.
            </p>
          </div>

          <div className={styles.missionVision}>
            <div className={styles.missionCard}>
              <h3>Our Mission</h3>
              <p>To provide accessible, high-quality educational content and resources to learners of all ages, 
                empowering them to reach their full potential through personalized, interactive, and engaging learning experiences.
              </p>
            </div>

            <div className={styles.visionCard}>
              <h3>Our Vision</h3>
              <p>To become a global leader in online education by fostering a culture of continuous learning, innovation, and inclusion, 
                ensuring that knowledge is accessible to everyone, everywhere, transforming lives through education.
              </p>
            </div>
          </div>
        </div>

        {/* Approach Section */}
        <div className={styles.approachSection}>
          <div className={styles.approachImage}>
            <img src="/image/about2.png" alt="Our Approach" />
          </div>
          <div className={styles.approachContent}>
            <h2>Our <span>Approach</span> and How We <span>Function</span></h2>
            <p>At Educational Platform, our approach is centered on delivering high-quality, accessible, 
              and personalized education to learners around the world. We blend technology, pedagogy, and design to create an ecosystem where learners, educators, and institutions thrive.
            </p>
          </div>
        </div>

        {/* Function Section */}
        <div className={styles.functionSection}>
          <div className={styles.functionGrid}>
            <div className={styles.functionCard}>
              <h3>Learner-Centric</h3>
              <p>Personalized learning paths driven by AI and data to enhance engagement and help learners succeed.</p>
            </div>
            <div className={styles.functionCard}>
              <h3>Accessible</h3>
              <p>Inclusive design with mobile access, screen readers, and multilingual support to ensure education for all.</p>
            </div>
            <div className={styles.functionCard}>
              <h3>Collaborative</h3>
              <p>Interactive tools and real-time feedback foster community and teamwork.</p>
            </div>
            <div className={styles.functionCard}>
              <h3>Engaging Content</h3>
              <p>Dynamic multimedia, quizzes, and gamification make learning fun and inspiring.</p>
            </div>
          </div>
          <div className={styles.functionImage}>
            <img src="/image/about3.png" alt="How we function" />
          </div>
        </div>

        {/* Capabilities Section */}
        <div className={styles.capabilitiesSection}>
          <h2>Our Core Platform <span>Capabilities</span></h2>
          
          <div className={styles.capabilitiesGrid}>
            <div className={styles.capabilityItem}>
              <MdCheckCircle className={styles.checkIcon} />
              <div>
                <h3>Cloud-Based Infrastructure</h3>
                <p>Our platform is cloud-hosted, ensuring security, scalability, and reliability for millions of learners.</p>
              </div>
            </div>
            <div className={styles.capabilityItem}>
              <MdCheckCircle className={styles.checkIcon} />
              <div>
                <h3>Advanced LMS</h3>
                <p>Our LMS manages user registration, course progress, and certification, providing a smooth experience for learners and educators.</p>
              </div>
            </div>
            <div className={styles.capabilityItem}>
              <MdCheckCircle className={styles.checkIcon} />
              <div>
                <h3>Educator Support</h3>
                <p>Tools and dashboards empower educators to easily create and manage courses while we handle the tech.</p>
              </div>
            </div>
            <div className={styles.capabilityItem}>
              <MdCheckCircle className={styles.checkIcon} />
              <div>
                <h3>24/7 Support</h3>
                <p>Our team offers round-the-clock assistance for both learners and educators.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className={styles.teamSection}>
          <div className={styles.sectionHeader}>
            <h2>See Our Skilled Expert <span>Team</span></h2>
            <p>TEAM MEMBERS</p>
          </div>

          <div className={styles.teamSlider}>
            <button 
              className={`${styles.sliderBtn} ${styles.prevBtn}`} 
              onClick={prevSlide} 
              disabled={currentIndex === 0}
            >
              <AiOutlineLeft />
            </button>

            <div className={styles.sliderContainer}>
              <div 
                className={styles.sliderTrack}
                style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
              >
                {teamMembers.map((member) => (
                  <div key={member.id} className={styles.teamCard}>
                    <div className={styles.teamImage}>
                      <img src={member.img} alt={member.name} />
                    </div>
                    <div className={styles.teamInfo}>
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className={`${styles.sliderBtn} ${styles.nextBtn}`} 
              onClick={nextSlide} 
              disabled={currentIndex >= teamMembers.length - cardsPerView}
            >
              <AiOutlineRight />
            </button>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
};

export default About;