import { useState, useEffect, useCallback } from 'react';
import supabase from '../utils/supabaseClient';

// Error types for better error handling
const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  DATA: 'DATA_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
};

function categorizeError(error) {
  if (error.message.includes('network') || error.message.includes('fetch')) {
    return ERROR_TYPES.NETWORK;
  }
  if (error.message.includes('auth') || error.status === 401) {
    return ERROR_TYPES.AUTH;
  }
  if (error.message.includes('invalid') || error.message.includes('constraint')) {
    return ERROR_TYPES.DATA;
  }
  return ERROR_TYPES.UNKNOWN;
}

function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchMessages = useCallback(async (isRetry = false) => {
    try {
      if (!isRetry) {
        setLoading(true);
      }
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .order('id', { ascending: true });
        
      if (fetchError) throw fetchError;
      
      const messagesWithOpened = data?.map(message => ({
        ...message,
        opened: message.opened === true
      })) || [];
      
      setMessages(messagesWithOpened);
      setRetryCount(0); // Reset retry count on success
      
    } catch (err) {
      console.error('Error loading messages:', err);
      const errorType = categorizeError(err);
      
      setError({
        message: err.message,
        type: errorType,
        retryable: errorType !== ERROR_TYPES.AUTH,
      });
      
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const markMessageAsOpened = useCallback(async (messageId) => {
    try {
      const { error: updateError } = await supabase
        .from('messages')
        .update({ opened: true })
        .eq('id', messageId);

      if (updateError) throw updateError;
      
      setMessages(prevMessages =>
        prevMessages.map(message =>
          message.id === messageId 
            ? { ...message, opened: true } 
            : message
        )
      );
      
      return true;
    } catch (err) {
      console.error('Error updating message:', err);
      return false;
    }
  }, []);

  const retry = useCallback(() => {
    if (retryCount < 3) { // Limit retries
      setRetryCount(prev => prev + 1);
      fetchMessages(true);
    }
  }, [retryCount, fetchMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { 
    messages, 
    loading, 
    error, 
    markMessageAsOpened,
    refetchMessages: fetchMessages,
    retry,
    canRetry: error?.retryable && retryCount < 3,
  };
}

export default useMessages;
