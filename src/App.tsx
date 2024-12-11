import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/ui/Navbar";
import Help from "./pages/Help";
import Playground from "./pages/Playground";

const AppContent = () => {
  const location = useLocation();
  const { puzzles } = location.state || { puzzles: [] };

  return (
    <div className="flex flex-col text-violet-100">
      <div className="w-48 h-full">
        <Navbar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/train" element={<Playground puzzles={puzzles} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
