export const getCustomSquareStyles = (
    moveSquares: any,
    destSquare: string | null,
    isGoodMove: boolean | null
  ) => {
    const imageUrl = isGoodMove === null ? "" : `/svgs/${isGoodMove ? "" : "in"}correct.png`;
  
    const destSquareStyle = destSquare
      ? {
          [destSquare]: {
            position: "relative",
            zIndex: 0,
            backgroundImage: imageUrl ? `url(${imageUrl})` : undefined, // Only set background if there's an image URL
            backgroundSize: "30%",
            backgroundPosition: "top right",
            backgroundRepeat: "no-repeat",
            pointerEvents: "none",
          },
        }
      : {};
  
    return {
      ...moveSquares,
      ...destSquareStyle,
    };
  };
  