import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/solid';

const EventCard = ({ event, isInterested, onInterestToggle }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
    <Link to={`/events/${event.id}`}>
      <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
    </Link>
    <div className="p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-2 truncate">{event.name}</h2>
      <div className="text-slate-600 text-sm space-y-2 mb-4">
        <p className="flex items-center"><CalendarIcon className="h-5 w-5 mr-2 text-slate-400"/> {new Date(event.date).toLocaleDateString()}</p>
        <p className="flex items-center"><MapPinIcon className="h-5 w-5 mr-2 text-slate-400"/> {event.venue}, {event.city}</p>
      </div>
      <button 
        onClick={() => onInterestToggle(event.id, !isInterested)}
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
  const [events, setEvents] = useState([]);
  const [interested, setInterested] = useState([]); // array of event IDs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserUid = "abc123"; // TEMP: replace with Firebase auth later

  // Fetch events and interested events
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all events
        const eventRes = await fetch("http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/events");
        if (!eventRes.ok) throw new Error("Failed to load events");
        const eventData = await eventRes.json();
        setEvents(eventData.events);

        // Fetch user's interested event IDs
        const intRes = await fetch(`http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/users/${currentUserUid}/interested`);
        if (!intRes.ok) throw new Error("Failed to load interests");
        const intData = await intRes.json();
        setInterested(intData.interestedEventIds);

      } catch (err) {
        console.error(err);
        setError("Error loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle interest and call backend
  const toggleInterest = async (eventId, shouldBeInterested) => {
    try {
      // Optimistic update
      setInterested(prev =>
        shouldBeInterested
          ? [...prev, eventId]
          : prev.filter(id => id !== eventId)
      );

      // Call API to update interest
      const res = await fetch(`http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/events/${eventId}/interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: currentUserUid, interested: shouldBeInterested })
      });

      if (!res.ok) throw new Error("Failed to update interest");

    } catch (error) {
      console.error("Error toggling interest:", error);
      setError("Could not update interest.");
    }
  };

  if (loading) return <p className="p-4 text-slate-700">Loading events...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            isInterested={interested.includes(event.id)} 
            onInterestToggle={toggleInterest}
          />
        ))}
      </div>
    </div>
  );
};

export default EventFeedPage;
