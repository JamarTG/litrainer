import React from "react";
import { FaGithub } from "react-icons/fa";

type DevBannerProps = {
  children: React.ReactNode;
};

const DevBanner: React.FC<DevBannerProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex border-b border-blue-300 text-blue-800 text-center p-3 text-md flex justify-center items-center gap-2">
        <p className="font-bold">IN DEVELOPMENT</p>
        <span className="ml-2 text-xs text-blue-600 italic">
          Built by a chess addict for chess players {"->"}
        </span>
        
        <a
          href={"https://github.com/JamarTG/litrainer"}
          className="underline font-medium hover:text-yellow-600 flex gap-1 justify-center items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={20} />
        </a>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default DevBanner;
