// src/components/auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Successful login - redirects to homepage
      navigate('/');
      
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Accesso agli Arpisti</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleLogin}>
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
          
          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading}
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>Non hai ancora un account? <a href="/register">Registrati</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;