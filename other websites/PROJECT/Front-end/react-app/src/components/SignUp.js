import React, { useState, useEffect } from 'react';
import '../css/SignUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Define useNavigate at the component level

  useEffect(() => {
    const check = localStorage.getItem('user');
    if (check) {
      navigate('/'); // Redirect to home if the user is already logged in
    }
  }, [navigate]); // Include navigate in the dependency array

  const signUpData = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state before submission

    try {
      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const textResponse = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", textResponse);

      let data;
      try {
        data = JSON.parse(textResponse); // Attempt to parse text as JSON
      } catch {
        if (response.ok && textResponse.toLowerCase().includes("data saved successfully")) {
          console.log("Success:", textResponse);
          localStorage.setItem('user', JSON.stringify({ name, email })); // Store user data in local storage
          navigate('/', { replace: true }); // Redirect to home on success
          return;
        } else {
          setError("Unexpected server response: " + textResponse);
          return;
        }
      }

      if (response.ok) {
        console.log("Success:", data);
        localStorage.setItem('user', JSON.stringify(data)); // Store user data in local storage
        navigate('/', { replace: true }); // Redirect to home
      } else {
        setError(data.message || "Failed to sign up. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={signUpData}>
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
              required
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
              required
            />
          </p>
          <p className="password-container">
            <label htmlFor="password">PASSWORD</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                id="password" 
                required
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="forgot-password">
          <span>Forgot password?</span>
        </div>
        <p className="p-container">
          <button type="submit" id="go">Sign Up</button>
        </p>
        <p className="p-container">
          <button type="submit" id="go">Log In</button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
