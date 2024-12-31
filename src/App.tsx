import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "./App.css";

import About from "./pages/About";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Playground from "./pages/Playground";
import NotFound from "./pages/NotFound";
import { PuzzleProvider } from "./context/Puzzle/Provider";
import { EngineProvider } from "./context/Engine/Provider";
import { EngineName } from "./types/engine";

const AppContent = () => {
  const location = useLocation();
  const { puzzles } = location.state || { puzzles: [] };

  return (
    <div className="flex flex-col text-violet-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/train" element={<Playground puzzles={puzzles} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <EngineProvider initialEngineName={EngineName.Stockfish16_1}>
        <PuzzleProvider>
          <AppContent />
        </PuzzleProvider>
      </EngineProvider>
    </Router>
  );
};

export default App;
