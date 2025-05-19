export const boardDimensions = {
  maxSize: 600,
  minSize: 30,
  initialSize: 500,
};

export const customBoardStyles = {
  borderRadius: "5px",
  boxShadow: "0 15px 15px rgba(0,0,0,0.3)",
  position: "relative" as const,
};

export const moveSquareStyles = {
  borderRadius: "50%",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
  transform: "scale(0.7)",
};

export const INITIAL_MARKER_POSITION = { right: 0, top: 0 };
