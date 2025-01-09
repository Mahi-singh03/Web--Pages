import React from 'react'; // Correct
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar.js';  // Correct import
import Footer from './components/Footer.js';  // Correct import
import SignUp from './components/SignUp.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<h1>this is Home</h1>}></Route>
          <Route path='/Menu' element={<h1>this is Menu</h1>}></Route>
          <Route path='/Specials' element={<h1>this is Specials</h1>}></Route>
          <Route path='/Orders' element={<h1>this is Oreders</h1>}></Route>
          <Route path='/Logout' element={<h1>this is Logout</h1>}></Route>
          <Route path='/SignUp' element={<SignUp />} />


        </Routes>
       
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

