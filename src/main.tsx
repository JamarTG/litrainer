
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import "./index.css";

// Force dark mode by default
document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
