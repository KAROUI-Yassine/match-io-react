import React, { useState } from 'react';

const Button = ({ children, onClick, className, type = 'button', isSecondary = false, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    // Neon glow effect
    e.currentTarget.style.boxShadow = `0 0 15px ${isSecondary ? '#00ffcc' : '#00ffcc'}`; // Color can be customized
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    e.currentTarget.style.boxShadow = 'none';
  };

  const handleRippleEffect = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.backgroundColor = 'rgba(0, 255, 204, 0.4)'; // Ripple color
    ripple.className = 'ripple'; // Ensure .ripple and @keyframes ripple are in index.css

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600); // Ripple duration

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      className={className}
      onClick={handleRippleEffect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;