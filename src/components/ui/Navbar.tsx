import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessKnight,
  faQuestionCircle,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  return (
    <div style={{width:"96vw"}} className="overflow-x-hidden flex justify-between items-center h-full text-gray-100 p-4">
      <div className="flex items-center">
        <div className="relative flex pl-6">
          <div className="absolute inset-0 bg-red-900 rounded-full blur-lg opacity-45"></div>
          <FontAwesomeIcon icon={faChessKnight} className="relative text-2xl z-10" style={{ color: "#bababa" }} />
          <span className="noto relative text-white z-10 ml-2 text-2xl whitespace-nowrap">Litrainer</span>
        </div>
      </div>
      <nav className="flex space-x-4 ml-auto">
        <ul className="flex space-x-4">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-lg"
            >
              <FontAwesomeIcon icon={faBullseye} className="text-2xl" style={{ color: "#bababa" }} />
              <span className="whitespace-nowrap text-sm ml-2">TRAIN</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-lg"
            >
              <FontAwesomeIcon icon={faQuestionCircle} className="text-2xl" style={{ color: "#bababa" }}/>
              <span className="whitespace-nowrap text-sm ml-2">HELP</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
