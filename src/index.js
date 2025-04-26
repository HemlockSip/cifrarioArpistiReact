import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa da 'react-dom/client' per React 18+
import './index.css'; // Stili globali base
import App from './components/App'; // Importa il componente principale

// Crea la root per React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizza l'applicazione
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Se stai usando una versione precedente di React (prima della 18), usa:
// import ReactDOM from 'react-dom';
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );