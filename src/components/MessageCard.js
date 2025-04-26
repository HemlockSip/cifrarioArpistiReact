import React from 'react';
import ScrollIcon from '../assets/icons/ScrollIcon';

function MessageCard({ message, onClick }) {
  return (
    <div className="message-card" onClick={onClick}>
      <div className="message-icon">
        <ScrollIcon />
      </div>
      <div className="message-info">
        <div className="message-sender">{message.sender}</div>
        <div className="message-context">{message.context}</div>
      </div>
    </div>
  );
}

export default MessageCard;