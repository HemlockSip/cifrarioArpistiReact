import React from 'react';

function ErrorModal({ onRetry, onClose }) {
  return (
    <div className="modal" style={{ display: 'flex' }}> {/* Usa display flex per centrare */}
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
    </div>
  );
}

export default ErrorModal;