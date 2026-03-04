import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom'
import API_URL from './config';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('')

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  if (!/^[a-zA-Z0-9_-]{5,20}$/.test(password)) {
    setError("Password must be 5–20 characters, using letters, numbers, _ or -.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password })
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Signup failed");
      return;
    }
    if (data.success) {
      navigate('/signup-success');
    }
  } catch (err) {
    setError("An error occurred. Please try again.");
  }
}

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && (
        <div className='error-message'>
          {error}
        </div>
       )}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
