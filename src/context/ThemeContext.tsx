"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  isLightMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "techline-theme";

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLightMode, setIsLightMode] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme === "light") {
      setIsLightMode(true);
    } else {
      setIsLightMode(false);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const theme = isLightMode ? "light" : "dark";

    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isLightMode, loaded]);

  const toggleTheme = () => {
    setIsLightMode((current) => !current);
  };

  return (
    <ThemeContext.Provider
      value={{
        isLightMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme precisa ser usado dentro de ThemeProvider"
    );
  }

  return context;
}