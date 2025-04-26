import React, { useState } from 'react';
import MessageList from './MessageList';
import KeyInputModal from './KeyInputModal';
import DecryptedMessageModal from './DecryptedMessageModal';
import ErrorModal from './ErrorModal';
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
      // Qui potresti usare cleanDecryptedMessage se necessario
      // import { cleanDecryptedMessage } from '../utils/messageUtils';
      // const cleanedMessage = cleanDecryptedMessage(selectedMessage.decrypted, selectedMessage.key);
      // setDecryptedContent(cleanedMessage);
      setDecryptedContent(selectedMessage.decrypted); // Usiamo il messaggio diretto per ora
      setCurrentView('decrypted');
    } else {
      // Chiave errata
      setCurrentView('error');
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedMessage(null);
    setDecryptedContent(''); // Resetta il contenuto decifrato
  };

  const handleBackToKey = () => {
    setCurrentView('key');
  };

  // Decidi quale componente mostrare in base allo stato corrente
  let currentComponent;
  switch (currentView) {
    case 'key':
      currentComponent = (
        <KeyInputModal
          onDecrypt={handleDecrypt}
          onCancel={handleBackToList}
        />
      );
      break;
    case 'decrypted':
      currentComponent = (
        <DecryptedMessageModal
          message={decryptedContent}
          onClose={handleBackToList}
        />
      );
      break;
    case 'error':
      currentComponent = (
        <ErrorModal
          onRetry={handleBackToKey}
          onClose={handleBackToList}
        />
      );
      break;
    default: // 'list'
      currentComponent = (
        <MessageList
          messages={messages}
          loading={loading}
          error={error}
          onSelectMessage={handleSelectMessage}
        />
      );
  }

  return (
    <div className="app">
      <header>
        <h1>Cifrario degli Arpisti</h1>
      </header>
      <main>
        {currentComponent}
      </main>
    </div>
  );
}

export default App;