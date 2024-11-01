import React, { useState } from 'react';
import { chatbotAPI } from '../../services/ChatbotAPI';
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
        const botResponse = { type: 'bot', text: data.response };

        setChatHistory((prev) => [...prev, botResponse]); 
      } catch (error) {
        console.error('Error sending message:', error);
        setChatHistory((prev) => [
          ...prev,
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
          className="bg-purple-400 p-3 w-24 rounded-full shadow-lg focus:outline-none text-white font-poppins hover:bg-pruple-500 transition-transform transform hover:scale-105"
        >
          Ask AI!
        </button>
      )}

      {showChat && (
        <div className="w-72 h-96 rounded-lg shadow-lg border border-solid border-blue-400 bg-purple-950 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white font-poppins">Chat with Us</h3>
            <button
              onClick={handleToggleChat}
              className="bg-purple-700 text-black p-2 border border-solid rounded-md focus:outline-none hover:bg-purple-600 hover:text-white hover:border-purple-400 transition-transform transform hover:scale-105"
            >
              Close Chat
            </button>
          </div>

          <div className="flex-grow overflow-y-auto mb-4">
            {chatHistory.length === 0 ? (
              <p className="text-gray-500 text-center">
                Start a conversation about your career direction!
              </p>
            ) : (
              chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-md max-w-[80%] ${
                    chat.type === 'user' ? 'bg-black text-white ml-auto border border-blue-400' : 'bg-black text-white  border border-purple-400 mr-auto'
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
              className="w-full p-2 border border-blue text-white  placeholder:text-white bg-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-purple-700 cursor-pointer text-white p-2 rounded-md focus:outline-none hover:bg-purple-600 transition-transform transform hover:scale-105"
            >
              <AiOutlineSend className='text-black' />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
