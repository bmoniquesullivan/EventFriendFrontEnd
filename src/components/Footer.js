import React from 'react';

const Footer = () => (
    <footer className="bg-slate-800 mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} KSU Connect - EventFriend (Group 2). All rights reserved.</p>
            <p className="mt-1">SWE3313 Project - Frank Yaho, Monique Sullivan, Davon Appolon, Elizabeth Serrano Rodriguez, Elijah Simpkins, Ramon Mandujano</p>
        </div>
    </footer>
);

export default Footer;