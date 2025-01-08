import { BrowserRouter } from "react-router-dom";
import { EngineName } from "./types/engine";
import Router from "./routes/router";
import "./App.css";
import { EngineProvider } from "./context/EngineContext";
import { PuzzleProvider } from "./context/PuzzleContext";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <BrowserRouter>
      <EngineProvider initialEngineName={EngineName.Stockfish16_1Lite}>
        <PuzzleProvider>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </PuzzleProvider>
      </EngineProvider>
    </BrowserRouter>
  );
};

export default App;
