import { ThemeProvider } from "@mui/material";
import { muiTheme } from "./theme/theme";
import { HomeLayout } from "./layout/HomeLayout";

export default function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <HomeLayout />
    </ThemeProvider>
  );
}
