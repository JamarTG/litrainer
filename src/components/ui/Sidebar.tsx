import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPuzzlePiece,
  faChessKnight,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const Sidebar: React.FC = () => {

  return (
    <div className="flex flex-col justify-between h-full bg-gray-800 text-gray-100">
      <div>
        <div className="flex items-center mt-6 mb-12 ml-4">
          <div className="relative flex">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full blur-lg opacity-75"></div>
            <FontAwesomeIcon icon={faChessKnight} className="relative text-4xl text-white z-10" />
            <span className="relative text-white z-10 ml-2 text-2xl hidden md:inline">LITRAINER</span>
          </div>
        </div>
        <nav className="w-48 mr-2">
          <div className="grid gap-4">
            <ul className="grid gap-4">
              <li>
                <a
                  href="#"
                  className="grid grid-cols-[40px_auto] md:grid-cols-[40px_1fr] items-center p-2 hover:bg-gray-700 rounded text-lg"
                >
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faUser} className="text-2xl text-green-400" />
                  </div>
                  <span className="hidden md:inline">Create Session</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="grid grid-cols-[40px_auto] md:grid-cols-[40px_1fr] items-center p-2 hover:bg-gray-700 rounded text-lg"
                >
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faPuzzlePiece} className="text-2xl text-blue-400" />
                  </div>
                  <span className="hidden md:inline">Puzzle</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
