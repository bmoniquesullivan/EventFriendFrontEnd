// src/pages/SignupPage.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update Firebase display name
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // 3. Send user profile data to backend
      const response = await fetch("http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          username: displayName,
          email: user.email,
          bio: bio,
          interests: interests.split(",").map((item) => item.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user profile to Firestore.");
      }

      // 4. Sign the user out (since you don't want them auto-logged-in)
      await auth.signOut();

      // 5. Navigate to login or success page
      navigate("/login");

    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">Sign Up</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Short Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Interests (comma-separated)"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
