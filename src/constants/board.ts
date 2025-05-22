interface BoardDimensions {
  maximumSize: number;
  minimumSize: number;
  initialSize: number;
}

export const boardDimensions:BoardDimensions = {
  maximumSize: 580,
  minimumSize: 30,
  initialSize: 500
};

export const BASE_SQUARE_HIGHLIGHT_STYLES = {
  backgroundSize: "30%",
  backgroundPosition: "top right",
  backgroundRepeat: "no-repeat",
};

export const CLASSIFICATION_OPACITY = 0.7;
export const DEFAULT_CLASSIFICATION_COLOR = "grey";

export const LEGAL_MOVE_GRADIENTS = {
  capture: "radial-gradient(circle, transparent 55%, rgba(0,0,0, 0.2) 35%)",
  move: "radial-gradient(circle, rgba(0,0,0, 0.2) 30%, transparent 35%)",
};

export const DEFAULT_USER_COLOR = "w";
export const DEFAULT_OPPONENT_COLOR = "b";

export const MARKER_SIZE_RATIO = 16;