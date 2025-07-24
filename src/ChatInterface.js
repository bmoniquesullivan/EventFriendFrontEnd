import React, { useState, useRef, useEffect } from 'react';
import './index.css';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello', sent: false },
        { id: 2, text: 'Are you attending the event?', sent: false },
        { id: 3, text: 'I am', sent: true, time: 'Thursday 3:45 PM' },
        { id: 4, text: 'This is my favorite event', sent: true, time: 'Read Thursday' },
        { id: 5, text: 'Yes I am', sent: false, time: 'Friday 4:26 PM' },
        { id: 6, text: 'How are you today Cyclone?', sent: true, read: true }
    ]);
    
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTime = () => {
        const now = new Date();
        return now.toLocaleString('en-US', { 
            weekday: 'long',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true 
        });
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const newMessage = {
                id: Date.now(),
                text: inputValue.trim(),
                sent: true,
                time: formatTime(),
                read: true
            };
            
            setMessages(prev => [...prev, newMessage]);
            setInputValue('');
            
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setTimeout(() => {
                    const autoReply = {
                        id: Date.now() + 1,
                        text: 'Thanks for your message!',
                        sent: false,
                        time: formatTime()
                    };
                    setMessages(prev => [...prev, autoReply]);
                }, 1000);
            }, 2000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="avatar">profile</div>
                <div className="header-info">
                    <h3>Chat</h3>
                    <p>{isTyping ? 'Typing...' : 'Online'}</p>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((message) => (
                    <div 
                        key={message.id} 
                        className={`message ${message.sent ? 'message-sent' : 'message-received'}`}
                    >
                        <div className="message-bubble">{message.text}</div>
                        {message.time && <div className="message-time">{message.time}</div>}
                        {message.read && message.sent && <div className="read-indicator">Read</div>}
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
                    <button 
                        className="send-button"
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;

