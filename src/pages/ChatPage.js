import React from 'react';
import { useParams } from 'react-router-dom'; 
import ChatInterface from '../ChatInterface'; 

const ChatPg = () => {
  // 1. Get the dynamic 'connectionId' from the URL
  const { connectionId } = useParams();

  return (
    <main className="min-h-[calc(100vh-8rem)] p-6 bg-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Chat</h1>

      <div className="w-full max-w-lg border rounded-xl shadow-md overflow-hidden">
        {/* 2. Pass the connectionId down to the ChatInterface as a prop */}
        <ChatInterface connectionId={connectionId} />
      </div>
    </main>
  );
};

export default ChatPg;

