import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";


import { useMediaQuery } from "react-responsive";
import About from './pages/About';
import Home from './pages/Home';
import Sidebar from './components/ui/Sidebar';
import BottomNav from './components/ui/BottomNav';

const App = () => {
  const isNotSmallScreen = useMediaQuery({ minWidth: 640 });
  const isMidScreen = useMediaQuery({ minWidth: 768 });

  return (
    <Router>
      <div className="flex h-screen bg-gray-200 text-violet-100">
        {/* Sidebar for larger screens */}
        {isNotSmallScreen && (
          <div className={`${isMidScreen ? "w-48" : "w-16"} h-full`}>
            <Sidebar />
          </div>
        )}
        {/* Main content area */}
        <div
          className={`flex-1 flex flex-col ${!isNotSmallScreen ? "pb-16" : ""}`}
        >
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
        
              {/* Add more routes as needed */}
            </Routes>
          </div>
          {!isNotSmallScreen && <BottomNav />}
        </div>
      </div>
    </Router>
  );
};

export default App;
