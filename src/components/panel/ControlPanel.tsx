import { useSelector } from "react-redux";
import Navigation from "./Navigation";
import PuzzleInfo from "./PuzzleInfo";
import { RootState } from "../../redux/store";
import PieceSetChooser from "./PieceSetChooser";
import ThemeChanger from "./ThemeChanger";
import BoardThemeChooser from "./BoardThemeChooser";
import { useState } from "react";

const tabs = [
  { id: "navigation", label: "Navigation", content: <Navigation /> },
  { id: "info", label: "Info", content: <PuzzleInfo /> },
  {
    id: "settings",
    label: "Settings",
    content: (
      <div className="flex items-center justify-between gap-2">
        <ThemeChanger />
        <PieceSetChooser />
        <BoardThemeChooser />
      </div>
    ),
  },
];

const PuzzleControlPanel = () => {
  const { puzzle } = useSelector((state: RootState) => ({
    puzzle: state.puzzle.puzzles[state.puzzle.currentIndex],
  }));

  const isDataAvailable = puzzle !== null;
  const [activeTab, setActiveTab] = useState("navigation");

  if (!isDataAvailable) return null;

  return (
    <div className="flex flex-col gap-3 items-center w-full max-w-[350px] w-full">
      <div
        role="tablist"
        aria-label="Puzzle Control Tabs"
        className="flex gap-1 w-full border-b border-gray-200 mb-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            className={`px-4 py-2 font-medium transition-colors rounded-t-md focus:outline-none ${
              activeTab === tab.id ? "bg-blue-600 text-white " : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`tabpanel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className="w-full"
            style={{ display: activeTab === tab.id ? "block" : "none" }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleControlPanel;
