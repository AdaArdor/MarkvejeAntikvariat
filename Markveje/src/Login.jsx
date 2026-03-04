import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import API_URL from './config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      if (data.success) {
        login({ username: data.username });
        navigate('/');
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      {error && (
        <div className='error-message'>
          {error}
        </div>
      )}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
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
        <button type="submit" className="auth-btn">Login</button>
      </form>
      <div className="auth-create-account">
        <span>Don't have an account? </span>
        <a href="/signup" className="auth-create-link">Create account</a>
      </div>
    </div>
  );
};

export default Login;