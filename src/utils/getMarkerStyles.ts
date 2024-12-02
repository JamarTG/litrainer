const getMarkerStyles = (
  bestMoveMarker: string | null,
  bestMoveStyle: {
    top: number;
    left: number;
    size: number;
  },
  markerType: "best" | "wrong" | null,
  movePlayed: boolean
) => {
  return bestMoveMarker
    ? {
        position: "absolute" as const,
        top: bestMoveStyle.top,
        left: bestMoveStyle.left,
        width: bestMoveStyle.size,
        height: bestMoveStyle.size,
        backgroundImage: `url("/images/${markerType}.png")`,
        backgroundSize: "50%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
        pointerEvents: "none",
        zIndex: 4000,
        display: movePlayed ? "block" : "none",
      }
    : {};
};

export default getMarkerStyles;
