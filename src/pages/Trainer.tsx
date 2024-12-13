import React from "react";
import { useLocation } from "react-router-dom";
import Playground from "./Playground";

const Trainer: React.FC = () => {
  const location = useLocation();
  const { puzzles } = location.state || { puzzles: [] };

  return <Playground puzzles={puzzles} />;
};

export default Trainer;
