import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout
import Layout from './components/Layout';

// Import Pages
import LoginPage from './pages/LoginPage';
import EventFeedPage from './pages/EventFeedPage';
import EventDetailPage from './pages/EventDetailPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
        <Routes>
            {/* Routes with Navbar and Footer */}
            <Route path="/events" element={<Layout><EventFeedPage /></Layout>} />
            <Route path="/events/:id" element={<Layout><EventDetailPage /></Layout>} />
            <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />

            {/* Full-screen route (no Navbar/Footer) */}
            <Route path="/" element={<LoginPage />} />
        </Routes>
    </Router>
  );
}

export default App;