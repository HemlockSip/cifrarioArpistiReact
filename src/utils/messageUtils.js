// Funzione per pulire il messaggio decifrato da eventuali metadati residui
export function cleanDecryptedMessage(text, key) {
    if (!text) return ''; // Gestisce il caso in cui text sia null o undefined
  
    // Divide il testo in righe
    let lines = text.split('\n');
  
    // Rimuovi le righe che contengono metadati conosciuti o la chiave stessa
    lines = lines.filter(line => {
      const lowerLine = line.toLowerCase().trim();
      const lowerKey = key.toLowerCase().trim(); // Normalizza anche la chiave
      return !(
        lowerLine.startsWith('mittente:') ||
        lowerLine.startsWith('contesto:') ||
        lowerLine.startsWith('chiave:') ||
        (lowerKey && lowerLine === lowerKey) || // Rimuovi righe che sono ESATTAMENTE la chiave
        (lowerKey && lowerLine.includes(`chiave: ${lowerKey}`)) // Rimuovi righe che contengono "chiave: ..."
      );
    });
  
    // Rimuovi righe vuote all'inizio e alla fine dopo il filtraggio
    while (lines.length > 0 && lines[0].trim() === '') {
      lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
      lines.pop();
    }
  
    return lines.join('\n');
  }