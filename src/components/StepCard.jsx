import React, { useState, useEffect, useRef } from 'react';
import Button from './Button'; // Assuming you have a Button component for ripple/neon
import useIntersectionObserver from '../hooks/useIntersectionObserver'; // For scroll animations

const TournamentCard = ({ title, prizePool, date, initialTeams, gameIcon, viewLink = "#" }) => {
  const [participantsText, setParticipantsText] = useState(`${initialTeams} teams registered`);
  const participantCountRef = useRef(null);
  const cardRef = useRef(null);

  // Scroll Animation
  const isIntersecting = useIntersectionObserver(cardRef, { threshold: 0.1 });
  useEffect(() => {
    const el = cardRef.current;
    if (el) {
      if (isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      } else if (el.style.opacity !== '1') { // Only set initial if not already visible
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
      }
    }
  }, [isIntersecting]);


  // Simulate Live Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipantsText(prev => {
        const currentNum = parseInt(prev) || initialTeams; // Fallback to initialTeams if parsing fails
        const change = Math.floor(Math.random() * 3); // 0-2
        return `${currentNum + change} teams registered`;
      });

      if (participantCountRef.current) {
        participantCountRef.current.style.color = '#00ffcc'; // Flash color
        const timer = setTimeout(() => {
          if (participantCountRef.current) {
            participantCountRef.current.style.color = '#ccc'; // Revert color
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [initialTeams]);

  // Card Hover Effect (3D tilt)
  useEffect(() => {
    const card = cardRef.current;
    if (!card || ('ontouchstart' in window || navigator.maxTouchPoints > 0)) { // Check for touch device
      return;
    }

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = card.offsetWidth / 2;
      const centerY = card.offsetHeight / 2;
      const angleX = (y - centerY) / 10; // Adjust sensitivity
      const angleY = (centerX - x) / 10; // Adjust sensitivity
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);


  return (
    <div className="tournament-card" ref={cardRef}>
      <div className="game-icon">{gameIcon}</div>
      <h3>{title}</h3>
      <p className="prize-pool">{prizePool}</p>
      <p className="date">{date}</p>
      <div className="participants" ref={participantCountRef}>{participantsText}</div>
      <Button className="view-button" onClick={() => window.location.href = viewLink}>View Details</Button>
    </div>
  );
};

export default TournamentCard;