import React, { useState } from 'react';
import ChatBot from './ChatBot';
import { IoChatbubblesOutline } from 'react-icons/io5';
import "./chatcoainer.css"
const ChatBotContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{display :'flex'}} className="chat-container">
      {isOpen && <ChatBot />}
      <div className="chatbot-icon" onClick={toggleChatBot}>
        <IoChatbubblesOutline size={24} />
      </div>
    </div>
  );
};

export default ChatBotContainer;
