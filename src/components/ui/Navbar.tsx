import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="w-96 sticky overflow-x-hidden flex justify-between items-center h-full">
      <div className="flex items-center">
        <div className="relative flex pl-6">
          <Link to="/" className="flex items-center p-2 text-xl">
            <img src="/logo.png" width={30} alt="" className="border-1/2"/>
            <span className="noto relative text-white z-10 ml-2 text-xl whitespace-nowrap">
            
            </span>
          </Link>
        </div>
      </div>
      <nav className="flex space-x-4 ml-auto">
        <ul className="flex space-x-4">
          <li>
            <Link to="/train" className="flex items-center p-2 text-lg">
              <span className="whitespace-nowrap text-sm ml-2">TRAIN</span>
            </Link>
          </li>
          <li>
            <Link to="/help" className="flex items-center p-2 text-lg">
              <span className="whitespace-nowrap text-sm ml-2">HELP</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
