import { Route, Routes, useLocation } from "react-router-dom";
import Playground from "@/components/playground/Playground";
import NavbarLayout from "@/components/layout/NavbarLayout";
import test from "@/test.json";
import { loadFromLocalStorage } from "@/utils/storage";
import { PUZZLE_STORAGE_KEY } from "@/constants/storage";

const getPreloadedPuzzles = () => {
  return {
    puzzles: loadFromLocalStorage(PUZZLE_STORAGE_KEY, test)
  };
};

export default function Router() {
  const generatedPuzzles = useLocation().state;
  const state = generatedPuzzles || getPreloadedPuzzles();

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <NavbarLayout>
            <Playground puzzles={state.puzzles} />
          </NavbarLayout>
        }
      />
    </Routes>
  );
}
