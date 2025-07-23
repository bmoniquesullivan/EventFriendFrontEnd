import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Your firebase config

import Navbar from "./components/Navbar";
import EventFeedPage from "./pages/EventFeedPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EventDetailPage from './pages/EventDetailPage';

function Layout() {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/signup'];
  
  return null; 
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading, true/false = known

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isLoggedIn === null) {
    return <p className="p-4">Loading...</p>; // or spinner
  }

  return (
    <Router>
      <LayoutWithAuth isLoggedIn={isLoggedIn} />
    </Router>
  );
}

function LayoutWithAuth({ isLoggedIn }) {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/signup'];

  const showNavbar = isLoggedIn && !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/events" /> : <Navigate to="/login" />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/events" /> : <LoginPage />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/events" /> : <SignupPage />} />
        <Route path="/events" element={isLoggedIn ? <EventFeedPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/events/:id" element={isLoggedIn ? <EventDetailPage /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
