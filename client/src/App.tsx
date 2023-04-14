import React, { createContext, useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "./theme/theme";
import DaoWorker from "./pages/DaoWorker";
import Recruiter from "./pages/Recruiter";
import Reviewer from "./pages/Reviewer";
// import "./App.scss";
import Header from "./components/Header";

// This is a root context, if insert value to this, every component can use same data and update value
// export const AuthContext = createContext({
// tokenState: null,
// eslint-disable-next-line @typescript-eslint/no-empty-function
// setATCallback: (value) => {},
// });

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/dao-worker" element={<DaoWorker />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/reviewer" element={<Reviewer />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
