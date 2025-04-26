// src/components/auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (password !== confirmPassword) {
      setError("Le password non corrispondono");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Check if user was created or if confirmation email was sent
      if (data?.user) {
        // Redirect to homepage after successful registration
        navigate('/');
      }
      
    } catch (error) {
      console.error('Error registering:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registrati come Arpista</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="auth-field">
            <label htmlFor="confirm-password">Conferma Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading}
          >
            {loading ? 'Registrazione in corso...' : 'Registrati'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>Hai già un account? <a href="/login">Accedi</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;