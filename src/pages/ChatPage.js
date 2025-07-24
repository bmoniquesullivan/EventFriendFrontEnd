import React from 'react';
import ChatInterface from '../ChatInterface';


const ChatPg = () => {
  return (
    <main className="min-h-[calc(100vh-8rem)] p-6 bg-white flex flex-col items-center">
    //Header
      <h1 className="text-3xl font-bold mb-6">Chat</h1>
      
      {/* Chat Box */}
      <div className="w-full max-w-lg border rounded-xl shadow-md overflow-hidden">
        <ChatInterface />
      </div>
    </main>
  );
};

export default ChatPg;

