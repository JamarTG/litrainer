import { BrowserRouter } from "react-router-dom";
import { EngineProvider } from "./context/Engine/EngineProvider";
import { EngineName } from "./types/engine";
import { PuzzleProvider } from "./context/Puzzle/PuzzleProvider";
import Router from "./routes/router";

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
