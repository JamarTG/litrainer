interface BoardDimensions {
  maxSize: number;
  minSize: number;
  initialSize: number;
}

export const boardDimensions:BoardDimensions = {
  maxSize: 600,
  minSize: 30,
  initialSize: 500,
};


export const INITIAL_MARKER_POSITION = { right: 0, top: 0 };
