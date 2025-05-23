interface BoardDimensions {
  maximumSize: number;
  minimumSize: number;
  initialSize: number;
}

export const boardDimensions:BoardDimensions = {
  maximumSize: 580,
  minimumSize: 372,
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


export const BOARD_THEMES = [
  {
    name: "blue-marble",
    path: "/boardThemes/blue-marble.jpg",
    thumbnail: "/boardThemes/blue-marble.thumbnail.jpg"
  },
  {
    name: "blue",
    path: "/boardThemes/blue.png",
    thumbnail: "/boardThemes/blue.thumbnail.png"
  },
  {
    name: "blue2",
    path: "/boardThemes/blue2.jpg",
    thumbnail: "/boardThemes/blue2.thumbnail.jpg"
  },
  {
    name: "blue3",
    path: "/boardThemes/blue3.jpg",
    thumbnail: "/boardThemes/blue3.thumbnail.jpg"
  },
  {
    name: "brown",
    path: "/boardThemes/brown.png",
    thumbnail: "/boardThemes/brown.thumbnail.png"
  },
  {
    name: "canvas2",
    path: "/boardThemes/canvas2.jpg",
    thumbnail: "/boardThemes/canvas2.thumbnail.jpg"
  },
  {
    name: "green-plastic",
    path: "/boardThemes/green-plastic.png",
    thumbnail: "/boardThemes/green-plastic.thumbnail.png"
  },
  {
    name: "green",
    path: "/boardThemes/green.png",
    thumbnail: "/boardThemes/green.thumbnail.png"
  },
  {
    name: "grey",
    path: "/boardThemes/grey.jpg",
    thumbnail: "/boardThemes/grey.thumbnail.jpg"
  },
  {
    name: "horsey",
    path: "/boardThemes/horsey.jpg",
    thumbnail: "/boardThemes/horsey.thumbnail.jpg"
  },
  {
    name: "ic",
    path: "/boardThemes/ic.png",
    thumbnail: "/boardThemes/ic.thumbnail.png"
  },
  {
    name: "leather",
    path: "/boardThemes/leather.jpg",
    thumbnail: "/boardThemes/leather.thumbnail.jpg"
  },
  {
    name: "maple",
    path: "/boardThemes/maple.jpg",
    thumbnail: "/boardThemes/maple.thumbnail.jpg"
  },
  {
    name: "maple2",
    path: "/boardThemes/maple2.jpg",
    thumbnail: "/boardThemes/maple2.thumbnail.jpg"
  },
  {
    name: "marble",
    path: "/boardThemes/marble.jpg",
    thumbnail: "/boardThemes/marble.thumbnail.jpg"
  },
  {
    name: "metal",
    path: "/boardThemes/metal.jpg",
    thumbnail: "/boardThemes/metal.thumbnail.jpg"
  },
  {
    name: "ncf-board",
    path: "/boardThemes/ncf-board.png",
    thumbnail: null 
  },
  {
    name: "olive",
    path: "/boardThemes/olive.jpg",
    thumbnail: "/boardThemes/olive.thumbnail.jpg"
  },
  {
    name: "pink-pyramid",
    path: "/boardThemes/pink-pyramid.png",
    thumbnail: "/boardThemes/pink-pyramid.thumbnail.png"
  },
  {
    name: "purple-diag",
    path: "/boardThemes/purple-diag.png",
    thumbnail: "/boardThemes/purple-diag.thumbnail.png"
  },
  {
    name: "purple",
    path: "/boardThemes/purple.png",
    thumbnail: "/boardThemes/purple.thumbnail.png"
  },
  {
    name: "wood",
    path: "/boardThemes/wood.jpg",
    thumbnail: "/boardThemes/wood.thumbnail.jpg"
  },
  {
    name: "wood2",
    path: "/boardThemes/wood2.jpg",
    thumbnail: "/boardThemes/wood2.thumbnail.jpg"
  },
  {
    name: "wood3",
    path: "/boardThemes/wood3.jpg",
    thumbnail: "/boardThemes/wood3.thumbnail.jpg"
  },
  {
    name: "wood4",
    path: "/boardThemes/wood4.jpg",
    thumbnail: "/boardThemes/wood4.thumbnail.jpg"
  }
];

export const BOARD_THEME_THUMBNAILS: { [name: string]: string | null } = {
    "blue-marble": "/boardThemes/blue-marble.thumbnail.jpg",
    "blue": "/boardThemes/blue.thumbnail.png",
    "blue2": "/boardThemes/blue2.thumbnail.jpg",
    "blue3": "/boardThemes/blue3.thumbnail.jpg",
    "brown": "/boardThemes/brown.thumbnail.png",
    "canvas2": "/boardThemes/canvas2.thumbnail.jpg",
    "green-plastic": "/boardThemes/green-plastic.thumbnail.png",
    "green": "/boardThemes/green.thumbnail.png",
    "grey": "/boardThemes/grey.thumbnail.jpg",
    "horsey": "/boardThemes/horsey.thumbnail.jpg",
    "ic": "/boardThemes/ic.thumbnail.png",
    "leather": "/boardThemes/leather.thumbnail.jpg",
    "maple": "/boardThemes/maple.thumbnail.jpg",
    "maple2": "/boardThemes/maple2.thumbnail.jpg",
    "marble": "/boardThemes/marble.thumbnail.jpg",
    "metal": "/boardThemes/metal.thumbnail.jpg",
    "ncf-board": null,
    "olive": "/boardThemes/olive.thumbnail.jpg",
    "pink-pyramid": "/boardThemes/pink-pyramid.thumbnail.png",
    "purple-diag": "/boardThemes/purple-diag.thumbnail.png",
    "purple": "/boardThemes/purple.thumbnail.png",
    "wood": "/boardThemes/wood.thumbnail.jpg",
    "wood2": "/boardThemes/wood2.thumbnail.jpg",
    "wood3": "/boardThemes/wood3.thumbnail.jpg",
    "wood4": "/boardThemes/wood4.thumbnail.jpg"
};

