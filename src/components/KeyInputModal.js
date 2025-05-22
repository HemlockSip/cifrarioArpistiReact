// src/components/KeyInputModal.js (Updated existing file)
import React, { useState, useRef, useEffect, memo } from 'react';
import ModalWrapper from './ModalWrapper';

const KeyInputModal = memo(({ isOpen, onDecrypt, onCancel }) => {
  const [key, setKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setKey(''); // Reset key when modal opens
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (key.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onDecrypt(key.trim());
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen}>
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
              ref={inputRef}
              disabled={isSubmitting}
            />
          </div>
          <button 
            type="submit" 
            className="decrypt-button"
            disabled={!key.trim() || isSubmitting}
          >
            <span className="lock-icon">🔓</span> 
            {isSubmitting ? 'Decifrando...' : 'Decifra'}
          </button>
          <button 
            type="button" 
            className="back-button" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <span className="home-icon">🏠</span> Messaggi Disponibili
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
});

KeyInputModal.displayName = 'KeyInputModal';

export default KeyInputModal;