import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessKing,
  faChessQueen,
  faArrowRight,
  faChessRook,
} from "@fortawesome/free-solid-svg-icons";
const SkeletonControlPanel = () => {
  return (
    <div className="ml-4 flex flex-col space-y-6 p-6 bg-gray-800 rounded-lg shadow-lg w-80 flex-grow animate-pulse">
      <div className="flex items-center mb-4 gap-2">
        <FontAwesomeIcon
          icon={faChessKing}
          className="text-white text-2xl mb-2"
        />
        <p className="bg-gray-700 h-4 w-16 rounded"></p>
      </div>
      <div className="flex flex-col justify-center mb-4 space-y-4">
        <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg">
          <FontAwesomeIcon icon={faChessKing} className="text-white text-4xl" />
          <div>
            <p className="bg-gray-600 h-4 w-24 mb-2 rounded"></p>
            <p className="bg-gray-600 h-3 w-16 rounded"></p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg">
          <FontAwesomeIcon
            icon={faChessQueen}
            className="text-black text-4xl"
          />
          <div>
            <p className="bg-gray-600 h-4 w-24 mb-2 rounded"></p>
            <p className="bg-gray-600 h-3 w-16 rounded"></p>
          </div>
        </div>
      </div>
      <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
        <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
        <span className="bg-gray-700 h-4 w-16 rounded"></span>
      </button>
      <div className="flex flex-col items-center mt-4">
        <FontAwesomeIcon
          icon={faChessRook}
          className="text-white text-2xl mb-2"
        />
        <br />
        <div className="grid grid-cols-5 gap-2">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-gray-700 h-8 w-8 rounded-full"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonControlPanel;
