// src/components/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import MessageList from './MessageList';
import ModalWrapper from './ModalWrapper';
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import useMessages from '../hooks/useMessages';
import '../App.css';
import './auth/Auth.css';

// Navigation component with logout functionality
function Navigation() {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <header>
      <h1>Cifrario degli Arpisti</h1>
      {isLoggedIn && (
        <div className="user-controls">
          <span className="user-email">{user?.email}</span>
          <button className="logout-button" onClick={logout}>
            Esci
          </button>
        </div>
      )}
    </header>
  );
}

// Main app content with message functionality
function MainContent() {
  const { messages, loading, error } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'key', 'decrypted', 'error'
  const [decryptedContent, setDecryptedContent] = useState('');

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setCurrentView('key');
  };

  const handleDecrypt = (key) => {
    if (selectedMessage && key.toLowerCase() === selectedMessage.key.toLowerCase()) {
      // Chiave corretta
      setDecryptedContent(selectedMessage.decrypted);
      setCurrentView('decrypted');
    } else {
      // Chiave errata
      setCurrentView('error');
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedMessage(null);
    setDecryptedContent('');
  };

  const handleBackToKey = () => {
    setCurrentView('key');
  };

  return (
    <main>
      <MessageList
        messages={messages}
        loading={loading}
        error={error}
        onSelectMessage={handleSelectMessage}
      />

      {/* Modal for key input */}
      <ModalWrapper isOpen={currentView === 'key'}>
        <div className="modal-content">
          <h3>Digita la Chiave di Lettura</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const keyInput = e.target.elements.keyInput;
            if (keyInput.value.trim()) {
              handleDecrypt(keyInput.value.trim());
            }
          }}>
            <div className="key-input-container">
              <input
                type="text"
                className="key-input"
                name="keyInput"
                placeholder="Inserisci la chiave..."
                autoFocus
              />
            </div>
            <button type="submit" className="decrypt-button">
              <span className="lock-icon">🔓</span> Decifra
            </button>
            <button type="button" className="back-button" onClick={handleBackToList}>
              <span className="home-icon">🏠</span> Messaggi Disponibili
            </button>
          </form>
        </div>
      </ModalWrapper>

      {/* Modal for decrypted message */}
      <ModalWrapper isOpen={currentView === 'decrypted'}>
        <div className="modal-content">
          <h3>Il messaggio prende forma davanti ai tuoi occhi</h3>
          <div className="message-display">
            {decryptedContent}
          </div>
          <button className="back-button" onClick={handleBackToList}>
            <span className="home-icon">🏠</span> Messaggi Disponibili
          </button>
        </div>
      </ModalWrapper>

      {/* Modal for error */}
      <ModalWrapper isOpen={currentView === 'error'}>
        <div className="modal-content">
          <h3>Il messaggio che prende forma davanti ai tuoi occhi non sembra avere alcun senso compiuto.</h3>
          <p className="error-message">Probabilmente la chiave di lettura non è corretta.</p>
          <button className="back-button" onClick={handleBackToKey}>
            <span className="lock-icon">🔑</span> Riprova
          </button>
          <button className="back-button" onClick={handleBackToList}>
            <span className="home-icon">🏠</span> Messaggi Disponibili
          </button>
        </div>
      </ModalWrapper>
    </main>
  );
}

// LoginRoute component - redirects authenticated users to homepage
function LoginRoute() {
  const { isLoggedIn } = useAuth();
  
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  return <Login />;
}

// RegisterRoute component - redirects authenticated users to homepage
function RegisterRoute() {
  const { isLoggedIn } = useAuth();
  
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  return <Register />;
}

// Root App component with routing
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navigation />
          
          <Routes>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/register" element={<RegisterRoute />} />
            <Route path="/" element={
              <ProtectedRoute>
                <MainContent />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;