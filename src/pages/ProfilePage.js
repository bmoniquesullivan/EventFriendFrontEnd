import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { mockCurrentUser } from '../data/mockData';

const ProfilePage = () => {
    return (
 <div className="relative min-h-screen bg-gray-800 overflow-hidden">
    
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-6 mb-8">
                <UserCircleIcon className="h-24 w-24 text-slate-300"/>
                <div>
                   <h1 className="text-3xl font-bold text-slate-800">{mockCurrentUser.name}</h1>
                   <p className="text-slate-500">{mockCurrentUser.email}</p>
                </div>
            </div>
            
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input type="text" defaultValue={mockCurrentUser.name} className="w-full px-4 py-2 border border-slate-300 rounded-md"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Home City</label>
                    <input type="text" defaultValue={mockCurrentUser.city} className="w-full px-4 py-2 border border-slate-300 rounded-md"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Short Bio</label>
                    <textarea defaultValue={mockCurrentUser.bio} rows="4" className="w-full px-4 py-2 border border-slate-300 rounded-md"></textarea>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">My Interests</label>
                    <div className="flex flex-wrap gap-2">
                        {mockCurrentUser.interests.map(interest => (
                            <span key={interest} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{interest}</span>
                        ))}
                    </div>
                </div>
                <div className="pt-4">
                     <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;
