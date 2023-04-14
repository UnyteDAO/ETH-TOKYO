import React, { createContext, useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

// presentation


// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TaskPage from "presentation/view_interfaces/task/TaskIndexPage";

// React Toasify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReputationPage from "./pages/ReputationPage";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      background: "linear-gradient(to right bottom, #ff7f50,#f44336)",
      light: "#ff7f50",
      main: "#ff7f50",
      dark: "#ff7f50",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

// This is a root context, if insert value to this, every component can use same data and update value
export const AuthContext = createContext({
  tokenState: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setATCallback: (value) => {},
});

export const useToken = () => {
  const [tokenState, setTokenState] = useState(null);
  const setATCallback = useCallback((currentAT) => {
    setTokenState(currentAT);
    console.log(currentAT);
  }, []);
  return {
    tokenState,
    setATCallback,
  };
};

function App() {
  const setATfunc = useToken();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="all-wrapper">
          {/* <BrowserRouter> */}
          <AuthContext.Provider value={setATfunc}>
            <ProfileProvider>
              <Header />
              <Box flex={1} overflow="auto">
                <Routes>
                  {/* <SlideRoutes> */}
                  <Route path="/" element={<ReputationPage />} />
                  <Route exact path="/tasks/:teamid" element={<TaskPage />} />
                  <Route path="/settings/:teamid" element={<Settings />} />
                  <Route
                    path="/proposals/:teamid"
                    element={<ProposalsOfTeams />}
                  />
                  <Route
                    path="/contributions/:teamid"
                    element={<ContributionsOfTeams />}
                  />
                  <Route path="/thanks/:teamid" element={<ThanksOfTeams />} />
                  <Route path="/dashboard/:teamid" element={<DashBoard />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  {/* </SlideRoutes> */}
                </Routes>
              </Box>
            </ProfileProvider>
          </AuthContext.Provider>
          {/* </BrowserRouter> */}
        </div>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
