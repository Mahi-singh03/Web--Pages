import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/privateRotes';
import Login from './components/LogIn';
import DetailBar from './components/Detail-Bar';
import Contact from './components/contact';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(user !== null);
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // Check on initial load

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        {isLoggedIn && <DetailBar />}
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/Menu" element={<h1>Menu</h1>} />
            <Route path="/Specials" element={<h1>Specials</h1>} />
            <Route path="/Orders" element={<h1>Orders</h1>} />
            <Route path="/Logout" element={<h1>Logout</h1>} />
            <Route path="/Profile" element={<h1>Profile</h1>} />
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
