import { createContext, ReactNode, useState } from "react";
import type { ThemeMode } from "./types";

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => {},
});

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
