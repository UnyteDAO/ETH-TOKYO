import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {},
  palette: {
    primary: {
      main: "#83b6ff",
    },
    secondary: {
      main: "#ffb183",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "Segoe UI",
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
      marginBottom: "1rem",
    },
    body1: {
      fontSize: "1.2rem",
      fontWeight: 500,
      lineHeight: "1.8",
      letterSpacing: "-0.02em",
    },
  },
  // shadows: [
  //   "none",
  //   "0px 4px 8px rgba(0, 0, 0, 0.08)",
  //   "0px 8px 16px rgba(0, 0, 0, 0.08)",
  //   "0px 16px 32px rgba(0, 0, 0, 0.16)",
  //   "0px 32px 64px rgba(0, 0, 0, 0.16)",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  //   "none",
  // ],
});
