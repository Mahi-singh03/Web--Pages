import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Check if user is logged in on mount and listen to localStorage updates
  useEffect(() => {
    const check = localStorage.getItem('user');
    setIsLoggedIn(check !== null);
  }, [navigate]); // Re-run this effect when `navigate` changes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home or login page
  };

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/Menu', text: 'Menu' },
    { to: '/Specials', text: 'Specials' },
    { to: '/Orders', text: 'Orders' },
  ];

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <Link className="nav-brand" to="/">
          Monjolica Restaurants
        </Link>
        <div className="hamburger-menu" onClick={toggleMenu}>
          ☰
        </div>
        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          {navLinks.map((link) => (
            <Link key={link.to} className="nav-link" to={link.to}>
              {link.text}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link
              className="nav-link"
              to="/Logout"
              onClick={handleLogout}
            >
              Log out
            </Link>
          ) : (
            <Link className="nav-link" to="/SignUp">
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
