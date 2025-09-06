import React from "react";
import { Appearance } from "react-native";
import { colors } from "../components/AppColors";

export const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const theme = {
    colors: Appearance.getColorScheme() == "light" ? colors.light : colors.dark,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
