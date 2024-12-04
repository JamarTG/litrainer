import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPuzzlePiece,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import lichess from "../../../public/svgs/lichess.png";

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-800 text-white">
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

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Connect with me</h2>
          <ul>
            <li className="mb-4">
              <a
                href="https://www.linkedin.com/in/jamarimcfarlane/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FontAwesomeIcon icon={faLinkedin} className="mr-3" />
                LinkedIn
              </a>
            </li>
            <li className="mb-4">
              <a
                href="https://github.com/JamarTG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FontAwesomeIcon icon={faGithub} className="mr-3" />
                GitHub
              </a>
            </li>
            <li className="mb-4">
              <a
                href="https://lichess.org/@/JamariTheGreat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <img src={lichess} width={17} alt="" className="mr-3" />
                Lichess
              </a>
            </li>
            <li className="mb-4">
              <a
                href="https://github.com/JamarTG/litrainer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FontAwesomeIcon icon={faCode} className="mr-3" />
                Repository
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
