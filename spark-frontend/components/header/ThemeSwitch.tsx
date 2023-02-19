import { Switch } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";

export const ThemeSwitch = () => {
  const { toggleTheme } = useTheme();

  return (
    <Switch
      //   checked={isChecked}
      onChange={toggleTheme}
      color="warning"
    />
  );
};
