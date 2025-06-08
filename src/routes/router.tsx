import { Route, Routes, useLocation } from "react-router-dom";
import Paths from "./paths";
import Playground from "@/pages/Playground";
import NavbarLayout from "@/components/layout/Navbar";
import test from "@/test.json";
import { loadFromLocalStorage } from "@/utils/storage";
import { Fragment } from "react/jsx-runtime";

export default function Router() {
  const location = useLocation();
  const { puzzles } = location.state || {
    puzzles: loadFromLocalStorage("puzzles", test)
  };

  return (
    <Fragment>
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
    </Fragment>
  );
}
