import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    // Derive name from email for a more dynamic feel
    const nameFromEmail = email.split('@')[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    dispatch(login({ email, name: formattedName }));
  };

  const handleDemoLogin = () => {
    dispatch(login({ email: 'demo@creativeupaay.com', name: 'Demo User' }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <img src="/assets/colorfilter.png" alt="logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          </div>
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-submit">Sign In</button>
          
          <div className="login-divider">
            <span>OR</span>
          </div>
          
          <button 
            type="button" 
            className="login-demo" 
            onClick={handleDemoLogin}
          >
            Login with Demo Account
          </button>
        </form>

        <div className="login-footer">
          <span>Don't have an account? </span>
          <a href="#">Sign up for free</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
