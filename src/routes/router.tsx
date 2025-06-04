import { Route, Routes, useLocation } from "react-router-dom";
import Paths from "./paths";
import Playground from "@/pages/Playground";
import NavbarLayout from "@/components/layout/Navbar";
import test from "@/test.json";

export default function Router() {
  const location = useLocation();
  const { puzzles } = location.state || {
    puzzles: JSON.parse(localStorage.getItem("puzzles") || JSON.stringify(test))
  };

  return (
    <>
      <Routes>
        <Route
          path={Paths.HOME}
          element={
            <NavbarLayout>
              <Playground puzzles={puzzles} />
            </NavbarLayout>
          }
        />
      </Routes>
    </>
  );
}
