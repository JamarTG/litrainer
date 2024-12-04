import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPuzzlePiece,
  faCode,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 mt-10 ml-6  hidden md:block">litrainer</h2>
      {/* Sidebar for larger screens */}
      <nav className="hidden lg:block lg:w-48 ml-4">
        <div className="lg:flex lg:flex-col lg:items-start lg:justify-start">
          <ul className="lg:flex lg:flex-col">
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

            {/* Socials Dropdown */}
            <li className="mb-4 relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center p-2 w-full hover:bg-gray-700 rounded"
              >
                <FontAwesomeIcon icon={faCaretDown} className="mr-3" />
                Socials
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-gray-700 rounded shadow-lg w-full">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/jamarimcfarlane/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 hover:bg-gray-600"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-2 hover:bg-gray-600"
                    >
                      <FontAwesomeIcon icon={faGithub} className="mr-2" />
                      GitHub
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FontAwesomeIcon icon={faCode} className="mr-3" />
                Repository
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Collapsible sidebar for medium screens */}
      <nav className="hidden md:block lg:hidden ml-4">
        <button
          className="p-2 text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
        {isCollapsed && (
          <div className="md:flex md:flex-col md:items-start md:justify-start">
            <ul className="md:flex md:flex-col">
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

              {/* Socials Dropdown */}
              <li className="mb-4 relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <FontAwesomeIcon icon={faCaretDown} className="mr-3" />
                  Socials
                </button>
                {isDropdownOpen && (
                  <ul className="absolute left-0 mt-2 bg-gray-700 rounded shadow-lg">
                    <li>
                      <a
                        href="https://www.linkedin.com/in/jamarimcfarlane/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 hover:bg-gray-600"
                      >
                        <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-600"
                      >
                        <FontAwesomeIcon icon={faGithub} className="mr-2" />
                        GitHub
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li className="mb-4">
                <a
                  href="#"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <FontAwesomeIcon icon={faCode} className="mr-3" />
                  Repository
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Bottom navigation for smaller screens */}
      <nav className="fixed bottom-0 w-full md:hidden">
        <ul className="flex justify-around">
          <li>
            <a
              href="#"
              className="flex flex-col items-center p-2 hover:bg-gray-700 rounded"
            >
              <FontAwesomeIcon icon={faUser} />
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex flex-col items-center p-2 hover:bg-gray-700 rounded"
            >
              <FontAwesomeIcon icon={faPuzzlePiece} />
            </a>
          </li>

          <li>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex flex-col items-center p-2 hover:bg-gray-700 rounded"
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </li>
        </ul>
        {isDropdownOpen && (
          <ul className="absolute bottom-12 left-0 w-full bg-gray-700 rounded shadow-lg">
            <li>
              <a
                href="https://www.linkedin.com/in/jamarimcfarlane/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                GitHub
              </a>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
