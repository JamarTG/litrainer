const getSquareCoordinates = (
  square: string,
  boardWidth: number,
  colorToPlay: string
) => {
  const file = square.charCodeAt(0) - 97;
  const rank = 8 - parseInt(square[1], 10);
  const squareSize = boardWidth / 8;

  return colorToPlay === "white"
    ? {
        top: rank * squareSize,
        left: file * squareSize,
        size: squareSize,
      }
    : {
        top: (7 - rank) * squareSize,
        left: (7 - file) * squareSize,
        size: squareSize,
      };
};

export default getSquareCoordinates;