import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/Layout';

// Pages
import LoginPage from './pages/LoginPage';
import EventFeedPage from './pages/EventFeedPage';
import EventDetailPage from './pages/EventDetailPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ChatPg from './pages/ChatPage';  

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with Layout */}
        <Route path="/events" element={<Layout><EventFeedPage /></Layout>} />
        <Route path="/events/:id" element={<Layout><EventDetailPage /></Layout>} />
        <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/chat" element={<Layout><ChatPg /></Layout>} />  // ADDED CHAT PG

        {/* Login page  */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
