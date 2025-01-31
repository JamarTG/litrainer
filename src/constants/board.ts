export const BOARD_DIMENSIONS = {
  MAX_SIZE: 500,
  MIN_SIZE: 30,
  INITIAL_SIZE: 500,
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
