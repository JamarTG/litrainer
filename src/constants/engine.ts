import { CSSProperties } from "react";

export const DEPTH_SLIDER_MIN = 0;
export const DEPTH_SLIDER_MAX = 20;
export const DEPTH_SLIDER_DEFAULT = 0;
export const DEPTH_SLIDER_WIDTH = "w-64";

export const ENGINE_DEPTH_MIN = 1;
export const ENGINE_DEPTH_MAX = 20;
export const ENGINE_DEFAULT_DEPTH = 10;

export const ENGINE_SLIDER_STYLE:CSSProperties = {
  WebkitAppearance: "none",
  appearance: "none",
  height: "6px",
  borderRadius: "999px",
  background: "linear-gradient(to right, rgba(45, 212, 191, 1) 0%, rgba(45, 212, 191, 0.7) 100%)",
  outline: "none",
  transition: "background 0.15s ease-in-out",
};
