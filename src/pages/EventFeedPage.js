import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/solid';
import { mockEvents, mockCurrentUser } from '../data/mockData';

const EventCard = ({ event, isInterested, onInterestToggle }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
    <Link to={`/events/${event.id}`}>
      <img src={event.img} alt={event.title} className="w-full h-48 object-cover" />
    </Link>
    <div className="p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-2 truncate">{event.title}</h2>
      <div className="text-slate-600 text-sm space-y-2 mb-4">
        <p className="flex items-center"><CalendarIcon className="h-5 w-5 mr-2 text-slate-400"/> {event.date}</p>
        <p className="flex items-center"><MapPinIcon className="h-5 w-5 mr-2 text-slate-400"/> {event.location}</p>
      </div>
      <button 
        onClick={() => onInterestToggle(event.id)}
        className={`w-full font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 ${
          isInterested 
          ? 'bg-green-500 text-white hover:bg-green-600' 
          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
        }`}
      >
        <HeartIcon className="h-5 w-5" />
        <span>{isInterested ? "I'm Interested!" : "I'm Interested"}</span>
      </button>
    </div>
  </div>
);

const EventFeedPage = () => {
  const [interested, setInterested] = useState(mockCurrentUser.interestedEvents);

  const toggleInterest = (eventId) => {
    setInterested(prev => 
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockEvents.map(event => (
          <EventCard key={event.id} event={event} isInterested={interested.includes(event.id)} onInterestToggle={toggleInterest} />
        ))}
      </div>
    </div>
  );
};

export default EventFeedPage;