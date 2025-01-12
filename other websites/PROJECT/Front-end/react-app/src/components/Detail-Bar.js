import React from 'react';
import '../css/DetailBar.css';

const DetailBar = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Parse 'user' from localStorage
  const userName = user?.username || 'Guest'; // Safely access the 'username' property

  const whatsappNumber = '1234567890'; // Replace with your actual WhatsApp number

  return (
    <div className="detail-bar">
      <p className="greeting">Hello, {userName}</p>
      <div className="whatsapp">
        <a
          href={`https://wa.me/${9781278770}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat with us on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default DetailBar;
