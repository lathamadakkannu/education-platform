"use client";

import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaRegUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/app/context/AppContext";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const { user, logout, openLoginModal } = useApp();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      if (prev) {
        setIsAboutDropdownOpen(false);
        setIsCoursesDropdownOpen(false);
      }
      return !prev;
    });
  };

  return (
    <div className={styles.navbarMain}>
      <div className={styles.navbarContainer}>
        <nav className={styles.navbar}>
          {/* ── Left: Logo + Nav links ── */}
          <div className={styles.navIcons}>
            <div className={styles.logo}>
              <Link href="/">
                <Image src="/image/Component 1.png" alt="Logo" width={150} height={50} />
              </Link>
            </div>

            {/* Hamburger */}
            <div className={styles.menuToggle} onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes className={styles.icon} /> : <FaBars className={styles.icon} />}
            </div>

            {/* Nav Items */}
            <ul className={`${styles.navItems} ${isMenuOpen ? styles.active : ""}`}>
              <li><Link href="/" onClick={toggleMenu}>Home</Link></li>

              <li
                className={`${styles.hasDropdown} ${isAboutDropdownOpen ? styles.dropdownActive : ""}`}
                onClick={() => { setIsAboutDropdownOpen((p) => !p); setIsCoursesDropdownOpen(false); }}
              >
                About <FaChevronDown className={styles.dropdownIcon} />
                {isAboutDropdownOpen && (
                  <ul className={styles.dropdown}>
                    <li><Link href="/pages/About" onClick={toggleMenu}>About Us</Link></li>
                    <li><Link href="/pages/Events" onClick={toggleMenu}>Events</Link></li>
                  </ul>
                )}
              </li>

              <li
                className={`${styles.hasDropdown} ${isCoursesDropdownOpen ? styles.dropdownActive : ""}`}
                onClick={() => { setIsCoursesDropdownOpen((p) => !p); setIsAboutDropdownOpen(false); }}
              >
                Programs <FaChevronDown className={styles.dropdownIcon} />
                {isCoursesDropdownOpen && (
                  <ul className={styles.dropdown}>
                    <li><Link href="/pages/SubProgram1" onClick={toggleMenu}>Sub-Program 1</Link></li>
                    <li><Link href="/pages/SubProgram2" onClick={toggleMenu}>Sub-Program 2</Link></li>
                    <li><Link href="/pages/SubProgram3" onClick={toggleMenu}>Sub-Program 3</Link></li>
                  </ul>
                )}
              </li>

              <li><Link href="/pages/Courses" onClick={toggleMenu}>Courses</Link></li>
              <li><Link href="/pages/Blog" onClick={toggleMenu}>Blogs</Link></li>
              <li><Link href="/pages/Career" onClick={toggleMenu}>Career</Link></li>
            </ul>
          </div>

          {/* ── Right: Auth ── */}
          <div className={styles.rightMenu}>
            {user ? (
              <>
                <Link href="/pages/ProfilePage" className={styles.userInfo}>
                  <FaRegUserCircle className={styles.icon} />
                  <span className={styles.helloText}>
                    Hello, <strong>{user.name}</strong>
                  </span>
                </Link>
                <button type="button" className={styles.logoutBtn} onClick={logout}>
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                className={styles.signInBtn}
                onClick={() => openLoginModal()}
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
