// src/hooks/useMessageDecryption.js
import { useCallback } from 'react';
import { cleanDecryptedMessage } from '../utils/messageUtils';

export function useMessageDecryption({ markMessageAsOpened, onSuccess, onError }) {
  const decryptMessage = useCallback(async (message, key) => {
    try {
      const normalizedKey = key.toLowerCase().trim();
      const messageKey = message.key.toLowerCase().trim();
      
      if (normalizedKey === messageKey) {
        // Clean the decrypted message
        const cleanedMessage = cleanDecryptedMessage(message.decrypted, key);
        
        // Mark as opened if not already
        if (!message.opened) {
          const success = await markMessageAsOpened(message.id);
          if (!success) {
            console.warn('Failed to mark message as opened, but proceeding with decryption');
          }
        }
        
        onSuccess(cleanedMessage);
        return { success: true, content: cleanedMessage };
      } else {
        onError();
        return { success: false, error: 'Invalid key' };
      }
    } catch (error) {
      console.error('Error during decryption:', error);
      onError();
      return { success: false, error: error.message };
    }
  }, [markMessageAsOpened, onSuccess, onError]);

  return { decryptMessage };
}