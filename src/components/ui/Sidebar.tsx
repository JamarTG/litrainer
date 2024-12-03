// src/components/Sidebar.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessKnight,
  faPuzzlePiece,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-darkBackground text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Chess Trainer
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              Create Session
            </a>
          </li>

          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <FontAwesomeIcon icon={faPuzzlePiece} className="mr-3" />
              Practice
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
