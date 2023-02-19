import React, { useContext, useEffect, useState } from "react";

interface ThemeContextType {
  darkTheme: boolean;
  toggleTheme: () => void;
  test: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined!
);

// for function components to consume the context
export function useTheme() {
  return useContext(ThemeContext);
}

// Context Provider - providing the props to all the children under this context
export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme() {
    setDarkTheme((prev) => !prev);
  }

  // testing
  useEffect(() => {
    if (darkTheme) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkTheme]);

  function test() {
    console.log("hi from theme context");
  }

  const value = {
    darkTheme,
    toggleTheme,
    test,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
