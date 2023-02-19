import { Switch } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";

export const ThemeSwitch = () => {
  const { test } = useTheme();

  return (
    <Switch
      //   checked={isChecked}
      onChange={test}
      color="warning"
    />
  );
};
