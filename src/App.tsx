import { BrowserRouter } from "react-router-dom";
import { EngineName } from "./types/engine";
import React from "react";
import Router from "./routes/router";
import "./App.css"
import { EngineProvider } from "./context/EngineContext";
import { PuzzleProvider } from "./context/PuzzleContext";

const App = () => {
  return (
    <BrowserRouter>
      <EngineProvider initialEngineName={EngineName.Stockfish16_1Lite}>
        <PuzzleProvider>
          <Router />
        </PuzzleProvider>
      </EngineProvider>
    </BrowserRouter>
  );
};

export default App;