import React, { createContext, useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "./theme/theme";
import DaoWorker from "./pages/DaoWorker";
import Recruiter from "./pages/Recruiter";
import Reviewer from "./pages/Reviewer";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DaoWorker />} />
          <Route path="/about" element={<Recruiter />} />
          <Route path="/contact" element={<Reviewer />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

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

// This is a root context, if insert value to this, every component can use same data and update value
// export const AuthContext = createContext({
//   tokenState: null,
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   setATCallback: (value) => {},
// });

// export const useToken = () => {
//   const [tokenState, setTokenState] = useState(null);
//   const setATCallback = useCallback((currentAT) => {
//     setTokenState(currentAT);
//     console.log(currentAT);
//   }, []);
//   return {
//     tokenState,
//     setATCallback,
//   };
// };

export default App;
