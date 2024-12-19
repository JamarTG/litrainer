import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessPawn,
  faChessKnight,
  faChessBishop,
  faChessRook,
  faChessQueen,
  faChessKing,
} from "@fortawesome/free-solid-svg-icons";

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="flex items-center justify-center space-x-2">
      <FontAwesomeIcon icon={faChessPawn} className="text-3xl animate-bounce" />
      <FontAwesomeIcon icon={faChessKnight} className="text-3xl animate-bounce delay-100" />
      <FontAwesomeIcon icon={faChessBishop} className=" text-3xl animate-bounce delay-200" />
      <FontAwesomeIcon icon={faChessRook} className=" text-3xl animate-bounce delay-300" />
      <FontAwesomeIcon icon={faChessQueen} className="text-3xl animate-bounce delay-400" />
      <FontAwesomeIcon icon={faChessKing} className=" text-3xl animate-bounce delay-500" />
    </div>
    <div className="text-2xl text-violet-100 mt-4">Loading...</div>
  </div>
);

export default LoadingScreen;