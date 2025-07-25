import React, { useState, useRef, useEffect } from 'react';

// Step 1: Accept `connectionId` as a prop from ChatPage.js
const ChatInterface = ({ connectionId }) => {

  // Step 2: Remove hardcoded messages and add state for loading and errors
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // These states and functions below are from your original file and are still useful
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  // Step 3: Add a useEffect hook to fetch data when the connectionId changes
  useEffect(() => {
    // If there's no connectionId, do nothing (or show a "select a chat" message)
    if (!connectionId) {
      setMessages([]); // Clear any previous messages
      return;
    }

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      console.log(`Fetching messages for connection: ${connectionId}`);

      try {
        // --- THIS IS WHERE YOU'D MAKE A REAL API CALL ---
        // For example:
        // const response = await fetch(`http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/connections/${connectionId}/messages`);
        // const data = await response.json();
        // setMessages(data);
        
        // For now, we will simulate it with mock data that uses the connectionId
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        const mockData = [
          { id: 1, text: `Hello! This is the chat for connection ID: ${connectionId}`, sent: false },
          { id: 2, text: 'Hey...', sent: true },

        ];
        setMessages(mockData);
        // --------------------------------------------------

      } catch (err) {
        setError('Failed to load chat messages. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

  }, [connectionId]); // This dependency array makes the effect re-run whenever the connectionId prop changes


  // Your existing functions for sending messages can be kept
  // Note: We'll keep the mock reply for now.
  const formatTime = () => {
    // ... (your existing formatTime function)
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputValue.trim(),
        sent: true,
        time: formatTime(),
        read: true,
      };
      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      
      // Mock reply
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const autoReply = {
          id: Date.now() + 1,
          text: 'Thanks for your message!',
          sent: false,
          time: formatTime(),
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Step 4: Add conditional rendering for different states
  if (!connectionId) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-slate-500 text-lg">Select a connection to start chatting.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-slate-500">Loading chat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }


  // This is your original JSX, which can now render the dynamic data
  return (
    <div className="flex flex-col h-[70vh]">
      <div className="chat-header">
        <div className="header-info">
          <h3>Chat with User</h3>
          <p>{isTyping ? 'Typing...' : 'Online'}</p>
        </div>
      </div>
      
      <div className="chat-messages flex-grow p-4 space-y-2 overflow-y-auto">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sent ? 'message-sent' : 'message-received'}`}>
            <div className="message-bubble">
              <div className="message-text">{message.text}</div>
              <div className="message-time">{message.time}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message message-received">
            <div className="message-bubble">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder="Send a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            autoComplete="off"
          />
          <button className="send-button" onClick={handleSendMessage} disabled={!inputValue.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
