import React, { useState } from 'react';
import { chatbotAPI } from '../../services/ChatbotAPI';
import { CiCircleChevDown } from "react-icons/ci";
import { AiOutlineSend } from "react-icons/ai";

const Chatbot = ({ token }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const handleToggleChat = () => setShowChat(!showChat);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = { type: 'user', text: message };
      setChatHistory((prev) => [...prev, newMessage]);
      setMessage('');

      try {
        const { data } = await chatbotAPI.sendMessage({ message }, token);
        setChatHistory((prev) => [
          ...prev,
          newMessage,
          { type: 'bot', text: data.response },
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
        setChatHistory((prev) => [
          ...prev,
          newMessage,
          { type: 'bot', text: 'Sorry, an error occurred.' },
        ]);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!showChat && (
        <button
          onClick={handleToggleChat}
          className="bg-blue-400 text-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-blue-500 transition-transform transform hover:scale-105"
        >
          Ask Us!
        </button>
      )}

      {showChat && (
        <div className="w-72 h-96 bg-white rounded-lg shadow-lg p-4 flex flex-col">
        
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Chat with Us</h3>
            <button
              onClick={handleToggleChat}
              className="bg-red-500 text-white p-2 rounded-md focus:outline-none hover:bg-red-400 transition-transform transform hover:scale-105"
            >
              Close Chat
            </button>
          </div>

          
          <div className="flex-grow overflow-y-auto mb-4">
            {chatHistory.length === 0 ? (
              <p className="text-gray-500 text-center">Start a conversation with us!</p>
            ) : (
              chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-md max-w-[80%] ${
                    chat.type === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-200 mr-auto'
                  }`}
                >
                  {chat.text}
                </div>
              ))
            )}
          </div>

          
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md focus:outline-none hover:bg-blue-500 transition-transform transform hover:scale-105"
            >
              <AiOutlineSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
