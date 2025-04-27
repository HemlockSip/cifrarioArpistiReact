import { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';

function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('id', { ascending: true });
        
      if (error) throw error;
      
      // Ensure each message has an 'opened' property (fallback to false if not present)
      const messagesWithOpened = data?.map(message => ({
        ...message,
        opened: message.opened === true
      })) || [];
      
      setMessages(messagesWithOpened);
      
    } catch (err) {
      console.error('Errore durante il caricamento dei messaggi:', err);
      setError(err.message);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to mark a message as opened
  const markMessageAsOpened = async (messageId) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ opened: true })
        .eq('id', messageId);

      if (error) throw error;
      
      // Update the local state to reflect the change
      setMessages(prevMessages =>
        prevMessages.map(message =>
          message.id === messageId 
            ? { ...message, opened: true } 
            : message
        )
      );
      
      return true;
    } catch (err) {
      console.error('Errore durante l\'aggiornamento del messaggio:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return { 
    messages, 
    loading, 
    error, 
    markMessageAsOpened,
    refetchMessages: fetchMessages
  };
}

export default useMessages;