// src/components/App.js
import React, { useState } from 'react';
import MessageList from './MessageList';
import KeyInputModal from './KeyInputModal';
import DecryptedMessageModal from './DecryptedMessageModal';
import ErrorModal from './ErrorModal';
import ModalWrapper from './ModalWrapper'; // Import the new wrapper
import useMessages from '../hooks/useMessages';
import '../App.css';

function App() {
  const { messages, loading, error } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'key', 'decrypted', 'error'
  const [decryptedContent, setDecryptedContent] = useState('');

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setCurrentView('key');
  };

  const handleDecrypt = (key) => {
    if (selectedMessage && key.toLowerCase() === selectedMessage.key.toLowerCase()) {
      // Chiave corretta
      setDecryptedContent(selectedMessage.decrypted);
      setCurrentView('decrypted');
    } else {
      // Chiave errata
      setCurrentView('error');
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedMessage(null);
    setDecryptedContent('');
  };

  const handleBackToKey = () => {
    setCurrentView('key');
  };

  return (
    <div className="app">
      <header>
        <h1>Cifrario degli Arpisti</h1>
      </header>
      <main>
        <MessageList
          messages={messages}
          loading={loading}
          error={error}
          onSelectMessage={handleSelectMessage}
        />
      </main>

      {/* Modal for key input */}
      <ModalWrapper isOpen={currentView === 'key'}>
        <div className="modal-content">
          <h3>Digita la Chiave di Lettura</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const keyInput = e.target.elements.keyInput;
            if (keyInput.value.trim()) {
              handleDecrypt(keyInput.value.trim());
            }
          }}>
            <div className="key-input-container">
              <input
                type="text"
                className="key-input"
                name="keyInput"
                placeholder="Inserisci la chiave..."
                autoFocus
              />
            </div>
            <button type="submit" className="decrypt-button">
              <span className="lock-icon">🔓</span> Decifra
            </button>
            <button type="button" className="back-button" onClick={handleBackToList}>
              <span className="home-icon">🏠</span> Messaggi Disponibili
            </button>
          </form>
        </div>
      </ModalWrapper>

      {/* Modal for decrypted message */}
      <ModalWrapper isOpen={currentView === 'decrypted'}>
        <div className="modal-content">
          <h3>Il messaggio prende forma davanti ai tuoi occhi</h3>
          <div className="message-display">
            {decryptedContent}
          </div>
          <button className="back-button" onClick={handleBackToList}>
            <span className="home-icon">🏠</span> Messaggi Disponibili
          </button>
        </div>
      </ModalWrapper>

      {/* Modal for error */}
      <ModalWrapper isOpen={currentView === 'error'}>
        <div className="modal-content">
          <h3>Il messaggio che prende forma davanti ai tuoi occhi non sembra avere alcun senso compiuto.</h3>
          <p className="error-message">Probabilmente la chiave di lettura non è corretta.</p>
          <button className="back-button" onClick={handleBackToKey}>
            <span className="lock-icon">🔑</span> Riprova
          </button>
          <button className="back-button" onClick={handleBackToList}>
            <span className="home-icon">🏠</span> Messaggi Disponibili
          </button>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default App;