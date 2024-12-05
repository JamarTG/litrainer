import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPuzzlePiece,
  faChessKnight,
  faBug,
  faLightbulb,
  faQuestionCircle,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {

  return (
    <div className="flex flex-col justify-between h-full bg-gray-800 text-gray-100">
      <div>
        <div className="flex items-center mt-6 mb-12 ml-4">
            <div className="relative flex">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-25"></div>
                <FontAwesomeIcon icon={faChessKnight} className="relative text-2xl text-white z-10" />
                <span className="relative text-white z-10 ml-2 text-2xl hidden md:inline whitespace-nowrap">LITRAINER</span>
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
                    <FontAwesomeIcon icon={faBullseye} className="text-2xl text-white" />
                    </div>
                  <span className="hidden md:inline whitespace-nowrap text-sm">Create Session</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="grid grid-cols-[40px_auto] md:grid-cols-[40px_1fr] items-center p-2 hover:bg-gray-700 rounded text-lg"
                >
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faPuzzlePiece} className="text-2xl text-white" />
                  </div>
                  <span className="hidden md:inline whitespace-nowrap text-sm">Puzzle</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="grid grid-cols-[40px_auto] md:grid-cols-[40px_1fr] items-center p-2 hover:bg-gray-700 rounded text-lg"
                >
                    <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-2xl text-white" />
                    </div>
                  <span className="hidden md:inline whitespace-nowrap text-sm">Tutorial</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="grid grid-cols-[40px_auto] md:grid-cols-[40px_1fr] items-center p-2 hover:bg-gray-700 rounded text-lg"
                >
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faUser} className="text-2xl text-white" />
                  </div>
                  <span className="hidden md:inline whitespace-nowrap text-sm">Creator</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="grid grid-cols-[40px_auto] md:grid-cols-[40px_1fr] items-center p-2 hover:bg-gray-700 rounded text-lg"
                >
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faBug} className="text-2xl text-white" />
                  </div>
                  <span className="hidden md:inline whitespace-nowrap text-sm">Report Bug</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="grid grid-cols-[40px_auto] md:grid-cols-[40px_1fr] items-center p-2 hover:bg-gray-700 rounded text-lg"
                >
                    <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faLightbulb} className="text-2xl text-white" />
                    </div>
                  <span className="hidden md:inline whitespace-nowrap text-sm">Request Feature</span>
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
