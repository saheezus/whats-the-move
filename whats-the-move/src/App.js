import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import HomePage from './pages/HomePage'; 
import Home from './pages/Home';
import FriendsPage from './pages/FriendsPage';
import ProfileScreen from './screens/ProfileScreen';
import Midpoint from './pages/Midpoint';
import POI from './pages/PlaceOfInterest';
import BlogPage from './screens/BlogPage';
import DirectionsPage from './pages/DirectionsPage';
import { IoHomeOutline, IoPeopleOutline, IoPersonOutline, IoMapOutline } from 'react-icons/io5';
import './App.css';

const TabNavigator = () => (
  <nav className="flex justify-between items-center p-5 bg-black text-white">
    <Link to="/" className="text-l font-bold hover:text-gray-400 transition-colors duration-300">
      <span>What's The Move</span>
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
  return (
    <Router>
      <div>
        <TabNavigator />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/midpoint" element={<Midpoint />} />
            <Route path="/poi" element={<POI />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/directions" element={<DirectionsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;