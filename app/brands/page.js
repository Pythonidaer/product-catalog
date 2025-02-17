import styles from './page.module.css';
import brands from '../data/brands';

export default function BrandsPage() {
  return (
    <main className="container">
      <h1 className="category-page-header">Trusted Brands - Quality and Reliability</h1>
      <div className={styles.headerInfo}>
        <h2 className={styles.sectionTitle}>Wide Selection of Leading Industry Brands
        </h2>
        <h3 className={styles.sectionSubtitle}>Explore Products by Brand Category
        </h3>
      </div>
      <hr/>
      <section className="brands-container">
        <h2 style={{ fontSize: '200%', margin: '0 0 10px 0' }}>Top Brands</h2>
        <div className="brands-grid" role="list">
          {brands.map((brand) => (
            <div key={brand.name} className="brand-item" role="listitem">
              <a href={brand.href} className="brand-link" aria-label={brand.name}>
                <img
                  className="brand-img"
                  src={brand.image}
                  alt={brand.name}
                  width="193"
                  height="118"
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
