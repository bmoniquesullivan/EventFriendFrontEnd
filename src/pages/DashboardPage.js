import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

// Paste your old mockCurrentUser here:
const mockCurrentUser = {
  interestedEvents: ["1", "3"], // example interested event IDs
  matches: [
    {
      user: {
        id: "u2",
        name: "Alice",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      event: {
        id: "1",
        title: "Food Festival",
      },
    },
    {
      user: {
        id: "u3",
        name: "Bob",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      },
      event: {
        id: "3",
        title: "Music Bash",
      },
    },
  ],
};

const DashboardPage = () => {
  const [events, setEvents] = useState([]);
  const [interestedEventIds, setInterestedEventIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setError("You must be logged in to view dashboard");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [eventsRes, interestedRes] = await Promise.all([
          fetch("http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/events"),
          fetch(`http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/users/${user.uid}/interested`),
        ]);

        if (!eventsRes.ok) throw new Error("Failed to load events");
        if (!interestedRes.ok) throw new Error("Failed to load interests");

        const eventsData = await eventsRes.json();
        const interestedData = await interestedRes.json();

        setEvents(eventsData.events || []);
        setInterestedEventIds(interestedData.interestedEventIds || []);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <p className="p-4 text-slate-700">Loading dashboard...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!user) return <p className="p-4 text-red-600">You must be logged in.</p>;

  // Use backend interested events
  const interestedEvents = events.filter((event) =>
    interestedEventIds.includes(event.id)
  );

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
            {interestedEvents.map((event) => (
              <li
                key={event.id}
                className="flex justify-between items-center p-3 bg-slate-50 rounded-md"
              >
                <span className="font-semibold text-slate-700">{event.name || event.title}</span>
                <Link
                  to={`/events/${event.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
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
            {mockCurrentUser.matches.map((match) => (
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
                <button className="ml-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                  <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
