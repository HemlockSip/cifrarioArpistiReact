// src/components/ErrorModal.js (Updated existing file)
import React, { memo } from 'react';
import ModalWrapper from './ModalWrapper';

const ErrorModal = memo(({ isOpen, onRetry, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="modal-content">
        <h3>Il messaggio che prende forma davanti ai tuoi occhi non sembra avere alcun senso compiuto.</h3>
        <p className="error-message">Probabilmente la chiave di lettura non è corretta.</p>
        <button className="back-button" onClick={onRetry}>
          <span className="lock-icon">🔑</span> Riprova
        </button>
        <button className="back-button" onClick={onClose}>
          <span className="home-icon">🏠</span> Messaggi Disponibili
        </button>
      </div>
    </ModalWrapper>
  );
});

ErrorModal.displayName = 'ErrorModal';

export default ErrorModal;