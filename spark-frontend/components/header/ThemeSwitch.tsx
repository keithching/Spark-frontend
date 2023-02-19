import { Switch } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";

export const ThemeSwitch = () => {
  const { toggleTheme, darkTheme } = useTheme();

  return <Switch checked={darkTheme} onChange={toggleTheme} color="warning" />;
};
