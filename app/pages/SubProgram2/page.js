"use client";

import React, { useState } from "react";
import styles from "./SubProgram2.module.scss";

const Content = () => {
    const [expandedCardId, setExpandedCardId] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    const cardDetails = [
        { 
            id: 1,
            title: "Empowering Learners",
            information: "At our educational platform, we believe in empowering every learner with the tools they need to succeed. Our courses are designed to be inclusive, engaging, and accessible to all."
        },
        {
            id: 2,
            title: "Diverse Course",
            information: "Explore a wide range of courses across various fields, tailored to meet your interests and goals. From professional development to personal enrichment, we have something for everyone.", 
        },
        {
            id: 3,
            title: "Expert Instructors",
            information: "Learn from experienced professionals who are passionate about teaching and sharing their knowledge. Our instructors bring real-world experience and insights to the classroom."
        },
        {
            id: 4,
            title: "Interactive Learning",
            information: "Engage in a dynamic learning experience that goes beyond traditional methods. Our platform features interactive tools, discussions, and collaborative projects to enhance your understanding.", 
        },
        {
            id: 5,
            title: "Flexible Learning",
            information: "Life can be busy, which is why we offer flexible learning options that fit your schedule. Access our courses anytime, anywhere, allowing you to learn at your own pace.", 
        },
        {
            id: 6,
            title: "Community Support",
            information: "Join a vibrant community of learners who are just as passionate about education as you are. Our platform fosters connections and encourages collaboration through forums and group discussions.", 
        },
    ];

    const handleCardClick = (card) => {
        if (expandedCardId === card.id) {
            setSelectedCard(card);
        } else {
            setExpandedCardId(card.id);
        }
    };

    const closeSelectedCard = () => {
        setSelectedCard(null);
        setExpandedCardId(null);
    };

    const closeExpandedCard = (e, cardId) => {
        e.stopPropagation();
        setExpandedCardId(null);
    };

    return (
        <div className={styles.contentContainer}>
            {/* Hero Image Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroImage}>
                    <img src="/image/program1.jpg" alt="Learning program banner" />
                </div>
                <div className={styles.heroOverlay}>
                    <h1>Your Path to Personalized and Engaging Learning</h1>
                </div>
            </div>

            {/* Introduction Section */}
            <div className={styles.introSection}>
                <div className={styles.introContent}>
                    <div className={styles.introText}>
                        <p>
                            We believe that education should be accessible, engaging, and tailored to every learner's unique needs.
                            Our platform brings together a vast range of courses, expert instructors, and interactive learning tools 
                            designed to empower you on your educational journey.
                        </p>
                    </div>
                    <div className={styles.actionText}>
                        <p>
                            Our platform allows you to engage directly with expert instructors, participate in vibrant discussions, 
                            and collaborate with peers from around the world. You will also receive exclusive access to members-only 
                            content, special offers, and timely notifications on new course launches and updates.
                        </p>
                        
                    </div>
                </div>
            </div>

            {/* Expandable Cards Section */}
            <div className={styles.cardsSection}>
                <div className={styles.sectionHeader}>
                    <h2>Why Choose Us</h2>
                    <p>Discover what makes our learning platform unique</p>
                </div>
                <div className={styles.cardGrid}>
                    {cardDetails.map((card) => (
                        <div key={card.id} className={styles.cardContainer}>
                            <div 
                                className={`${styles.card} ${expandedCardId === card.id ? styles.expanded : ''}`}
                            >
                                <div className={styles.cardHeader} onClick={() => handleCardClick(card)}>
                                    <h3>{card.title}</h3>
                                    <span className={styles.expandIcon}>
                                        {expandedCardId === card.id ? '−' : '+'}
                                    </span>
                                </div>
                                
                                {expandedCardId === card.id && (
                                    <div className={styles.cardContent}>
                                        <p>{card.information}</p>
                                        <button 
                                            className={styles.expandBtn}
                                            onClick={(e) => handleCardClick(card)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Selected Card */}
            {selectedCard && (
                <div className={styles.modalOverlay} onClick={closeSelectedCard}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={closeSelectedCard}>×</button>
                        <h2>{selectedCard.title}</h2>
                        <p>{selectedCard.information}</p>
                        <button className={styles.modalActionBtn} onClick={closeSelectedCard}>
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Content;