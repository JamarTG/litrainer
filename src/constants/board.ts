export const DEFAULT_BOARD_SIZE = 400;

// responsible for the size of the marker relative to the board size
export const MARKER_SCALE_FACTOR = 18;
export const MARKER_OFFSET = 0.35;

export const NUM_RANKS = 8;

export const BOARD_THEMES = [
  {
    name: "blue-marble",
    path: "/themes/boards/blue-marble.jpg",
    thumbnail: "/themes/boards/blue-marble.thumbnail.jpg"
  },
  {
    name: "blue",
    path: "/themes/boards/blue.png",
    thumbnail: "/themes/boards/blue.thumbnail.png"
  },
  {
    name: "blue2",
    path: "/themes/boards/blue2.jpg",
    thumbnail: "/themes/boards/blue2.thumbnail.jpg"
  },
  {
    name: "blue3",
    path: "/themes/boards/blue3.jpg",
    thumbnail: "/themes/boards/blue3.thumbnail.jpg"
  },
  {
    name: "brown",
    path: "/themes/boards/brown.png",
    thumbnail: "/themes/boards/brown.thumbnail.png"
  },
  {
    name: "canvas2",
    path: "/themes/boards/canvas2.jpg",
    thumbnail: "/themes/boards/canvas2.thumbnail.jpg"
  },
  {
    name: "green-plastic",
    path: "/themes/boards/green-plastic.png",
    thumbnail: "/themes/boards/green-plastic.thumbnail.png"
  },
  {
    name: "green",
    path: "/themes/boards/green.png",
    thumbnail: "/themes/boards/green.thumbnail.png"
  },
  {
    name: "grey",
    path: "/themes/boards/grey.jpg",
    thumbnail: "/themes/boards/grey.thumbnail.jpg"
  },
  {
    name: "horsey",
    path: "/themes/boards/horsey.jpg",
    thumbnail: "/themes/boards/horsey.thumbnail.jpg"
  },
  {
    name: "ic",
    path: "/themes/boards/ic.png",
    thumbnail: "/themes/boards/ic.thumbnail.png"
  },
  {
    name: "leather",
    path: "/themes/boards/leather.jpg",
    thumbnail: "/themes/boards/leather.thumbnail.jpg"
  },
  {
    name: "maple",
    path: "/themes/boards/maple.jpg",
    thumbnail: "/themes/boards/maple.thumbnail.jpg"
  },
  {
    name: "maple2",
    path: "/themes/boards/maple2.jpg",
    thumbnail: "/themes/boards/maple2.thumbnail.jpg"
  },
  {
    name: "marble",
    path: "/themes/boards/marble.jpg",
    thumbnail: "/themes/boards/marble.thumbnail.jpg"
  },
  {
    name: "metal",
    path: "/themes/boards/metal.jpg",
    thumbnail: "/themes/boards/metal.thumbnail.jpg"
  },
  {
    name: "ncf-board",
    path: "/themes/boards/ncf-board.png",
    thumbnail: null
  },
  {
    name: "olive",
    path: "/themes/boards/olive.jpg",
    thumbnail: "/themes/boards/olive.thumbnail.jpg"
  },
  {
    name: "pink-pyramid",
    path: "/themes/boards/pink-pyramid.png",
    thumbnail: "/themes/boards/pink-pyramid.thumbnail.png"
  },
  {
    name: "purple-diag",
    path: "/themes/boards/purple-diag.png",
    thumbnail: "/themes/boards/purple-diag.thumbnail.png"
  },
  {
    name: "purple",
    path: "/themes/boards/purple.png",
    thumbnail: "/themes/boards/purple.thumbnail.png"
  },
  {
    name: "wood",
    path: "/themes/boards/wood.jpg",
    thumbnail: "/themes/boards/wood.thumbnail.jpg"
  },
  {
    name: "wood2",
    path: "/themes/boards/wood2.jpg",
    thumbnail: "/themes/boards/wood2.thumbnail.jpg"
  },
  {
    name: "wood3",
    path: "/themes/boards/wood3.jpg",
    thumbnail: "/themes/boards/wood3.thumbnail.jpg"
  },
  {
    name: "wood4",
    path: "/themes/boards/wood4.jpg",
    thumbnail: "/themes/boards/wood4.thumbnail.jpg"
  }
];

export const BOARD_CONFIG = {
  DEFAULT_LAST_MOVE: undefined,
  DRAWABLE_ENABLED: true,
  VISIBLE_ENABLED: true,
  DEFAULT_SNAP_TO_VALID_MOVE: true,
  LAST_MOVE: true,
  HIGHLIGHT_LAST_MOVE: true,
  HIGHLIGHT_LAST_CHECK: true,
  ADD_PIECE_Z_INDEX: true,
  DEFAULT_BOARD_SIZE: DEFAULT_BOARD_SIZE,
  MOVABLE_SOLVED: {
    free: false,
    dests: new Map()
  }
};
