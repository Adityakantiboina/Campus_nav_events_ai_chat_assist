import React, { useState, useEffect } from 'react';
import { FiSend, FiPlus } from 'react-icons/fi'; 
import Navbar from './nav'; 
import Sidebar from './sidebar'; 
import styled from 'styled-components';

const ChatbotUI = () => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages'));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleUserPrompt = async (event) => {
    event.preventDefault();
    if (!prompt.trim()) {
      alert('Please enter a query before sending.');
      return;
    }

   
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: prompt, sender: 'user' },
    ]);
    setPrompt('');


    const response = await generateResponse(prompt);

    if (response.englishText) {
      
      const formattedText = formatBotResponse(response.englishText);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: formattedText, sender: 'bot' },
      ]);
    }
  };

  const generateResponse = async (prompt) => {
    try {
      const response = await fetch('https://campus-nav-chat.onrender.com/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Error in generating response');
      }

      const data = await response.json();
      return { englishText: data.englishText };
    } catch (error) {
      console.error('Error:', error);
      return { englishText: 'An error occurred. Please try again.' };
    }
  };


  const formatBotResponse = (text) => {
  
    const formattedText = text
      .split(/(\d+\.)/g) 
      .map((part, index) => {
        if (index % 2 === 1) {
         
          return part.trim();
        }
        return part.trim() + '\n';
      })
      .join(' ')
      .replace(/\n+/g, '\n'); 
    
    return formattedText;
  };

  const handleSidebarHover = (isHovered) => {
    setSidebarExpanded(isHovered);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const startNewChat = () => {
    setMessages([]); 
    localStorage.removeItem('messages'); 
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Navbar */}
      <Navbar darkMode={darkMode} handleToggleDarkMode={handleToggleDarkMode} />

      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <Sidebar sidebarExpanded={sidebarExpanded} handleSidebarHover={handleSidebarHover} />

        {/* Main Chat Area */}
        <div
          className={`flex-1 flex flex-col justify-between px-6 transition-all duration-300 ${sidebarExpanded ? 'blur-md' : ''}`}
        >
        <div className="flex justify-center text-white text-4xl font-bold mb-4">
        <h1> Hello! How can I assist you today?</h1>
        </div>
          {/* Chat Messages */}
          <div
          id="chat-output"
          className={`flex-1 overflow-y-auto py-6 px-4 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`${
                  message.sender === 'user'
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-900 text-white'
                } px-4 py-3 rounded-lg shadow-md`}
                style={{
                  width: message.sender === 'user' ? '20%' : '70%', // User messages slightly narrower than bot messages
                  alignSelf: 'flex-start',
                  marginLeft: message.sender === 'user' ? '20%' : '20%', // Offset bot messages slightly left of center
                  marginRight: message.sender === 'user' ? '20%' : '30%', // Offset user messages slightly right of center
                }}
              >
                {message.text.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        

          {/* Input Section */}
          <div
            className={`flex items-center justify-center py-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
          >
            <div className="relative w-full max-w-3xl">
              {/* Plus Button (Right side of Textarea) */}
              <FiPlus
                onClick={startNewChat}
                className="absolute top-1/2 right-16 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 cursor-pointer text-2xl"
              />
              {/* Textarea for Prompt */}
              <textarea
                id="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your message..."
                className={`w-full pl-4 pr-12 py-3 resize-none rounded-md focus:outline-none ${
                  darkMode
                    ? 'bg-gray-800 text-white border-gray-600'
                    : 'bg-white text-black border-gray-300'
                }`}
                rows="1"
              />
              {/* Send Button (Right Side) */}
              <FiSend
                id="send-icon"
                onClick={handleUserPrompt}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 cursor-pointer text-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;
