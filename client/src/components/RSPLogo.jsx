import React from 'react';

/**
 * Exact Brand Logo with transparent background.
 * Simple, elegant, and authentic with zero unnecessary extras.
 */
export default function RSPLogo({ className = "h-10", alt = "Reverie Synaptic Pulse" }) {
  return (
    <img
      src="/logo-transparent.png"
      alt={alt}
      className={`w-auto object-contain select-none transition-opacity duration-200 ${className}`}
      loading="eager"
    />
  );
}
