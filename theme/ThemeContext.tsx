import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import type { ThemeMode } from "./types";

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const STORAGE_KEY = "theme:mode";

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => {},
});

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(
    (systemScheme ?? "light") as ThemeMode
  );

  useEffect(() => {
    let isMounted = true;

    const loadStoredMode = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!isMounted) return;

        if (stored === "light" || stored === "dark") {
          setMode(stored);
        } else if (systemScheme === "light" || systemScheme === "dark") {
          setMode(systemScheme);
        }
      } catch {}
    };

    loadStoredMode();

    return () => {
      isMounted = false;
    };
  }, [systemScheme]);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
      return next;
    });
  };

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
