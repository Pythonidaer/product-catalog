import { PrismaClient } from '@prisma/client';
import LocationAccordion from '../components/LocationAccordion/LocationAccordion';
import LocationSearch from '../components/LocationSearch/LocationSearch';
import styles from './page.module.css';

const prisma = new PrismaClient();

export const revalidate = 3600; // Revalidate every hour

async function getLocations() {
  try {
    return await prisma.location.findMany({
      orderBy: [
        { state: 'asc' },
        { city: 'asc' }
      ]
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="container">
      <h1 className="category-page-header">Store Locations - Find Your Nearest Store</h1>
      
      <div className={styles.headerInfo}>
        <h2 className={styles.sectionTitle}>Serving You Across Multiple Locations</h2>
        <h3 className={styles.sectionSubtitle}>Address, Services, and Opening Hours</h3>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.searchSection}>
          <LocationSearch locations={locations} />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.description}>
            With roots dating back to 1866, the company this mock website is based on is a third-generation, family-owned business and the largest wholesale distributor of plumbing, heating, HVAC, refrigeration and pipe, valves and fittings in the Northeast, with more than 100 locations across New England, NY, NJ, and PA.
          </div>

          <section className={styles.statesSection}>
            <h2 className={styles.sectionTitle}>Browse by States</h2>
            <LocationAccordion locations={locations} />
          </section>
        </div>
      </div>
    </div>
  );
}
