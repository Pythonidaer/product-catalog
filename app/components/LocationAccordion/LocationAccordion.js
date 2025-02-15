'use client';

import { useState } from 'react';
import styles from './LocationAccordion.module.css';
import Link from 'next/link';

const LocationAccordion = ({ locations }) => {
  const [openState, setOpenState] = useState('');

  // Group locations by state
  const locationsByState = locations.reduce((acc, location) => {
    if (!acc[location.state]) {
      acc[location.state] = [];
    }
    acc[location.state].push(location);
    return acc;
  }, {});

  const toggleState = (state) => {
    setOpenState(openState === state ? '' : state);
  };

  return (
    <div className={styles.accordion}>
      {Object.entries(locationsByState).map(([state, stateLocations]) => (
        <div key={state} className={styles.accordionItem}>
          <button
            className={`${styles.stateButton} ${openState === state ? styles.active : ''}`}
            onClick={() => toggleState(state)}
          >
            {state}
            <span className={styles.arrow}>▼</span>
          </button>
          <div className={`${styles.panel} ${openState === state ? styles.panelOpen : ''}`}>
            <div className={styles.locationGrid}>
              {locations
                .filter((loc) => loc.state === state)
                .map((location) => (
                  <Link
                    key={location.id}
                    href={`/locations/branch?st=${location.state}&city=${location.city}`}
                    className={styles.locationLink}
                  >
                    {location.city}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationAccordion;
