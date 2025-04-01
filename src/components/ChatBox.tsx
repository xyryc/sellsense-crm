"use client";
import { useState } from 'react';
import { Button } from './ui/button';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChatHistory = [...chatHistory, { sender: 'You', text: message }];
    setChatHistory(newChatHistory);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      console.log('API Response:', data); // ✅ Debugging

      if (!response.ok) {
        throw new Error(data.error || 'Unknown API error');
      }

      setChatHistory([...newChatHistory, { sender: 'Gemini', text: data.message || 'No response' }]);
    } catch (error) {
      console.error('Error sending message:', error); // ✅ Debugging
      setChatHistory([...newChatHistory, { sender: 'Gemini', text: 'Error fetching response' }]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="">
      {/* Chat Messages */}
      <div className="flex flex-col gap-3 overflow-auto h-[60vh] p-3 border rounded-lg">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`p-2 max-w-[75%] rounded-md ${chat.sender === 'You' ? 'self-end bg-blue-500 text-white' : 'self-start bg-gray-700'}`}
          >
            <strong>SellSense:</strong> {chat.text}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Add onKeyDown to listen for Enter key press
          className="p-2 w-full border rounded-md dark:bg-gray-800"
          placeholder="Type your message..."
          disabled={loading}
        />
        <Button
          onClick={sendMessage}
          className="bg-blue-500 text-white rounded-sm"
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
