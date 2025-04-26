import React from 'react';

function DecryptedMessageModal({ message, onClose }) {
  return (
    <div className="modal" style={{ display: 'flex', position: 'fixed', inset: 0 }}> {/* Stile aggiornato */}
      <div className="modal-content">
        <h3>Il messaggio prende forma davanti ai tuoi occhi</h3>
        <div className="message-display">
          {message}
        </div>
        <button className="back-button" onClick={onClose}>
          <span className="home-icon">🏠</span> Messaggi Disponibili
        </button>
      </div>
    </div>
  );
}

export default DecryptedMessageModal;