import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessKnight,
  faQuestionCircle,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div
      className="w-96 sticky overflow-x-hidden flex justify-between items-center h-full"
    >
      <div className="flex items-center">
        <div className="relative flex pl-6">
          <Link to="/" className="flex items-center p-2 text-lg">
            <FontAwesomeIcon
              icon={faChessKnight}
              className="relative text-2xl z-10"
              style={{ color: "#bababa" }}
            />
            <span className="noto relative text-white z-10 ml-2 text-2xl whitespace-nowrap">
              Litrainer
            </span>
          </Link>
        </div>
      </div>
      <nav className="flex space-x-4 ml-auto">
        <ul className="flex space-x-4">
          <li>
            <Link to="/train" className="flex items-center p-2 text-lg">
              <FontAwesomeIcon
                icon={faBullseye}
                className="text-2xl"
                style={{ color: "#bababa" }}
              />
              <span className="whitespace-nowrap text-sm ml-2">TRAIN</span>
            </Link>
          </li>
          <li>
            <Link to="/help" className="flex items-center p-2 text-lg">
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="text-2xl"
                style={{ color: "#bababa" }}
              />
              <span className="whitespace-nowrap text-sm ml-2">HELP</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
