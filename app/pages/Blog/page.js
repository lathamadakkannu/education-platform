"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Blog.module.scss";
import { VscEye } from "react-icons/vsc";
import { FiMessageSquare } from "react-icons/fi";

const articles = [
    { id: 1, image: '/image/article1.png', title: 'Introduction to Web Design: From Basics to Advanced - Explained in Tamil', author: 'Shivan', date: 'Feb 09, 2026', views: '38.8K', comments: 12 },
    { id: 2, image: '/image/article2.png', title: 'Mastering CSS Grid & Flexbox for Responsive Multi-Device Layouts', author: 'Ananya Sharma', date: 'Jan 28, 2026', views: '24.5K', comments: 9 },
    { id: 3, image: '/image/article3.png', title: 'Building Reusable React Components with Clean State Management', author: 'Vikram Nair', date: 'Jan 19, 2026', views: '31.2K', comments: 14 },
    { id: 4, image: '/image/article4.png', title: 'Practical Web Accessibility: Designing Inclusive Digital Experiences', author: 'Priya Menon', date: 'Jan 08, 2026', views: '19.4K', comments: 7 },
    { id: 5, image: '/image/article5.png', title: 'RESTful API Design Patterns Every Full Stack Developer Should Know', author: 'Karthik Subramanian', date: 'Dec 22, 2025', views: '27.9K', comments: 11 },
    { id: 6, image: '/image/article6.png', title: 'From Wireframe to Prototype: A Beginner Guide to UI/UX Workflows', author: 'Meera Krishnan', date: 'Dec 10, 2025', views: '22.1K', comments: 8 },
    { id: 7, image: '/image/article7.png', title: 'Optimizing Next.js Performance and Core Web Vitals in Production', author: 'Rohan Kulkarni', date: 'Nov 29, 2025', views: '16.7K', comments: 6 },
    { id: 8, image: '/image/article8.png', title: 'How Capstone Projects Help Students Stand Out in Technical Interviews', author: 'Divya Raj', date: 'Nov 14, 2025', views: '29.3K', comments: 15 },
    { id: 9, image: '/image/article9.png', title: 'MongoDB Schema Modeling Tips for Modern Web Applications', author: 'Aravind S.', date: 'Oct 30, 2025', views: '18.6K', comments: 5 },
];

const Blog = () => {
    const router = useRouter();

    const handleBlogClick = (id) => {
        router.push(`/pages/Blog/BlogView?id=${id}`);
    };

    return (
        <div className={styles.blogContainer}>
            <div className={styles.articlesContainer}>
                <div className={styles.sectionHeader}>

                    <h2>Recently Added <span>Articles</span></h2>
                </div>

                <div className={styles.articleRow}>
                    {articles.map((article) => (
                        <div key={article.id} className={styles.articleCol}>
                            <div className={styles.articleCard} onClick={() => handleBlogClick(article.id)}>
                                <div className={styles.articleImg}>
                                    <img src={article.image} alt={article.title} />
                                </div>
                                <div className={styles.articleDetails}>
                                    <h3>{article.title}</h3>
                                    <div className={styles.authorInfo}>
                                        <span>By {article.author}</span>
                                        <span>Last updated on {article.date}</span>
                                    </div>
                                    <div className={styles.articleIcons}>
                                        <div className={styles.iconItem}>
                                            <VscEye />
                                            <span>{article.views}</span>
                                        </div>
                                        <div className={styles.iconItem}>
                                            <FiMessageSquare />
                                            <span>{article.comments}</span>
                                        </div>
                                        <button className={styles.viewMoreBtn}>View More</button>
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

export default Blog;