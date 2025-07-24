import React from 'react';
import { Link } from 'react-router-dom';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { mockEvents, mockCurrentUser } from '../data/mockData';

const DashboardPage = () => {
  const interestedEvents = mockEvents.filter(event => mockCurrentUser.interestedEvents.includes(event.id));

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">My Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">My Interested Events</h2>
          <ul className="space-y-3">
            {interestedEvents.length === 0 && (
              <p className="text-slate-500">You haven't marked interest in any events yet.</p>
            )}
            {interestedEvents.map(event => (
              <li
                key={event.id}
                className="flex justify-between items-center p-3 bg-slate-50 rounded-md"
              >
                <span className="font-semibold text-slate-700">{event.title}</span>
                <Link to={`/events/${event.id}`} className="text-sm text-blue-600 hover:underline">
                  View
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">My Connections</h2>
          <ul className="space-y-4">
            {mockCurrentUser.matches.length === 0 && (
              <p className="text-slate-500">You don't have any connections yet.</p>
            )}
            {mockCurrentUser.matches.map(match => (
              <li
                key={match.user.id}
                className="flex items-center p-3 bg-slate-50 rounded-md"
              >
                <img
                  src={match.user.avatar}
                  alt={match.user.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-grow">
                  <p className="font-bold text-slate-800">{match.user.name}</p>
                  <p className="text-xs text-slate-500">
                    Matched for: <span className="font-semibold">{match.event.title}</span>
                  </p>
                </div>
                <Link
                  to="/chat"
                  className="ml-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 inline-flex items-center justify-center"
                  aria-label={`Chat with ${match.user.name}`}
                >
                  <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
