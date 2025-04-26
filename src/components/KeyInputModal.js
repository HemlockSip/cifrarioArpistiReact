import React, { useState, useRef, useEffect } from 'react';

function KeyInputModal({ onDecrypt, onCancel }) {
  const [key, setKey] = useState('');
  const inputRef = useRef(null);

  // Focus sull'input quando il componente viene montato
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
    // Gestisce l'invio anche premendo Invio nel campo di input
    if (e.key === 'Enter') {
        handleSubmit(e);
    }
  };

  return (
    <div className="modal" style={{ display: 'flex' }}> {/* Usa display flex per centrare */}
      <div className="modal-content">
        <h3>Digita la Chiave di Lettura</h3>
        <form onSubmit={handleSubmit}>
          <div className="key-input-container">
            <input
              type="text"
              className="key-input"
              placeholder="Inserisci la chiave..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyPress={handleKeyPress} // Aggiunto per gestire Invio
              ref={inputRef} // Assegna il ref all'input
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
}

export default KeyInputModal;