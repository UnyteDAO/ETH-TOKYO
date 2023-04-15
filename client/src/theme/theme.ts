import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      color: "#ffffff",
    },
  },
  palette: {
    primary: {
      main: "#FF7F50",
    },
    background: {
      default: "#2D2943",
    },
  },
});

// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       background: "linear-gradient(to right bottom, #ff7f50,#f44336)",
//       light: "#ff7f50",
//       main: "#ff7f50",
//       dark: "#ff7f50",
//       contrastText: "#fff",
//     },
//     secondary: {
//       light: "#ff7961",
//       main: "#f44336",
//       dark: "#ba000d",
//       contrastText: "#000",
//     },
//   },
// });

export default theme;
