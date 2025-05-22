// src/hooks/useModalNavigation.js
import { useCallback } from 'react';

export function useModalNavigation({ actions }) {
  const navigateToList = useCallback(() => {
    actions.reset();
  }, [actions]);

  const navigateToKey = useCallback(() => {
    actions.setView('key');
  }, [actions]);

  const navigateToDecrypted = useCallback((content) => {
    actions.setDecryptedContent(content);
  }, [actions]);

  const navigateToError = useCallback(() => {
    actions.setView('error');
  }, [actions]);

  return {
    navigateToList,
    navigateToKey,
    navigateToDecrypted,
    navigateToError,
  };
}