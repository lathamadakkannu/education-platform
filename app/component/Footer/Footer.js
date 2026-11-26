import React from 'react';
import styles from "./Footer.module.scss";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                {/* Contact Details Section */}
                <div className={styles.footerSection}>
                  
                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <MdPhone className={styles.contactIcon} />
                            <div>
                                <p>Call Us</p>
                                <h4>+91 12345 67890</h4>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <MdLocationOn className={styles.contactIcon} />
                            <p>123 Anna Salai street, North Side of Ganapathy Temple, Tamil Nadu.</p>
                        </div>
                        <div className={styles.contactItem}>
                            <MdEmail className={styles.contactIcon} />
                            <p>educationplatform@gmail.com</p>
                        </div>
                    </div>
                    <div className={styles.socialIcons}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* About Section */}
                <div className={styles.footerSection}>
                    <h3>About</h3>
                    <ul className={styles.footerLinks}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/pages/About">About Us</Link></li>
                        <li><Link href="/pages/Courses">Courses</Link></li>
                        <li><Link href="/pages/Blog">Blog</Link></li>
                        <li><Link href="/pages/Career">Careers</Link></li>
                    </ul>
                </div>

                {/* Categories Section */}
                <div className={styles.footerSection}>
                    <h3>Categories</h3>
                    <ul className={styles.footerLinks}>
                        <li><Link href="/pages/Business">Business</Link></li>
                        <li><Link href="/pages/Events">Events</Link></li>
                    </ul>
                </div>

                {/* Support Section */}
                <div className={styles.footerSection}>
                    <h3>Support</h3>
                    <ul className={styles.footerLinks}>
                        {/*  Fixed: Dashboard now points to ProfilePage */}
                        <li><Link href="/pages/ProfilePage">Dashboard</Link></li>
                        <li><Link href="/pages/FAQ">FAQs</Link></li>
                        <li><Link href="/pages/Contact">Contact Us</Link></li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div className={styles.copyright}>
                <p>&copy; {currentYear} Education Platform. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
