import React, { useState } from "react";
import '../css/SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpData = (event) => {
    event.preventDefault(); // Prevent form submission refresh
    console.warn("Sign-up data:", name, email, password);
    
    fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }) // Correct JSON body
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };
  

  return (
    <div className="signup-form-container">
      <form onSubmit={signUpData}> {/* Attach signUpData to onSubmit */}
        <h1>Sign Up</h1>
        <div className="inset">
          <p>
            <label htmlFor="name">NAME</label>
            <input 
              type="text" 
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              id="name" 
            />
          </p>
          <p>
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input 
              type="email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              id="email" 
            />
          </p>
          <p>
            <label htmlFor="password">PASSWORD</label>
            <input 
              type="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              id="password" 
            />
          </p>
        </div>
        <div className="forgot-password">
          <span>Forgot password?</span>
        </div>
        <p className="p-container">
          <button type="submit" id="go">Sign Up</button> {/* Changed to button */}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
