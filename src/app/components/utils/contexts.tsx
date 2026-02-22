import { createContext } from "react";

export const CursorContext = createContext({
  isHovering: false,
  setIsHovering: (_value: boolean) => {},
});

export const ThemeContext = createContext({
  dark: false,
  setDark: (_value: boolean) => {},
});