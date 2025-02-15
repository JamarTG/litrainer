import { BrowserRouter } from "react-router-dom";
import { EngineName } from "./types/engine";
import Router from "./routes/router";
import "./App.css";
import { EngineProvider } from "./context/EngineContext";
import { PuzzleProvider } from "./context/PuzzleContext";
import { ThemeProvider } from "./context/ThemeContext";
import { DepthProvider } from "./context/DepthContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <EngineProvider initialEngineName={EngineName.Stockfish16_1Lite}>
          <DepthProvider>
            <PuzzleProvider>
              <ThemeProvider>
                <Router />
              </ThemeProvider>
            </PuzzleProvider>
          </DepthProvider>
        </EngineProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
