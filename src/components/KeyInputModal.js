import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM

function KeyInputModal({ onDecrypt, onCancel }) {
  const [key, setKey] = useState('');
  const inputRef = useRef(null);
  const modalRoot = document.body; // Or a dedicated div like #modal-root

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key.trim()) {
      onDecrypt(key.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSubmit(e);
    }
  };

  // The modal content remains the same
  const modalContent = (
    <div className="modal" style={{ display: 'flex' /* position/inset might be redundant now if CSS is solid */ }}>
      <div className="modal-content">
        <h3>Digita la Chiave di Lettura</h3>
        <form onSubmit={handleSubmit}>
          {/* ... input and buttons ... */}
           <div className="key-input-container">
              <input
                type="text"
                className="key-input"
                placeholder="Inserisci la chiave..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                onKeyPress={handleKeyPress}
                ref={inputRef}
              />
            </div>
            <button type="submit" className="decrypt-button">
              <span className="lock-icon">🔓</span> Decifra
            </button>
            <button type="button" className="back-button" onClick={onCancel}>
              <span className="home-icon">🏠</span> Messaggi Disponibili
            </button>
        </form>
      </div>
    </div>
  );

  // Use the portal to render into the body
  return ReactDOM.createPortal(modalContent, modalRoot);
}

export default KeyInputModal;