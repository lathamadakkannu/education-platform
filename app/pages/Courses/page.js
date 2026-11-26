"use client";
import React, { useState } from "react";
import styles from "./Courses.module.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Image from "next/image";
import ScrollToTop from "@/app/component/ScrollToTop/ScrollToTop";

const Courses = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    rating: [],
    instructors: [],
    price: [],
    level: [],
    language: [],
    duration: []
  });
  
  const router = useRouter();

  // States for dropdown visibility
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMoveDetails = (courseId) => {
    router.push(`/pages/Courses/CoursesDetails?id=${courseId}`);
  };

  const handleToggleFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterType];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [filterType]: updatedValues };
    });
  };

  const cards = [
    { 
      id: 1,
      img: "/image/img1.jpg",
      amt: "₹5,000",
      rating: 4.5,
      category: "development",
      level: "easy",
      language: "english",
      duration: "2-hours",
      price: "5000",
      title: "Full Stack Web Development: HTML, CSS, JavaScript & React",
    },
    { 
      id: 2,
      img: "/image/img2.png",
      amt: "₹2,990",
      rating: 4.0,
      category: "design",
      level: "medium",
      language: "tamil",
      duration: "3-hours",
      price: "2990",
      title: "Introduction to Web Design: From Basics to Advanced - Explained in Tamil",
    },
    { 
      id: 3,
      img: "/image/img3.jpg",
      amt: "₹2,900",
      rating: 3.0,
      category: "business",
      level: "hard",
      language: "english",
      duration: "1-hours",
      price: "2900",
      title: "Digital Product Strategy & Analytics for Tech Leaders",
    },
    { 
      id: 4,
      img: "/image/img1.jpg",
      amt: "₹1,980",
      rating: 4.0,
      category: "development",
      level: "easy",
      language: "english",
      duration: "2-hours",
      price: "1980",
      title: "JavaScript Essentials & Modern DOM Projects",
    },
    { 
      id: 5,
      img: "/image/img2.png",
      amt: "₹4,990",
      rating: 3.5,
      category: "design",
      level: "medium",
      language: "tamil",
      duration: "3-hours",
      price: "4990",
      title: "UI/UX Design Systems & Figma Prototyping - Explained in Tamil",
    },
    { 
      id: 6,
      img: "/image/img3.jpg",
      amt: "₹3,000",
      rating: 3.0,
      category: "business",
      level: "hard",
      language: "english",
      duration: "1-hours",
      price: "3000",
      title: "Agile Project Management & Software Delivery Fundamentals",
    },
  ];

  // Filter courses based on selected filters
  const filteredCards = cards.filter(card => {
    // Category filter
    if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(card.category)) {
      return false;
    }
    
    // Rating filter
    if (selectedFilters.rating.length > 0) {
      const matchesRating = selectedFilters.rating.some(rating => {
        const ratingValue = parseInt(rating);
        if (ratingValue === 5) return card.rating >= 4.5;
        if (ratingValue === 4) return card.rating >= 3.5 && card.rating < 4.5;
        if (ratingValue === 3) return card.rating >= 2.5 && card.rating < 3.5;
        return false;
      });
      if (!matchesRating) return false;
    }
    
    // Level filter
    if (selectedFilters.level.length > 0 && !selectedFilters.level.includes(card.level)) {
      return false;
    }
    
    // Language filter
    if (selectedFilters.language.length > 0 && !selectedFilters.language.includes(card.language)) {
      return false;
    }
    
    // Duration filter
    if (selectedFilters.duration.length > 0 && !selectedFilters.duration.includes(card.duration)) {
      return false;
    }
    
    return true;
  });

  const getStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className={styles.starFilled} />);
    }

    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className={styles.starHalf} />);
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} className={styles.starEmpty} />);
    }

    return stars;
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      rating: [],
      instructors: [],
      price: [],
      level: [],
      language: [],
      duration: []
    });
  };

  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  return (
    <div className={styles.courses}>
      <div className={styles.coursesContainer}>
        <div className={styles.coursesHead}>
          <h2>
            Explore <span>courses we</span> think  you'll be interested in.
          </h2>
          <button className={styles.toggleButton} onClick={handleToggleFilter}>
            {isFilterVisible ? "Hide Filter" : "Show Filter"}
          </button>
        </div>

        <div className={styles.coursesContent}>
          {/* Filters Sidebar */}
          <div className={`${styles.coursesFilter} ${isFilterVisible ? styles.visible : styles.hidden}`}>
            <button
              className={styles.clearFiltersBtn}
              onClick={clearAllFilters}
              disabled={!hasActiveFilters}
            >
              Clear all filters
            </button>
            
            {/* Category Filter */}
            <div className={styles.filterGroup}>
              <label onClick={() => toggleDropdown('category')}>
                Category
                <span>{openDropdown === 'category' ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
              </label>
              {openDropdown === 'category' && (
                <div className={styles.customSelect}>
                  <ul className={styles.dropdown}>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="development" 
                          checked={selectedFilters.category.includes('development')}
                          onChange={() => handleFilterChange('category', 'development')}
                        />
                        Development
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="design" 
                          checked={selectedFilters.category.includes('design')}
                          onChange={() => handleFilterChange('category', 'design')}
                        />
                        Design
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="business" 
                          checked={selectedFilters.category.includes('business')}
                          onChange={() => handleFilterChange('category', 'business')}
                        />
                        Business
                      </label>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div className={styles.filterGroup}>
              <label onClick={() => toggleDropdown('rating')}>
                Rating
                <span>{openDropdown === 'rating' ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
              </label>
              {openDropdown === 'rating' && (
                <div className={styles.customSelect}>
                  <ul className={styles.dropdown}>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="5" 
                          checked={selectedFilters.rating.includes('5')}
                          onChange={() => handleFilterChange('rating', '5')}
                        />
                        5 Stars
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="4" 
                          checked={selectedFilters.rating.includes('4')}
                          onChange={() => handleFilterChange('rating', '4')}
                        />
                        4 Stars & Above
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="3" 
                          checked={selectedFilters.rating.includes('3')}
                          onChange={() => handleFilterChange('rating', '3')}
                        />
                        3 Stars & Above
                      </label>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Level Filter */}
            <div className={styles.filterGroup}>
              <label onClick={() => toggleDropdown('level')}>
                Level
                <span>{openDropdown === 'level' ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
              </label>
              {openDropdown === 'level' && (
                <div className={styles.customSelect}>
                  <ul className={styles.dropdown}>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="easy" 
                          checked={selectedFilters.level.includes('easy')}
                          onChange={() => handleFilterChange('level', 'easy')}
                        />
                        Easy
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="medium" 
                          checked={selectedFilters.level.includes('medium')}
                          onChange={() => handleFilterChange('level', 'medium')}
                        />
                        Medium
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="hard" 
                          checked={selectedFilters.level.includes('hard')}
                          onChange={() => handleFilterChange('level', 'hard')}
                        />
                        Hard
                      </label>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Language Filter */}
            <div className={styles.filterGroup}>
              <label onClick={() => toggleDropdown('language')}>
                Language
                <span>{openDropdown === 'language' ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
              </label>
              {openDropdown === 'language' && (
                <div className={styles.customSelect}>
                  <ul className={styles.dropdown}>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="tamil" 
                          checked={selectedFilters.language.includes('tamil')}
                          onChange={() => handleFilterChange('language', 'tamil')}
                        />
                        Tamil
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="english" 
                          checked={selectedFilters.language.includes('english')}
                          onChange={() => handleFilterChange('language', 'english')}
                        />
                        English
                      </label>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Duration Filter */}
            <div className={styles.filterGroup}>
              <label onClick={() => toggleDropdown('duration')}>
                Duration
                <span>{openDropdown === 'duration' ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
              </label>
              {openDropdown === 'duration' && (
                <div className={styles.customSelect}>
                  <ul className={styles.dropdown}>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="1-hours" 
                          checked={selectedFilters.duration.includes('1-hours')}
                          onChange={() => handleFilterChange('duration', '1-hours')}
                        />
                        1 Hour
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="2-hours" 
                          checked={selectedFilters.duration.includes('2-hours')}
                          onChange={() => handleFilterChange('duration', '2-hours')}
                        />
                        2 Hours
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="3-hours" 
                          checked={selectedFilters.duration.includes('3-hours')}
                          onChange={() => handleFilterChange('duration', '3-hours')}
                        />
                        3 Hours
                      </label>
                    </li>
                  </ul>
                </div>
              )}
            </div>

          </div>

          {/* Courses Cards Section */}
          <div className={styles.coursesCards}>
            <div className={styles.coursesCardsHead}>
              <p>Showing {filteredCards.length} of {cards.length} results</p>
              
            </div>

            {filteredCards.length === 0 ? (
              <div className={styles.noResults}>
                <p>No courses found matching your filters.</p>
                <button onClick={clearAllFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className={styles.coursesCardsContent}>
                {filteredCards.map((card) => (
                  <div key={card.id} className={styles.cardItem}>
                    <div className={styles.cardLink}>
                      <Image
                        src={card.img}
                        alt="Card"
                        width={300}
                        height={200}
                        className={styles.cardImage}
                      />
                      <div className={styles.sliderCard}>
                        <div className={styles.stars}>
                          {getStars(card.rating)}
                          <span className={styles.ratingValue}>({card.rating})</span>
                        </div>
                        <p className={styles.cardTitle}>{card.title}</p>
                        <p className={styles.cardPrice}>{card.amt}</p>
                        <button 
                          className={styles.viewDetailsBtn}
                          onClick={() => handleMoveDetails(card.id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Courses;