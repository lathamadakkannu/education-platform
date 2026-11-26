"use client";

import React, { useState } from "react";
import { MdKeyboardArrowDown } from 'react-icons/md'; 
import styles from "./Faq.module.scss";
import ScrollToTop from "@/app/component/ScrollToTop/ScrollToTop";

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const questions = [
        {
            question: "What is this platform about?",
            answer: "This platform provides educational resources, courses, and tutorials on web design and development. We offer comprehensive learning materials for beginners to advanced learners."
        },
        {
            question: "How can I enroll in a course?",
            answer: "You can enroll in any course by clicking on the 'Enroll Now' button on the course page. You'll need to create an account first if you haven't already."
        },
        {
            question: "Are the courses free?",
            answer: "We offer both free and premium courses. Free courses provide basic knowledge, while premium courses include advanced topics, projects, and certification."
        },
        {
            question: "Do I get a certificate after completion?",
            answer: "Yes, upon successful completion of any premium course, you will receive a verifiable certificate that you can share on your LinkedIn profile or resume."
        },
        {
            question: "How long do I have access to the courses?",
            answer: "Once you enroll in a course, you have lifetime access to all the materials, including future updates to that course."
        },
        {
            question: "Can I get a refund if I'm not satisfied?",
            answer: "Yes, we offer a 30-day money-back guarantee for all premium courses. If you're not satisfied, contact our support team for a full refund."
        },
        {
            question: "Is there any support available if I get stuck?",
            answer: "Absolutely! We have a dedicated support team and a community forum where you can ask questions and get help from instructors and fellow learners."
        },     
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={styles.faqContainer}>
            <div className={styles.faqHeader}>
                <div className={styles.faqImg}>
                    <img src="/image/faq.jpeg" alt="FAQ Illustration" />
                </div>
                
                <div className={styles.headerContent}>
                    <h2>Frequently Asked <span>Questions</span></h2>
                    <p>Find answers to common questions about our platform and services</p>
                </div>
            </div>

            <div className={styles.questionsWrapper}>
                <div className={styles.questionsContainer}>
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
                                <MdKeyboardArrowDown className={`${styles.arrow} ${activeIndex === index ? styles.rotate : ''}`} />
                            </button>
                            <div className={`${styles.faqAnswer} ${activeIndex === index ? styles.show : ''}`}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Faq;