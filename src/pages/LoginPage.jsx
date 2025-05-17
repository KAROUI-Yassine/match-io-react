import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Clear errors when inputs change
  useEffect(() => {
    if (username) setErrors(prev => ({ ...prev, username: '' }));
  }, [username]);

  useEffect(() => {
    if (password) setErrors(prev => ({ ...prev, password: '' }));
  }, [password]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!username.trim()) { //
      newErrors.username = 'Username is required'; //
      isValid = false;
    } else if (username.trim().length < 4) { //
      newErrors.username = 'Username must be at least 4 characters'; //
      isValid = false;
    }

    if (!password) { //
      newErrors.password = 'Password is required'; //
      isValid = false;
    } else if (password.length < 8) { //
      newErrors.password = 'Password must be at least 8 characters'; //
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //
    if (validateForm()) {
      console.log('Login form submitted:', { username, password }); //
      alert('Login successful! Redirecting...'); //
      // navigate('/dashboard'); // Example redirect
    }
  };
  
  const handleSocialLogin = (platform) => { //
    console.log(`Initiating ${platform} login...`);
    alert(`Redirecting to ${platform} authentication...`);
  };

  return (
    <> {/* Header is rendered by MainLayout */}
      {/* The original login.html had a section.section-1 wrapper for the header.
          If a specific header style for login is needed, adjust Header component or layout.
          For now, assuming global Header is fine. */}
      
      <section className="login-section">
        <div className="login-container">
          <h2 className="login-title">Player Login</h2>
          <div className="login-card">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  placeholder="Enter your username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                  style={errors.username ? { borderColor: '#ff3333', borderWidth: '2px' } : {}}
                />
                {errors.username && <div className="error-message" style={{ color: '#ff3333', marginTop: '5px', fontSize: '12px', wordBreak: 'break-word' }}>{errors.username}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  style={errors.password ? { borderColor: '#ff3333', borderWidth: '2px' } : {}}
                />
                {errors.password && <div className="error-message" style={{ color: '#ff3333', marginTop: '5px', fontSize: '12px', wordBreak: 'break-word' }}>{errors.password}</div>}
              </div>
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              <Button type="submit" className="login-button">Login</Button>
            </form>
            <div className="login-divider">
              <span>or</span>
            </div>
            <div className="social-login">
              <Button className="social-button steam" onClick={() => handleSocialLogin('Steam')}>
                <span className="social-icon">🎮</span> Login with Steam
              </Button>
              <Button className="social-button discord" onClick={() => handleSocialLogin('Discord')}>
                <span className="social-icon">💬</span> Login with Discord
              </Button>
            </div>
          </div>
          <div className="register-link">
            New to match.io? <Link to="/create-account">Create an account</Link>
          </div>
        </div>
      </section>
      {/* Footer is rendered by MainLayout */}
    </>
  );
};

export default LoginPage;