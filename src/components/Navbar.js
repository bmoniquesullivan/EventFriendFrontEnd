import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserCircleIcon, StarIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
    const activeLink = "bg-slate-700 text-white px-3 py-2 rounded-md text-sm font-medium";
    const normalLink = "text-slate-300 hover:bg-slate-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

    return (
        <nav className="bg-slate-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/events" className="flex-shrink-0 flex items-center space-x-2">
                             <StarIcon className="h-8 w-8 text-yellow-400" />
                             <span className="text-white text-xl font-bold">EventFriend</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/events" className={({ isActive }) => isActive ? activeLink : normalLink}>Events</NavLink>
                            <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLink : normalLink}>Dashboard</NavLink>
                            <NavLink to="/profile" className={({ isActive }) => isActive ? activeLink : normalLink}>Profile</NavLink>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Link to="/" className="text-slate-300 hover:text-white flex items-center space-x-2">
                             <ArrowRightOnRectangleIcon className="h-5 w-5" />
                             <span>Logout</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;