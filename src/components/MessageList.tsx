import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../types/Message';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (messagesEndRef.current) {
      if (isInitialLoad && messages.length > 0) {
        messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
        setIsInitialLoad(false);
      } else {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, isInitialLoad]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <MessageItem
          key={index}
          msg={msg}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;