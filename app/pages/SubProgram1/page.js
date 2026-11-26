"use client";

import React, { useState } from "react"; 
import styles from "./SubProgram1.module.scss";
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";

const SubProgram1 = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    
    const questions = [
        {
            question: "What will my child learn in this program?",
            answer: "Students will explore various subjects including STEM, arts, critical thinking, and problem-solving skills through interactive sessions and hands-on projects."
        },
        {
            question: "How long is the mentorship program?",
            answer: "The program runs for 12 weeks with weekly 2-hour sessions. Students also get access to our online resources and community forums."
        },
        {
            question: "What is the class size?",
            answer: "We maintain small class sizes of 8-10 students per mentor to ensure personalized attention and effective learning."
        },
        {
            question: "Are there any prerequisites?",
            answer: "No specific prerequisites required. The program is designed for 9th graders of all skill levels."
        },
        {
            question: "How can I track my child's progress?",
            answer: "Parents receive weekly progress reports and have access to monthly parent-teacher meetings to discuss their child's development."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={styles.subProgram}>
            {/* Banner Section */}
            <div className={styles.bannerSection}>
                <div className={styles.bannerImage}>
                    <img src="/image/program1.jpg" alt="Program Banner" />
                </div>
                <div className={styles.bannerContent}>
                    <h2>DISCOVER:</h2>
                    <h3>Start Early</h3>
                    <p>for guided exploration</p>
                </div>
            </div>

            {/* About Section */}
            <div className={styles.aboutSection}>
                <div className={styles.aboutContent}>
                    <h1>About the Program</h1>
                    <p className={styles.subtitle}>Personal Mentorship Program for 9th graders</p>
                    <div className={styles.description}>
                        <p>
                            Our objective with 9th-grade students is to focus on the breadth and depth. 
                            We provide exposure to a wide spectrum of ideas, identify their areas of 
                            interest through structured intellectual exploration, and understand their 
                            capacity to excel.
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className={styles.faqSection}>
                <div className={styles.faqHeader}>
                    <h2>Frequently Asked Questions</h2>
                    <p>Everything you need to know about the program</p>
                </div>
                <div className={styles.faqContainer}>
                    {questions.map((item, index) => (
                        <div 
                            key={index} 
                            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                        >
                            <button 
                                className={styles.faqQuestion}
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={activeIndex === index}
                            >
                                <span>{item.question}</span>
                                {activeIndex === index ? (
                                    <IoArrowUpCircleOutline className={styles.arrow} />
                                ) : (
                                    <IoArrowDownCircleOutline className={styles.arrow} />
                                )}
                            </button>
                            <div className={`${styles.faqAnswer} ${activeIndex === index ? styles.show : ''}`}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubProgram1;