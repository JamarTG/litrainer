import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

import About from './pages/About';
import Home from './pages/Home';
import Navbar from './components/ui/Navbar';
import Help from './pages/Help';

const App = () => {
  return (
    <Router>
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
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
