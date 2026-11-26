"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./CoursesDetails.module.scss";
import Image from "next/image";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import ScrollToTop from "@/app/component/ScrollToTop/ScrollToTop";
import RelatedCourses from "../../RelatedCourses/page";
import InfoModal from "@/app/component/InfoModal/InfoModal";
import { useApp } from "@/app/context/AppContext";
import BackButton from "@/app/component/BackButton/BackButton";
import { getCourseById } from "@/app/data/courses";

const CoursesDetailsContent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [infoModal, setInfoModal] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const { user, openLoginModal, showToast } = useApp();
  const searchParams = useSearchParams();
  const course = getCourseById(searchParams.get("id"));
  useEffect(() => {
    setActionMessage("");
  }, [course.id]);

  const formatPrice = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

  const performSaveCourse = (storageKey, listName) => {
    try {
      const savedItems = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (!Array.isArray(savedItems)) {
        throw new Error("Saved course data is invalid.");
      }
      if (savedItems.some((item) => String(item.id) === course.id)) {
        const message = `This course is already in your ${listName}.`;
        setActionMessage(message);
        showToast(message, "info");
        return;
      }
      localStorage.setItem(
        storageKey,
        JSON.stringify([
          ...savedItems,
          { id: course.id, title: course.title, image: course.image, price: course.price },
        ])
      );
      const message = `Course added to your ${listName} successfully.`;
      setActionMessage(message);
      showToast(message, "success");
    } catch {
      const message = `Unable to update your ${listName}. Please try again.`;
      setActionMessage(message);
      showToast(message, "info");
    }
  };

  const saveCourse = (storageKey, listName) => {
    if (!user) {
      openLoginModal(() => performSaveCourse(storageKey, listName));
      return;
    }
    performSaveCourse(storageKey, listName);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const questions = [
    {
      id: 1,
      title: "Introduction to Web Development",
      duration: "4 hours",
      lessons: [
        {
          title: "Introduction and Setup",
          duration: "30 mins",
          isPreview: true,
        },
        {
          title: "Overview of Web Technologies",
          duration: "40 mins",
          isPreview: false,
        },
        {
          title: "Setting Up a Development Environment",
          duration: "50 mins",
          isPreview: false,
        },
        { title: "Basic HTML and CSS", duration: "60 mins", isPreview: false },
      ],
    },
    {
      id: 2,
      title: "Frontend Development",
      duration: "12 hours",
      lessons: [
        { title: "HTML Fundamentals", duration: "1 hour", isPreview: true },
        {
          title: "CSS Essentials",
          duration: "1 hour 30 mins",
          isPreview: false,
        },
        {
          title: "Responsive Web Design",
          duration: "2 hours",
          isPreview: false,
        },
        {
          title: "JavaScript Basics",
          duration: "1 hour 30 mins",
          isPreview: false,
        },
        { title: "Working with DOM", duration: "2 hours", isPreview: false },
        {
          title: "Introduction to React",
          duration: "3 hours",
          isPreview: true,
        },
        {
          title: "State Management with Redux",
          duration: "1 hour",
          isPreview: false,
        },
      ],
    },
    {
      id: 3,
      title: "Backend Development",
      duration: "16 hours",
      lessons: [
        {
          title: "Understanding Server-Side Programming",
          duration: "1 hour",
          isPreview: false,
        },
        { title: "Node.js Basics", duration: "2 hours", isPreview: false },
        {
          title: "Working with Express.js",
          duration: "2 hours 30 mins",
          isPreview: true,
        },
        {
          title: "Database Design with MongoDB",
          duration: "3 hours",
          isPreview: false,
        },
        { title: "RESTful APIs", duration: "2 hours", isPreview: false },
        {
          title: "Authentication and Authorization",
          duration: "2 hours",
          isPreview: true,
        },
        {
          title: "Deployment and DevOps Basics",
          duration: "3 hours",
          isPreview: false,
        },
      ],
    },
    {
      id: 4,
      title: "Full Stack Project",
      duration: "28 hours",
      lessons: [
        {
          title: "Project Setup and Planning",
          duration: "2 hours",
          isPreview: false,
        },
        {
          title: "Creating the Frontend Layout",
          duration: "5 hours",
          isPreview: false,
        },
        {
          title: "Integrating Backend API",
          duration: "4 hours",
          isPreview: false,
        },
        {
          title: "User Authentication Implementation",
          duration: "4 hours",
          isPreview: false,
        },
        {
          title: "Building Features with React and Redux",
          duration: "6 hours",
          isPreview: false,
        },
        {
          title: "Testing and Debugging",
          duration: "4 hours",
          isPreview: false,
        },
        {
          title: "Deployment and Final Review",
          duration: "3 hours",
          isPreview: false,
        },
      ],
    },
  ];
  const reviews = [
    {
      id: 1,
      userName: "Elisa Joe",
      date: "Nov 9, 2025",
      rating: 5,
      content: "The lessons are clear and practical. I was able to build a complete project while learning how the front end and back end work together.",
    },
    {
      id: 2,
      userName: "Karthik Subramanian",
      date: "Oct 15, 2025",
      rating: 4,
      content: "A well-structured course with useful examples. The capstone modules helped me understand REST APIs and gave me a strong starting point for my portfolio.",
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className={styles.coursesDetails}>
      <div className={styles.backBar}>
        <BackButton href="/pages/Courses" label="Back to Courses" />
      </div>
      <div className={styles.coursesDetailsBanner}></div>
      <div className={styles.coursesDetailsContainer}>
        <div className={styles.coursesDetailsContents}>
          <div className={styles.coursesDetailsHead}>
            <p>{course.category}</p>
            <h2>{course.title}</h2>
          </div>
          <div className={styles.coursesDetailsContent}>
            <p>
              A comprehensive course that covers the fundamentals and advanced
              concepts of web development, from front-end to back-end
              technologies.
            </p>
          </div>
          <div className={styles.coursesDetailsBtn}>
            <button onClick={() => setInfoModal(true)}>Buy Now</button>
          </div>
        </div>
        <div className={styles.coursesDetailsCard}>
          <Image src={course.image} alt={course.title} width={200} height={200} />
          <div className={styles.cardInfo}>
            <p className={styles.cardInfo1}>{formatPrice(course.price)}</p>
            {course.originalPrice && (
              <p className={styles.cardInfo2}>{formatPrice(course.originalPrice)}</p>
            )}
          </div>
          <div className={styles.infoBtns}>
            <button type="button" onClick={() => saveCourse("edu_cart_items", "cart")}>
              <RiShoppingCartLine />
              Add to Cart
            </button>
            <button type="button" onClick={() => saveCourse("edu_wishlist_items", "wishlist")}>
              <FaRegHeart />
              Add to Wishlist
            </button>
          </div>
          {actionMessage && <p className={styles.actionMessage} role="status">{actionMessage}</p>}
          <div className={styles.shortInfo}>
            <h2>Short Info</h2>

            <div className={styles.shortInfoContents}>
              <div className={styles.shortInfoContainer}>
                <div className={styles.shortInfoContent}>
                  <label htmlFor="">Enrolled </label>
                  <span>:</span>
                  <p>320 students</p>
                </div>
                <div className={styles.shortInfoContent}>
                  <label htmlFor="">Duration </label>
                  <span>:</span>
                  <p>29 hours</p>
                </div>
                <div className={styles.shortInfoContent}>
                  <label htmlFor="">Level </label>
                  <span>:</span>
                  <p>Beginner</p>
                </div>
                <div className={styles.shortInfoContent}>
                  <label htmlFor="">Chapters </label>
                  <span>:</span>
                  <p>4 modules</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.couresCards}>
          <div className={styles.heroTabsContainer}>
            <div className={styles.heroTabs}>
              {["Overview", "Course Content", "Instructor", "Review"].map(
                (section, index) => (
                  <div
                    key={index}
                    className={`${styles.tab} ${activeTab === index + 1 ? styles.active : ""
                      }`}
                    onClick={() => handleTabClick(index + 1)}
                  >
                    {section}
                  </div>
                )
              )}
            </div>
          </div>
          <div className={styles.heroPageContent}>
            {activeTab === 1 && (
              <div className={styles.heroTabsCard}>

                <div className={styles.heroPageTest}>
                  <h2>Web Development Course Overview</h2>
                  <p>
                    The "Full Stack Web Development" course is designed to
                    provide comprehensive training on building modern web
                    applications, covering both front-end and back-end
                    technologies. This course is ideal for aspiring web
                    developers who want to master skills in creating dynamic,
                    responsive, and feature-rich websites.
                  </p>
                </div>
                <div className={styles.heroPageTest}>
                  <h2>Course Objectives:</h2>
                  <ul>
                    <li>
                      Equip learners with a strong foundation in front-end
                      development using HTML, CSS, JavaScript, and React.
                    </li>
                    <li>
                      Introduce back-end development concepts with Node.js,
                      Express.js, and MongoDB.
                    </li>
                    <li>
                      Cover essential topics like RESTful API development,
                      authentication, and authorization.
                    </li>
                    <li>
                      Provide hands-on experience through a full-fledged project
                      that integrates front-end and back-end technologies.
                    </li>
                    <li>
                      Prepare learners for real-world challenges with industry
                      best practices, testing, and deployment.
                    </li>
                  </ul>
                </div>
                <div className={styles.heroPageTest}>
                  <h2>Key Features:</h2>
                  <ol>
                    <li>
                      <span>Interactive Lessons:</span> Includes step-by-step
                      tutorials, coding challenges, and project-based learning
                      to reinforce concepts.
                    </li>
                    <li>
                      <span>Industry-Standard Tools and Frameworks:</span>:
                      Covers React, Redux, Node.js, Express.js, and MongoDB.
                    </li>
                    <li>
                      <span>Real-World Projects:</span> Students build complete
                      applications, from setup and planning to deployment.
                    </li>
                    <li>
                      <span>Expert Instructors:</span> Experienced professionals
                      guide you through the learning journey.
                    </li>
                    <li>
                      <span>Preview Lessons:</span> Free preview lessons are
                      available for select topics to help students get a taste
                      of the course content.
                    </li>
                  </ol>
                </div>
                <div className={styles.heroPageTest}>
                  <h2>Course Content Highlights:</h2>
                  <ul>
                    <li>
                      <span>Introduction to Web Development:</span> Learn about
                      web technologies and set up a development environment.
                    </li>
                    <li>
                      <span>Frontend Development:</span> Master HTML, CSS, and
                      JavaScript fundamentals, along with advanced topics like
                      React and Redux.
                    </li>
                    <li>
                      <span>Backend Development:</span> Explore server-side
                      programming, build RESTful APIs, and manage databases with
                      MongoDB.
                    </li>
                    <li>
                      <span>Full Stack Project:</span> Implement a capstone
                      project that brings together both front-end and back-end
                      skills.
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className={styles.heroTabsCard}>
                <h2>Course Content : </h2>
                <div className={styles.questionsContainer}>
                  {questions.map((item, index) => (
                    <div key={index} className={styles.question}>
                      <div className={styles.just} onClick={() => toggleFAQ(index)}>
                        <div className={styles.heroCardHead}>
                          <p>{item.title}</p>
                          <span>{item.duration} to Complete</span>
                        </div>
                        <MdKeyboardArrowDown
                          className={`${styles.arrow} ${activeIndex === index ? styles.rotate : ""
                            }`}
                        />
                      </div>

                      {activeIndex === index && (
                        <div className={styles.lessonsContainer}>
                          {item.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className={styles.lesson}>
                              <div className={styles.allLesson}>
                                <p>{lesson.title}</p>{" "}
                                <div className={styles.allLessonContent}>
                                  <p>{lesson.duration} </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 3 && (
              <div className={styles.heroTabsCard}>
                <h2>Instructor</h2>
                <div className={styles.instructor}>
                  <div className={styles.instructorContainer}>
                    <Image src="/image/instrutor.png" alt="Anisha Begam" width={80} height={80} />
                    <div className={styles.instructorContent}>
                      <h2>Anisha Begam</h2>
                      <p>Lead Full Stack Instructor</p>
                    </div>
                  </div>
                  <div className={styles.instructorText}>
                    <p>Anisha Begam is a full-stack software engineer and educator with over 8 years of experience building scalable web applications with React, Node.js, and cloud databases.</p>
                    <p>She has mentored thousands of aspiring developers through hands-on project reviews, code architecture workshops, and career readiness coaching.</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 4 && (
              <div className={styles.heroTabsCard}>

                <div className={styles.reviewContainer}>
                  <h3>Reviews</h3>
                  {reviews.map((review, index) => (
                    <div key={review.id}>
                      <div className={styles.reviewContent}>
                        <div className={styles.reviewProfile}>
                          <span aria-hidden="true">{review.userName.charAt(0).toUpperCase()}</span>
                        </div>

                        <div className={styles.reviewDetails}>
                          <div className={styles.userName}>
                            <h4>{review.userName}</h4>
                            <p>{review.date}</p>
                          </div>

                          <div className={styles.reviewRating}>
                            <div className={styles.reviewStars}>
                              {[...Array(review.rating)].map((_, starIndex) => (
                                <MdStarRate key={starIndex} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={styles.reviewData}>
                        <p>{review.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
          <RelatedCourses />
        </div>
      </div>
      <ScrollToTop />
      {infoModal && (
        <InfoModal
          title="Purchase information"
          message="Online checkout is not available yet. Please contact our team for enrollment assistance."
          onClose={() => setInfoModal(false)}
        />
      )}
    </div>
  );
};

const CoursesDetails = () => (
  <Suspense fallback={null}>
    <CoursesDetailsContent />
  </Suspense>
);

export default CoursesDetails;
