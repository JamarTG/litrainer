import React from 'react';

type WarningMessageProps = {
  show: boolean;
  onClose: () => void;
};

const WarningMessage: React.FC<WarningMessageProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
      <div className="text-center">
        <p className="text-yellow-500 text-sm font-bold animate-pulse mb-4">
          🚧 Training mode is currently under development. Stay tuned for updates!
        </p>
        <button
          onClick={onClose}
          className="border-2 border-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WarningMessage;