import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import HomePage from './pages/HomePage'; 
import Home from './pages/Home';
import FriendsPage from './pages/FriendsPage';
import ProfileScreen from './screens/ProfileScreen';
import Midpoint from './pages/Midpoint';
import POI from './pages/PlaceOfInterest';
import BlogPage from './screens/BlogPage';
import DirectionsPage from './pages/DirectionsPage';
import './App.css';

const TabNavigator = () => (
  <nav className="flex justify-between items-center p-4 bg-black text-white">
    <Link to="/" className="text-xl font-bold hover:text-gray-400 transition-colors duration-300">
      <span>What's The Move?</span>
    </Link>
    <div className="flex gap-3 sm:gap-10">
      <Link to="/" className="text-l hover:text-gray-400 transition-colors duration-300">
        <span>Blog</span>
      </Link>
      <Link to="/profile" className="text-l hover:text-gray-400 transition-colors duration-300">
        <span>Account</span>
      </Link>
    </div>
  </nav>
);

const App = () => {

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
      const loadGoogleMapsScript = () => {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.addEventListener('load', () => setIsScriptLoaded(true));
          document.head.appendChild(script);
      };

      loadGoogleMapsScript();

      return () => {
          const script = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);
          if (script) {
              document.head.removeChild(script);
          }
      };

  }, []);

  return (
    <Router>
      <div>
        <TabNavigator />
        {isScriptLoaded ? (<div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/midpoint" element={<Midpoint />} />
            <Route path="/poi" element={<POI />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/directions" element={<DirectionsPage />} />
          </Routes>
        </div>) : null}
      </div>
    </Router>
  );
};

export default App;