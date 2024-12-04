import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPuzzlePiece, faCode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-gray-800 md:hidden">
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
          <a
            href="https://www.linkedin.com/in/jamarimcfarlane/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-2 hover:bg-gray-700 rounded"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </li>

        <li>
          <a
            href="#"
            className="flex flex-col items-center p-2 hover:bg-gray-700 rounded"
          >
            <FontAwesomeIcon icon={faCode} />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;