import React, { useState, useEffect } from 'react';
import "./ChatBot.css"
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (inputValue.trim() === '') return;
    getBotResponse()
    
    setInputValue('');
  };


    const getBotResponse = async () => {
      const response = await fetch('https://zomato-backend-api.onrender.com/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "query" : inputValue })
      });

      const data = await response.json();
      const [userQuery, botAnswer] = data.response.split('\n');

      const userMessage = {
        text: userQuery,
        sender: 'user'
      };

      const botMessage = {
        text: `Chatbot: ${botAnswer}`,
        sender: 'bot'
      };

      setMessages([...messages, userMessage, botMessage]);
    };

    

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          className="chat-input-box"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="chat-submit-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
