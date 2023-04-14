import React, { createContext, useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import DaoWorker from "./pages/DaoWorker";
import Recruiter from "./pages/Recruiter";
import RecruiterDetail from "./pages/RecruiterDetail";
import Reviewer from "./pages/Reviewer";
import Header from "./components/Header";
import LitPage from "./pages/ListTest";

// This is a root context, if insert value to this, every component can use same data and update value
// export const AuthContext = createContext({
// tokenState: null,
// eslint-disable-next-line @typescript-eslint/no-empty-function
// setATCallback: (value) => {},
// });

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/dao-worker" element={<DaoWorker />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/recruiter/:itemId" element={<RecruiterDetail />} />
          <Route path="/reviewer" element={<Reviewer />} />
          <Route path="/lit-test" element={<LitPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
