const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Crea l'app Express
const app = express();
const PORT = process.env.PORT || 3000;

// --- Configurazione Percorsi ---
const buildPath = path.join(__dirname, 'build'); // Cartella build di React
const publicPath = path.join(__dirname, 'public'); // Cartella public
const messagesFilePath = path.join(publicPath, 'messages.json');

// --- Gestione messages.json ---
// Assicura che la cartella 'public' esista
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true });
  console.log(`Cartella 'public' creata in ${publicPath}`);
}
// Verifica se esiste il file messages.json, altrimenti crea un file vuoto
if (!fs.existsSync(messagesFilePath)) {
  fs.writeFileSync(messagesFilePath, JSON.stringify([], null, 2), 'utf8');
  console.log(`File vuoto messages.json creato in ${messagesFilePath}`);
} else {
  console.log(`File messages.json trovato in ${messagesFilePath}`);
}

// --- Middleware ---
// Servi i file statici dalla cartella public (per messages.json, favicon, etc.)
app.use(express.static(publicPath));

// Servi l'app React buildata dalla cartella 'build'
app.use(express.static(buildPath));

// --- Routing ---
// Rotta catch-all: per qualsiasi richiesta non gestita dai file statici,
// invia l'index.html dell'app React (per gestire il routing lato client)
app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
  } else {
      res.status(404).send('Applicazione non trovata. Hai eseguito "npm run build"?');
  }
});

// --- Funzione per ottenere IP locali ---
function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const interfaceName in interfaces) {
    const interfaceInfo = interfaces[interfaceName];
    if (interfaceInfo) { // Aggiunto controllo null/undefined
        for (const iface of interfaceInfo) {
          // Ignora gli indirizzi IPv6 e quelli interni (loopback)
          if (iface.family === 'IPv4' && !iface.internal) {
            addresses.push(iface.address);
          }
        }
    }
  }
  return addresses;
}

// --- Avvio Server ---
app.listen(PORT, '0.0.0.0', () => { // Ascolta su tutte le interfacce di rete
  console.log(`\n🚀 Server avviato e in ascolto su http://localhost:${PORT}`);

  // Mostra tutti gli indirizzi IP locali accessibili
  const localIPs = getLocalIPs();
  if (localIPs.length > 0) {
    console.log('\n   Puoi accedere all\'applicazione anche da altri dispositivi sulla stessa rete:');
    localIPs.forEach(ip => {
      console.log(`   - http://${ip}:${PORT}`);
    });
  } else {
      console.log('\n   Nessun indirizzo IP locale trovato (oltre a localhost).')
  }

  console.log('\nℹ️  Assicurati che la cartella "build" contenga la versione compilata dell\'app React.');
  console.log('   Se necessario, esegui "npm run build".');
  console.log('   Per generare messaggi da file Word, esegui "npm run generate-messages" (se configurato).');
  console.log('\n--------------------------------------------------\n');
});