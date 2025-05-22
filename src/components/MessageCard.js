import React, { memo } from 'react';
import ScrollIcon from '../assets/icons/ScrollIcon';
import ClosedScrollIcon from '../assets/icons/ClosedScrollIcon';

const MessageCard = memo(({ message, onClick }) => {
  const IconComponent = message.opened ? ScrollIcon : ClosedScrollIcon;

  return (
    <div className="message-card" onClick={onClick}>
      <div className="message-icon">
        <IconComponent />
      </div>
      <div className="message-info">
        <div className="message-sender">{message.sender}</div>
        <div className="message-context">{message.context}</div>
      </div>
    </div>
  );
});

MessageCard.displayName = 'MessageCard';

export default MessageCard;