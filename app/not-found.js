"use client";

import React from "react";
import { useRouter } from "next/navigation";
import localFont from 'next/font/local';
import Lightbox from './components/Lightbox';

const spaceGrotesk = localFont({
  src: '../public/fonts/SpaceGrotesk-Bold.woff2',
  variable: '--font-space-grotesk',
});

export default function NotFound() {
  const router = useRouter();

  const handleReturnHome = () => {
    // This will push the home route onto the navigation stack,
    // causing a full re-render of the Home page.
    router.push('/');
    // Alternatively, you can call router.reload() if needed:
    // router.reload();
  };

  return (
    <main className="not-found-container" role="main" aria-labelledby="error-title">
      <div className="not-found-content">
        <section className="not-found-text-content" aria-labelledby="error-title">
          <h1 id="error-title" className={`not-found-title ${spaceGrotesk.variable}`}>
            404
          </h1>
          <h2 id="error-subtitle" className="not-found-subtitle">
            Page Not Found
          </h2>
          <p className="not-found-text">
            Oops! The page you're looking for doesn't exist. But while you're here, 
            take a look at my database schema!
          </p>
          
          <button 
            onClick={handleReturnHome}
            className="not-found-button"
            aria-label="Return to homepage"
          >
            Return Home
          </button>
        </section>

        <section className="not-found-image-section" aria-labelledby="schema-title">
          <div className="not-found-image-container">
            <Lightbox
              src="/schema.jpg"
              alt="Database Schema Diagram showing the structure of the product catalog database"
            />
            <p id="schema-title" className="not-found-image-caption">
              Tap image to view in full size
            </p>
            <p className="not-found-image-caption">
              My database schema visualization - showing how I organize the product catalog data
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
