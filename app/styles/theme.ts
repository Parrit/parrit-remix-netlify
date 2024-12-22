import { createTheme } from "@mui/material/styles";

const primaryLight = "#9ef1ff";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#89d4e5",
      light: primaryLight,
      contrastText: "#fff",
    },
    secondary: {
      main: "#bdd63e",
      light: "#d4f338",
    },
  },
  typography: {
    fontFamily: "Raleway, Arial",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: {
          padding: "10px 20px",
          minHeight: "40px",
        },
      },
    },
  },
});

export default theme;
