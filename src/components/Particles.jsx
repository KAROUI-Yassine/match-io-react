import React, { useEffect, useRef } from 'react';

const Particles = ({ count = 30 }) => { // creates 30 particles
  const containerRef = useRef(null);

  useEffect(() => {
    const heroSection = containerRef.current;
    if (!heroSection) return;

    // Clear existing particles if component re-renders and creates them again
    // This simple implementation might create duplicates on fast HMR.
    // A more robust solution would check if particles already exist or assign keys.
    const existingParticles = heroSection.querySelectorAll('.particle');
    existingParticles.forEach(p => p.remove());


    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle'; //

      const size = Math.random() * 5 + 2; //
      const posX = Math.random() * 100; //
      const posY = Math.random() * 100; //
      const delay = Math.random() * 5; //
      const duration = Math.random() * 10 + 10; //

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      // Ensure .particle and @keyframes float are in index.css

      heroSection.appendChild(particle);
    }
  }, [count]);

  // This component will render a div that will contain the particles.
  // It needs to be positioned correctly by its parent, e.g., the hero section.
  return <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}></div>;
};

export default Particles;