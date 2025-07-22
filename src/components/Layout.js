import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
    <div className="min-h-screen bg-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
            {children}
        </main>
        <Footer />
    </div>
);

export default Layout;