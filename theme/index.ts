import { useContext } from "react";
import * as darkColors from "./colors/dark-colors";
import * as lightColors from "./colors/light-colors";
import { ThemeContext } from "./ThemeContext";

export const colors = {
  light: lightColors,
  dark: darkColors,
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const useColors = () => {
  const mode = useThemeContext().mode;
  return colors[mode];
};
