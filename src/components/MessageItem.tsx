import React, { useState } from 'react';
import { Message } from '../types/Message';

interface MessageItemProps {
  msg: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ msg }) => {
  const [showTime, setShowTime] = useState<boolean>(false);

  const handleToggleTime = () => {
    console.log("123123")
    setShowTime(!showTime);
  };

  return (
    <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
      <div
        className={`relative p-2 my-2 rounded-lg max-w-xs cursor-pointer ${msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black mr-auto'}`}
        onClick={() => handleToggleTime()}
      >
        <div className="text-sm">{msg.text }</div>
        {showTime && (
          <div className={`absolute top-1/2 transform -translate-y-1/2 ${msg.sender === 'bot' ? 'left-full ml-2' : 'right-full mr-2'} text-xs text-gray-500 bg-white p-1 rounded inline-block`} style={{ width: "80px" }}>
            {msg.time}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;