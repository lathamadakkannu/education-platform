import React from "react";
import styles from "./SubProgram3.module.scss";

const SubProgram3 = () => {
  return (
    <div className={styles.subProgram}>
      {/* Banner Section */}
      <div className={styles.bannerSection}>
        <div className={styles.bannerImage}>
          <img src="/image/subprogram3.jpeg" alt="Learning program banner" />
        </div>
        <div className={styles.bannerOverlay}>
          <div className={styles.bannerText}>
            <h1>Our programs empower learners with essential skills for today's dynamic world.</h1>
          </div>
        </div>
      </div>

      {/* About Course Section */}
      <div className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <h2>About This Course</h2>
          <p>
            This intensive program blends structured video modules, live mentorship sessions, and
            real-world capstone projects so learners master modern development practices and build
            confidence for technical interviews.
          </p>
        </div>
      </div>

      {/* Course Content Section */}
      <div className={styles.courseSection}>
        <div className={styles.courseContainer}>
          {/* Card 1: Image Left, Content Right */}
          <div className={styles.courseBlock}>
            <div className={styles.courseImage}>
              <img src="/image/event1.jpeg" alt="Learning Methods" />
            </div>
            <div className={styles.courseText}>
              <h3>Learning Methods</h3>
              <p>
                Our bootcamp uses a blend of on-demand content and live interactive sessions to make learning engaging and effective.
                The emphasis is on practical experience through real-world projects.
              </p>
              <ul>
                <li><strong>On-Demand Content:</strong> Access recorded lectures and a library of learning resources anytime.</li>
                <li><strong>Live Sessions:</strong> Weekly live coding sessions and Q&A with instructors to address doubts and explain complex concepts.</li>
                <li><strong>Practical Application:</strong> Hands-on coding exercises, assignments, and collaborative group projects to reinforce your learning.</li>
              </ul>
              
            </div>
          </div>

          {/* Card 2: Content Left, Image Right */}
          <div className={styles.courseBlockReverse}>
            <div className={styles.courseText}>
              <h3>Community & Networking</h3>
              <p>
                Join a thriving community of learners, mentors, and industry professionals.
                Networking opportunities help you build lasting connections that can advance your career.
              </p>
              <ul>
                <li><strong>Discussion Forums:</strong> Share ideas and get feedback from a supportive learning community.</li>
                <li><strong>Alumni Network:</strong> Connect with past graduates who are now working in tech roles.</li>
                <li><strong>Industry Webinars:</strong> Attend sessions led by experts on the latest tech trends.</li>
                <li><strong>Networking Events:</strong> Exclusive opportunities to meet professionals and expand your connections.</li>
              </ul>
             
            </div>
            <div className={styles.courseImage}>
              <img src="/image/event2.jpeg" alt="Community & Networking" />
            </div>
          </div>

          {/* Card 3: Image Left, Content Right */}
          <div className={styles.courseBlock}>
            <div className={styles.courseImage}>
              <img src="/image/event3.jpeg" alt="Support & Resources" />
            </div>
            <div className={styles.courseText}>
              <h3>Support & Resources</h3>
              <p>
                We're committed to providing the support you need to succeed, from technical help to learning resources.
                Our team ensures you stay on track throughout the program.
              </p>
              <ul>
                <li><strong>Learning Materials:</strong> Comprehensive resources, including tutorials, guides, and practice challenges.</li>
                <li><strong>Career Resources:</strong> Tips on building your portfolio, writing resumes, and acing job interviews.</li>
                <li><strong>Mentor Check-Ins:</strong> Regular sessions to discuss your progress and goals.</li>
              </ul>
             
            </div>
          </div>

          {/* Card 4: Content Left, Image Right */}
          <div className={styles.courseBlockReverse}>
            <div className={styles.courseText}>
              <h3>Assessment & Certification</h3>
              <p>
                Your progress is evaluated through a combination of assignments, quizzes, and a final capstone project.
                Completing the program earns you a certification that is recognized in the tech industry.
              </p>
              <ul>
                <li><strong>Regular Assessments:</strong> Quizzes and assignments to track your understanding.</li>
                <li><strong>Capstone Project:</strong> A full-stack application that showcases your development skills.</li>
                <li><strong>Industry-Recognized Certificate:</strong> A credential that enhances your job prospects.</li>
              </ul>
             
            </div>
            <div className={styles.courseImage}>
              <img src="/image/event4.jpg" alt="Assessment & Certification" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubProgram3;