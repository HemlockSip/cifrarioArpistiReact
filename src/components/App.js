// src/components/App.js - Fixed version with correct imports
import React, { useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import MessageList from './MessageList';
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import KeyInputModal from './KeyInputModal';
import DecryptedMessageModal from './DecryptedMessageModal';
import ErrorModal from './ErrorModal';
import useMessages from '../hooks/useMessages';
import { useAppState } from '../hooks/useAppState';
import { useMessageDecryption } from '../hooks/useMessageDecryption';
import { useModalNavigation } from '../hooks/useModalNavigation';
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
  const { messages, loading, error, markMessageAsOpened } = useMessages();
  const { state, actions } = useAppState();
  
  const {
    navigateToList,
    navigateToKey,
    navigateToDecrypted,
    navigateToError,
  } = useModalNavigation({ actions });

  const { decryptMessage } = useMessageDecryption({
    markMessageAsOpened,
    onSuccess: navigateToDecrypted,
    onError: navigateToError,
  });

  const handleSelectMessage = useCallback((message) => {
    actions.selectMessage(message);
  }, [actions]);

  const handleDecrypt = useCallback(async (key) => {
    if (state.selectedMessage) {
      await decryptMessage(state.selectedMessage, key);
    }
  }, [state.selectedMessage, decryptMessage]);

  return (
    <main>
      <MessageList
        messages={messages}
        loading={loading}
        error={error}
        onSelectMessage={handleSelectMessage}
      />

      <KeyInputModal
        isOpen={state.currentView === 'key'}
        onDecrypt={handleDecrypt}
        onCancel={navigateToList}
      />

      <DecryptedMessageModal
        isOpen={state.currentView === 'decrypted'}
        message={state.decryptedContent}
        onClose={navigateToList}
      />

      <ErrorModal
        isOpen={state.currentView === 'error'}
        onRetry={navigateToKey}
        onClose={navigateToList}
      />
    </main>
  );
}

// Route wrapper components
const LoginRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/" replace /> : <Login />;
};

const RegisterRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/" replace /> : <Register />;
};

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