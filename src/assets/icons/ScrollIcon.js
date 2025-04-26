import React from 'react';

// Componente SVG come React component
function ScrollIcon(props) { // Accetta props per eventuali personalizzazioni future
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" {...props}> {/* Passa eventuali props all'SVG */}
      {/* Background (può essere rimosso se non serve) */}
      {/* <rect width="80" height="80" fill="transparent" /> */}

      {/* Scroll's main body */}
      <path d="M15 15 C15 15, 18 10, 25 10 L55 10 C62 10, 65 15, 65 15 L65 60 C65 60, 62 65, 55 65 L25 65 C18 65, 15 60, 15 60 Z" fill="#f0e4c5" stroke="#8d7d55" strokeWidth="2" />

      {/* Top roll */}
      <path d="M15 15 C15 15, 18 10, 25 10 L55 10 C62 10, 65 15, 65 15 C65 15, 62 20, 55 20 L25 20 C18 20, 15 15, 15 15 Z" fill="#e9d9aa" stroke="#8d7d55" strokeWidth="2" />

      {/* Bottom roll */}
      <path d="M15 60 C15 60, 18 55, 25 55 L55 55 C62 55, 65 60, 65 60 C65 60, 62 65, 55 65 L25 65 C18 65, 15 60, 15 60 Z" fill="#e9d9aa" stroke="#8d7d55" strokeWidth="2" />

      {/* Decorative lines on the scroll */}
      <line x1="25" y1="30" x2="55" y2="30" stroke="#8d7d55" strokeWidth="1.5" />
      <line x1="25" y1="40" x2="55" y2="40" stroke="#8d7d55" strokeWidth="1.5" />
      <line x1="25" y1="50" x2="45" y2="50" stroke="#8d7d55" strokeWidth="1.5" />
    </svg>
  );
}

export default ScrollIcon;