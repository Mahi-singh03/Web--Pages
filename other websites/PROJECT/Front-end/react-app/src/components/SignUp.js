import React, { useState, useEffect } from 'react';
import '../css/SignUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const check = localStorage.getItem('user');
    if (check) {
      navigate('/'); // Redirect to home if the user is already logged in
    }
  }, [navigate]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state before submission
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('http://localhost:5000/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        localStorage.setItem('user', JSON.stringify(data)); // Store user data in local storage
        navigate('/', { replace: true }); // Redirect to home
      } else {
        setError(data.message || "Failed to sign up. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSignUp}>
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
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : (
          <div className="forgot-password">
            <span>Already have an account? <a href="/Login">Log In</a></span>
          </div>
        )}
        <p className="p-container">
          <button type="submit" id="go" disabled={loading}>Sign Up</button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
