import React from 'react';

// Component for closed scroll icon with just two rolls
function ClosedScrollIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" {...props}>
      {/* Main scroll body - shorter and compact */}
      <path d="M15 20 C15 20, 18 15, 25 15 L55 15 C62 15, 65 20, 65 20 L65 60 C65 60, 62 65, 55 65 L25 65 C18 65, 15 60, 15 60 Z" fill="#f0e4c5" stroke="#8d7d55" strokeWidth="2" />

      {/* Top roll - thicker to represent a tightly closed scroll */}
      <path d="M15 20 C15 20, 18 15, 25 15 L55 15 C62 15, 65 20, 65 20 C65 20, 62 30, 55 30 L25 30 C18 30, 15 20, 15 20 Z" fill="#e9d9aa" stroke="#8d7d55" strokeWidth="2" />

      {/* Bottom roll - thicker to balance the icon */}
      <path d="M15 60 C15 60, 18 50, 25 50 L55 50 C62 50, 65 60, 65 60 C65 60, 62 65, 55 65 L25 65 C18 65, 15 60, 15 60 Z" fill="#e9d9aa" stroke="#8d7d55" strokeWidth="2" />
      
      {/* Decorative string/ribbon to indicate it's tied closed */}
      <path d="M38 30 L38 50 M42 30 L42 50" stroke="#8d7d55" strokeWidth="1.5" />
      <path d="M35 40 C35 40, 38 37, 40 40 C42 43, 45 40, 45 40" stroke="#8d7d55" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export default ClosedScrollIcon;