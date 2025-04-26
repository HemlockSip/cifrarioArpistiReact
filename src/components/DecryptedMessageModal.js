import React from 'react';

function DecryptedMessageModal({ message, onClose }) {
  return (
    <div className="modal" style={{ display: 'flex' }}> {/* Usa display flex per centrare */}
      <div className="modal-content">
        <h3>Il messaggio prende forma davanti ai tuoi occhi</h3>
        <div className="message-display">
          {/* Usa dangerouslySetInnerHTML se il messaggio contiene HTML,
              altrimenti renderizza semplicemente il testo.
              Attenzione: Usare dangerouslySetInnerHTML solo se ti fidi
              del contenuto del messaggio per evitare attacchi XSS.
              Qui assumiamo sia testo semplice. */}
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