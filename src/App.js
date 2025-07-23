// In your main router file, e.g. App.js or Routes.js
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EventFeedPage from './pages/EventFeedPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventFeedPage />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
