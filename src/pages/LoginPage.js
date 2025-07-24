import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-2xl w-full max-w-md text-center">
        <div className="flex justify-center items-center space-x-3 mb-6">
          <StarIcon className="h-12 w-12 text-yellow-400" />
          <h1 className="text-4xl font-bold text-slate-800">EventFriend</h1>
        </div>
        <p className="text-slate-500 mb-8">Find a friend for any event.</p>

        <form className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email (e.g., student@kennesaw.edu)"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <Link
            to="/events"
            className="w-full block bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </Link>
        </form>
        <p className="mt-6 text-sm text-slate-600">
          Don't have an account?{' '}
          <Link to="#" className="font-semibold text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      <p className="mt-8 text-slate-500 text-sm">SWE3313 - Group 2 Project</p>
    </div>
  );
};

export default LoginPage;
