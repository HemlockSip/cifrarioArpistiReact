// src/components/DecryptedMessageModal.js (Updated existing file)
import React, { memo } from 'react';
import ModalWrapper from './ModalWrapper';

const DecryptedMessageModal = memo(({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="modal-content">
        <h3>Il messaggio prende forma davanti ai tuoi occhi</h3>
        <div className="message-display">
          {message}
        </div>
        <button className="back-button" onClick={onClose}>
          <span className="home-icon">🏠</span> Messaggi Disponibili
        </button>
      </div>
    </ModalWrapper>
  );
});

DecryptedMessageModal.displayName = 'DecryptedMessageModal';

export default DecryptedMessageModal;