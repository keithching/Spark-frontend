import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "../../contexts/ThemeContext";
import themeSwitchStyles from "../../styles/themeSwitch.module.css";

// customized MUI switch
// https://stackoverflow.com/questions/51231297/how-to-change-size-of-toggle-switch-in-material-ui
const MuiSwitchLarge = styled(Switch)(({ theme }) => ({
  width: 68,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      transform: "translateX(30px)",
    },
  },
  "& .MuiSwitch-thumb": {
    width: 32,
    height: 32,
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
  },
}));

export const ThemeSwitch = () => {
  const { toggleTheme, darkTheme } = useTheme();

  return (
    <>
      <MuiSwitchLarge
        data-cy="theme-switch"
        checked={darkTheme}
        onChange={toggleTheme}
        color="warning"
        inputProps={{ "aria-label": "Theme Switch" }}
        className={
          darkTheme ? themeSwitchStyles.switchChecked : themeSwitchStyles.switch
        }
      />
    </>
  );
};
