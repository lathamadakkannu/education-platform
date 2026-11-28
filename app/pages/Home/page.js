"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Home.module.scss";
import Image from "next/image";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { FaPhone } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaChartLine, FaRegStar, FaStar, FaStarHalfAlt, FaGraduationCap, FaBookOpen, FaUsers, FaAward } from "react-icons/fa";
import ScrollToTop from "@/app/component/ScrollToTop/ScrollToTop";
import InfoModal from "@/app/component/InfoModal/InfoModal";
import { useApp } from "@/app/context/AppContext";
import {
  EMAIL_MAX_LENGTH,
  MOBILE_LENGTH,
  NAME_MAX_LENGTH,
  sanitizeMobileInput,
  validateEmail,
  validateMobile,
  validateName,
} from "@/app/utils/validation";

const Home = () => {
  const { showToast } = useApp();

  const cardData = [
    {
      title: "Courses",
      description:
        "Self-paced and mentor-guided courses covering web development, UI/UX design, Python, and modern software engineering.",
      buttonText: "Read More",
      buttonClass: "readbtn",
      icon: <FaBookOpen />,
    },
    {
      title: "Graduate",
      description:
        "Structured career tracks with capstone projects, portfolio reviews, and interview preparation for job-ready graduates.",
      buttonText: "Read More",
      buttonClass: "readbtn",
      icon: <FaGraduationCap />,
    },
    {
      title: "Programs",
      description:
        "Cohort-based bootcamps and personalized mentorship programs tailored for students, beginners, and working professionals.",
      buttonText: "Read More",
      buttonClass: "readbtn",
      icon: <FaAward />,
    },
  ];

  const educationData = [
    {
      title: "Art",
      description: "Cutting-edge technology and innovation are linked.",
    },
    {
      title: "Languages",
      description: "Experience the joy of reading Greek and Latin authors.",
    },
    {
      title: "Science",
      description: "Re-examine your views on technology's place.",
    },
    {
      title: "English",
      description: "You'll gain self-knowledge and learn to communicate.",
    },
  ];

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (title) => {
    setSelectedCard(title);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const cards = [
    {
      id: "home-1",
      img: "/image/img1.jpg",
      amt: "5000",
      originalPrice: "8000",
      rating: 4.5,
      reviews: 128,
      level: "Beginner",
      title: "Introduction to Web Design: From Basics to Advanced - Explained in Tamil",
    },
    {
      id: "home-2",
      img: "/image/img2.png",
      amt: "5000",
      originalPrice: "8000",
      rating: 4.0,
      reviews: 95,
      level: "Intermediate",
      title: "Complete Web Development Bootcamp: HTML, CSS, JavaScript & React",
    },
    {
      id: "home-3",
      img: "/image/img3.jpg",
      amt: "5000",
      originalPrice: "8000",
      rating: 3.5,
      reviews: 67,
      level: "Beginner",
      title: "Python Programming Masterclass: From Zero to Hero",
    },
    {
      id: "home-4",
      img: "/image/img1.jpg",
      amt: "5000",
      originalPrice: "8000",
      rating: 4.0,
      reviews: 112,
      level: "Advanced",
      title: "Data Science and Machine Learning with Python",
    },
    {
      id: "home-5",
      img: "/image/img2.png",
      amt: "5000",
      originalPrice: "8000",
      rating: 4.5,
      reviews: 156,
      level: "Beginner",
      title: "UI/UX Design Fundamentals: Create Amazing User Experiences",
    },
    {
      id: "home-6",
      img: "/image/img3.jpg",
      amt: "5000",
      originalPrice: "8000",
      rating: 4.0,
      reviews: 89,
      level: "Intermediate",
      title: "Mobile App Development with React Native",
    },
  ];

  const newsData = [
    {
      imageSrc: "/image/news.png",
      title: "New digital learning resources for students",
      description:
        "Explore practical study guides and interactive lessons created to help learners build confidence in essential subjects.",
      author: "LEARNING TEAM",
      date: "DECEMBER 12, 2026",
    },
    {
      imageSrc: "/image/news1.jpeg",
      title: "Career skills workshops opening soon",
      description:
        "Our upcoming workshops will cover communication, project planning, and the practical skills employers value.",
      author: "CAREER SERVICES",
      date: "JANUARY 08, 2027",
    },
    {
      imageSrc: "/image/news.png",
      title: "Applications open for the next learning term",
      description:
        "Plan your next step with flexible courses led by experienced educators. Registration details are available on our courses page.",
      author: "ADMISSIONS",
      date: "FEBRUARY 02, 2027",
    },
  ];

  const aboutData = [
    {
      percentage: "112%",
      label: "Learning community",
      description: "A welcoming community built around shared learning goals.",
      icon: <FaUsers />,
    },
    {
      percentage: "80%",
      label: "Course completion",
      description: "Learners make steady progress with structured guidance.",
      icon: <FaGraduationCap />,
    },
    {
      percentage: "95%",
      label: "Learner support",
      description: "Personal support helps students stay on track.",
      icon: <FaAward />,
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

  // Slider logic for 3 cards per view
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const sliderRef = useRef(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => {
      window.removeEventListener("resize", updateCardsPerView);
    };
  }, []);

  // Keep the slider position valid when the screen size changes (e.g. rotate phone)
  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, Math.max(0, cards.length - cardsPerView)));
  }, [cardsPerView, cards.length]);

  // Calculate maximum index - MOVE THIS FUNCTION BEFORE nextSlide
  const getMaxIndex = () => {
    return Math.max(0, cards.length - cardsPerView);
  };

  const nextSlide = () => {
    if (currentIndex < getMaxIndex()) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Touch swipe for the Latest Courses slider (mobile)
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    // Only treat clearly-horizontal swipes as slide changes
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) nextSlide();
    else prevSlide();
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
  });
  const [registrationErrors, setRegistrationErrors] = useState({});
  const [showJoinInfo, setShowJoinInfo] = useState(false);

  const getRegistrationError = (name, value) => {
    if (name === "name") return validateName(value, "Name");
    if (name === "email") return validateEmail(value);
    if (name === "number") return validateMobile(value);
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === "number" ? sanitizeMobileInput(value) : value;
    setFormData((previous) => ({ ...previous, [name]: nextValue }));
    setRegistrationErrors((previous) => ({
      ...previous,
      [name]: getRegistrationError(name, nextValue),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = Object.fromEntries(
      Object.entries(formData).map(([name, value]) => [name, getRegistrationError(name, value)])
    );
    setRegistrationErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const message = "Registration submitted successfully!";
    showToast(message);
    setFormData({ name: "", email: "", number: "" });
    setRegistrationErrors({});
  };

  const eventData = [
    {
      imageSrc: "/image/event1.jpeg",
      title: "Full-Stack Career Bootcamp Orientation",
      description:
        "Meet our lead instructors, explore the 12-week project roadmap, and learn how to build production-ready web applications.",
      author: "ACADEMIC TEAM",
      date: "DECEMBER 18, 2026",
    },

    {
      imageSrc: "/image/event3.jpeg",
      title: "Hands-On UI/UX Design Workshop",
      description:
        "Learn wireframing, component systems, and responsive prototyping workflows through live collaborative exercises.",
      author: "DESIGN STUDIO",
      date: "JANUARY 15, 2027",
    },
  ];

  const testimonials = [
    {
      quote:
        "The instructors explain complex topics clearly, and the practical exercises helped me put each lesson into action.",
      image: "/image/testimonial1.png",
      name: "Priya S.",
      role: "Student",
    },
    {
      quote:
        "I could study at my own pace and still feel supported. The course structure made it easy to stay focused.",
      image: "/image/testimonial2.png",
      name: "Arun K.",
      role: "Student",
    },
    {
      quote:
        "The projects gave me the confidence to use what I learned in my portfolio and prepare for new opportunities.",
      image: "/image/testimonial3.png",
      name: "Meera R.",
      role: "Student",
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.home}>
        <div className={styles.homeContainer}>
          <div className={styles.homeContainerDiv}>
            <h2>Advance Your Career with Industry-Ready Courses</h2>
            <p>
              Build practical skills in web development, UI/UX design, and software
              engineering through guided projects and expert mentorship.
            </p>
            <div className={styles.homeBtn}>
              <button type="button" className={styles.btn} onClick={() => setShowJoinInfo(true)}>Join Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.homeContent}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>Transform Your Learning Experience</h2>
            <p className={styles.sectionSubtitle}>
              Join thousands of students who are already advancing their careers with our expert-led courses
            </p>
          </div>

          <div className={styles.homeContentContainer}>
            {cardData.map((card, index) => (
              <div key={index} className={`${styles.homeCard} ${styles[`card${index + 1}`]}`}>
                <div className={styles.cardGradient}></div>

                <div className={styles.homeCardContent}>

                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                  <button className={styles[card.buttonClass]}>
                    <Link href='/pages/Business'>
                      {card.buttonText}
                      <span className={styles.buttonArrow}>→</span>
                    </Link>
                  </button>
                </div>
              </div>
            ))}

            <div className={styles.card2}>
              <div className={styles.card2Overlay}></div>
              <div className={styles.card2Content}>
                <div className={styles.welcomeBadge}>
                  <span className={styles.sparkle}>✨</span>
                  Special Offer
                </div>
                <h3>You Are Welcome!</h3>
                <p>Discover our Top School Child Benefits & Exclusive Programs</p>


              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.homeWelcome}>
        <div className={styles.homeWelcomeContent}>
          <h2>Welcome</h2>
          <p>
            Our learning ecosystem combines structured video lessons, hands-on
            assignments, and real-world capstone projects for every stage of your career.
          </p>
          <ul>
            <li>Industry-aligned curriculum updated regularly</li>
            <li>Hands-on coding challenges and live workshops</li>
            <li>Dedicated mentor feedback on portfolio projects</li>
            <li>Verified completion certificates for graduates</li>
          </ul>
        </div>
        <div className={styles.homeWelcomeContent}>
          <div className={styles.videoWrapper}>
            <Image src="/image/video.png" width={300} height={300} alt="Learning preview" />
            <div className={styles.playButton}>▶</div>
          </div>
        </div>
        <div className={styles.homeWelcomeContent}>
          <p className={styles.bold}>
            Learn at your own pace with practical guidance from experienced engineers and designers.
          </p>
          <p>
            Whether you are taking your first steps into web design or preparing for
            full-stack developer interviews, each module guides you from core concepts
            to working applications you can confidently showcase to employers.
          </p>
        </div>
      </div>

      <div className={styles.homeEducaiton}>
        <div className={styles.educationContents}>
          <div className={styles.educationContent}>
            <p className={styles.educationHead}>PRE K THROUGH 12 COLLEGE</p>
            <p className={styles.educationHContent}>
              Why Education Platform is best Solution for Education
            </p>
          </div>
          <div className={`${styles.educationContent} ${styles.center}`}>
            <p className={styles.educationHPara}>
              Find your voice, your movement, yourself. Opportunities for all
              levels in acting and dance, stagecraft, puppetry, playwriting,
              speechwriting and more. Join one of many clubs to explore even
              further.
            </p>
          </div>
        </div>
        <div className={styles.educationCards}>
          {educationData.map((item, index) => (
            <div
              className={styles.educationCard}
              key={index}
              onClick={() => handleCardClick(item.title)}
            >
              <div className={styles.educationCardContainer}>
                <div className={styles.front}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
                <div className={styles.back}>
                  <h2>{item.title}</h2>
                  <p>Find your voice, your movement, yourself. Opportunities for all levels in acting and dance, stagecraft, puppetry, playwriting, speechwriting, and more.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Courses Slider - 3 Cards Per Row */}
      <div className={styles.mainCard}>
        <div className={styles.cardContainer}>
          <button
            className={`${styles.navButton} ${styles.prev}`}
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            <AiOutlineLeft />
          </button>

          <div className={styles.cardSlider}>
            <div className={styles.cardSilderHead}>
              <h2>Latest Courses</h2>
              <p>
                Explore our newest instructor-led courses <br />
                designed to build practical, career-ready skills.
              </p>
            </div>

            <div className={styles.cardBtn}>
              <Link href="/pages/Courses" className={styles.btnCoures}>
                View All
              </Link>
            </div>

            <div
              className={styles.sliderWrapper}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={styles.cardWrapper}
                style={{
                  "--current-index": currentIndex,
                  "--cards-per-view": cardsPerView,
                }}
              >
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={styles.cardItem}
                  >
                    <Link href={`/pages/Courses/CoursesDetails?id=${card.id}`} className={styles.cardLink}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={card.img}
                          alt={card.title}
                          width={300}
                          height={200}
                          className={styles.cardImage}
                        />
                      </div>
                      <div className={styles.sliderCard}>
                        <div className={styles.stars}>
                          {getStars(card.rating)}
                          <span>({card.reviews} reviews)</span>
                        </div>
                        <h2 className={styles.cardTitle}>{card.title}</h2>
                      </div>
                      <div className={styles.cardDoc}>
                        <p>
                          <FaFileAlt />
                          View Details
                        </p>
                        <p>
                          <FaChartLine />
                          {card.level || 'Beginner'}
                        </p>
                      </div>
                      <div className={styles.line}></div>
                      <div className={styles.amount}>
                        <p>
                          ₹{card.amt}
                          {card.originalPrice && <span>₹{card.originalPrice}</span>}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className={styles.sliderDots}>
              {[...Array(getMaxIndex() + 1)].map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ""}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            className={`${styles.navButton} ${styles.next}`}
            onClick={nextSlide}
            disabled={currentIndex >= getMaxIndex()}
            aria-label="Next slide"
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>

      <div className={styles.news}>
        <div className={styles.newsBannerHead}>
          <div className={styles.margin}>
            <h2>UPCOMING EDUCATION NEWS</h2>
            <p>
              Discover our Top School <br /> Certified Created News
            </p>
          </div>
        </div>
        <div className={styles.newsContainer}>
          <div className={styles.newsContents}>
            {newsData.map((newsItem, index) => (
              <div key={index} className={styles.newsContent}>
                <div className={styles.newsImage}>
                  <Image
                    src={newsItem.imageSrc}
                    width={250}
                    height={200}
                    alt={newsItem.title}
                  />
                </div>
                <div className={styles.newsText}>
                  <div className={styles.textHead}>
                    <p>{newsItem.author}</p>
                    <p>{newsItem.date}</p>
                  </div>
                  <div className={styles.textContent}>
                    <h2>{newsItem.title}</h2>
                    <p>{newsItem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.newsAbout}>
            <div className={styles.newsAboutHead}>
              <h2>About Education Platform</h2>
            </div>
            <div className={styles.newsAboutContents}>
              {aboutData.map((item, index) => (
                <div key={index} className={styles.newsAboutContent}>
                  <div className={styles.aboutIcon}>{item.icon}</div>
                  <h2>{item.percentage}</h2>
                  <p className={styles.headLabel}>{item.label}</p>
                  <p className={styles.headDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.homeRegister}>
        <div className={styles.homeRegisterContainer}>
          <div className={styles.homeRegisterForm}>
            <div className={styles.registerFormHead}>
              <h2>Online Registration</h2>
              <p>Join us today and start your learning journey</p>
            </div>
            <div className={styles.registerForm}>
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    maxLength={NAME_MAX_LENGTH}
                    onChange={handleChange}
                    className={registrationErrors.name ? styles.invalidField : ""}
                    aria-invalid={Boolean(registrationErrors.name)}
                    placeholder="Enter your full name"
                  />
                  {registrationErrors.name && <span className={styles.fieldError}>{registrationErrors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    maxLength={EMAIL_MAX_LENGTH}
                    value={formData.email}
                    onChange={handleChange}
                    className={registrationErrors.email ? styles.invalidField : ""}
                    aria-invalid={Boolean(registrationErrors.email)}
                    placeholder="Enter your email address"
                  />
                  {registrationErrors.email && <span className={styles.fieldError}>{registrationErrors.email}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="number">Phone Number</label>
                  <input
                    type="tel"
                    id="number"
                    name="number"
                    value={formData.number}
                    maxLength={MOBILE_LENGTH}
                    onChange={handleChange}
                    className={registrationErrors.number ? styles.invalidField : ""}
                    aria-invalid={Boolean(registrationErrors.number)}
                    inputMode="numeric"
                    placeholder="Enter your 10-digit mobile number"
                  />
                  {registrationErrors.number && <span className={styles.fieldError}>{registrationErrors.number}</span>}
                </div>
                <div className={styles.formGroup}>
                  <button type="submit">Register Now</button>
                </div>
              </form>
            </div>
          </div>

          <div className={styles.homeEvents}>
            <div className={styles.homeEventsHead}>
              <h2>Our Events</h2>
              <p>Upcoming educational events</p>
            </div>
            <div className={styles.homeEventContents}>
              <div className={styles.homeEventContent}>
                {eventData.map((newsItem, index) => (
                  <div key={index} className={styles.homeEventCont}>
                    <div className={styles.newsImage}>
                      <Image
                        src={newsItem.imageSrc}
                        width={110}
                        height={110}
                        alt={newsItem.title}
                      />
                    </div>
                    <div className={styles.newsText}>
                      <div className={styles.textHead}>
                        <p>{newsItem.author}</p>
                        <p>{newsItem.date}</p>
                      </div>
                      <div className={styles.textContent}>
                        <h2>{newsItem.title}</h2>
                        <p>{newsItem.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.homeTestimonials}>
        <div className={styles.testimonialsHead}>
          <h2>TESTIMONIALS</h2>
          <p>Explore the students experience</p>
        </div>
        <div className={styles.homeTestimonialsContainer}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.homeTestimonialsContent}>
              <div className={styles.quoteIcon}>“</div>
              <p className={styles.testQuote}>“{testimonial.quote}”</p>
              <Image
                src={testimonial.image}
                width={110}
                height={110}
                alt={testimonial.name}
              />
              <p className={styles.testName}>{testimonial.name}</p>
              <p className={styles.testRole}>{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.homeAdmission}>
        <div className={styles.homeAdmissionContainer}>
          <div className={styles.admissionText}>
            <h2>Rolling Admissions now open</h2>
            <p>Get in touch with us to discuss it:</p>
            <button><FaPhone />+91 12345 67890</button>

          </div>
          <div className={styles.admissionImg}>
            <Image src="/image/admission.png" width={200} height={100} alt="admission" />
          </div>
        </div>
      </div>
      <ScrollToTop />
      {showJoinInfo && (
        <InfoModal
          title="Start learning with us"
          message="Explore our courses and register online to begin your learning journey."
          onClose={() => setShowJoinInfo(false)}
        />
      )}
    </div>
  );
};

export default Home;