import "./App.css";
import Home from "./pages/Home";
import Sidebar from "./components/ui/Sidebar";

const App = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 flex flex-col">
        <div className="flex-1 overflow-auto">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default App;
