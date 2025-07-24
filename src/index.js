import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Chat system setup-fake messages 
export class ChatManager {
    constructor() {
        this.messages = [
            { id: 1, text: 'Hello', sent: false },
            { id: 2, text: 'Are you attending the event', sent: false },
            { id: 3, text: 'I am', sent: true, time: 'Thursday 3:45 PM' },
            { id: 4, text: 'this is my favorite event', sent: true, time: 'Read Thursday' },
            { id: 5, text: 'yes I am', sent: false, time: 'Friday 4:26 PM' },
            { id: 6, text: 'How are you today Cyclone', sent: true, read: true }
        ];
        
        this.messageId = this.messages.length + 1;
        this.subscribers = [];
    }

    // Add subscriber callback  - this might not be used
    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    // Notify all subscribers - this might not be used
    notify() {
        this.subscribers.forEach(callback => callback(this.messages));
    }

    // Retrieve all messages
    getMessages() {
        return [...this.messages];
    }

    // Insert new message
    addMessage(text, isSent = true) {
        const now = new Date();
        const timeString = now.toLocaleString('en-US', { 
            weekday: 'long',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true 
        });

        const newMessage = {
            id: this.messageId++,
            text: text.trim(),
            sent: isSent,
            time: timeString,
            read: isSent
        };

        this.messages.push(newMessage);
        this.notify();
        return newMessage;
    }

    // Mark messages read
    markAsRead(messageIds) {
        this.messages = this.messages.map(msg => 
            messageIds.includes(msg.id) ? { ...msg, read: true } : msg
        );
        this.notify();
    }

    // Remove single message
    deleteMessage(messageId) {
        this.messages = this.messages.filter(msg => msg.id !== messageId);
        this.notify();
    }

    // Remove all messages
    clearMessages() {
        this.messages = [];
        this.notify();
    }

    // Count all messages
    getMessageCount() {
        return this.messages.length;
    }

    // Count unread messages
    getUnreadCount() {
        return this.messages.filter(msg => !msg.read && !msg.sent).length;
    }
}

// Format date string
export const formatTime = (date = new Date()) => {
    return date.toLocaleString('en-US', { 
        weekday: 'long',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
    });
};

// Input text sanitizer
export const sanitizeText = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// Scroll to bottom
export const scrollToBottom = (element) => {
    if (element) {
        element.scrollTop = element.scrollHeight;
    }
};

// Create chat instance
export const chatManager = new ChatManager();
