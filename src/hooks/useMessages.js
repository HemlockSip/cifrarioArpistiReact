import { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';

function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('id', { ascending: true });
          
        if (error) throw error;
        
        setMessages(data || []);
        
      } catch (err) {
        console.error('Errore durante il caricamento dei messaggi:', err);
        setError(err.message);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return { messages, loading, error };
}

export default useMessages;