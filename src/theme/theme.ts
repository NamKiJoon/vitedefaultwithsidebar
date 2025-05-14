import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

export const muiTheme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
  },
});
