import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import '../css/NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <Link className="nav-brand" to="/">Monjolica Restaurants</Link>
        <div className="hamburger-menu" onClick={toggleMenu}>
          ☰
        </div>
        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/Menu">Menu</Link>
          <Link className="nav-link" to="/Specials">Specials</Link>
          <Link className="nav-link" to="/Orders">Orders</Link>
          <Link className="nav-link" to="/Logout">Logout</Link>
          <Link className="nav-link" to="/SignUp">SignUp</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
