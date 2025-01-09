import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';


const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <Link className="nav-brand" to="/">Monjolica Restaurant</Link>
        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/Menu">Menu</Link>
          <Link className="nav-link" to="/Specials">Specials</Link>
          <Link className="nav-link" to="/Orders">Orders</Link>
          <Link className="nav-link" to="/Logout">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


