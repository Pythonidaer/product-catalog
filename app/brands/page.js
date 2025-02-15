import styles from './page.module.css';

export default function BrandsPage() {
  return (
    <div className="container">
      <h1 className="category-page-header">Trusted Brands - Quality and Reliability</h1>
      
      <div className={styles.headerInfo}>
        <h2 className={styles.sectionTitle}>Wide Selection of Leading Industry Brands</h2>
        <h3 className={styles.sectionSubtitle}>Explore Products by Brand Category</h3>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.description}>
          Our extensive catalog features products from the industry's most trusted manufacturers, 
          ensuring quality, reliability, and innovation across all categories. From plumbing and 
          heating to HVAC and industrial supplies, we partner with leading brands to provide you 
          with the best solutions for your needs.
        </div>

        {/* Placeholder for future brand categories and listings */}
        <section className={styles.brandsSection}>
          <p className={styles.comingSoon}>
            Brand categories and product listings coming soon. Check back for updates 
            to explore our complete selection of trusted manufacturers and their products.
          </p>
        </section>
      </div>
    </div>
  );
}
