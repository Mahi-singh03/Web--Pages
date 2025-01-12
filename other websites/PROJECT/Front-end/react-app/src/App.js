import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';
import SignUp from './components/SignUp.js';
import Private_component from './components/privateRotes.js';
import Login from './components/LogIn.js';
import DetailBar from './components/Detail-Bar.js';
import Contact from './components/contact.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(user !== null);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        {isLoggedIn && <DetailBar />}
        <Routes>
          <Route element={<Private_component />}>
            <Route path="/" element={<h1>this is Home</h1>} />
            <Route path="/Menu" element={<h1>this is Menu</h1>} />
            <Route path="/Specials" element={<h1>this is Specials</h1>} />
            <Route path="/Orders" element={<h1>this is Orders</h1>} />
            <Route path="/Logout" element={<h1>this is Logout</h1>} />
            <Route path="/Profile" element={<h1>this is Profile</h1>} />
          </Route>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Contact /> 
      <Footer />
    </div>
  );
}

export default App;
