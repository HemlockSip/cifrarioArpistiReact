import React, { memo, useMemo } from 'react';
import MessageCard from './MessageCard';

const MessageList = memo(({ messages, loading, error, onSelectMessage }) => {
  const memoizedMessages = useMemo(() => {
    return messages.map(message => ({
      ...message,
      onSelect: () => onSelectMessage(message)
    }));
  }, [messages, onSelectMessage]);

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
        {memoizedMessages.map(message => (
          <MessageCard
            key={message.id}
            message={message}
            onClick={message.onSelect}
          />
        ))}
      </div>
    </div>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;