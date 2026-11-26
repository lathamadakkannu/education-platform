import React from 'react'
import styles from "./RelatedCourses.module.scss"
import { FaChartLine, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import Image from 'next/image';

const RelatedCourses = () => {
  const cards = [
    {
      id: 1,
      img: "/image/img1.jpg",
      amt: "₹5,000",
      originalAmt: "₹8,000",
      rating: 4.5,
      level: "Beginner",
      duration: "6 weeks",
      title: "Introduction to Web Design: From Basics to Advanced - Explained in Tamil",
    },
    {
      id: 2,
      img: "/image/img2.png",
      amt: "₹5,500",
      originalAmt: "₹9,000",
      rating: 4.2,
      level: "Intermediate",
      duration: "8 weeks",
      title: "React & Modern JavaScript: Component Architecture & State Management",
    },
    {
      id: 3,
      img: "/image/img3.jpg",
      amt: "₹6,000",
      originalAmt: "₹10,000",
      rating: 4.6,
      level: "Advanced",
      duration: "10 weeks",
      title: "Node.js, Express & MongoDB: Building Scalable REST APIs",
    },
    {
      id: 4,
      img: "/image/img1.jpg",
      amt: "₹4,500",
      originalAmt: "₹7,500",
      rating: 4.3,
      level: "Beginner",
      duration: "6 weeks",
      title: "UI/UX Design Principles: Wireframing & Responsive Layouts",
    },
  ];

  const getStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }

    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} />);
    }

    return stars;
  };

  return (
    <div className={styles.relatedCourses}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.subtitle}>More Similar Courses</p>
          <h2>Related Courses</h2>
        </div>

        <div className={styles.coursesGrid}>
          {cards.map((card) => (
            <div key={card.id} className={styles.courseCard}>
              <div className={styles.cardInner}>
                <div className={styles.cardImage}>
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={300}
                    height={200}
                  />
                  <div className={styles.badge}>
                    <span className={styles.discountBadge}>
                      -{Math.round((1 - parseInt(card.amt.replace(/[^0-9]/g, '')) / parseInt(card.originalAmt.replace(/[^0-9]/g, ''))) * 100)}%
                    </span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.ratingSection}>
                    <div className={styles.stars}>
                      {getStars(card.rating)}
                      <span className={styles.ratingValue}>({card.rating})</span>
                    </div>
                  </div>

                  <h3 className={styles.courseTitle}>{card.title}</h3>

                  <div className={styles.courseMeta}>
                    <div className={styles.metaItem}>
                      <FiFileText />
                      <span>{card.duration}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FaChartLine />
                      <span>{card.level}</span>
                    </div>
                  </div>

                  <div className={styles.divider}></div>

                  <div className={styles.priceSection}>
                    <div className={styles.pricing}>
                      <span className={styles.currentPrice}>{card.amt}</span>
                      <span className={styles.originalPrice}>{card.originalAmt}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedCourses;