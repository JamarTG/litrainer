import { Route, Routes, useLocation } from "react-router-dom";
import Playground from "../pages/Playground";
import Paths from "./paths";

export default function Router() {
  const location = useLocation();
  const { puzzles } = location.state || { puzzles: JSON.parse(localStorage.getItem("puzzles") || "[]") };

  return (
    <>
      <Routes>
        <Route
          path={Paths.HOME}
          element={<Playground puzzles={puzzles} />}
        />
      </Routes>
    </>
  );
}
