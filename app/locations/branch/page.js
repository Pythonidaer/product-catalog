import { PrismaClient } from '@prisma/client';
import styles from './page.module.css';

const globalForPrisma = global;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function getBranchLocations(state, city) {
  try {
    const locations = await prisma.location.findMany({
      where: {
        state: state,
        city: city
      }
    });
    return locations.map(location => ({
      ...location,
      hours: JSON.parse(location.hours)
    }));
  } catch (error) {
    console.error('Error fetching branch:', error);
    return [];
  }
}

export default async function BranchPage({ searchParams }) {
  const state = searchParams.st;
  const city = searchParams.city;
  const locations = await getBranchLocations(state, city);

  if (!locations || locations.length === 0) {
    return <div>Location not found</div>;
  }

  return (
    <div className="container">
      <h1 className="category-page-header">Locations - {city}, {state}</h1>

      <div className={styles.branchContainer}>
        {locations.map(location => (
          <div key={location.id} className={styles.branchSection}>
            <div className={styles.branchInfo}>
              <h2>{location.storeName}</h2>
              <p className={styles.address}>{location.address}</p>
            </div>

            <div className={styles.hoursSection}>
              <h3>Hours</h3>
              <div className={styles.hours}>
                {Object.entries(location.hours).map(([day, hours]) => (
                  <div key={day} className={styles.hourRow}>
                    <span>{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.contactInfo}>
              <h3>Contact Information</h3>
              {location.phone && (
                <p>Phone: <a href={`tel:${location.phone}`}>{location.phone}</a></p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
