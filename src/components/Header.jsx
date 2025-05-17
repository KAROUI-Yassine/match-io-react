import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const location = useLocation();

  // Logo animation
  useEffect(() => {
    const logo = logoRef.current;
    if (logo) {
      logo.style.opacity = '0';
      logo.style.transform = 'translateY(-20px)';
      logo.style.transition = 'all 0.5s ease-out';

      const timer = setTimeout(() => {
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
      }, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Menu item animations
  useEffect(() => {
    menuItemsRef.current.forEach((item, index) => {
      if (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';
        item.style.transition = `all 0.3s ease-out ${0.3 + index * 0.1}s`;

        const timer = setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 300 + index * 100);
        // It's tricky to return clearTimeout for multiple timeouts inside a loop correctly
        // without storing all timer IDs. For this effect, it might be acceptable.
        // A more robust way would be to use a state variable to trigger animations via CSS classes.
      }
    });
  }, []);
  
  const menuLinks = [
    { path: '/', label: 'Home' },
    { path: '/tournaments', label: 'Tournaments' },
    { path: '/rankings', label: 'Rankings' },
  ];

  // Determine if current path is login or create-account for active class logic
  const isAuthPage = location.pathname === '/login' || location.pathname === '/create-account';
  const loginPathLabel = location.pathname === '/create-account' ? 'Create Account' : 'Login';


  return (
    <div className="header"> {/* Assuming .section and .section-1 classes are handled by parent pages if needed */}
      <div className="logo" ref={logoRef}>
        match<span>.io</span>
      </div>
      <nav className="menu">
        <ul>
          {menuLinks.map((link, index) => (
            <li key={link.path} ref={el => menuItemsRef.current[index] = el}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => (isActive && !isAuthPage ? 'active' : '')}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          {/* Special handling for Login/Create Account link */}
          <li ref={el => menuItemsRef.current[menuLinks.length] = el}>
            <NavLink 
              to={location.pathname === '/create-account' ? '/create-account' : '/login'}
              className={isAuthPage ? 'active' : ''}
            >
              {loginPathLabel}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;