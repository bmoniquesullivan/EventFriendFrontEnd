import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/solid';
import { mockEvents, mockUsers } from '../data/mockData';

const UserCard = ({ user }) => {
    const [liked, setLiked] = useState(false);
    return(
        <div className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mr-4" />
            <div className="flex-grow">
                <h3 className="font-bold text-slate-800">{user.name}</h3>
                <p className="text-sm text-slate-500 italic">"{user.bio}"</p>
            </div>
            <button 
                onClick={() => setLiked(!liked)}
                className={`ml-4 p-3 rounded-full transition-colors duration-300 ${
                    liked 
                    ? 'bg-rose-100 text-rose-500' 
                    : 'bg-slate-200 text-slate-500 hover:bg-rose-100 hover:text-rose-500'
                }`}
            >
                <HeartIcon className="h-6 w-6" />
            </button>
        </div>
    );
};

const EventDetailPage = () => {
    const { id } = useParams();
    const event = mockEvents.find(e => e.id === parseInt(id));

    if (!event) return <div>Event not found</div>

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img src={event.img} alt={event.title} className="w-full h-64 object-cover" />
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-slate-900">{event.title}</h1>
                    <div className="text-slate-600 text-lg flex space-x-6 my-4">
                        <p className="flex items-center"><CalendarIcon className="h-6 w-6 mr-2 text-slate-400"/> {event.date}</p>
                        <p className="flex items-center"><MapPinIcon className="h-6 w-6 mr-2 text-slate-400"/> {event.location}</p>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Who's Interested?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {mockUsers.map(user => <UserCard key={user.id} user={user} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;