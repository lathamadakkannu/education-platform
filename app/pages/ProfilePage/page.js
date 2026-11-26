"use client";

import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.scss";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
  FaGraduationCap,
  FaCheckCircle,
  FaSpinner,
  FaChartLine,
  FaCalendarAlt,
  FaPaperPlane,
  FaTrashAlt,
  FaRegClock,
  FaLaptopCode,
  FaCss3Alt,
  FaNodeJs,
  FaReact,
  FaHome,
} from "react-icons/fa";
import { MdAssignment, MdDashboard, MdMenuBook, MdFavorite, MdShoppingCart } from "react-icons/md";
import { BiCertification } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useApp } from "@/app/context/AppContext";

// ─── DASHBOARD ─────────────────────────────────────────────────────────────

const Dashboard = ({ user }) => (
  <div className={styles.subPage}>
    <div className={styles.welcomeBanner}>
      <div className={styles.welcomeAvatar}>
        {user?.name?.charAt(0).toUpperCase()}
      </div>
      <div>
        <h2 className={styles.welcomeTitle}>Welcome back, {user?.name}</h2>
        <p className={styles.welcomeSub}>
          {user?.email}
        </p>
      </div>
    </div>

    <div className={styles.dashGrid}>
      {[
        { icon: <FaGraduationCap />, val: 12, label: "Enrolled Courses", color: "#5751e1" },
        { icon: <FaCheckCircle />, val: 8, label: "Completed", color: "#10b981" },
        { icon: <FaSpinner />, val: 3, label: "In Progress", color: "#f59e0b" },
        { icon: <BiCertification />, val: 5, label: "Certificates", color: "#8b5cf6" },
      ].map((c) => (
        <div key={c.label} className={styles.dashCard}>
          <span className={styles.dashIcon} style={{ color: c.color }}>{c.icon}</span>
          <h3>{c.val}</h3>
          <p>{c.label}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─── MY COURSES ────────────────────────────────────────────────────────────

const MyCourses = () => (
  <div className={styles.subPage}>
    <div className={styles.courseGrid}>
      {[
        { title: "React Masterclass", instructor: "Ananya Sharma", progress: 75, icon: <FaReact />, color: "#61dafb" },
        { title: "Web Development", instructor: "Vikram Nair", progress: 50, icon: <FaLaptopCode />, color: "#e34f26" },
        { title: "Modern CSS", instructor: "Priya Menon", progress: 90, icon: <FaCss3Alt />, color: "#2965f1" },
        { title: "Node.js API", instructor: "Rohan Kulkarni", progress: 20, icon: <FaNodeJs />, color: "#8cc84b" },
      ].map((c) => (
        <div key={c.title} className={styles.courseCard}>
          <div className={styles.courseIconWrapper} style={{ backgroundColor: `${c.color}20`, color: c.color }}>
            {c.icon}
          </div>
          <h3>{c.title}</h3>
          <p>{c.instructor}</p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${c.progress}%` }} />
          </div>
          <div className={styles.courseFooter}>
            <span>{c.progress}% complete</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Assignments = () => {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const assignments = [
    { id: 1, title: "JavaScript Fundamentals", course: "Web Development", dueDate: "2026-12-05", status: "Pending", grade: null, description: "Complete the JavaScript basics quiz and coding challenges." },
    { id: 2, title: "React Components", course: "React Masterclass", dueDate: "2026-12-10", status: "Submitted", grade: 92, description: "Build a component-based React application." },
    { id: 3, title: "CSS Flexbox", course: "Modern CSS", dueDate: "2026-11-20", status: "Graded", grade: 88, description: "Create a responsive layout using Flexbox." },
    { id: 4, title: "Node.js API", course: "Backend Development", dueDate: "2026-12-18", status: "Pending", grade: null, description: "Build a RESTful API with Express." },
  ];

  const iconMap = { Pending: <FaRegClock />, Submitted: <FaPaperPlane />, Graded: <FaCheckCircle /> };
  const filtered = filter === "all" ? assignments : assignments.filter((a) => a.status.toLowerCase() === filter);
  const stats = {
    total: assignments.length,
    pending: assignments.filter((a) => a.status === "Pending").length,
    submitted: assignments.filter((a) => a.status === "Submitted").length,
    graded: assignments.filter((a) => a.status === "Graded").length,
    avg: Math.round(
      assignments.filter((a) => a.grade).reduce((s, a) => s + a.grade, 0) /
      assignments.filter((a) => a.grade).length
    ) || 0,
  };

  return (
    <div className={styles.subPage}>
      <div className={styles.statsGrid}>
        {[
          { icon: <MdAssignment />, val: stats.total, label: "Total", color: "#5751e1" },
          { icon: <FaRegClock />, val: stats.pending, label: "Pending", color: "#f59e0b" },
          { icon: <FaChartLine />, val: `${stats.avg}%`, label: "Avg Grade", color: "#10b981" },
        ].map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statIcon} style={{ color: s.color }}>{s.icon}</span>
            <h3>{s.val}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.filterTabs}>
        {["all", "pending", "submitted", "graded"].map((f) => (
          <button
            key={f}
            type="button"
            className={`${styles.filterTab} ${filter === f ? styles.activeTab : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} ({f === "all" ? stats.total : stats[f] ?? 0})
          </button>
        ))}
      </div>

      <div className={styles.assignGrid}>
        {filtered.map((a) => (
          <div
            key={a.id}
            className={`${styles.assignCard} ${selected === a.id ? styles.expanded : ""}`}
          >
            <div onClick={() => setSelected(selected === a.id ? null : a.id)}>
              <div className={styles.assignTop}>
                <div className={styles.assignLeft}>
                  <div>
                    <h3>{a.title}</h3>
                    <p className={styles.courseName}>{a.course}</p>
                  </div>
                </div>
                <span className={`${styles.statusBadge} ${styles[`status${a.status}`]}`}>
                  {iconMap[a.status]} {a.status}
                </span>
              </div>

              <div className={styles.assignMeta}>
                <span>
                  <FaCalendarAlt className={styles.metaIcon} /> Due: {new Date(a.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                {a.grade && (
                  <div className={styles.gradeBadge}>
                    <span>{a.grade}%</span>
                    <div className={styles.gradeBar}>
                      <div className={styles.gradeBarFill} style={{ width: `${a.grade}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SavedCourseList = ({ title, storageKey }) => {
  const [items, setItems] = useState([]);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    try {
      const savedItems = JSON.parse(localStorage.getItem(storageKey) || "[]");
      setItems(Array.isArray(savedItems) ? savedItems : []);
    } catch {
      setLoadError("Unable to load your saved courses. Please try again.");
    }
  }, [storageKey]);

  const removeItem = (itemId) => {
    try {
      const nextItems = items.filter((item) => item.id !== itemId);
      localStorage.setItem(storageKey, JSON.stringify(nextItems));
      setItems(nextItems);
      setLoadError("");
    } catch {
      setLoadError("Unable to update your saved courses. Please try again.");
    }
  };

  return (
    <div className={styles.savedCourses}>
      {loadError && <p className={styles.savedError} role="alert">{loadError}</p>}
      {items.length ? (
        <ul className={styles.savedList}>
          {items.map((item) => (
            <li className={styles.savedItem} key={item.id}>
              <Image
                className={styles.savedImage}
                src={item.image}
                alt={item.title}
                width={88}
                height={68}
              />
              <div className={styles.savedInfo}>
                <h3>{item.title}</h3>
                <p>{item.price === 0 ? "Free" : `₹${item.price}`}</p>
              </div>
              <button
                type="button"
                className={styles.savedRemove}
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.title}`}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !loadError && <p className={styles.emptySaved}>Your {title.toLowerCase()} list is empty.</p>
      )}
    </div>
  );
};

// ─── PROFILE PAGE ──────────────────────────────────────────────────────────

const ProfilePage = () => {
  const [isSidenavOpen, setSidenavOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const { user, logout, openLoginModal } = useApp();
  const router = useRouter();

  const PAGES = {
    dashboard: { label: "Dashboard", icon: <MdDashboard />, component: <Dashboard user={user} /> },
    mycourses: { label: "My Courses", icon: <MdMenuBook />, component: <MyCourses /> },
    assignments: { label: "Assignments", icon: <MdAssignment />, component: <Assignments /> },
    cart: { label: "Cart", icon: <MdShoppingCart />, component: <SavedCourseList title="Cart" storageKey="edu_cart_items" /> },
    wishlist: { label: "Wishlist", icon: <MdFavorite />, component: <SavedCourseList title="Wishlist" storageKey="edu_wishlist_items" /> },
  };

  const handleNavClick = (pageKey) => {
    if (!user) {
      openLoginModal(() => {
        setActivePage(pageKey);
        if (window.innerWidth < 768) setSidenavOpen(false);
      });
      return;
    }
    setActivePage(pageKey);
    if (window.innerWidth < 768) setSidenavOpen(false);
  };

  const handleLogout = () => {
    logout();
    setActivePage("dashboard");
    router.push("/");
  };

  return (
    <div className={styles.ProfilePage}>
      {/* ── Sidenav ── */}
      <div className={`${styles.sidenav} ${isSidenavOpen ? styles.sidenavOpen : styles.sidenavClosed}`}>
        <div className={styles.sidenavHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}><FaGraduationCap /></span>
            {isSidenavOpen && <span className={styles.logoText}>Education Platform</span>}
          </div>
          <button type="button" className={styles.toggleBtn} onClick={() => setSidenavOpen(!isSidenavOpen)} aria-label="Toggle sidebar">
            {isSidenavOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* User chip — sidenav open */}
        {user && isSidenavOpen && (
          <div className={styles.userChip}>
            <div className={styles.userAvatar}>{user.name.charAt(0).toUpperCase()}</div>
            <div>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
          </div>
        )}

        {/* User avatar only — sidenav collapsed */}
        {user && !isSidenavOpen && (
          <div className={styles.userAvatarCollapsed}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        <nav className={styles.navLinks}>
          <div className={styles.navTop}>
            {Object.entries(PAGES).map(([key, { label, icon }]) => (
              <button
                type="button"
                key={key}
                className={`${styles.navItem} ${activePage === key ? styles.navActive : ""}`}
                onClick={() => handleNavClick(key)}
                title={!isSidenavOpen ? label : undefined}
              >
                <span className={styles.navIcon}>{icon}</span>
                {isSidenavOpen && <span className={styles.navLabel}>{label}</span>}
              </button>
            ))}
          </div>

          <div className={styles.navBottom}>
            <Link
              href="/"
              className={styles.navItem}
              title={!isSidenavOpen ? "Back to Home" : undefined}
            >
              <span className={styles.navIcon}><FaHome /></span>
              {isSidenavOpen && <span className={styles.navLabel}>Back to Home</span>}
            </Link>
          </div>
        </nav>
      </div>

      {/* ── Main Content ── */}
      <div className={`${styles.mainContent} ${isSidenavOpen ? styles.mainShifted : styles.mainFull}`}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <button type="button" className={styles.hamburger} onClick={() => setSidenavOpen(!isSidenavOpen)} aria-label="Open menu">
            <FaBars />
          </button>
          <h1 className={styles.topBarTitle}>{PAGES[activePage]?.label ?? "Profile"}</h1>

          <div className={styles.topBarRight}>
            <Link href="/" className={styles.backHomeBtn}>
              <FaHome /> <span>Back to Home</span>
            </Link>
            {user ? (
              <div className={styles.topUser}>
                <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </div>
            ) : (
              <button type="button" className={styles.loginBtn} onClick={() => openLoginModal()}>
                Login
              </button>
            )}
          </div>
        </div>

        {/* Page content */}
        <div className={styles.contentArea}>
          {user ? (
            PAGES[activePage]?.component
          ) : (
            <div className={styles.guestMessage}>
              <span className={styles.guestIcon}><FaUserCircle /></span>
              <h2>Please log in to view your profile</h2>
              <p>Access your Dashboard, Courses and Assignments after signing in.</p>
              <button type="button" className={styles.loginBtn} onClick={() => openLoginModal()}>
                Login Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
