import "./App.css";
import Home from "./pages/Home";
import Sidebar from "./components/ui/Sidebar";
import BottomNav from "./components/ui/BottomNav";

import { useMediaQuery } from "react-responsive";

const App = () => {
  const isNotSmallScreen = useMediaQuery({ minWidth: 640 });
  const isMidScreen = useMediaQuery({ minWidth: 768 });

  return (
    <div className="flex h-screen">
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
        
          <Home />
        </div>
        {/* BottomNav for smaller screens */}
        {!isNotSmallScreen && <BottomNav />}
      </div>
    </div>
  );
};

export default App;
