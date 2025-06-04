import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ChessLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing board...");

  const pieceSet = useSelector((state: RootState) => state.pieceSet.set);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 50);

    const textInterval = setInterval(() => {
      const loadingMessages = ["Initializing board...", "Positioning pieces...", "Ready to train!"];
      setLoadingText((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        return loadingMessages[(currentIndex + 1) % loadingMessages.length];
      });
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700 flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-2 tracking-wider">litrainer</h1>
          </div>

          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={`/themes/pieces/${pieceSet}/bK.svg`} alt="center king" className="w-48 h-48 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-zinc-300 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-zinc-500 to-zinc-700 dark:from-amber-400 dark:to-amber-600 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 dark:opacity-20 animate-pulse rounded-full" />
              </div>
            </div>
            <div className="text-zinc-600 dark:text-amber-400 font-semibold text-sm">{progress}%</div>
          </div>

          <div className="text-zinc-700 dark:text-gray-300 text-lg font-medium animate-pulse min-h-[28px]">
            {loadingText}
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-zinc-600 dark:bg-zinc-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChessLoader;
