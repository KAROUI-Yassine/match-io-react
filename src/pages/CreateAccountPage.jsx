import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const strengthLevels = [ //
  { color: '#ff0000', text: 'Very Weak' },
  { color: '#ff5e00', text: 'Weak' },
  { color: '#ffbb00', text: 'Medium' },
  { color: '#00ffcc', text: 'Strong' }
];

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: '',
    mainGame: '',
    termsChecked: false,
    newsletterChecked: false,
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ level: 0, text: 'Password strength', color: '#666' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear specific error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (name === 'password' && errors.confirmPassword && value === formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
    if (name === 'confirmPassword' && errors.confirmPassword && value === formData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  // Password strength check
  useEffect(() => {
    const { password } = formData;
    if (!password) {
        setPasswordStrength({ level: 0, text: 'Password strength', color: '#666' });
        return;
    }
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    strength = Math.min(strength, strengthLevels.length - 1);
    setPasswordStrength({
      level: strength,
      text: strengthLevels[strength].text,
      color: strengthLevels[strength].color
    });

    // Clear confirm password error if passwords now match
    if (formData.confirmPassword && password === formData.confirmPassword && errors.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  }, [formData.password, formData.confirmPassword, errors.confirmPassword]);
  
  useEffect(() => {
    if (formData.termsChecked && errors.termsChecked) {
        setErrors(prev => ({ ...prev, termsChecked: '' }));
    }
  }, [formData.termsChecked, errors.termsChecked]);


  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    const { username, email, password, confirmPassword, region, termsChecked } = formData;

    // Username validation
    if (!username.trim()) { newErrors.username = 'Username is required'; isValid = false; }
    else if (username.trim().length < 4) { newErrors.username = 'Username must be at least 4 characters'; isValid = false; }
    else if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) { newErrors.username = 'Username can only contain letters, numbers, and underscores'; isValid = false; }

    // Email validation
    if (!email.trim()) { newErrors.email = 'Email is required'; isValid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { newErrors.email = 'Please enter a valid email address'; isValid = false; }

    // Password validation
    if (!password) { newErrors.password = 'Password is required'; isValid = false; }
    else if (password.length < 8) { newErrors.password = 'Password must be at least 8 characters'; isValid = false; }

    // Confirm password validation
    if (password !== confirmPassword) { newErrors.confirmPassword = 'Passwords do not match'; isValid = false; }
    
    // Region validation
    if (!region) { newErrors.region = 'Please select your region'; isValid = false; }

    // Terms validation
    if (!termsChecked) { newErrors.termsChecked = 'You must accept the terms and conditions'; isValid = false; }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //
    if (validateForm()) {
      console.log('Signup form submitted:', formData); //
      alert('Account created successfully! Redirecting...'); //
      // navigate('/dashboard'); // Example redirect
    }
  };
  
  const getInputStyle = (fieldName) => (errors[fieldName] ? { borderColor: '#ff3333', borderWidth: '2px' } : {});
  const ErrorDisplay = ({ fieldName }) => errors[fieldName] ? <div className="error-message" style={{ color: '#ff3333', marginTop: '5px', fontSize: '12px', wordBreak: 'break-word' }}>{errors[fieldName]}</div> : null;


  return (
    <> {/* Header is rendered by MainLayout */}
      <section className="signup-section">
        <div className="signup-container">
          <h2 className="signup-title">Join the Arena</h2>
          <p className="signup-subtitle">Create your esports profile and start competing</p>
          
          <div className="signup-card">
            <form className="signup-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="username">Username*</label>
                  <input type="text" id="username" name="username" placeholder="gamertag" value={formData.username} onChange={handleChange} required style={getInputStyle('username')}/>
                  <div className="input-hint">This will be your public profile name</div>
                  <ErrorDisplay fieldName="username"/>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input type="email" id="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required style={getInputStyle('email')}/>
                  <ErrorDisplay fieldName="email"/>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password*</label>
                  <input type="password" id="password" name="password" placeholder="Create password" value={formData.password} onChange={handleChange} required style={getInputStyle('password')}/>
                  <div className="password-strength">
                    {strengthLevels.slice(0, 4).map((_, index) => ( // Assuming 4 bars max
                        <span key={index} className="strength-bar" style={{ backgroundColor: index <= passwordStrength.level ? passwordStrength.color : '#333' }}></span>
                    ))}
                    <span className="strength-text" style={{ color: passwordStrength.color }}>{passwordStrength.text}</span>
                  </div>
                  <ErrorDisplay fieldName="password"/>
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirm Password*</label>
                  <input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required style={getInputStyle('confirmPassword')}/>
                  <ErrorDisplay fieldName="confirmPassword"/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="region">Region*</label>
                <select id="region" name="region" value={formData.region} onChange={handleChange} required style={getInputStyle('region')}>
                  <option value="">Select your region</option>
                  <option value="na">North America</option>
                  <option value="eu">Europe</option>
                  <option value="asia">Asia</option>
                  <option value="sa">South America</option>
                  <option value="oce">Oceania</option>
                </select>
                <ErrorDisplay fieldName="region"/>
              </div>

              <div className="form-group">
                <label htmlFor="main-game">Main Game</label>
                <select id="main-game" name="mainGame" value={formData.mainGame} onChange={handleChange}>
                  <option value="">Select your primary game</option>
                  <option value="valorant">Valorant</option>
                  <option value="lol">League of Legends</option>
                  <option value="csgo">CS:GO 2</option>
                  <option value="dota2">Dota 2</option>
                  <option value="overwatch">Overwatch 2</option>
                  <option value="r6">Rainbow Six Siege</option>
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-label" style={getInputStyle('termsChecked')}>
                  <input type="checkbox" name="termsChecked" checked={formData.termsChecked} onChange={handleChange} required />
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                </label>
                <ErrorDisplay fieldName="termsChecked"/>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="newsletterChecked" checked={formData.newsletterChecked} onChange={handleChange} />
                  Subscribe to match.io newsletter (tournament updates, promotions)
                </label>
              </div>

              <Button type="submit" className="signup-button">Create Account</Button>
            </form>
            
            <div className="login-redirect">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </section>
      {/* Footer is rendered by MainLayout */}
    </>
  );
};

export default CreateAccountPage;