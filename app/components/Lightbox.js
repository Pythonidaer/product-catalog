'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Lightbox({ src, alt }) {
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleLightbox = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button 
        className="not-found-image-wrapper"
        onClick={toggleLightbox}
        aria-label="Open image in fullscreen"
        aria-expanded={isOpen}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="not-found-image"
          priority
        />
      </button>

      {isOpen && (
        <div 
          className="lightbox-overlay"
          onClick={toggleLightbox}
          onKeyDown={handleKeyDown}
          aria-modal="true"
          role="dialog"
          aria-label="Image Lightbox"
          tabIndex="-1"
        >
          <div 
            className="lightbox-content"
            role="document"
          >
            <button
              onClick={toggleLightbox}
              className="lightbox-close"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <div className="lightbox-image-container">
              <Image
                src={src}
                alt={alt}
                fill
                className="lightbox-image"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
