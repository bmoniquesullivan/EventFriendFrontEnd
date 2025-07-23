import React, { useState, useEffect } from "react";

const EventFeedPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // For showing loading text
  const [error, setError] = useState(null);     // For showing any errors

  useEffect(() => {
    fetch("http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/events")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        return res.json();
      })
      .then((data) => {
        setEvents(data.events); // set array of events
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading events.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-slate-700">Loading events...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{event.name}</h2>
              <p className="text-sm text-slate-600">
                {new Date(event.start).toLocaleString()}
              </p>
              <p className="text-sm text-slate-600">
                {event.venue}, {event.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventFeedPage;
