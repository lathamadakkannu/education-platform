// Shared course catalog used by the course details page (cart / wishlist).
// IDs must match the ?id= value sent by the course cards.

export const DEFAULT_COURSE_ID = "1";

const courses = [
  // From the Courses listing page
  { id: "1", category: "Development", image: "/image/img1.jpg", price: 5000, title: "Full Stack Web Development: HTML, CSS, JavaScript & React" },
  { id: "2", category: "Design", image: "/image/img2.png", price: 2990, title: "Introduction to Web Design: From Basics to Advanced - Explained in Tamil" },
  { id: "3", category: "Business", image: "/image/img3.jpg", price: 2900, title: "Digital Product Strategy & Analytics for Tech Leaders" },
  { id: "4", category: "Development", image: "/image/img1.jpg", price: 1980, title: "JavaScript Essentials & Modern DOM Projects" },
  { id: "5", category: "Design", image: "/image/img2.png", price: 4990, title: "UI/UX Design Systems & Figma Prototyping - Explained in Tamil" },
  { id: "6", category: "Business", image: "/image/img3.jpg", price: 3000, title: "Agile Project Management & Software Delivery Fundamentals" },

  // From the Home page slider
  { id: "home-1", category: "Design", image: "/image/img1.jpg", price: 5000, originalPrice: 8000, title: "Introduction to Web Design: From Basics to Advanced - Explained in Tamil" },
  { id: "home-2", category: "Development", image: "/image/img2.png", price: 5000, originalPrice: 8000, title: "Complete Web Development Bootcamp: HTML, CSS, JavaScript & React" },
  { id: "home-3", category: "Development", image: "/image/img3.jpg", price: 5000, originalPrice: 8000, title: "Python Programming Masterclass: From Zero to Hero" },
  { id: "home-4", category: "Development", image: "/image/img1.jpg", price: 5000, originalPrice: 8000, title: "Data Science and Machine Learning with Python" },
  { id: "home-5", category: "Design", image: "/image/img2.png", price: 5000, originalPrice: 8000, title: "UI/UX Design Fundamentals: Create Amazing User Experiences" },
  { id: "home-6", category: "Development", image: "/image/img3.jpg", price: 5000, originalPrice: 8000, title: "Mobile App Development with React Native" },
];

export function getCourseById(id) {
  return (
    courses.find((course) => course.id === String(id)) ||
    courses.find((course) => course.id === DEFAULT_COURSE_ID)
  );
}

export default courses;
