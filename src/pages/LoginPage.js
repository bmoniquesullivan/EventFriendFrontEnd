import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app, { auth } from '../firebase';
import { StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form reload

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/events'); 
    } catch (error) {
      setErrorMsg(error.message); // show user error
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md text-center">
        <div className="flex justify-center items-center space-x-3 mb-6">
          <StarIcon className="h-12 w-12 text-yellow-400" />
          <h1 className="text-4xl font-bold text-slate-800">EventFriend</h1>
        </div>
        <p className="text-slate-500 mb-8">Find a friend for any event.</p>

        {errorMsg && (
          <p className="text-red-600 mb-4">{errorMsg}</p>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email (e.g., student@kennesaw.edu)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        
        <p className="mt-6 text-sm text-slate-600">
        Don't have an account? <Link to="/signup" className="font-semibold text-blue-600 hover:underline">Sign up</Link>
        </p>

      </div>
      <p className="mt-8 text-slate-500 text-sm">SWE3313 - Group 2 Project</p>
    </div>
  );
};

export default LoginPage;
