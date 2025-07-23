import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { CalendarIcon, MapPinIcon, HeartIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

const EventCard = ({ event, isInterested, onInterestToggle }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
    <Link to={`/events/${event.id}`}>
      <img src={event.image || event.img} alt={event.name || event.title} className="w-full h-48 object-cover" />
    </Link>
    <div className="p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-2 truncate">{event.name || event.title}</h2>
      <div className="text-slate-600 text-sm space-y-2 mb-4">
        <p className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-slate-400" /> {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="flex items-center">
          <MapPinIcon className="h-5 w-5 mr-2 text-slate-400" /> {event.venue || event.location}, {event.city}
        </p>
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
  const [events, setEvents] = useState([]);
  const [interested, setInterested] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const eventsRes = await fetch("http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/events");
        if (!eventsRes.ok) throw new Error("Failed to load events");
        const eventsData = await eventsRes.json();

        const interestedRes = await fetch(`http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/users/${user.uid}/interested`);
        if (!interestedRes.ok) throw new Error("Failed to load interests");
        const interestedData = await interestedRes.json();

        setEvents(eventsData.events);
        setInterested(interestedData.interestedEventIds);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const toggleInterest = async (eventId) => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const isCurrentlyInterested = interested.includes(eventId);
    const shouldBeInterested = !isCurrentlyInterested;

    setInterested(prev =>
      shouldBeInterested ? [...prev, eventId] : prev.filter(id => id !== eventId)
    );

    try {
      const res = await fetch(`http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/events/${eventId}/interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, interested: shouldBeInterested }),
      });
      if (!res.ok) throw new Error("Failed to update interest");
    } catch (e) {
      setError(e.message);
      // Rollback on failure
      setInterested(prev =>
        shouldBeInterested ? prev.filter(id => id !== eventId) : [...prev, eventId]
      );
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      setError("Logout failed");
    }
  };

  if (loading) return <p className="p-4 text-slate-700">Loading events...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <>
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              isInterested={interested.includes(event.id)}
              onInterestToggle={toggleInterest}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default EventFeedPage;
