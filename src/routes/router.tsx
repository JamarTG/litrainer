import { Route, Routes, useLocation } from "react-router-dom";
import About from "../pages/About";
import Help from "../pages/Help";
import Playground from "../pages/Playground";
import NotFound from "../pages/NotFound";
import Paths from "./paths";

export default function Router() {
  const location = useLocation();
  const { puzzles } = location.state || { puzzles: JSON.parse(localStorage.getItem("puzzles") || "[]") };

  return (
    <>
      <Routes>
        <Route path={Paths.HOME} element={<Playground puzzles={puzzles} />} />
        <Route path={Paths.ABOUT} element={<About />} />
        <Route path={Paths.HELP} element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}