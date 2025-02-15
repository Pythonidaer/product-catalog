'use client';

import { useState } from 'react';
import LocationModal from '../LocationModal/LocationModal';
import styles from './LocationSearch.module.css';

export default function LocationSearch({ locations }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="locationSearch">
        <h2 className={styles.sectionTitle}>Search by Zip Code</h2>
        <div className={styles.formGroup}>
          <input 
            type="text" 
            id="zipCode"
            name="zipCode"
            placeholder="Enter ZIP code"
            pattern="[0-9]*"
            minLength="5"
            maxLength="5"
            className={styles.input}
            required
            aria-label="Enter zip code"
          />
        </div>
        <div className={styles.formGroup}>
          <select 
            id="storeSpec"
            name="storeSpec"
            className={styles.input}
            aria-label="Store type selection"
          >
            <option value="CounterR">Wholesale Counter</option>
            <option value="ShowroomR">Retail Showroom</option>
          </select>
        </div>
        <div className={styles.note}>
          <span className={styles.required}>*</span>The US zip code must contain 5 digits
        </div>
        <div className={styles.buttonWrapper}>
          <button type="submit" name="Submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>

      <LocationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locations={locations}
      />
    </>
  );
}
