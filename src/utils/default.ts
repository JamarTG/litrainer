import { Color, Fields, Sort } from "../types/form";

export const setDefaultMaxNoGames = (maxNoGames: Fields["maxNoGames"]) => {
    return maxNoGames || 10;
  };
  
  export const setDefaultSort = (sort: Sort) => {
    return sort || "desc";
  };
  
  export const setDefaultColor = (color: Color): Color => {
    return color || "both";
  };
  