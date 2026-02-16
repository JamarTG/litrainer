import { BrowserRouter } from "react-router-dom";
import { EngineName } from "./typing/enums";
import Router from "@/routes/router";
import "./App.css";
import { EngineProvider } from "@/features/analysis-engine";
import { Toaster } from "react-hot-toast";
import { store } from "@/state/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Toaster />
      <BrowserRouter>
        <EngineProvider initialEngineName={EngineName.Stockfish17LiteSingleThreaded}>
          <Router />
        </EngineProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
