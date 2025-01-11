import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(user !== null);
  }, [location.pathname]); // Update the dependency array to include location.pathname

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  const isSignUpPage = location.pathname === '/SignUp';
  const isLoginPage = location.pathname === '/Login';

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <Link className="nav-brand" to="/">
          Restaurants
        </Link>
        <div className="hamburger-menu" onClick={toggleMenu}>
          ☰
        </div>
        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/Menu">Menu</Link>
          <Link className="nav-link" to="/Specials">Specials</Link>
          <Link className="nav-link" to="/Orders">Orders</Link>
          {isLoggedIn ? (
            <>
              <Link className="nav-link" to="/Profile">Profile</Link>
              <Link className="nav-link" to="/" onClick={handleLogout}>Log out</Link>
            </>
          ) : (
            <>
              {!isLoginPage && <Link className="nav-link" to="/Login">Login</Link>}
              {!isSignUpPage && <Link className="nav-link" to="/SignUp">Sign Up</Link>}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
