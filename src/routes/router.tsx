import { Route, Routes, useLocation } from "react-router-dom";
import Playground from "../pages/Playground";
import Paths from "./paths";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import Settings from "../pages/Settings";

export default function Router() {
  const location = useLocation();
  const { puzzles } = location.state || { puzzles: JSON.parse(localStorage.getItem("puzzles") || "[]") };

  return (
    <>
      <Routes>
        <Route
          path={Paths.HOME}
          element={
            <DashboardLayout>
              <Playground puzzles={puzzles} />
            </DashboardLayout>
          }
        />
        <Route
          path={Paths.SETTINGS}
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
      </Routes>
    </>
  );
}
