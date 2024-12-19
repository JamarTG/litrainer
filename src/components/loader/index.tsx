const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="text-2xl text-violet-100 mt-4 animate-pulse">
      <div className="flex items-center justify-center space-x-2">
        <img
          src="svgs/pieces/wP.svg"
          alt="Pawn"
          className="w-10 h-10 animate-bounce"
        />
        <img
          src="svgs/pieces/wN.svg"
          alt="Knight"
          className="w-10 h-10 animate-bounce delay-100"
        />
        <img
          src="svgs/pieces/wB.svg"
          alt="Bishop"
          className="w-10 h-10 animate-bounce delay-200"
        />
        <img
          src="svgs/pieces/wR.svg"
          alt="Rook"
          className="w-10 h-10 animate-bounce delay-300"
        />
        <img
          src="svgs/pieces/wQ.svg"
          alt="Queen"
          className="w-10 h-10 animate-bounce delay-400"
        />
        <img
          src="svgs/pieces/wK.svg"
          alt="King"
          className="w-10 h-10 animate-bounce delay-500"
        />
      </div>
    </div>
  </div>
);

export default LoadingScreen;
