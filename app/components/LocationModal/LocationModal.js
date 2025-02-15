'use client';

import { useEffect } from 'react';
import styles from './LocationModal.module.css';

const LocationModal = ({ isOpen, onClose, locations }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Locations</h2>
          <button 
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className={styles.locationList}>
          {locations.map((location) => (
            <div key={location.id} className={styles.locationItem}>
              <h3>{location.city}, {location.state}</h3>
              <p>{location.address}</p>
              <p>{location.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
