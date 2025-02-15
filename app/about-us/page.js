import Image from 'next/image';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className="container">
      <h1 className="category-page-header">About This Project</h1>
      
      <div className={styles.aboutContent}>
        <section className={styles.section}>
          <h2>Project Overview</h2>
          <p>
            This Product Catalog website was created by Jonathan Hammond as a mock demo project 
            to explore and demonstrate modern web development technologies and practices.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Connect With Me</h2>
          <div className={styles.socialLinks}>
            <a href="https://github.com/Pythonidaer" className={styles.socialItem} target="_blank" rel="noopener noreferrer">
              <div className={styles.iconWrapper}>
                <Image src="/github-icon.svg" alt="GitHub" width={32} height={32} />
              </div>
              <h3>GitHub</h3>
              <p>Check out my other projects and contributions</p>
            </a>
            <a href="https://www.linkedin.com/in/jonamichahammo/" className={styles.socialItem} target="_blank" rel="noopener noreferrer">
              <div className={styles.iconWrapper}>
                <Image src="/linkedin-icon.svg" alt="LinkedIn" width={32} height={32} />
              </div>
              <h3>LinkedIn</h3>
              <p>Connect with me professionally</p>
            </a>
            <a href="https://jonathan-hammond.vercel.app/" className={styles.socialItem} target="_blank" rel="noopener noreferrer">
              <div className={styles.iconWrapper}>
                <Image src="/portfolio-icon.svg" alt="Portfolio" width={32} height={32} />
              </div>
              <h3>Portfolio</h3>
              <p>View my personal portfolio website</p>
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Technologies Used</h2>
          <div className={styles.techStack}>
            <div className={styles.techItem}>
              <h3>Next.js</h3>
              <p>A React framework for production-grade applications that offers server-side 
              rendering, static site generation, and efficient client-side routing.</p>
            </div>
            <div className={styles.techItem}>
              <h3>Prisma</h3>
              <p>A next-generation ORM that provides a clean and type-safe API for database 
              operations with excellent developer experience.</p>
            </div>
            <div className={styles.techItem}>
              <h3>PostgreSQL</h3>
              <p>A powerful, open-source relational database system used to store and manage 
              the application's data efficiently.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Learning Objectives</h2>
          <ul className={styles.objectivesList}>
            <li>Building scalable web applications with Next.js 14 and React</li>
            <li>Implementing database operations using Prisma ORM</li>
            <li>Managing data with PostgreSQL in a production environment</li>
            <li>Creating responsive and accessible user interfaces</li>
            <li>Implementing efficient routing and data fetching strategies</li>
          </ul>
        </section>

        <section className={styles.disclaimer}>
          <p>
            This is a demo project and is not affiliated with any real business. All product 
            information, company names, and other content are used for demonstration purposes only.
          </p>
        </section>
      </div>
    </div>
  );
}
