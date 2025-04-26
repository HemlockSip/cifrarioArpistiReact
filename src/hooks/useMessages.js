import { useState, useEffect } from 'react';

function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null); // Resetta l'errore all'inizio del fetch
        // Assicurati che il percorso a messages.json sia corretto
        // Se messages.json è nella cartella public, il percorso è relativo alla root del server
        const response = await fetch('/messages.json');

        if (!response.ok) {
          throw new Error(`Errore nel caricamento dei messaggi: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // Aggiungi un ID univoco se non presente (utile per il 'key' prop in React)
        const messagesWithId = data.map((msg, index) => ({ ...msg, id: msg.id || `msg-${index}` }));
        setMessages(messagesWithId);

      } catch (err) {
        console.error('Errore durante il caricamento dei messaggi:', err);
        setError(err.message);
        setMessages([]); // Resetta i messaggi in caso di errore
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []); // L'array vuoto [] assicura che useEffect venga eseguito solo al mount

  return { messages, loading, error };
}

export default useMessages;