import React from 'react';
import MessageCard from './MessageCard';

function MessageList({ messages, loading, error, onSelectMessage }) {
  if (loading) {
    return (
      <div className="message-view">
        <h2>Messaggi Disponibili</h2>
        <div className="loading">
          <div className="loading-icon"></div>
          <p>Caricamento dei messaggi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="message-view">
        <h2>Messaggi Disponibili</h2>
        <div className="no-messages">
          <p>Impossibile caricare i messaggi.</p>
          <p>Errore: {error}</p>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="message-view">
        <h2>Messaggi Disponibili</h2>
        <div className="no-messages">
          <p>Nessun messaggio disponibile al momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-view">
      <h2>Messaggi Disponibili</h2>
      <div className="message-list">
        {messages.map(message => (
          <MessageCard
            key={message.id} // Assicurati che i tuoi messaggi abbiano un ID univoco
            message={message}
            onClick={() => onSelectMessage(message)}
          />
        ))}
      </div>
    </div>
  );
}

export default MessageList;