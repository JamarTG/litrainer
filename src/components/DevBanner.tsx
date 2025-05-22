import React from "react";

type DevBannerProps = {
  children: React.ReactNode;
};

const DevBanner: React.FC<DevBannerProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-blue-100 border-b border-blue-300 text-blue-800 text-center p-3 text-sm">
        This site is currently under development. View progress on{" "}
        <a
          href={"https://github.com/JamarTG/litrainer"}
          className="underline font-medium hover:text-yellow-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default DevBanner;
